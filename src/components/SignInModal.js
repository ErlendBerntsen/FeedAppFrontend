import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, {useState} from "react"
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from "react-router-dom";
import AuthService from "../services/AuthService";



export default function SignInModal() {
    //TODO proper error message when you log in with wrong credentials
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="theme" onClick={handleShow}>
          <b> Sign In </b>
        </Button>
  
        <Modal className="modal-theme" size="sm" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h3>Sign In</h3></Modal.Title>
          </Modal.Header>
          <Container>
          <Row>
            <Col >
                <Modal.Body>
                    <SignInForm></SignInForm>
                </Modal.Body>
            </Col>

          </Row>
          <Row className="justify-content-md-center">
          <Col md="auto">
            <p>Don't have an account?</p>
            <Link to="/createUser"><p className="pink-text">Create a new one here</p></Link>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
        
        
        </Modal>
      </>
    );
  }

  function SignInForm(){
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [errors, setErrors] = useState("");
      const [focused, setFocused] = useState(false);

      function handleSubmit(event){
          event.preventDefault()
          if(handleValidation()){
            AuthService.login(username, password)
            .then(() => {
                window.location.reload();
            },
                error => {
                    if(error.message === "Request failed with status code 401"){
                        setErrors("Wrong Credentials")
                    }else{
                        setErrors(error.message)
                    }
                })
          }
      }

      function handleValidation(){
        if (!username) {
            setErrors("Username cannot be empty");
            return false
        }
        if (!password) {
            setErrors("Password cannot be empty");
            return false
        }
        if(username.length < 3){
            setErrors("Username must be at least 3 characters");
            return false
        }
        if(password.length < 8){
            setErrors("Password must be at least 8 characters");
            return false
        }
        if (username.length > 1000 || password.length > 1000) {
            setErrors("Input is too large");
            return false
        }
        return true
      }

      function keyPress(e){
          var key = (e.keyCode || e.which);
          if((key === 13 || key === 3) && focused){
              handleSubmit(e);
          }
      }

      return(
            <Form >
                <Row>
                    <Form.Control type="text" 
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                </Row>
                <br/>
                <Row>
                    <Form.Control type="password"
                                placeholder="Password"
                                value={password}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                onKeyPress={(e) => keyPress(e)}
                                onChange={(e) => setPassword(e.target.value)}/>
                </Row>
                <Row>
                    <span style={{ color: "red" }}>{errors}</span>
                </Row>
                <br/>
                <Button className="w-100" variant="theme" size="lg" onClick={(e) => handleSubmit(e)}>
                    <b>Sign In</b>
                 </Button>
            </Form>
      );
  }
  