import '../App.css';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import imgCar1 from '../img/carou1.png';
import imgCar2 from '../img/caro2.png'
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
 
    // <Carousel activeIndex={index} onSelect={handleSelect} className='ins-cont'>
    //     <Carousel.Item className='ins-row'>
    //         <div className='img'>
    //             <p> How to use aqua web? </p>
    //             <img
    //             className='d-block w-100'
    //             src={imgCar1}
    //             height="350px"
    //             alt="First slide"
    //         />
    //         </div>
    //       <Carousel.Caption className='ins-caps mt-3'>
    //             <p>
    //             <span className=''>Step 1</span><br/><br/>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet massa velit, at feugiat augue dictum vitae. Mauris lobortis enim eget sem placerat, nec dapibus dolor dignissim. Pellentesque ac suscipit lorem. Cras lacinia, erat eget sagittis tincidunt, mauris orci congue odio, et aliquet orci dui at libero. Phasellus augue tellus, condimentum rutrum commodo et, congue ut nibh. Maecenas eu imperdiet velit, a blandit neque. Nulla vel aliquam risus. In elementum ligula a dui pharetra, vel egestas felis gravida.
    //             </p>
    //       </Carousel.Caption>
    //     </Carousel.Item>

    //     <Carousel.Item className='ins-row'>
    //         <div className='img'>
    //             <p> How to use aqua web? </p>
    //             <img
    //             className='d-block w-100'
    //             src={imgCar2}
    //             height="350px"
    //             alt="First slide"
    //         />
    //         </div>
    //       <Carousel.Caption className='ins-caps mt-3'>
    //             <p>
    //             <span className=''>Step 1</span><br/><br/>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet massa velit, at feugiat augue dictum vitae. Mauris lobortis enim eget sem placerat, nec dapibus dolor dignissim. Pellentesque ac suscipit lorem. Cras lacinia, erat eget sagittis tincidunt, mauris orci congue odio, et aliquet orci dui at libero. Phasellus augue tellus, condimentum rutrum commodo et, congue ut nibh. Maecenas eu imperdiet velit, a blandit neque. Nulla vel aliquam risus. In elementum ligula a dui pharetra, vel egestas felis gravida.
    //             </p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   </Carousel>
<>
    <p> How to use aqua web? </p>
    <Carousel  activeIndex={index} onSelect={handleSelect} interval={100000} className='ins-row'>
      <Carousel.Item classsName='w-100'>
        <img
          className="d-block w-100"
          src={imgCar1}
          height="300px"
          alt="First slide"
        />
        <Carousel.Caption className=' w-100'>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={imgCar1}
          height="300px"
          alt="Second slide"
        />

        <Carousel.Caption>
        <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imgCar1}
          height="300px"
          alt="Third slide"
        />

        <Carousel.Caption>
        <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
    )
}
    export default Instructions;