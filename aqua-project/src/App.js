import Header from "./components/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GreenHousePages from "./pages/GreenHousePages";
import WaterConditionPages from "./pages/WaterConditionPage";
import WaterLevelPage from "./pages/WaterLevelPage";
import DevicesPage from "./pages/DevicesPage";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideView from "./components/SideView";
import Login from "./Homepage/Login";
import {useAuth } from "./context/AuthContext";
import { Fragment } from "react";

function App() {

  const {currentUser} = useAuth();
  return (
   <>
        {currentUser ? <Router>
          <Fragment>
            <Header />
      <Container fluid>
              <Row className="custom-row-container">
                <Col xxl={2} xl={3} lg={3} md={3} sm={12} xs={12}>
            <SideView />
          </Col>
                <Col xxl={10} xl={9} lg={9} md={9} sm={12} xs={12}>
            <Routes>
                    <Route path="/" element={<GreenHousePages />} />
                    <Route path="/login" element={<GreenHousePages />} />
                    <Route
                      path="/waterconditionpage"
                      Component={WaterConditionPages}
                    />

                    <Route path="/waterlevelpage" Component={WaterLevelPage} />
                    <Route path="/devicespage" Component={DevicesPage} />
            </Routes>
          </Col>
        </Row>
      </Container>
          </Fragment>
        </Router> : <Login />}
    </>
  );
}

export default App;
