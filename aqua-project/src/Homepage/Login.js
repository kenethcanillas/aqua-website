import '../App.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Logo from '../img/aquaLogo.png';
import { useAuth } from '../context/AuthContext';
import { auth, app } from '../firebase';

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
  <div>
    <div className="main">
     <div className="sub-main">
       <div>
              <div className="imgs">
                <div className="container-image">
                  <img src={Logo} alt="profile" className="profile"/>
                </div>
              </div>
                          <div>
                            {error}
                            <form onSubmit={handleSubmit}>
                                <div className="second-input">
                                  <p>Username</p>
                                  <input type="text" ref={emailRef} className="Uname"/>
                                  <p>Password</p>
                                  <input type="password" ref={passwordRef} className="Pname"/>
                                </div>
                                <div className="login-button">
                                  <button  disabled={loading} type="submit">Login</button>
                                </div>
                            </form>
                          </div>
       </div>
     </div>

    </div>
</div>

    );
}
export default Login;