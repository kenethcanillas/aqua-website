import '../App.css';
import Logo from "../img/aquaLogo.png";
import SanBartolomeHS from "../img/sanbartolomeHS.png";

import { Icon } from '@iconify/react';

function Homepage() {
    return(
        <div className='home-container'>
               <img 
                    src={Logo}
                    width="120"
                    height="120"
                    alt='Aqua Logo'
                />
                <h3 >Cross Platform Hydroponics System</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet massa velit, at feugiat augue dictum vitae. Mauris lobortis enim eget sem placerat, nec dapibus dolor dignissim. 
                    Pellentesque ac suscipit lorem. Cras lacinia, erat eget sagittis tincidunt, mauris orci congue odio, et aliquet orci dui at libero. Phasellus augue tellus, 
                    condimentum rutrum commodo et, congue ut nibh. Maecenas eu imperdiet velit, a blandit neque. Nulla vel aliquam risus. In elementum ligula a dui pharetra, vel egestas felis gravida.
                </p>
                <img 
                    src={SanBartolomeHS}
                    width="80"
                    height="80"
                    alt='San Bartolome Logo'
                />
        </div>


    );
}
export default Homepage;