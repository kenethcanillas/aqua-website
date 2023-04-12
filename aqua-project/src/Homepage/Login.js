import '../App.css';
import React, {useRef} from 'react';
import Logo from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/img/aqua logo.png';
import Homepage from '../Homepage/Homepage';

function Login() {
  const email = useRef()
  const password = useRef()
  const getEmail = localStorage.getItem("emailData")
  const getPassword = localStorage.getItem("passwordData")
  const handleSubmit = () =>{
      if (email.current.value=="aqua@gmail.com"&&password.current.value==="monitoring"){
        localStorage.setItem("emailData", "aqua@gmail.com")
        localStorage.setItem("passwordData", "monitoring")
      }
  }

  return (
  <div>
    <div className="main">
{
    getEmail&&getPassword?
      <Homepage/>:
     <div className="sub-main">
       <div>
              <div className="imgs">
                <div className="container-image">
                  <img src={Logo} alt="profile" className="profile"/>
                </div>
              </div>
                          <div>
                            <form onSubmit={handleSubmit}>
                                <div className="second-input">
                                  <p>Username</p>
                                  <input type="text" ref={email} className="Uname"/>
                                  <p>Password</p>
                                  <input type="password" ref={password} className="Pname"/>
                                </div>
                                <div className="login-button">
                                  <button>Login</button>
                                </div>
                            </form>
                          </div>
       </div>
     </div>
}
    </div>
</div>
  );
}
export default Login;