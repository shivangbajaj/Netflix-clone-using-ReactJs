import React,{useEffect,useState} from 'react';
import '../css/Nav.css';

function Nav() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else handleShow(false);
        })
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])
    return (
        <div className={`nav ${show && "black-nav"}`}>
            <img
            className="nav-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
            />
        </div>
    )
}

export default Nav
