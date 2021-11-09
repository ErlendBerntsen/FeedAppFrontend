
import React, { Component } from "react";
import AuthService from "../services/AuthService";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    loginRender() {
        return (
            <>
                <Nav>
                    <h1>FeedApp</h1>
                    <Bars />

                    <NavMenu>
                        <NavLink to='/'exact={true} activeStyle>
                            Home
                        </NavLink>
                        <NavLink to='/profile' activeStyle>
                            Profile
                        </NavLink>
                        <NavLink to='/createPoll' activeStyle>
                            Create Poll
                        </NavLink>
                        {/* Second Nav */}
                        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                    </NavMenu>
                    <NavBtn>
                        <button onClick={AuthService.logout}>Log out</button>
                    </NavBtn>
                </Nav>
            </>
        )
    }

    guestRender() {
        return (
            <>
                <Nav>
                    <h1>FeedApp</h1>
                    <Bars />

                    <NavMenu>
                        <NavLink to='/' activeStyle>
                            Home
                        </NavLink>
                        <NavLink to='/createUser' activeStyle>
                            Create User
                        </NavLink>
                        {/* Second Nav */}
                        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/signIn'>Sign In</NavBtnLink>
                    </NavBtn>
                </Nav>
            </>
        )
    }

    render() {
        const rend = this.state.user ? this.loginRender() : this.guestRender()
        return (
            <div>
                {rend}
            </div>
        );
    }
}
export default Navbar;
