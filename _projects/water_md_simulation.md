---
layout: distill
title: Molecular Dynamics Simulation
description: Introduction to molecular dynamics simulations, covering interatomic potentials, integration algorithms, constraints, periodic boundary conditions, and temperature control methods like velocity scaling.
img: assets/img/MolecularDynamicsWater/boil.gif
importance: 3
category: work

toc:
  - name: Brief Introduction to Molecular Dynamics
  - name: Velocity Integration(Verlet Method)
  - name: Constraints in Molecular Dynamics
  - name: Periodic Boundary Conditions
  - name: Velocity Scaling

---

## Brief Introduction to Molecular Dynamics

Molecular dynamics simulation consists of the numerical, step-by-step, solution of the classical equations of motion, which for a simple atomic system may be written as

$$
    m_i \, \ddot{\mathbf{r}}_i = \mathbf{f}_i \\ \\
$$

$$
    \mathbf{f}_i = -\,\frac{\partial U}{\partial \mathbf{r}_i} \\ \\
$$

For this purpose we need to be able to calculate the forces $$\mathbf{f}_i$$ acting on the atoms, and these are usually derived from a potential energy $$U(\mathbf{r}^N)$$, where $$\mathbf{r}^N = (\mathbf{r}_1, \mathbf{r}_2, \ldots, \mathbf{r}_N)$$ represents the complete set of $$3N$$ atomic coordinates. The Lennard Jones potential is the most commonly used form:

$$
U_{LJ}(r) = 4\varepsilon 
\left[ \left( \frac{\sigma}{r} \right)^{12}
      - \left( \frac{\sigma}{r} \right)^{6} \right],
$$

with two parameters: $$\sigma$$, the effective diameter, and $$\varepsilon$$, the well depth. This potential was used, for instance, in the earliest studies of the properties of liquid argon. If electrostatic charges are present, we add the appropriate Coulomb potential

$$
U_{C}(r) = \frac{1}{4\pi \varepsilon_0} \, \frac{Q_1 Q_2}{r},
$$

where $$Q_1$$ and $$Q_2$$ are the charges and $$\varepsilon_0$$ is the permittivity of free space.

## Velocity Integration(Verlet Method)

The velocity Verlet algorithm is widely used in molecular dynamics because it is time-reversible, symplectic, and provides good energy conservation. It integrates Newton’s equations of motion by updating positions, velocities, and forces in a staggered manner.

It works by first advancing the positions using the velocities and accelerations at the current time step, then computing new forces, and finally finishing the velocity update.
The velocity Verlet algorithm updates positions and velocities as follows:

#### Position update

$$
\mathbf{r}_i(t+\Delta t) = \mathbf{r}_i(t) + \mathbf{v}_i(t)\,\Delta t + \frac{1}{2}\,\mathbf{a}_i(t)\,\Delta t {2},
$$

#### Force evaluation

$$
\mathbf{F}_i(t+\Delta t) = -\,\nabla_i U(\mathbf{r}_1, \ldots, \mathbf{r}_N),
$$

#### Acceleration update

$$
\mathbf{a}_i(t+\Delta t) = \frac{\mathbf{F}_i(t+\Delta t)}{m_i},
$$

#### Velocity update

$$
\mathbf{v}_i(t+\Delta t) = \mathbf{v}_i(t) + \frac{1}{2} \left[\mathbf{a}_i(t) + \mathbf{a}_i(t+\Delta t)\right]\Delta t.
$$

## Constraints in Molecular Dynamics

In many molecular dynamics simulations, certain intramolecular bonds (e.g., the O–H bonds in water) vibrate at very high frequencies. Accurately simulating these vibrations requires very small timesteps, which makes the simulation slow. To avoid this, these bonds are often treated as constraints with fixed lengths. The simulation ensures that these bonds maintain their exact lengths at each timestep, instead of letting them vibrate freely.

The bond length constraint can be written as:

$$
    \chi(r_1, r_2) = |r_1 - r_2|^2 - b^2 = 0
$$

where $$r_1$$ and $$r_2$$ are the positions of the two atoms and $$b$$ is the fixed bond length.

How constraints are enforced

- **SHAKE:** Corrects atomic positions after each timestep so that all constrained bond lengths are exactly satisfied.

- **RATTLE:** Extends SHAKE to the velocity Verlet algorithm by also correcting velocities, ensuring both positions and velocities obey the constraints.

**Intuition:** A constrained bond behaves like a rigid rod. Even if numerical integration tries to stretch or compress it, the SHAKE/RATTLE procedure pulls the atoms back to maintain the correct bond length. This allows the use of **larger timesteps** without losing molecular geometry.

Given an algebraic relation between two atomic coordinates, for example a fixed bond length $$b$$ between atoms 1 and 2, one may write a constraint equation, plus an equation for the time derivative of the constraint:

$$
\chi(r_1, r_2) = (r_1 - r_2) \cdot (r_1 - r_2) - b^2 = 0 \quad \text{(9a)}
$$

$$
\dot{\chi}(r_1, r_2) = 2(v_1 - v_2) \cdot (r_1 - r_2) = 0 \quad \text{(9b)}
$$

In the Lagrangian formulation, the constraint forces acting on the atoms enter as:

$$
m_i \ddot{r}_i = f_i + \Lambda g_i
$$

where $\Lambda$ is the undetermined multiplier and

$$
g_1 = - \frac{\partial \chi}{\partial r_1} = -2(r_1 - r_2), \quad
g_2 = - \frac{\partial \chi}{\partial r_2} = 2(r_1 - r_2)
$$

For simplicity, let $$(r_1, r_2) \to r$$ and $$(p_1, p_2) \to p$$, etc. Then the RATTLE steps can be written as:

1. Half-step momentum update with constraint:

$$
p\Big(t + \frac{1}{2} \delta t\Big) = p(t) + \frac{1}{2} \delta t \, f(t) + \lambda g(t)
$$

2. Position update:

$$
r(t + \delta t) = r(t) + \delta t \, \frac{p(t + \frac{1}{2}\delta t)}{m}
$$

Choosing $$\lambda$$ such that:

$$
0 = \chi(r(t + \delta t)) \quad \text{(10a)}
$$

3. Full-step momentum update:

$$
p(t + \delta t) = p\Big(t + \frac{1}{2}\delta t\Big) + \frac{1}{2} \delta t \, f(t + \delta t) + \mu g(t + \delta t)
$$

Choosing $$\mu$$ such that:

$$
0 = \dot{\chi}(r(t + \delta t), p(t + \delta t)) \quad \text{(10b)}
$$

Step (10a) can be implemented by defining unconstrained variables:

$$
\bar{p}\Big(t + \frac{1}{2}\delta t\Big) = p(t) + \frac{1}{2} \delta t \, f(t), \quad
\bar{r}(t + \delta t) = r(t) + \delta t \, \frac{\bar{p}(t + \frac{1}{2} \delta t)}{m}
$$

Then solve the nonlinear equation for $$\lambda$$:

$$
\chi(t + \delta t) = \chi\Big(\bar{r}(t + \delta t) + \lambda \delta t \frac{g(t)}{m}\Big) = 0
$$

and substitute back:

$$
p\Big(t + \frac{1}{2} \delta t\Big) = \bar{p}\Big(t + \frac{1}{2} \delta t\Big) + \lambda g(t), \quad
r(t + \delta t) = \bar{r}(t + \delta t) + \delta t \frac{\lambda g(t)}{m}
$$

Step (10b) can be handled by defining:

$$
\bar{p}(t + \delta t) = p\Big(t + \frac{1}{2}\delta t\Big) + \frac{1}{2} \delta t \, f(t + \delta t)
$$

Then solve for the second Lagrange multiplier $$\mu$$:

$$
\dot{\chi}(t + \delta t) = \dot{\chi}\Big(r(t + \delta t), \bar{p}(t + \delta t) + \mu g(t + \delta t)\Big) = 0
$$

(which is linear since $$\dot{\chi}(r, p) = - g(r) \cdot p / m$$) and substitute back:

$$
p(t + \delta t) = \bar{p}(t + \delta t) + \mu g(t + \delta t)
$$

## Periodic Boundary Conditions

In molecular dynamics simulations, small sample sizes can lead to significant surface effects. For example, in a cube of 1000 atoms arranged in a $$10 \times 10 \times 10$$ lattice, nearly half of the atoms are on the outer faces, affecting the measured properties. Even for $$10^6 = 100^3$$ atoms, surface atoms account for 6% of the total, which is still significant.

To address this, **periodic boundary conditions (PBCs)** are used. The simulation box is surrounded by replicas of itself, so each atom interacts with the nearest image of other atoms in the periodic array (minimum image convention), provided the potential range is not too long.

During the simulation, if an atom leaves the primary box, it re-enters from the opposite side. This ensures continuity and reduces surface effects. However, it is important to remember the artificial periodicity when analyzing properties influenced by long-range correlations, especially for charged or dipolar systems.

## Velocity Scaling

Velocity scaling is a simple method used to control the temperature of a molecular dynamics simulation. In classical MD, the instantaneous temperature $$T$$ is related to the kinetic energy $$K$$ of the system:

$$
T = \frac{2 K}{3 N k_B},
$$

where $$N$$ is the number of particles and $$k_B$$ is the Boltzmann constant.

In velocity scaling, the velocities of all atoms are scaled by a factor $$\alpha$$:

$$
\vec{v}_i \rightarrow \alpha \vec{v}_i,
$$

where the scaling factor is chosen to bring the instantaneous temperature $$T_{\text{inst}}$$ closer to the desired temperature $$T_0$$:

$$
\alpha = \sqrt{\frac{T_0}{T_{\text{inst}}}}.
$$

This method is straightforward and helps maintain the target temperature, but it does not generate a correct canonical ensemble. More advanced thermostats like Nosé-Hoover or Langevin are typically used for rigorous temperature control.


---


