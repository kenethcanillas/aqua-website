import '../App.css';
import Logo from "../img/aquaLogo.png";
import SanBartolomeHS from "../img/sanbartolomeHS.png";
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


import { Icon } from '@iconify/react';
import { CarouselItem } from 'react-bootstrap';

function Homepage() {
    
    const [index, setIndex] = useState(0);
      
    const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };

       
            // const [isPlaying, setIsPlaying] = useState(false);
          
            // const handlePlayPause = () => {
            //   setIsPlaying(!isPlaying);
            // };
          

    return(
        // <Carousel activeIndex={index} interval={1000000} onSelect={handleSelect}>
        //     <CarouselItem>
            <div className='home-container'>
                <img 
                        src={Logo}
                        width="120"
                        height="120"
                        alt='Aqua Logo'
                    />
                    <h3 > A Cross-Platform Application for Hydroponics Monitoring System</h3>
                    <p>
                    AQUA is a Cross-platform Application for Hydroponics Monitoring System employs information technology to
                    improve efficiency and prevent plant damage caused by delays in administering therapeutic measures such as watering, 
                    opening vents, or emitting light, as well as to improve and increase production. The proposed system aims to be convenient 
                    because it can be monitored from afar, a solution can be given immediately if there is insufficient measurement of the plant's 
                    nutrients, and if further action is needed, it will be dealt with as soon as possible.
                    </p>
                    <img 
                        src={SanBartolomeHS}
                        width="80"
                        height="80"
                        alt='San Bartolome Logo'
                    />
            </div>
        //     </CarouselItem>
        //     <CarouselItem>
               
        //     </CarouselItem>
        // </Carousel>

    );
}
export default Homepage;