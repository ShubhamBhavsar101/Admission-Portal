import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CSS/DashboardPage.css"
import { useHistory } from "react-router-dom";
import { receivefromfirebase } from "../Firebase/receivefromfirebase";
import { getAuth } from "firebase/auth";

export function AdminDashboardPage() {
    return (
        <div>
            <Row>
                <Col>
                    <Card body><h1>Total Students 50</h1>
                    <p></p><br />
                    <a className="primary">See list of Students &gt;</a></Card>
                </Col>
                <Col>
                    <Card body ><h1>Student Fees</h1>
                    <p></p><br />
                    <a className="primary">Check Fees &gt;</a></Card>
                </Col>
                <Col>
                    <Card body ><h1>Fees Tracking</h1>
                    <p></p><br />
                    <a className="primary">Track Fees &gt;</a></Card>
                </Col>
            </Row>
        </div>
    )
}

export function StudentDashboardPage() {
    
    const history = useHistory();
    
    async function handleClick(data) {
        
        
        if (data == "fedseform") {
            history.push('/fedseform');
        }

        if (data == "MyProfile") {
            history.push('/MyProfile')
        }
        
        if (data == "FeesDetails") {
            history.push('/FeesDetails')
        }
        
    }
    return (
        <div>
            <Row>
                <Col>
                    <Card body>
                        <h1>Register Yourself</h1>
                        <br></br>
                        <br></br>
                        <a href="#" onClick={() => handleClick("fedseform")}>Registration Form Link &gt;</a>
                    </Card>
                </Col>
                <Col>
                    <Card body>
                        <h1>Fees Corner</h1>
                        <br></br>
                        <br></br>
                        <a href="#" onClick={() => handleClick("FeesDetails")}>Fill Fee Details &gt;</a>
                    </Card>
                </Col>
                <Col>
                    <Card body>
                        <h1>My Profile</h1>
                        <br></br>
                        <br></br>
                        <a onClick={() => handleClick("MyProfile")}>Check Profile &gt;</a>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}