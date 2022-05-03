import React, { useEffect, useState } from "react"
import { Card, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CSS/DashboardPage.css"

import { useHistory } from "react-router-dom";
import { receivefromfirebase } from "../Firebase/receivefromfirebase";
import { getAuth } from "firebase/auth";
import DashboardCard from "./DashboardCard";

export function AdminDashboardPage() {
    
    return (
        <div>
            <Row>
                <DashboardCard title="Total Students" titleText="See list of Students &gt;" />
                <DashboardCard title="Student Fees" titleText="Check Fees &gt;" />
                <DashboardCard title="Fees Tracking" titleText="Track Fees &gt;" />
            </Row>
            <Row className="mt-3">
                <DashboardCard title="Notice Generation" titleText="Generate Notice &gt;" />
            </Row>
        </div>
    )
}

export function StudentDashboardPage() {
    
    return (
        <div>       
            <Row className="mt-3">
                <DashboardCard title="Register Yourself" titleText="Registration Form Link &gt;" controlId="fedseform" />
                <DashboardCard title="Fees Corner" titleText="Fill Fee Details &gt;" controlId="FeesDetails"/>
                <DashboardCard title="My Profile" titleText="Check Profile &gt;" controlId="MyProfile"/>
            </Row>
        </div>
        
    )
}