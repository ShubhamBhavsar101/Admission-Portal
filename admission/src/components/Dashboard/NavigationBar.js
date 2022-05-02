import React from "react"
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import userImage from "./Sample_User_Icon.png"
import "../CSS/Navbar.css"
import { logout } from "../Firebase/logoutuser"
import { useHistory } from "react-router-dom"
import { getAuth } from "firebase/auth"

export default function NavigationBar({userType, userName}) {
    const history = useHistory();
    const auth = getAuth();
    async function handleClick(data){
        if (data === "home")
        {
            history.push("/Dashboard")
        }
        if (data === "logout")
        {
            logout();
            await history.push("/");
        }
    }
    return (
        <div>
            <Navbar expand="lg" className="Navbar-Box" >
                <Navbar.Brand href="#home">BVCOEL College Management System | {userType} View</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => handleClick("home")}>Home</Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="#link">Link</Nav.Link>
                    
                    <Nav.Link><img src={userImage} width="30px" height="30px" /></Nav.Link>
                    <NavDropdown title="" id="basic-nav-dropdown">
                        <NavDropdown.Item  onClick={() => handleClick("logout")}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
        
    )
}