export function check (graph) {
  var edges = graph.edges()
  var nodes = graph.nodes()
  var errorList = []

  for (let i = 0; i < edges.length; i++) {
    if (graph.node(edges[i].v) === undefined) {
      errorList = errorList.concat([ [ edges[i]['v'], 'Error: edge from ' + edges[i]['v'] + ' to ' + edges[i]['w'] + ' contains node that does not exist.' ] ])
    }
    if (graph.node(edges[i].w) === undefined) {
      errorList = errorList.concat([ [ edges[i]['w'], 'Error: edge from ' + edges[i]['v'] + ' to ' + edges[i]['w'] + ' contains node that does not exist.' ] ])
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    if (graph.nodeEdges(nodes[i]).length === 0) {
      errorList = errorList.concat([ [ nodes[i], 'Warning: node ' + nodes[i] + ' has no adjacent nodes.' ] ])
    }
  }

  return errorList
}
