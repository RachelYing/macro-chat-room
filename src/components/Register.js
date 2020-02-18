import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, Button, FormGroup, Label, Input, Alert } from "reactstrap";
import { register } from "../redux/actions";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            validInputs: true,
        }
        this.fileInput = React.createRef();
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.password.length * this.state.userName.length > 0) {
            this.setState({ validInputs: true })
            this.fileInput.current.files.length > 0 ?
                this.props.register(this.state.userName, this.state.password, this.fileInput.current.files[0].name, this.fileInput.current.files[0])
                :
                this.props.register(this.state.userName, this.state.password);
            this.props.handleSubmit();
        } else {
            this.setState({ validInputs: false });
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
                <br />
                {this.state.validInputs ?
                    null :
                    <Alert color="danger">
                        User name and password are required!
             </Alert>
                }
                <FormGroup row>
                    <Col>
                        <Label for="userName" className='labels'>User Name:</Label>
                        <Input type="text" id="userName"
                            value={this.state.title}
                            onChange={this.onFieldChange}
                            autoCorrect={false}
                            autoCapitalize={false} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Label for="password" className='labels'>Password:</Label>
                        <Input type="password" id="password"
                            value={this.state.content}
                            onChange={this.onFieldChange} />
                    </Col>
                </FormGroup>
                <Label for="headPortrait" className='labels'>Profile Image:</Label>
                <br />
                <input type="file" ref={this.fileInput} className='labels' />
                <Button onClick={this.handleSubmit}>Register</Button>
            </Fragment>
        )
    }
}


export default connect(null, { register })(Register);