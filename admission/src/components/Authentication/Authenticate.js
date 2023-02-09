import React, { useRef, useEffect, useState } from 'react';
import { Form, Button, Card, CardGroup, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import logo from '../Assets/logo1.jpg';
import { Link, useHistory } from 'react-router-dom';
import { verifyEmail } from '../Firebase/verifyemailaddress';
import Firebaseauth from '../Firebase/firebase';
import { getrole, getallrole } from '../Firebase/role';
import outlooklogo from "../Assets/Sample_User_Icon.png"
import { Nav } from "react-bootstrap"
import { resetpassword } from '../Firebase/forgotpassword';
import { checknewuser } from '../Firebase/checknewstudent';

export default function Auth(params) {
    const auth = getAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const loginemailRef = useRef();
    const loginpasswordRef = useRef();
    const [error, setError] = useState('');
    const [loginerror, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [submitsuccess, setSubmitsuccess] = useState(false);
    const [loginsuccess, setLoginsuccess] = useState(false);
    const history = useHistory();
    const [forgotpassword, setforgotpassword] = useState(false);
    const [loginorforgotpassword, setloginorforgotpassword] = useState('Log In')
    const [passwordresetemail, setpasswordresetemail] = useState(false);

    const [autherror, setautherror] = useState(undefined);

    useEffect(() => {
        try {
            setautherror(params.location.state)
        }
        catch (e) {
            console.log(e)
        }
    }, [params])

    async function handleforgotclick() {
        setforgotpassword(true);
        setloginorforgotpassword('Send Password Reset Email');

    }
    async function handleLinkclick() {
        window.location.replace("https://outlook.office.com/mail/");
    }
    async function signUp(e) {
        const auth = getAuth();
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            const emailcheck = emailRef.current.value;
            const checkemailbvpedu = emailcheck.split("-");
            const checkemailfaculty = emailcheck.split("@")
            if (checkemailbvpedu[1] !== "bvcoel@bvp.edu.in"&&checkemailfaculty[1]!=="bharatividyapeeth.edu") {
                console.log(emailcheck);
                throw "Please Register on Portal using official Email ID only i.e example-bvcoel@bvp.edu.in or example@bharatividyapeeth.edu ";
            }
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            verifyEmail();
            setSubmitsuccess(true);
            document.getElementById("signup-form").reset();
        } catch (e) {
            setError('Failed to create an account' + "  " + e);
        }
        setLoading(false);
    }
    async function signInorforgotpassword(e) {
        if (forgotpassword) {
            await resetpassword(loginemailRef.current.value);
            setpasswordresetemail(true);
            setforgotpassword(false);
            setloginorforgotpassword('Log In');

        }
        else signIn(e);
    }
    async function signIn(e) {
        const auth = getAuth();
        e.preventDefault();

        try {
            setLoginError('');
            setLoading(true);
            const emailcheck = loginemailRef.current.value;
            const checkemailbvpedu = emailcheck.split("-");
            const checkemailfaculty = emailcheck.split("@");
            const allrole = await getallrole();
            if ((checkemailbvpedu[1] !== "bvcoel@bvp.edu.in"&&checkemailfaculty[1]!=="bharatividyapeeth.edu") && !allrole.includes(emailcheck)) {
                throw "Since you are not using official college email id for example: example-bvcoel@bvp.edu.in or example@bharatividyapeeth.edu ";
            }

            await signInWithEmailAndPassword(auth, loginemailRef.current.value, loginpasswordRef.current.value);
            setLoginsuccess(true);
            document.getElementById("signin-form").reset();
            setautherror(null);
            if (!auth.currentUser.emailVerified) {
                throw "Please verify your email to log in to portal, Check Junk/Spam emails if you have trouble finding email verification link";
            }
            const role = await getrole(auth.currentUser.uid);
            const checknew = await checknewuser(auth.currentUser.uid);
            if (role[0] === 'Admin' && role[1] === 'Administration') {
                //admin login
                await history.push("/AdminView")
            }
            else if (role[0] === 'HOD' && role[1] === 'Computer') {
                //civil dept login
                await history.push("/Dashboard")
            }
            else if (role[0] === 'HOD' && role[1] === 'Electronics') {
                //computer dept login
                await history.push("/Dashboard")

            }
            else if (role[0] === 'HOD' && role[1] === 'Mechanical') {
                //mechanical dept login
                await history.push("/Dashboard")
            }
            else if (role[0] === 'HOD' && role[1] === 'Civil') {
                //electronics dept login
                await history.push("/Dashboard")
            }
            else if (role[0] === 'Student'||checknew) {
                //Student login
                await history.push("/StudentView")

            }
            else {
                setLoginError("You are not found in database if you are already signed up on portal Please contact Admin")
            }

        } catch (e) {
            console.log(e)
            setLoginError('Login Failed' + "  " + e);
        }
        setLoading(false);
    }

    return (
        <div style={{ justifyContent: 'center', alignContent: 'center' }}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                {autherror === undefined ? null : <Alert variant="danger">{params.location.state} </Alert>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <img src={logo} alt="" style={{ width: '250px', height: '160px' }} />
            </div>
            <div style={{ paddingBottom: '10px', display: 'flex', justifyContent: 'center', alignContent: 'center', fontFamily: "Times New Roman,sans-serif", color: "navy" }}>
                <h1>Bharati Vidyapeeth's College Of Engineering</h1>
            </div>
            <div style={{ paddingBottom: '30px', display: 'flex', justifyContent: 'center', alignContent: 'center', fontFamily: "Times New Roman,sans-serif", color: "orange" }}>
                <h2>Admission-Portal</h2>
            </div>
            <CardGroup >

                <Card border="success" style={{ padding: '50px' }}>

                    <Card.Body>
                        <h1 className="text-center mb-4 " style={{ fontFamily: "Times New Roman,sans-serif", color: "mediumseagreen" }}>Sign Up </h1>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {submitsuccess && <Alert variant="success" style={{ width: '100%' }}>You are Successfully registered on Admission-Portal, An Email has been sent to you to verify your email on your official email id, Please verify your Email in order to login to Portal </Alert>}
                        {user && JSON.stringify(user.email)}
                        <Form onSubmit={signUp} id="signup-form">
                            <Form.Group className="mb-3" id="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={emailRef} autoComplete="on" required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} autoComplete="off" required />
                            </Form.Group>


                            <Form.Group className="mb-3" id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" ref={passwordConfirmRef} autoComplete="off" required />
                            </Form.Group>


                            <Button disabled={loading} className="w-100" variant="success" type="submit" >
                                Submit
                            </Button>
                            <Nav.Link style={{ paddingTop: '30px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}><img onClick={() => handleLinkclick()} src={outlooklogo} width="30px" height="30px" /></Nav.Link>
                        </Form>
                    </Card.Body>

                </Card>
                <div style={{ margin: '50px' }}></div>
                <Card border="primary" style={{ padding: '50px' }}>

                    <Card.Body>
                        <h1 className="text-center mb-4" style={{ fontFamily: "Times New Roman,sans-serif", color: "mediumslateblue" }}>Sign In </h1>
                        {loginerror && <Alert variant="danger">{loginerror}</Alert>}
                        {loginsuccess && <Alert variant="success" style={{ width: '100%' }}>You are Successfully Logged In on Admission-Portal</Alert>}
                        {passwordresetemail && <Alert variant="success" style={{ width: '100%' }}>A link to reset your password is sent to your email id, Please check your spam folder if you have trouble finding the email</Alert>}
                        <Form onSubmit={signInorforgotpassword} id="signin-form">
                            <Form.Group className="mb-3" id="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={loginemailRef} autoComplete="on" required />
                                <Form.Text className="text-muted">
                                    Log in with your official email address, For ex advaita-bvcoel@bvp.edu.in.
                                </Form.Text>
                            </Form.Group>

                            {!forgotpassword && <Form.Group className="mb-3" id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={loginpasswordRef} autoComplete="on" required />
                                <div style={{ paddingTop: '10px' }} onClick={() => handleforgotclick()}>
                                    <a><h6>Forgot Password....?</h6></a>
                                </div>
                            </Form.Group>

                            }



                            <Button className="w-100" variant="primary" type="submit">
                                {loginorforgotpassword}
                            </Button>
                        </Form>
                    </Card.Body>

                </Card>


            </CardGroup>
        </div>
    )
}
