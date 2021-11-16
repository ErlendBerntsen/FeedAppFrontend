import React, {useState} from "react";
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthService from "../services/AuthService";
import SignInModal from "../components/SignInModal";


export function MasterPage(props){
    //TODO add hover things
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const isAdmin = user && user.userType === "ADMIN";
    function handleClick(event){
        event.preventDefault();
        AuthService.logout()
            .then(() => {
                setUser(null);
            });
    }
    return (
        <div>
        
                |<Navbar bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand as={Link} to="/"><h1>FeedApp</h1></Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"><h5>Home</h5></Nav.Link>
                        {user? <Nav.Link as={Link} to={"/profile/" + user.id}><h5>Profile</h5></Nav.Link> 
                                :<Nav.Link as={Link} to="/createUser" ><h5>Create User</h5></Nav.Link>}
                        {user?  <Nav.Link as={Link} to="/createPoll"><h5>Create Poll</h5></Nav.Link>: <></>}
                        {isAdmin? <Nav.Link as={Link} to ="/users"><h5>Users</h5></Nav.Link> : <></>}
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                        {user? <Button variant="theme"  onClick={(e) => handleClick(e)}><b>Log out</b></Button>
                                :<SignInModal></SignInModal> }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <main>
                <Container>{props.children}</Container>
            </main>
            <footer>

            </footer>
        </div>
    );
}