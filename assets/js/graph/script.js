const svgSize = 300;
const gridSize = 4; // 5x5 grid
const totalNodes = gridSize * gridSize; // 25 nodes

const matrixCellSize = svgSize/totalNodes;
const canvasOffset = 2*matrixCellSize;
const margin = {top: matrixCellSize, right: matrixCellSize, bottom: 0, left: 40};
const svgWidth = svgSize + margin.left + margin.right;
const svgHeight = svgSize + margin.top + margin.bottom;

["#grid", "#matrix", "#graph"].forEach(id => {
    d3.select(id)
        .attr("width", svgWidth)
        .attr("height", svgHeight + 2*matrixCellSize);
});

// Create nodes
let nodes = [];
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        nodes.push({id: `${i}-${j}`, x: i, y: j});
    }
}
const nodeIds = nodes.map(d => d.id);

// Create links (connect to all 8 neighbors)
let links = [];
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; // skip self
                let ni = i + dx, nj = j + dy;
                if (ni < 0 || nj < 0 || ni >= gridSize || nj >= gridSize) continue;
                links.push({source: `${i}-${j}`, target: `${ni}-${nj}`});
            }
        }
    }
}

// Initialize a 25x25 matrix filled with 0
const adjMatrix = Array.from({ length: nodeIds.length }, () =>
    Array(nodeIds.length).fill(0)
);
// Populate the matrix
links.forEach(link => {
    const sourceIdx = nodeIds.indexOf(link.source);
    const targetIdx = nodeIds.indexOf(link.target);
    adjMatrix[sourceIdx][targetIdx] = 1; // Directed graph
});


// Draw Grid
const gridSvg = d3.select("#grid");
const gridCellSize = svgSize/gridSize;

// Create groups for each cell (rect + label together)
const gridGroups = gridSvg.selectAll(".grid-group")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "grid-group")
    .attr("transform", d => `translate(${d.x * gridCellSize + canvasOffset}, ${d.y * gridCellSize + canvasOffset})`)
    .on("mouseenter", (_, d) => highlightNode(d.id))
    .on("mouseleave", clearHighlight)
    .on("click", (_, d) => toggleSelection(d.id));

// Append rectangle inside group
gridGroups.append("rect")
    .attr("width", gridCellSize)
    .attr("height", gridCellSize)
    .attr("class", "cell");

// Append text label inside group
gridGroups.append("text")
    .attr("class", "grid-label")
    .attr("x", gridCellSize / 2)
    .attr("y", gridCellSize / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12px")
    .style("font-weight", "bold")
    .style("font-family", "SF Mono")
    .text(d => d.id);

// Draw edges globally (not in groups)
const shrinkFactor = gridCellSize * 0.25; // shrink line by 25% on both ends

const gridLinks = gridSvg.selectAll(".grid-link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "grid-link")
    .attr("x1", d => {
        const source = nodes.find(n => n.id === d.source);
        const target = nodes.find(n => n.id === d.target);
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return source.x * gridCellSize + gridCellSize / 2 + canvasOffset + (dx / dist) * shrinkFactor;
    })
    .attr("y1", d => {
        const source = nodes.find(n => n.id === d.source);
        const target = nodes.find(n => n.id === d.target);
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return source.y * gridCellSize + gridCellSize / 2 + canvasOffset + (dy / dist) * shrinkFactor;
    })
    .attr("x2", d => {
        const target = nodes.find(n => n.id === d.target);
        const source = nodes.find(n => n.id === d.source);
        const dx = source.x - target.x;
        const dy = source.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return target.x * gridCellSize + gridCellSize / 2 + canvasOffset + (dx / dist) * shrinkFactor;
    })
    .attr("y2", d => {
        const target = nodes.find(n => n.id === d.target);
        const source = nodes.find(n => n.id === d.source);
        const dx = source.x - target.x;
        const dy = source.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return target.y * gridCellSize + gridCellSize / 2 + canvasOffset + (dy / dist) * shrinkFactor;
    })
    .style("stroke", "#000")
    .style("stroke-width", 2)

// Draw Matrix
const matrixSvg = d3.select("#matrix");
matrixSvg.selectAll("rect")
    .data(nodes.flatMap(row => nodes.map(col => ({row: row, col: col}))))
    .enter()
    .append("rect")
    .attr("x", d => d.col.x * gridSize * matrixCellSize + d.col.y * matrixCellSize + canvasOffset)
    .attr("y", d => d.row.x * gridSize * matrixCellSize + d.row.y * matrixCellSize + canvasOffset)
    .attr("width", matrixCellSize)
    .attr("height", matrixCellSize)
    .attr("class", d => {
        const rowIdx = nodeIds.indexOf(d.row.id);
        const colIdx = nodeIds.indexOf(d.col.id);
        return adjMatrix[rowIdx][colIdx] === 1 ? "matrix-cell edge" : "matrix-cell";
    })           
    .on("mouseenter", (_, d) => highlightEdge(d.row.id, d.col.id))
    .on("mouseleave", clearHighlight);

// --- Column labels (top) ---
matrixSvg.selectAll(".col-label")
    .data(nodeIds)
    .enter()
    .append("text")
    .attr("class", "col-label")
    .attr("text-anchor", "middle")
    .attr("transform", (_, i) => {
        const cx = i * matrixCellSize + matrixCellSize / 2 + canvasOffset;
        const cy = matrixCellSize;
        return `translate(${cx},${cy}) rotate(-90)`; // rotate around this point
    })		
    .attr("font-size", "10px")
    .text(d => d)
    .style("font-weight", "bold")
    .style("font-family", "SF Mono")
    ;
    
// --- Row labels (left) ---
matrixSvg.selectAll(".row-label")
    .data(nodeIds)
    .enter()
    .append("text")
    .attr("class", "row-label")
    .attr("x", matrixCellSize / 2)  // a bit to the left of matrix cells
    .attr("y", (_, i) => i * matrixCellSize + matrixCellSize / 2 + canvasOffset)
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "10px")
    .text(d => d)
    .style("font-weight", "bold")
    .style("font-family", "SF Mono");

// Draw Graph
const graphSvg = d3.select("#graph");
const nodeRadius = 14;
const edgeLen = 100;
let gap = 1.5*matrixCellSize;
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(80))
    .force("charge", d3.forceManyBody().strength(-80))
    .force("center", d3.forceCenter(200, 200))
    .force("center", d3.forceCenter(svgWidth / 2, canvasOffset/2 + svgHeight / 2));

// Draw links
const link = graphSvg.append("g")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

// Group node circle + label together
const nodeGroup = graphSvg.selectAll(".node-group")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node-group")
    .on("mouseenter", (_, d) => highlightNode(d.id))
    .on("mouseleave", clearHighlight)
    .on("click", (_, d) => toggleSelection(d.id))
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

// Append circle to group
nodeGroup.append("circle")
    .attr("class", "node")
    .attr("r", nodeRadius);

// Append text to group
nodeGroup.append("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle") // position above the circle
    .style("pointer-events", "none")
    .attr("alignment-baseline", "middle")
    .text(d => d.id);

// Update positions
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    nodeGroup
        .attr("transform", d => `translate(${d.x},${d.y})`);
});

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
        }

// Highlight functions
function highlightNode(nodeId) {
    gridSvg.selectAll("rect.cell")
        .classed("highlight", d => d.id === nodeId);

    // Highlight edges in the grid
    gridSvg.selectAll("line.grid-link")
        .classed("highlight", l => l.source === nodeId || l.target === nodeId);

    matrixSvg.selectAll("rect.matrix-cell")
        .classed("highlight", d =>{
        const rowIdx = nodeIds.indexOf(d.row.id);
        const colIdx = nodeIds.indexOf(d.col.id);
        return ((d.row.id === nodeId || d.col.id === nodeId) && adjMatrix[rowIdx][colIdx] === 1)
    });

    // Matrix: highlight row/column labels
    matrixSvg.selectAll("text.row-label")
        .classed("highlight", d => d === nodeId);
    matrixSvg.selectAll("text.col-label")
        .classed("highlight", d => d === nodeId);


    graphSvg.selectAll("g.node-group")
        .select("circle.node")
        .classed("highlight", d => d.id === nodeId);

    graphSvg.selectAll("line.link")
        .classed("highlight", l => l.source.id === nodeId || l.target.id === nodeId);

    // Graph: highlight node label
    graphSvg.selectAll("text.node-label")
        .classed("highlight", d => d.id === nodeId);

    // Highlight grid links connected to this node
    gridSvg.selectAll(".grid-link")
        .classed("highlight", l => l.source.id === nodeId || l.target.id === nodeId);
}

function highlightEdge(sourceId, targetId) {
    // Graph: highlight node label
    graphSvg.selectAll("text.node-label")
        .classed("highlight", d => d.id === sourceId || d.id === targetId);
    
    
    graphSvg.selectAll("line.link")
        .classed("highlight", l =>
            (l.source.id === sourceId && l.target.id === targetId) ||
            (l.source.id === targetId && l.target.id === sourceId)
        );

    // 🌟 Grid: highlight the connecting edge
    gridSvg.selectAll("line.grid-link")
        .classed("highlight", l =>
            (l.source.id === sourceId && l.target.id === targetId) ||
            (l.source.id === targetId && l.target.id === sourceId)
        );

    // 🌟 Optionally highlight the two grid nodes as well
    gridSvg.selectAll("rect.cell")
        .classed("highlight", d => d.id === sourceId || d.id === targetId);
       
    // Matrix: highlight the **exact matrix cell**
    matrixSvg.selectAll("rect.matrix-cell")
        .classed("highlight", d => {
            return (d.row.id === sourceId && d.col.id === targetId || 
                d.row.id === targetId && d.col.id === sourceId);
        });
}

function clearHighlight() {
    d3.selectAll(".highlight").classed("highlight", false);
}

function toggleSelection(nodeId) {
    // Toggle grid cell
    gridSvg.selectAll("rect.cell")
        .filter(d => d.id === nodeId)
        .classed("selected", function () {
            return !d3.select(this).classed("selected");
        });

    // Toggle graph node
    graphSvg.selectAll("circle.node")
        .filter(d => d.id === nodeId)
        .classed("selected", function () {
            return !d3.select(this).classed("selected");
        });
}