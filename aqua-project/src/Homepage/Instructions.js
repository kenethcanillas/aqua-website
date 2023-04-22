import '../App.css';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import imgCar1 from '../img/car1.jpg';
import imgCar2 from '../img/car2.jpg'
import { Icon } from '@iconify/react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Instructions(){

    const [index, setIndex] = useState(0);
      
    const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };
      
    return(
 
    <Carousel activeIndex={index} onSelect={handleSelect} className='ins-cont'>
        <Carousel.Item className='ins-row'>
            <div className='img'>
                <p> How to use aqua web? </p>
                <img
                className='mt-1'
                src={imgCar1}
                width="90%"
                height="350px"
                alt="First slide"
            />
            </div>
          <Carousel.Caption className='ins-caps mt-3'>
                <p>
                <span className=''>Step 1</span><br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet massa velit, at feugiat augue dictum vitae. Mauris lobortis enim eget sem placerat, nec dapibus dolor dignissim. Pellentesque ac suscipit lorem. Cras lacinia, erat eget sagittis tincidunt, mauris orci congue odio, et aliquet orci dui at libero. Phasellus augue tellus, condimentum rutrum commodo et, congue ut nibh. Maecenas eu imperdiet velit, a blandit neque. Nulla vel aliquam risus. In elementum ligula a dui pharetra, vel egestas felis gravida.
                </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className='ins-row'>
            <div className='img'>
                <p> How to use aqua web? </p>
                <img
                className='mt-1'
                src={imgCar2}
                width="90%"
                height="350px"
                alt="First slide"
            />
            </div>
          <Carousel.Caption className='ins-caps mt-3'>
                <p>
                <span className=''>Step 1</span><br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet massa velit, at feugiat augue dictum vitae. Mauris lobortis enim eget sem placerat, nec dapibus dolor dignissim. Pellentesque ac suscipit lorem. Cras lacinia, erat eget sagittis tincidunt, mauris orci congue odio, et aliquet orci dui at libero. Phasellus augue tellus, condimentum rutrum commodo et, congue ut nibh. Maecenas eu imperdiet velit, a blandit neque. Nulla vel aliquam risus. In elementum ligula a dui pharetra, vel egestas felis gravida.
                </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}
    export default Instructions;