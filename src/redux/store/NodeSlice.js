import { createSlice } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges, XYPosition } from "reactflow";
import { nanoid } from "nanoid/non-secure";

const initialState = {
  nodes: [
    {
      id: "root",
      type: "mindmap",
      data: { label: "React Flow Mind Map" },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
};

const nodeSlice = createSlice({
  name: "nodeSlice",
  initialState,
  reducers: {
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
      console.log(state.nodes);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    addChildNode: (state, action) => {
      const parentNode = action.payload.parentNode;
      const position = action.payload.childNodePosition;

      const newNode = {
        id: nanoid(),
        type: "mindmap",
        data: { label: "NewNode" },
        position,
        parentNode: parentNode.id,
      };
      const newEdge = {
        id: nanoid(),
        source: parentNode.id,
        target: newNode.id,
      };

      state.nodes.push(newNode);
      state.edges.push(newEdge);
    },
    updateNodePosition: (state, action) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.position = position;
      }
    },
  },
  // reducers: {
  //   addNode: (state, action) => {
  //     state.push(action.payload);
  //   },
  //   updateNode: (state, action) => {
  //     const nodeIndex = state.findIndex(
  //       (node) => node.id === action.payload.id
  //     );
  //     state[nodeIndex] = {
  //       ...state[nodeIndex],
  //       ...action.payload,
  //     };
  //   },
  //   deleteNode: (state, action) => {
  //     return state.filter((node) => node.id !== action.payload);
  //   },
  // },
});

export default nodeSlice.reducer;

export const {
  onNodesChange,
  onEdgesChange,
  addChildNode,
  updateNodePosition,
} = nodeSlice.actions;
