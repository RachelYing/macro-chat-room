import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { closeTutorial } from "../redux/actions";
import register_tutorial from '../resources/register_tutorial.png';
import login_tutorial from '../resources/login_tutorial.png';
import send_message_tutorial from '../resources/send_message_tutorial.png';
import vote_tutorial from '../resources/vote_tutorial.png';
import participants_tutorial from '../resources/participants_tutorial.png';
import logout_tutorial from '../resources/logout_tutorial.png';

class OnboardingTutorial extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment >
                <div className='tutorial-background'>
                    <h1 className='tutorial-title'>Welcome to Micro Chat Room!</h1>
                    <h3 >Login and Register</h3>
                    <p className='tutorial-paragraph'>To enter the chat room, login first; If you don't have an account yet, please register then login.</p>
                    <p className='tutorial-paragraph'>Note: profile image is recommended but not required, if you prefer not to upload a profile image, you will be assigned a universal profile image.</p>
                    <img src={login_tutorial} alt='login_tutorial' className='tutorial-image' />
                    <img src={register_tutorial} alt='register_tutorial' className='tutorial-image' />
                    <h3 >Join the chat</h3>
                    <p className='tutorial-paragraph'>Check out the existing messages. Type message in the bottom area and send it out. Don't be shy!</p>
                    <img src={send_message_tutorial} alt='send_message_tutorial' className='tutorial-image' />
                    <h3 >Vote for any message you want to show your attitude to</h3>
                    <p className='tutorial-paragraph'>Hover over any message to see the vote options. Click the same voting option to cancel.</p>
                    <img src={vote_tutorial} alt='vote_tutorial' className='tutorial-image' />
                    <h3 >Check out who are chatting with you</h3>
                    <p className='tutorial-paragraph'> The list of the participants is on the right section of the chatting page.</p>
                    <img src={participants_tutorial} alt='participants_tutorial' className='tutorial-image' />
                    <h3 >Leave the chat room</h3>
                    <p className='tutorial-paragraph'> When you want to leave the chat room, use log out link located at the right bottom corner of the page to log out.</p>
                    <img src={logout_tutorial} alt='logout_tutorial' className='tutorial-image' />
                    <h3 >Always come back if you feel confused</h3>
                    <p className='tutorial-paragraph'>You can always get access to this guide through the 'Get Started' link on the right top corner of the page.</p>
                    <br />
                    <Button onClick={this.props.closeTutorial} color='success' className='done-button'>Done</Button>
                </div>
            </Fragment>
        );
    }

}

export default connect(null, { closeTutorial })(OnboardingTutorial);
