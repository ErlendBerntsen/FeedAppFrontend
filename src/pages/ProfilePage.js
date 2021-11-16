import React, { Component} from "react";
import { Redirect, withRouter } from "react-router-dom";
import UserService from "../services/UserService";
import PollList from "../components/PollList";
import AuthService from "../services/AuthService";
import { MasterPage } from "./MasterPage";
import COLORS from "../configurations/CSSConfiguration";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



class ProfilePage extends Component {
    //TODO fix admin stuff
    constructor(props) {
      super(props);
      this.state = {
        updateOk: false,
        redirect: null,
        fields: { username: '', password: null, userType: ''},
        contentReady: false,
        currentUser: { username: '', id: '' },
        content: {},
        error: ''
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }



  
    componentDidMount() {
      const id = this.props.match.params.id;

      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) this.setState({ redirect: "/" }); //redirect to home if no current user
  
      else {  //collect data for this user
        this.setState({ currentUser: currentUser })
        UserService.getUser(id)
          .then(response => {
            this.setState({ content: response.data, contentReady: true })
            let fields = this.state.fields;
            fields['username'] = response.data.username;
            fields['userType'] = response.data.userType;
            this.setState({fields})
            console.log(fields)

          },
            error => {
              this.setState({ redirect: "/" });
            })
      }
  
    }
  
    handleChange(event) {
      const target = event.target;
      let fields = this.state.fields
      fields[target.name] = target.value
      this.setState({
        fields
      });
      console.log(fields);
    }


    
    handleValidation(){
        if(this.state.fields["username"].length < 3){
            this.setState({ error:  "Username must be at least 3 characters"})
            return false
        }
        if(this.state.fields['password'] !== null && this.state.fields["password"].length < 8){
            this.setState({ error:  "Password must be at least 8 characters"})
            return false
        }
        if ((this.state.fields['password'] !== null && this.state.fields["password"].length > 1000) || this.state.fields["username"].length > 1000) {
            this.setState({ error:  "Input is too large"})
            return false
        }
        return true
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
          UserService.updateUser(this.state.fields, this.state.content.id)
            .then(() => {
              alert("Updated user!")
              window.location.reload(false);
            },
              error => {
                this.setState({ error: error.message })
              })
        }
      }
  

  
  
    async handleDelete() {
      let suc = false
      await UserService.deleteUser(this.state.currentUser.id)
        .then(() => {
          alert("User deleted!")
          suc = true
        },
          error => {
            this.setState({ error: error.message })
            suc = false
          })
      if (suc) {
        AuthService.logout()
      }
    }

  
    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
      if (!this.state.contentReady) {
        return null
      }
      const { content } = this.state
  

    

      const isAdmin = content.userType === "ADMIN";
      const firstOption = isAdmin? "ADMIN" : "REGULAR"
      const otherOption = isAdmin? "REGULAR" : "ADMIN"
      const isAdminViewingProfile = this.state.currentUser.userType === "ADMIN";

      return (
          <MasterPage>
                  <div>
          <h1 style={{ color: COLORS.text }}>Profile</h1>

          <Form >
                <Row>
                    <Col md={2} xs={2}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                                name="username" 
                                placeholder={content.username}
                                value={this.state.fields["username"]}
                                onChange={(e) => this.handleChange(e)}/>
                    </Col>
                </Row>

                <br/>
                <Row>
                    <Col md={2} xs={2}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                name="password" 
                                placeholder="****************"
                                value={this.state.fields["password"]}
                                onChange={(e) => this.handleChange(e)}/>
                    </Col>
                </Row>

                <br/>
                <Row>
                    <Col md={2} xs={2}>
                    <Form.Label>User Type</Form.Label>
                    {isAdminViewingProfile ? <Form.Select onChange={(e) => this.handleChange(e)} name="userType" readOnly>
                                               <option value={firstOption}>{firstOption}</option>
                                               <option value={otherOption}>{otherOption}</option>
                                             </Form.Select>
                                             : <Form.Control readOnly defaultValue={firstOption} /> }
             
                    </Col>
                </Row>
                <Row>
                    <span style={{ color: "red" }}>{this.state.error}</span>
                </Row>
                <br/>                   
                <br/>
                <Row >
                    <Col>
                        <Button  variant="theme2" type="submit" onClick={this.handleSubmit}>
                        <b>Save Changes</b>
                        </Button>
         
                    </Col>
                    <Col >
                    <Button  variant="theme"  onClick={this.handleDelete}>
                        <b>Delete User</b>
                        </Button>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
            </Form>
 
          <br/>
          <PollList user={true} id={this.props.match.params.id} />
        </div>
          </MasterPage>

      );
    }
  }
  
export default withRouter(ProfilePage);