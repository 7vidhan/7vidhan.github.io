---
layout: page
title: Path Finding Algorithms
description: A visual exploration of graph traversal algorithms, showcasing their behavior and pathfinding capabilities in an interactive format.
img: assets/img/path_finder.jpg
importance: 3
category: fun
---

>Feel free to  [try-it-out](https://7vidhan.github.io/pathfinding-algorithms/) and experience the pathfinding algorithms in action before diving into the details.

---

## Brief Info About The Algorithms

- ### **A\* Search:**

    ![screenshot](https://upload.wikimedia.org/wikipedia/commons/9/98/AstarExampleEn.gif)

    A* (pronounced "A-star") is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency.One major practical drawback is its $$ O(b^d) $$ space complexity, as it stores all generated nodes in memory. Thus, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, as well as memory-bounded approaches; however, A* is still the best solution in many cases.   _-Wikipedia_

---

- ### **Dijkstra's Algorithm:**
    ![screenshot](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dijkstra_Animation.gif/220px-Dijkstra_Animation.gif)
    
    Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.

    The algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes,[5] but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree.
    _-Wikipedia_

---

- ### **Breadth First Search (BFS):**
    ![screenshot](https://upload.wikimedia.org/wikipedia/commons/4/46/Animated_BFS.gif)
    
    Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
    _-Wikipedia_

---

- ### **Depth First Search (DFS):**
    ![screenshot](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Depth-First-Search.gif/220px-Depth-First-Search.gif)
    
    Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.
    _-Wikipedia_

---

- ### **Best-First Search (Greedy):**
    ![screenshot](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dijkstra_Animation.gif/220px-Dijkstra_Animation.gif)
    
    Best-first search is a search algorithm which explores a graph by expanding the most promising node chosen according to a specified rule.
    Judea Pearl described best-first search as estimating the promise of node n by a "heuristic evaluation function {\displaystyle f(n)}f(n) which, in general, may depend on the description of n, the description of the goal, the information gathered by the search up to that point, and most important, on any extra knowledge about the problem domain."
    Some authors have used "best-first search" to refer specifically to a search with a heuristic that attempts to predict how close the end of a path is to a solution, so that paths which are judged to be closer to a solution are extended first. This specific type of search is called greedy best-first search or pure heuristic search.
    _-Wikipedia_

_*Note\: The GIF images are unashamedly taken from Wikipedia as well*_

