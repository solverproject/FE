import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactFlow, {
  Controls,
  Panel,
  ConnectionLineType,
  useStoreApi,
  useReactFlow,
} from "reactflow";

import {
  onNodesChange,
  onEdgesChange,
  addChildNode,
  updateNodePosition,
} from "../../redux/store/NodeSlice";
import MindMapNode from "./MindMapNode";
import MindMapEdge from "./MindMapEdge";
import "reactflow/dist/style.css";

const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

//커스텀 엣지 및 노드를 위해 컴포넌트 만들어서 타입지정.
const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

/**
 * Redux로 상태관리를 합니다.
 * reactFlow는 Nodes 와 edge개념 2가지로 실행되는듯 합니다.
 *
 */
export default function MindMapMain() {
  //redux의 dispatch로 action 전달
  const nodes = useSelector((state) => state.NodeSlice.nodes);
  const edges = useSelector((state) => state.NodeSlice.edges);

  console.log("nodes", nodes);
  console.log("edges", edges);
  const dispatch = useDispatch();

  //useRef로 노드커넥팅ID?를 구한다고함
  const connectingNodeId = useRef(null);
  //useStoreApi를 사용해서 어따쓰지?
  const store = useStoreApi();

  //project는 뭐지?
  const { project } = useReactFlow();
  // console.log(store);

  //드래그앤 드롭시 자식노드가 생성될 위치 지정해주는역할
  const getChildNodePosition = (e, parentNode) => {
    // const { domNode } = this.flowInstance.getElements();
    const { domNode } = store.getState();

    if (
      !domNode ||
      // we need to check if these properites exist, because when a node is not initialized yet,
      // it doesn't have a positionAbsolute nor a width or height
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }
    // we need to remove the wrapper bounds, in order to get the correct mouse position
    const { top, left } = domNode.getBoundingClientRect();
    const panePosition = project({
      x: e.clientX - left,
      y: e.clientY - top,
    });

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
    };
  };

  // 리렌더링되어도 값이 변하지 않는다는 useRef에 커넥션 시작 저장
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = store.getState();
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      console.log(targetIsPane);

      if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);

        if (parentNode && childNodePosition) {
          dispatch(addChildNode({ parentNode, childNodePosition }));
        }
      }
    },
    [getChildNodePosition, dispatch]
  );

  const onNodeDragStop = useCallback(
    (event, node) => {
      dispatch(updateNodePosition({ id: node.id, position: node.position }));
    },
    [dispatch]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDragStop={onNodeDragStop}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
      //   nodeTypes={nodeTypes}
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow</Panel>
    </ReactFlow>
  );
}
