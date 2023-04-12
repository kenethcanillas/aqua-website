import '../App.css';
import { Icon } from '@iconify/react';
import React, { useEffect, useState, useRef } from "react";
import user from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/img/user.png';
import darkmode from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/img/darkmode.png';
import logout from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/img/log-out.png';
import Darkmode from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/DarkMode';




function Header() {
        const [Open, setOpen] = useState(false);

        let menuRef = useRef();

        useEffect(() => {
          let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
              setOpen(false);
              console.log(menuRef.current);
            }      
          };
      
          document.addEventListener("mousedown", handler);
          
          return() =>{
            document.removeEventListener("mousedown", handler);
          }
      
        });
      
        // const toggleMenu = () => {
        //   setIsOpen(!isOpen);
        //};
        
return ( <div class="nav_bar-container" ref={menuRef}> 
    <div class="nb-logo">
        {<Icon icon ="icon-park-solid:leaves-two" color="#1c7a6a" hFlip={true} />}
         <h1 class="logo">AQUA</h1>
    </div>
        <ul class="nav-links">
          <li><a href="#" id="active-link"> Green House</a></li>
          <li><a href="#"> Water Condition</a></li>
          <li><a href="#">Water Level</a></li>
          <li><a href="#">Devices</a></li>
        </ul>
   <div class="nav-buttons" onClick={()=> {setOpen(!Open)}}>
         <p>User</p><button type="button" class="nav-btn">{<Icon icon="gg:profile" color="#f2f2f2" width="48" height="48" hFlip={true} />}</button>
    </div>
    <div className={`dropdown-menu ${Open? 'active' : 'inactive'}`}>
          <ul>
            <DropdownItem img ={user} text = {"Profile"}/>
            <DropdownItem img ={darkmode} text = {"Theme"}/>
            <Darkmode/>
            <DropdownItem img={logout} text={"Log Out"} />
          </ul>
    </div>
</div>
);

}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

  export default Header;