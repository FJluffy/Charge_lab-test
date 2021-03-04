import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import Header from '../../components/Header/index';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/user.actions';

export default function Signup(props) {
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [primary, setPrimary] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('Email');
    const dispach = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, primary, password
        }
        dispach(signup(user));
    }

    const changeType = () => {
        if (type === 'Email') {
            setType('Phone');
        } else {
            setType('Email');
        }
        setPrimary("");
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    if (user.loading) {
        return <p>Loading...!</p>
    }

    return (
        <div>
            <Header />
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label={type}
                                placeholder={type}
                                value={primary}
                                type={type === "Email" ? "email" : "number"}
                                onChange={(e) => setPrimary(e.target.value)}
                            />
                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="primary" style={{ float: "right" }} onClick={changeType}>
                                Signup By {type === "Email" ? "Phone" : "Email"}
                            </Button>
                            <div style={{ margin: "auto" }}>{user.message}</div>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
