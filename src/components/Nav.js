import { Link } from "react-router-dom"
import logo from '../logo.svg';
import "./styles/Navbar.css"

const Nav = () =>{


    return(
        <div className="navbar">
            <div className="title">
                <img src={logo} className="App-logo title-image" alt="logo" />
                <p className="title-name"><Link to="/">Postly</Link></p>
            </div>
            
            <Link to="/admin" className="addPost"><span className="material-symbols-outlined">
note_add
</span></Link>
        </div>
    )
}

export default Nav;