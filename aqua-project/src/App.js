import Header from "./components/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GreenHousePages from "./pages/GreenHousePages";
import WaterConditionPages from "./pages/WaterConditionPage";
import WaterLevelPage from "./pages/WaterLevelPage";
import DevicesPage from "./pages/DevicesPage";
import Plants from "./components/Plants";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideView from "./components/SideView";

import LoginHeader from "./Homepage/LoginHeader";
import Login from "./Homepage/Login";
import { useAuth } from "./context/AuthContext";
import { Fragment, useState } from "react";

import RoutesHome from "./Homepage/RoutesHome";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // const [isLogin, setIsLogin] = useState(true)
  let isLogin;
  const { currentUser } = useAuth();
  if (currentUser != null) {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = getDoc(docRef);
    docSnap.then((result) => {
      isLogin = result.data().isLogin;
    });
  }

  return (
    <>
      {currentUser && !isLogin ? (
        <Router>
          <Fragment>
            <Header />
            <Container fluid>
              <Row className="custom-row-container">
                <Col xxl={3} xl={3} lg={3} md={3} sm={12} xs={12}>
                  <SideView />
                </Col>
                <Col xxl={9} xl={9} lg={9} md={9} sm={12} xs={12}>
                  <Routes>
                    <Route path="*" element={<GreenHousePages />} />
                    <Route path="/" element={<GreenHousePages />} />
                    <Route
                      path="/waterconditionpage"
                      Component={WaterConditionPages}
                    />
                    <Route path="/waterlevelpage" Component={WaterLevelPage} />
                    <Route path="/devicespage" Component={DevicesPage} />
                    <Route path="/plants" Component={Plants} />
                  </Routes>
                </Col>
              </Row>
            </Container>
          </Fragment>
        </Router>
      ) : (
        <Router>
          <RoutesHome />
        </Router>
      )}
    </>
  );
}

export default App;
