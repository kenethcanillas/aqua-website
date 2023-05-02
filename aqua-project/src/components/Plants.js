import { Icon } from '@iconify/react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect, useRef } from "react";
import emptyPlant from '../img/emptySlot1.png';
import lettuce from '../img/lettuceReal.png';

function Plants(){

    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    
    return(
        <Container  height="100">
            <Row className='plants-row'>
                <Col className='plants-col col-1' lg={12} xs={12}>
                        <div className='plant-info'>
                            <img 
                                src={lettuce} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600}}>Slot : 1 </h6>
                                    </div> : " "
                                }    
                            </div>
                            <div className='plant-info'>
                            <img 
                                src={lettuce} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600}}>Slot: 2 </h6>
                                    </div> : " "
                                }    
                            </div>   
                            <div className='plant-info'>
                            <img 
                                src={emptyPlant} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600, color:"red"}}> Removed </h6>
                                    </div> : " "
                                }    
                            </div>
                            <div className='plant-info'>
                            <img 
                                src={lettuce} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600}}>Slot: 4 </h6>
                                    </div> : " "
                                }    
                            </div> 
                            <div className='plant-info'>
                            <img 
                                src={emptyPlant} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600, color:"red"}}> Removed </h6>
                                    </div> : " "
                                }    
                            </div>         
                </Col>
                <Col className='plants-col col-2' lg={12} xs={12}>
                    <div className='plant-info'>
                            <img 
                                src={lettuce} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600}}>Slot: 6 </h6>
                                    </div> : " "
                                }    
                            </div>
                            <div className='plant-info'>
                            <img 
                                src={lettuce} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600}}>Slot: 7 </h6>
                                    </div> : " "
                                }    
                            </div>   
                            <div className='plant-info'>
                            <img 
                                src={emptyPlant} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600, color:"red"}}> Removed </h6>
                                        
                                    </div> : " "
                                }    
                            </div>
                            <div className='plant-info'>
                            <img 
                                src={lettuce} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600}}>Slot: 8 </h6>
                                    </div> : " "
                                }    
                            </div> 
                            <div className='plant-info'>
                            <img 
                                src={emptyPlant} 
                                onClick={() => setClicked(!clicked)}
                                />
                            {clicked ? 
                                    <div className='lettuce-info'> 
                                        <h6 style={{fontWeight:600, color:"red"}}> Removed </h6>
                                    </div> : " "
                                }    
                            </div> 
                </Col>
            </Row>
        </Container>
    )
};
export default Plants;