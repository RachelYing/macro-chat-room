import React, { Component, Fragment } from "react";
import { FormGroup, Label, Input, Button, Row, Col, Alert } from "reactstrap";
import { connect } from "react-redux";
import { validateLogin } from "../redux/actions";
import { LOGIN_STATUS } from "../constants";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            invalidCredentials: false,
            // 0:'login now', 1:'login successful', 2:'login fail'
            fbLoginStatus:0,
            fbLoginMessage:''
        }
        this.getUserDetails = this.getUserDetails.bind(this);

        this.onFieldChange = this.onFieldChange.bind(this);
        this.login = this.login.bind(this);
       
    }

    componentDidMount(){
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : '2588066024852050',
              cookie     : true,
              xfbml      : true,
              version    : 'v6.0'
            });
              
            window.FB.AppEvents.logPageView();   
        };
          (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
          
    }

    onFieldChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
            invalidCredentials: false
        });
    }

    login() {
        this.props.validateLogin(this.state.username, this.state.password);
    }

    getUserDetails (){
        console.log('button clicked');
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
             
                window.FB.api('/me', function(response) {
                    console.log(response)
                    console.log('Good to see you, ' + response.name + '.');
                    this.setState({fbLoginStatus: 1, fbLoginMessage:'Good to see you, ' + response.name + '.'});
                }.bind(this));
            } else {
             console.log('User cancelled login or did not fully authorize.');
            this.setState({fbLoginStatus: 2, fbLoginMessage: 'User cancelled login or did not fully authorize.'});
            }
        }.bind(this));

    }

    render() {
        return (
            <Fragment>
                {
                    this.props.status === LOGIN_STATUS.INVALID || this.props.status === LOGIN_STATUS.ERROR ?
                        <Alert color="danger">
                            {
                                this.props.status === LOGIN_STATUS.INVALID ? "Invalid username or password! Please try again." : ""
                            }
                            {
                                this.props.status === LOGIN_STATUS.ERROR ? "Error connecting to database!" : ""
                            }
                        </Alert> : ""
                }
                <FormGroup row>
                    <Col>
                        <Label for="username">Username:</Label>
                        <Input type="text" id="username"
                            value={this.state.username}
                            onChange={this.onFieldChange}
                            autoCorrect={false}
                            autoCapitalize={false} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Label for="password">Password:</Label>
                        <Input type="password" id="password"
                            value={this.state.password}
                            onChange={this.onFieldChange} />
                    </Col>
                </FormGroup>
                <Row>
                    <Col className="text-right">
                        <Button onClick={this.login} variant={'secondary'}>Login</Button>
                    </Col>
                </Row>
                <Row>
                  <button onClick={this.getUserDetails}>
                    Facebook Login Button
                </button>
                </Row>
                <Row>
                {this.state.fbLoginMessage}
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const status = state.login.status;
    return { status }
}

export default connect(mapStateToProps, { validateLogin })(Login);
