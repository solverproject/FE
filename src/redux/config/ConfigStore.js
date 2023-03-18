import { configureStore } from "@reduxjs/toolkit";
import NodeSlice from "../store/NodeSlice";

const store = configureStore({
  reducer: {
    NodeSlice,
    //...:...
    //...:...
  },
});

export default store;
