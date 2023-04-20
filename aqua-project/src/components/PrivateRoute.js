import React from "react";
import { Outlet, Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? <Component {...props}/> : <Navigate to="/login" />;
        }}
      ></Route>
  );
}
// import React, { useContext } from "react";
// import { Route, Redirect, Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// // 
// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
//   const {currentUser} = useContext(AuthContext);
//   console.log(currentUser)
//   return (
//     <Route
//       {...rest}
//       render={routeProps =>
//         !!currentUser ? (
//           <RouteComponent {...routeProps} />
//         ) : (
//           <Navigate to={"/login"} />
//         )
//       }
//     />
//   );
// };


// export default PrivateRoute;