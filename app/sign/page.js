"use client";
import React, { useState, useEffect } from "react";

export default function Sign() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    pw: "",
    pw2: "",
  });

  // 입력 필드의 유효성 검사 상태를 저장할 state
  const [validity, setValidity] = useState({
    name: true,
    email: true,
    pw: true,
    pw2: true,
  });

  // 닉네임 변경 감지 및 형식 확인
  useEffect(() => {
    const reNickname = /^[a-zA-Z가-힣0-9]{4,12}$/;
    setValidity({ ...validity, name: reNickname.test(formValues.name) });
  }, [formValues.name]);

  // 이메일 변경 감지 및 형식 확인
  useEffect(() => {
    const reEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setValidity({ ...validity, email: reEmail.test(formValues.email) });
  }, [formValues.email]);

  // 패스워드 변경 감지 및 형식 확인
  useEffect(() => {
    const rePassword = /^[A-Za-z\d@$!%*?&]{6,}$/;
    setValidity({ ...validity, pw: rePassword.test(formValues.pw) });
  }, [formValues.pw]);

  // 패스워드 확인 변경 감지 및 일치 확인
  useEffect(() => {
    const match = formValues.pw === formValues.pw2;
    setValidity({ ...validity, pw2: match });
  }, [formValues.pw, formValues.pw2]);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // 컴포넌트 렌더링
  const inputClassName = (isValid) =>
    `inputField ${!isValid ? "input-invalid" : ""}`;

  return (
    <div className="sign-container">
      <div className="signupForm">
        <h4 className="signupTitle">회원가입</h4>
        <form action="/api/auth/sign" method="post">
          <input
            className={inputClassName(validity.name)}
            name="name"
            placeholder="닉네임 입력"
            onChange={onChangeInput}
          ></input>
          {!validity.name && (
            <div className="error">닉네임 형식이 맞지 않습니다.</div>
          )}

          <input
            className={inputClassName(validity.email)}
            name="email"
            placeholder="이메일 입력"
            onChange={onChangeInput}
          ></input>
          {!validity.email && (
            <div className="error">이메일 형식이 맞지 않습니다.</div>
          )}

          <input
            className={inputClassName(validity.pw)}
            type="password"
            name="pw"
            placeholder="패스워드 입력"
            onChange={onChangeInput}
          ></input>
          {!validity.pw && (
            <div className="error">
              패스워드 형식이 맞지 않습니다.(최소 6자 이상)
            </div>
          )}

          <input
            className={inputClassName(validity.pw2)}
            type="password"
            name="pw2"
            placeholder="패스워드 재입력"
            onChange={onChangeInput}
          ></input>
          {!validity.pw2 && (
            <div className="error">패스워드가 일치하지 않습니다.</div>
          )}

          <button className="submitButton2" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
