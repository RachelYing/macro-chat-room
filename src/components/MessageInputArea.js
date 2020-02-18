import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, Form, Input } from "reactstrap";
import { newMessage } from "../client";

const mapStateToProps = (state) => {
    const userName = state.participants.userName;
    const headPortrait = state.participants.headPortrait;

    return { userName,headPortrait };
}

class MessageInputArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend(event) {
        event.preventDefault();
        if (this.state.content.length > 0) {
            newMessage(this.state.content, this.props.userName, this.props.headPortrait);
            this.setState({
                content: '',
            });
        }
    }

    onFieldChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    render() {
        return (
            <Fragment>
                <FormGroup row >
                        <Form onSubmit={this.handleSend} className='input-area'>
                            <div className='input-text'>

                                <Input type="text" id="content"
                                    value={this.state.content}
                                    onChange={this.onFieldChange}
                                />
                            </div>
                            <div className='send-button' >
                                <Button type="submit">Send</Button>
                            </div>
                        </Form>
                </FormGroup>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(MessageInputArea);