import '../App.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Logo from '../img/aquaLogo.png';
import { useAuth } from '../context/AuthContext';
import { auth, app } from '../firebase';

import imgCar1 from '../img/car1.jpg';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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


  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  
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

const handleSubmit = useCallback(async event=>{
  event.preventDefault(event)
    try {
      setError("")
      setLoading(true)

      await login(emailRef.current.value, passwordRef.current.value);
    }catch(e){
      console.log(e)
      setError("Failed to log in")
    }

    setLoading(false)
})
  return (
  <>
      <Container>
        <Row>
          <Col lg={6} xs={12} className='img-system'>
            <img
                  className='mt-1'
                  src={imgCar1}
                  width="100%"
                  height="350px"
                  alt="System"
              />
          </Col>
          <Col lg={6} xs={12} className='login-container'>
              <div className='login-form'>
                  {error}
                  <form onSubmit={handleSubmit}>
                      <p>Username</p>
                        <input type="text" ref={emailRef} className="Uname"/>
                      <p>Password</p>
                        <input type="password" ref={passwordRef} className="Pname"/>  
                        
                        <button className='mt-5' disabled={loading} type="submit">Sign</button>
                  </form>
                </div>
            </Col>
        </Row>
      </Container>
      </>
    );
}
export default Login;