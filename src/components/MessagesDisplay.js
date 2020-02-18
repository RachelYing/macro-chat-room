import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Message from "../components/Message";

const mapStateToProps = state => {
    const messages = state.messages.messages;
    return { messages };
};

class MessagesDisplay extends Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <Fragment >
                <div>
                    {this.props.messages
                        ? this.props.messages.map((message, index) => {
                            return (
                                <Message
                                    key={index}
                                    id={index}
                                    message={message}
                                    clientId={message.clientId}
                                    headPortrait={message.headPortrait}
                                />)
                        })
                        : null}

                </div>
                <div ref={el => { this.el = el; }}></div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(MessagesDisplay);