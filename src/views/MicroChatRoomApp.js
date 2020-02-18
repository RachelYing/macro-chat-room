import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import { updateParticipants, updateMessages, logout, openTutorial } from "../redux/actions";

import MessagesDisplay from "../components/MessagesDisplay";
import ParticipantsDisplay from "../components/ParticipantsDisplay";
import OnboardingTutorial from "../components/OnboardingTutorial";

import MessageInputArea from "../components/MessageInputArea";

const mapStateToProps = state => {

    const selfId = state.participants.selfId;
    const participants = state.participants.participants;
    const showTutorial = state.tutorial.showTutorial;
    return { selfId, participants, showTutorial };
};

class MicroChatRoomApp extends Component {
    constructor(props) {
        super(props);

        this.participantsUpdated = this.participantsUpdated.bind(this);
        this.messagesUpdated = this.messagesUpdated.bind(this);
    }

    componentDidMount() {
        document.addEventListener("participantsupdated", this.participantsUpdated);
    }

    componentDidUpdate(prevProps) {
        // add into the room
        if (prevProps.selfId !== this.props.selfId) {
            document.addEventListener("messagesupdated", this.messagesUpdated);
            document.addEventListener("enterkeyclicked", this.onEnterKeyClicked);
        }
    }

    participantsUpdated = event => {
        this.props.updateParticipants(event.detail);
    }

    messagesUpdated = event => {
        this.props.updateMessages(event.detail);
    }


    render() {
        return (

            <Fragment >
                {this.props.showTutorial ?
                    <OnboardingTutorial />
                    :
                    <div className='chat-room-background'>

                        <div className='messages-participants'>
                            <div onClick={this.props.openTutorial} className='tutorial-link'>Get Started</div>

                            <div className='scrollable-area message-list'>
                                <MessagesDisplay />
                            </div>
                            <div className='scrollable-area participant-list-background'>
                                <div>
                                    <ParticipantsDisplay />
                                </div>
                                <div onClick={this.props.logout} className='logout-link'>Log out</div>
                            </div>

                        </div>
                        <Container className='stick-to-bottom'>
                            <MessageInputArea />
                        </Container>
                    </div>
                }
            </Fragment>

        );
    }
}


export default connect(
    mapStateToProps,
    { updateParticipants, updateMessages, openTutorial, logout }
)(MicroChatRoomApp);