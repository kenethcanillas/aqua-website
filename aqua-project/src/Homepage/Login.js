import '../App.css';

function Login(){
    return(
        <div className="container-login">
  <div className="col-1" />
  <div className="login-form">
    <img src="aqua logo.png" alt="logo" id="logo-login" />
    <div className="login-form-2">
      <form action="">
        <ul className="form">
          <li>
            <p className="user">Username</p>
          </li>
          <li>
            <input type="text" placeholder="Type your username" id="username" />
          </li>
          <li>
            <p>Password</p>
          </li>
          <li>
            <input
              type="password"
              placeholder="Type your password"
              id="password"
            />
            <button
              type="button"
              className="show-button"
              onclick="togglePasswordVisibility()"
            >
              Show Password
            </button>
          </li>
          <li>
            <button type="button" className="login-button">
              Sign In
            </button>
          </li>
        </ul>
      </form>
    </div>
  </div>
  <div className="col-3" />
</div>

    );
}
export default Login;