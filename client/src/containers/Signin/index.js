import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input'
import Header from '../../components/Header/index';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Signin(props) {

    const [primary, setPrimary] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('Email');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            primary, password
        }

        dispatch(login(user));
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
    return (
        <div>
            <Header />
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
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
                                Signin By {type === "Email" ? "Phone" : "Email"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <div style={{ textAlign: "center" }}>for testing, you can use 'jay@gmail.com' as Email and '123456'
                 as password to log in, or you are free to sign up</div>

            </Container>
        </div>
    )
}
