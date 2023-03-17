import React, { useState } from "react";
import { signUpUser } from "../api/api.js";
import { useMutation, useQueryClient } from "react-query";

const SignUp = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation(signUpUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
    onError: (response) => {
      alert(response.response.data.msg);
      setUserEmail("");
      setPassword("");
      setNickname("");
    },
  });

  const onSignUpSubmitButtonClick = async (event) => {
    event.preventDefault();
    const newUser = {
      userEmail,
      password,
      nickname,
    };
    console.log(newUser);
    mutation.mutate(newUser);
  };

  return (
    <form onSubmit={onSignUpSubmitButtonClick}>
      <div>
        <input
          type="text"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          placeholder="이메일을 입력하세요"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 입력하세요"
        />
        <br />
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          placeholder="닉네임을 입력하세요"
        />
        <br />
        <button>회원가입하기</button>
      </div>
    </form>
  );
};

export default SignUp;
