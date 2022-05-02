import React, { useEffect, useState } from 'react'
import {Button, Card, Form, Nav, Row, Col} from "react-bootstrap"
import NavigationBar from '../Dashboard/NavigationBar'
import RadioField from '../RegistrationForms/Fields/RadioField'
import TextField from '../RegistrationForms/Fields/TextField'
import TextFieldInline from '../RegistrationForms/Fields/TextFieldInline'
import { getAuth } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { receivefromfirebase } from '../Firebase/receivefromfirebase'

export default function MyProfile() {
  
  const history = useHistory();
  const auth = getAuth();

  const [studentData, setStudentData] = useState();
  
  ReceiveProfile().then((message) => setStudentData(message))

  function ReceiveProfile() {
    // return receivefromfirebase()
  }

  return (
	  <div>
		  <NavigationBar />
		  <Card>
			<Card.Header className='text-center' as="h2" >My Profile</Card.Header>
  		<Card.Body>
				<Form>
				<RadioField title="Cadidate Admission" 
            option1="First Year(F.E)" 
            option2="Direct Second Year(D.S.E)" 
            name="candidateAdmission" 
            controlId="candidateAdmission" 
          />

          <TextField
            title="Candidate Name"
            placeholder="Enter Full Name"
            controlId="candidateName"
          />
          <TextField
            title="Mother's Name"
            placeholder="Enter Full Name"
            controlId="motherName"
          />
          <TextFieldInline
          title="Father's Name"
          placeholder="Enter Full Name"
          controlId="fatherName"
        />
				{/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      Email
    </Form.Label>
    <Col sm="10">
      <Form.Control plaintext readOnly defaultValue="email@example.com" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Password
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group> */}
				</Form>
			{/* <Card.Title>Special title treatment</Card.Title>
			<Card.Text>
				With supporting text below as a natural lead-in to additional content.
			</Card.Text>
			<Button variant="primary">Go somewhere</Button> */}
			</Card.Body>

		  </Card>
	  </div>

  )
}
