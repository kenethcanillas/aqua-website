import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Routes, Route }  from "react-router-dom";

import LoginHeader from "./LoginHeader";
import Homepage from "./Homepage";
import Instructions from './Instructions';
import Login from './Login';
import CarouselItem from './Carouseltem';



function RoutesHome(){

return(
    <Container className='RH-container'>
        <Row className='RH-row p-4 p-xs-0'>
            <Col lg={12}>
                <LoginHeader/>
            </Col>
            <Col lg={12} className='mt-4'>
                <Routes>
                    {/* <Route path="/" element ={<Homepage/>} /> */}
                    <Route path="*" element={<Homepage/>}></Route>
                    <Route path="/home" element={<Homepage/>}></Route>
                    <Route path="/infographics" element={<Instructions/>}></Route>
                    <Route path="/" element={<Login/>}></Route>
                </Routes>
            </Col>
        </Row>
    </Container>
)
}export default RoutesHome;