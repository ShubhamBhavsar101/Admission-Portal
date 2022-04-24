import React from "react"
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import userImage from "./Sample_User_Icon.png"
import "../CSS/Navbar.css"
import { logout } from "../Firebase/logoutuser"
import { useHistory } from "react-router-dom"
import Firebaseauth from "../Firebase/firebase"

export default function NavigationBar({userType, userName}) {
    const history = useHistory();
    async function Click(){
        logout();
       await history.push("/");
    }
    return (
        <div>
            <Navbar expand="lg" className="Navbar-Box" >
                <Navbar.Brand href="#home">BVCOEL College Management System | {userType} View</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="#link">Link</Nav.Link>
                    
                    <Nav.Link><img src={userImage} width="30px" height="30px" /></Nav.Link>
                    <NavDropdown title={Firebaseauth.auth().currentUser.email} id="basic-nav-dropdown">
                        <NavDropdown.Item  onClick={Click}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
        
    )
}