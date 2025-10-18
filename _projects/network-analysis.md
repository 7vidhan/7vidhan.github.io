---
layout: page
title: Social Network Analysis
description: An interactive visualization of Demon Slayer story arcs through social network analysis, highlighting community structures and centrality measures to explore character influence and relationships.
img: assets/img/DemonSlayer/thumbnail.png
importance: 3
category: fun
---

Feel free to  [try-it-out](https://github.com/7vidhan/7vidhan.github.io/tree/main/assets/html/DemonSlayer/webpage/index.html) and experience the epidemic spreading in action before diving into the details.

### Demon Slayer Characters

<iframe src="/assets/html/DemonSlayer/htmls/S01.html" width="800" height="700" style="border: none;"></iframe>

---

## Brief Introduction to Centrality Measures

- ### Degree Centrality

    **Definition:** Degree centrality assigns an importance score based simply on the number of links held by each node.  
    **What it tells us:** Spot popular or socially active individuals who can quickly share information with their immediate circle. 
    **When to use it:** To find people who know many others and can quickly share information. To find highly connected nodes, popular nodes, or those that can quickly reach the wider network.  

- ### Betweenness Centrality

    **Definition:** Betweenness centrality measures the number of times a node lies on the shortest path between other nodes.  
    **What it tells us:** Identifies nodes that act as bridges or intermediaries in the network.  
    **When to use it:** To identify connectors who link separate friend groups or social circles. They are often important for spreading news between clusters. Betweenness is useful for analyzing communication dynamics, but should be used with care. A high betweenness count could indicate someone holds authority over disparate clusters in a network, or just that they are on the periphery of both clusters. High betweenness may indicate authority over who control the flow of information between groups.  

- ### Closeness Centrality

    **Definition:** Closeness centrality scores nodes based on their overall proximity to all other nodes in the network.  
    **What it tells us:** How quickly a node can reach or influence the entire network. For finding the individuals who are best placed to influence the entire network most quickly.
    **When to use it:** Useful for identifying effective “broadcasters” in the network. If the network is highly connected (almost everyone is friends with almost everyone else), then most people are already “close” to everyone, so their closeness scores will be very similar. In that case, closeness centrality doesn’t help much to tell who is more influential overall. However, if the network has clusters (groups of friends that are tightly connected within but loosely connected to other groups), closeness centrality is useful within each cluster to identify who can reach most people in that group fastest.

- ### Eigenvector Centrality

    **Definition:** Eigenvector centrality measures a node’s influence based on its connections and the importance of its neighbors.  
    **What it tells us:** Highlights nodes with influence across the entire network, not just immediate connections.  
    **When to use it:** EigenCentrality can identify nodes with influence over the whole network, not just those directly connected to it. Useful for social networks, information propagation, or understanding networks like malware propagation.  

- ### PageRank

    **Definition:** PageRank is a variant of eigenvector centrality that accounts for link direction and weight.  
    **What it tells us:** Shows nodes whose influence extends beyond direct connections, reflecting authority in the network.  
    **When to use it:** Ideal for citation networks, web authority, or networks where direction and weighted influence are important. Famous for its use in Google’s search algorithm. PageRank is famously one of the ranking algorithms behind the original Google search engine (the ‘Page’ part of its name comes from creator and Google founder, Larry Page). 

---

<!-- Dropdown to select arc -->
<div style="text-align:center; margin-bottom:20px;">
  <label for="arcSelect"><strong>Select Arc:</strong></label>
  <select id="arcSelect" onchange="showArc()">
    <option value="">--Choose an Arc--</option>
    <option value="Final Selection Arc" selected>Final Selection Arc</option>
    <option value="Kidnapper's Bog Arc">Kidnapper's Bog Arc</option>
    <option value="Asakusa Arc">Asakusa Arc</option>
    <option value="Tsuzumi Mansion Arc">Tsuzumi Mansion Arc</option>
    <option value="Mount Natagumo Arc">Mount Natagumo Arc</option>
    <option value="Rehabilitation Training Arc">Rehabilitation Training Arc</option>
    <option value="Mugen Train Arc">Mugen Train Arc</option>
    <option value="Entertainment District Arc">Entertainment District Arc</option>
    <option value="Swordsmith Village Arc">Swordsmith Village Arc</option>
    <option value="Hashira Training Arc">Hashira Training Arc</option>
    <option value="Infinity Castle Arc">Infinity Castle Arc</option>
    <option value="Sunrise Countdown Arc">Sunrise Countdown Arc</option>
  </select>
</div>

<iframe id="arcFrame" src="" width="100%" height="600px" style="border:1px solid #ccc;"></iframe>

<script>
function showArc() {
    const select = document.getElementById('arcSelect');
    const iframe = document.getElementById('arcFrame');
    const value = select.value;

    if(value) {
        // Assuming your HTML files are named like "Final_Selection_Arc_Communities.html"
        iframe.src = `/assets/html/DemonSlayer/htmls/${value}_Communities.html`;
    } else {
        iframe.src = "";
    }
}
// Set default on page load
window.onload = function() {
    showArc();
};
</script>

---

<div style="text-align:center; margin-bottom:20px;">
  <label for="centralitySelect"><strong>Select Centrality Heatmap:</strong></label>
  <select id="centralitySelect" onchange="showHeatmap()">
    <option value="Closeness Centrality_heatmap" selected>Closeness Centrality</option>
    <option value="Betweenness Centrality_heatmap">Betweenness Centrality</option>
    <option value="EigenVector Centrality_heatmap">EigenVector Centrality</option>
    <option value="PageRank_heatmap">PageRank</option>
  </select>
</div>

<iframe id="heatmapFrame" width="100%" height="600px" style="border:1px solid #ccc;"></iframe>

<script>
function showHeatmap() {
    const select = document.getElementById('centralitySelect');
    const iframe = document.getElementById('heatmapFrame');
    const value = select.value;

    if(value) {
        iframe.src = `/assets/html/DemonSlayer/char_imp/${value}.html`;
    } else {
        iframe.src = "";
    }
}

// Set default on page load
window.onload = function() {
    showHeatmap();
};
</script>

---

