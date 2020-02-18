import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import dislike from '../resources/dislike.png';
import like from '../resources/like.png';
import { thumbUpMessage, thumbDownMessage } from "../client";

const mapStateToProps = state => {
    const userName = state.participants.userName;
    return { userName };
};

class Vote extends Component {
    constructor(props) {
        super(props);
        this.handleVoteUp = this.handleVoteUp.bind(this);
        this.handleVoteDown = this.handleVoteDown.bind(this);
    }

    handleVoteUp() {
        thumbUpMessage(this.props.messageId, this.props.userName);
    }

    handleVoteDown() {
        thumbDownMessage(this.props.messageId, this.props.userName);
    }

    render() {
        return (
            <div className='votes'>
                <span >
                    <img className='vote-icon' src={like} alt='thumbs up icon' onClick={this.handleVoteUp} />
                </span>
                <span >
                    <img className='vote-icon' src={dislike} alt='thumbs down icon' onClick={this.handleVoteDown} />
                </span>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Vote);
