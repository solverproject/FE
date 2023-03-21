import React, { useRef, useCallback, useState } from "react";
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
import Modal from "../modal/Modal";
import CreateModal from "../modal/CreateModal";

const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

//커스텀 엣지 및 노드를 위해 컴포넌트 만들어서 타입지정.

/**
 * Redux로 상태관리를 합니다.
 * reactFlow는 Nodes 와 edge개념 2가지로 실행되는듯 합니다.
 *
 */
export default function MindMapMain() {
  const nodeTypes = {
    // mindmap: MindMapNode,
    mindmap: (props) => (
      <MindMapNode {...props} hovered={hoveredNodeId.includes(props.id)} />
    ),
  };

  const edgeTypes = {
    mindmap: MindMapEdge,
  };
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

      const node = event.target.closest(".react-flow__node");

      if (node) {
        console.log(targetIsPane);

        node.querySelector("input")?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
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

  const [hoveredNodeId, setHoveredNodeId] = useState([]);
  //모든 조상 노드 가져와
  const getAncestorNodeIds = (nodeId, nodes) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !node?.parentNode) {
      return [];
    }

    return [node.parentNode, ...getAncestorNodeIds(node.parentNode, nodes)];
  };

  //모달을 띄우기 위한 초석
  const [isModal, setIsModal] = useState(false);
  const [position, setPosition] = useState(null); //모달창 바로옆에 두기
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });

  //마우스 올리면 색상 바꿔
  const HandlerNodeMouseEnter = useCallback(
    (e, node) => {
      console.log(node);
      // setHoveredNodeId(node.id);
      // if (node?.parentNode) {
      //   setHoveredNodeId(...hoveredNodeId, node.parentNode);
      // }
      const ancestorNodeIds = getAncestorNodeIds(node.id, nodes);
      setHoveredNodeId([node.id, ...ancestorNodeIds]);
      setIsModal(true);
      // setPosition(node.position);
      setNodePosition({
        x: node.positionAbsolute.x,
        y: node.positionAbsolute.y,
      });
      // const target = document.querySelector(".");
    },
    [nodes]
  );
  //마우스 떼면 색상 돌아와
  const HandlerNodeMouseLeave = useCallback(() => {
    setHoveredNodeId([]);
    setIsModal((prev) => !prev);
  });

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
      onNodeMouseEnter={HandlerNodeMouseEnter}
      onNodeMouseLeave={HandlerNodeMouseLeave}
      fitView
    >
      {isModal && (
        <Modal
          onClose={() => {
            setIsModal(false);
          }}
          Body={<CreateModal />}
          width="200px"
          position={{
            x: nodePosition.x + 10,
            y: nodePosition.y + 10,
          }}
        />
      )}
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow</Panel>
    </ReactFlow>
  );
}
