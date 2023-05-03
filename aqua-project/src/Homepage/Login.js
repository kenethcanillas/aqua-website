import "../App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../img/aquaLogo.png";
import { useAuth } from "../context/AuthContext";
import { auth, app, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

import imgCar1 from "../img/car1.jpg";
import LoginIMG from "../img/imgLog.svg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Box, CircularProgress } from "@mui/material";
function Login() {
  // const email = useRef()
  // const password = useRef()
  // const getEmail = localStorage.getItem("emailData")
  // const getPassword = localStorage.getItem("passwordData")
  // const handleSubmit = () =>{
  //     if (email.current.value=="aqua@gmail.com"&&password.current.value==="monitoring"){
  //       localStorage.setItem("emailData", "aqua@gmail.com")
  //       localStorage.setItem("passwordData", "monitoring")
  //     }
  // }

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState();
  // const auth = getAuth();
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //       setError("")
  //       setLoading(true)
  //       await login(emailRef.current.value, passwordRef.current.value)
  //       history.push("/greenhousepage")

  //     setLoading(false)
  //   }

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault(event);
    try {
      setError("");
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then((userCredentials) => {
        const docRef = doc(db, "users", userCredentials.user.uid);
        const docSnap = getDoc(docRef);
        docSnap.then((result) => {
          console.log(result.data().isLogin);
          if(result.data().isLogin){
            logout();
          }else{
            updateDoc(docRef,{
              isLogin: true
            })
          }
         
        });
      });
      // await login(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      // console.log(e)
      setError("Failed to log in");
    }

    setLoading(false);
  });

  return (
    <>
      <Container>
        <Row>
          <Col lg={7} md={6} sm={6} xs={12} className="img-system">
            <img
              className="mt-1"
              src={LoginIMG}
              width="100%"
              height="300px"
              alt="System"
            />
          </Col>
          <Col lg={5} md={6} sm={6} xs={12} className="login-container">
            <div className="login-form">
              <span>{error}</span>
              <form onSubmit={handleSubmit}>
                <p>Username</p>
                <input type="email" ref={emailRef} className="Uname" required />
                <p>Password</p>
                <input
                  type="password"
                  ref={passwordRef}
                  className="Pname"
                  required
                />

                <button className="mt-5" disabled={loading} type="submit">
                  Sign
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Login;
