import React, { Component } from "react";
import { connect } from "react-redux";
import { Button,Alert } from "reactstrap";
import "../styles.css";
import Login from "../components/Login";
import Register from "../components/Register";
import { REGISTER_STATUS,LOGIN_STATUS } from "../constants";
import MicroChatRoomApp from "./MicroChatRoomApp";
import Modal from 'react-responsive-modal';
import OnboardingTutorial from "../components/OnboardingTutorial";
import { openTutorial } from "../redux/actions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popDialog: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

    }

    handleSubmit() {

        this.closeDialog();
    }

    showDialog() {
        this.setState({ popDialog: true });
    }

    closeDialog() {
        this.setState({ popDialog: false });
    }

    render() {
        return (
            <div>

                {this.props.showTutorial ?
                    <OnboardingTutorial />
                    :
                    <div className='app-background'>
                        <div onClick={this.props.openTutorial} className='tutorial-link'>Get Started</div>
                        {this.props.loginStatus !== LOGIN_STATUS.SUCCESSFUL ?

                            <div className='login-section'>
                                {this.renderAlert()}
                                <Login />
                                <Button onClick={this.showDialog} color='primary'>Register</Button>
                                <Modal
                                    open={this.state.popDialog}
                                    onClose={this.closeDialog}
                                    center>
                                    <Register handleSubmit={this.handleSubmit} />
                                </Modal>
                            </div>
                            :
                            <MicroChatRoomApp />}
                    </div>

                }
            </div>
        )
    }

    renderAlert() {
        if (this.props.registerStatus === REGISTER_STATUS.REQUESTED) {
            return (
                <Alert color="primary">
                    Sending information.
                </Alert>
            );

        }

        if (this.props.registerStatus === REGISTER_STATUS.SUCCESSFUL) {
            return (
                <Alert color="success">
                    Registered successfully! Please log in.
                </Alert>
            );

        }
        if (this.props.registerStatus === REGISTER_STATUS.FAILED) {
            return (
                <Alert color="danger">
                    Registered failed!
                </Alert>
            );
        }
    }
}

const mapStateToProps = state => {
    const loginStatus = state.login.status;
    const currentUserId = state.participants.currentUserId;
    const showTutorial = state.tutorial.showTutorial;
    const registerStatus = state.register.status;
    return { loginStatus, currentUserId, showTutorial, registerStatus };
}

export default connect(mapStateToProps, { openTutorial })(App);
