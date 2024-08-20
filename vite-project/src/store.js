import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { nanoid } from "nanoid";
import { create } from "zustand";
import {
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
  isRunning,
  toggleAudio,
  createAudioNode,
} from "./audio";

export const useStore = create((set, get) => ({
  nodes: [
    {
      type: "osc",
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
    },
    {
      type: "amp",
      id: "b",
      data: { gain: 0 },
      position: { x: 50, y: 50 },
    },
    {
      type: "out",
      id: "c",
      data: { label: "output" },
      position: { x: -50, y: 100 },
    },
  ],
  edges: [],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });

    connect(data.source, data.target);
  },

  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  //   isRunning: false,

  //   toggleAudio() {
  //     set({ isRunning: !get().isRunning });
  //   },

  isRunning: isRunning(),

  toggleAudio() {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },

  removeNodes(nodes) {
    for (const { id } of nodes) {
      removeAudioNode(id);
    }
  },

  removeEdges(edges) {
    edges.forEach(({ source, target }) => {
      disconnect(source, target);
    });

    // Remove the edges from the store after disconnecting
    set({
      edges: get().edges.filter((edge) => !edges.some((e) => e.id === edge.id)),
    });
  },

  createNode(type) {
    const id = nanoid();

    switch (type) {
      case "osc": {
        const data = { frequency: 440, type: "sine" };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }

      case "amp": {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);
        set({ nodes: [...get().nodes, { id, type, data, position }] });

        break;
      }
    }
  },
}));
