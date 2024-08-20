import { ReactFlow, Background, Panel } from "@xyflow/react";

import Osc from "./nodes/Osc";
import Amp from "./nodes/Amp";
import Out from "./nodes/Out";

import { useStore } from "./store";

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes,
  onEdgesDelete: store.removeEdges,
  createNode: store.createNode,
});

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

export default function App() {
  const store = useStore(selector);

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      onNodesDelete={store.onNodesDelete}
      onEdgesDelete={store.onEdgesDelete}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => store.createNode("osc")}>osc</button>
        <button onClick={() => store.createNode("amp")}>amp</button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
