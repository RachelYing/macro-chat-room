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
            invalidCredentials: false
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.login = this.login.bind(this);
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const status = state.login.status;
    return { status }
}

export default connect(mapStateToProps, { validateLogin })(Login);