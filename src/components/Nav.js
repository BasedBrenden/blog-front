import { Link } from "react-router-dom"
import logo from '../logo.svg';
import "./styles/Navbar.css"

const Nav = () =>{


    return(
        <div className="navbar">
            <img src={logo} className="App-logo" alt="logo" />
            <p><Link to="/">Postly</Link></p>
        </div>
    )
}

export default Nav;