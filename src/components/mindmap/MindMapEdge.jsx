import React from "react";
import { BaseEdge, EdgeProps, getStraightPath } from "reactflow";

export default function MindMapEdge(props) {
  const { sourceX, sourceY, targetX, targetY } = props;

  /**
   * 두 노드간 직선 경로를 계산하는 도우미
   * 두 지점 사이의 직선을 그리는데 사용되는 경로 데이터를 반환
   */
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  //BaseEdge는 기본 에지 컴포넌트, 이걸 사용해서 사용자지정 엣지를 만들수 있다고함
  return <BaseEdge path={edgePath} {...props} />;
}
