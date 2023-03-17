import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SockJs from "sockjs-client";
import * as StompJs from "@stomp/stompjs";

export default function Chat({ id }) {
  //ref에 client 변수 생성
  const client = useRef({});
  const [chatmessages, setChatmessages] = useState([]);
  const [message, SetMessage] = useState("");

  //쿠키에 있는 닉네임 가져와
  const nickname = "test1";
  const realnickname = "test";

  // WebSocket 연결을 위한 connect 함수 정의
  const connect = () => {
    // StompJs.Client 인스턴스 생성
    client.current = new StompJs.Client({
      // WebSocket 연결 설정
      webSocketFactory: () => new SockJs(`웹소켓 연결 URL`),
      connectHeaders: {
        //각종 헤더에 포함될 정보 토큰, ..인증정보
        // Authorization : new Cookie
      },
      //디버그 메시지 출력
      debug: (str) => {
        console.log("debug meg:", str);
      },
      //연결이 실행되면 실행되는 함수
      onConnect: () => {
        subscribe();
        //채팅방에 참여한 사용자가 있으몀ㄴ EnTER 타입의 메시지를 보냄
        if (realnickname) {
          client.current.publish({
            // 목적지? api를 보내는거같음
            destination: `/pub/chat/message`,
            body: JSON.stringify({
              //입장 타입
              type: "ENTER",
              //부모로부터 전달받은 id
              roomId: id,
              sender: nickname,
              message: `${realnickname}님이 게임에 참가하셨습니다.`,
            }),
          });
        } else {
          //채팅방에 참여한 사용자가 없다면 걍 return?
          return;
        }
      },

      //Stomp 오류가 발생시?
      onStompError: (frame) => {
        console.log("stompError:", frame);
      },
    });

    //StompJs.Client 인스턴스를 활성화
    client.current.activate();
  };

  //웹 소켓 연결 종료를 위한 disconnect 함수 정의
  const disconnect = () => {
    client.current.deactivate();
  };

  //웹소켓 메시지 수신을 위한 subscribe 함수 정의
  const subscribe = () => {
    //클라이언트가 메시지를 받을 채널을 구독 => 서버로부터 받는 부분으로
    //메시지를 받으면 콜백 함수를 실행하고, 콜백함수의 파라미터로 서버로부터 받은 body
    client.current.subscribe(`sub/chat/room/${id}`, ({ body }) => {
      //받은 메시지를 파싱해서 메시지 리스트에 추가
      setChatmessages((newMessage) => [...newMessage, JSON.parse(body)]);
    });
  };

  //publish 함수는 클라가 서버에게 채팅 메시지를 보내는 역할.
  //연결 여부부터 확인
  const publish = (message) => {
    //클라이언트 연결 안되면 함수 종료
    if (!client.current.connected) {
      return;
    }
    //입력된 메시지가 없으면 알림창 띄우고 함수 종료,.
    else if (message === "") {
      alert("채팅 내용 입력 하세요!");
      return;
    }
    //클라이언트가 연결되어 있고 입력된 메시지가 있으면, 메시지를 서버로 보냄.!
    //이부분이 실행되는 로직.
    else {
      client.current.publish({
        //보낼 채널 주소와 보낼 메시지 객체
        destination: `/pub/chat/message`,
        //보낼 객체
        body: JSON.stringify({
          type: "TALK",
          roomid: id,
          sender: nickname,
          message: message,
        }),
      });
      //메시지 보냈으면 비워야죠
      SetMessage("");
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <DivChatContainer>
      <DivChatBody>
        <h1>채팅창이 보입니다.</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
        <h1>chat</h1>
      </DivChatBody>
      <DivChatInput>
        <input
          className="chatInputBox fontSemiBold"
          type="text"
          placeholder="채팅을 입력해주세요."
          value={message}
          onChange={(e) => SetMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && publish(message)}
        />
        <button>send</button>
        {/* <img
          src={btn_send2}
          alt="send"
          className="chatInputButton"
          onClick={() => publish(message)}
        /> */}
      </DivChatInput>
    </DivChatContainer>
  );
}

const DivChatContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  margin: 40px;
`;
const DivChatBody = styled.div`
  width: 100%;
  /* height: 80vh; */
  height: calc(100% - 155px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: red;
  }
  border: 1px solid black;
`;

const DivChatInput = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  background-color: white;
  margin-bottom: 50px;
`;
