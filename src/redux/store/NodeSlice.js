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
      //childnode 추가?
      childNode: [],
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
      console.log(parentNode);
      const position = action.payload.childNodePosition;
      const id = nanoid();
      const node = state.nodes.find((node) => node.id === parentNode.id);
      node.childNode.push(id);

      const newNode = {
        id,
        type: "mindmap",
        data: { label: "NewNode" },
        position,
        parentNode: parentNode.id,
        childNode: [],
      };
      const newEdge = {
        id: nanoid(),
        source: parentNode.id,
        target: newNode.id,
      };

      // parentNode.childNode.push(id);

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
    updateNodeLabel: (state, action) => {
      const { id, label } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.label = label;
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
  updateNodeLabel,
} = nodeSlice.actions;
