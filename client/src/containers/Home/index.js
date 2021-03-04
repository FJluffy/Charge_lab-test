import React, { useState } from 'react';
import Header from '../../components/Header/index';
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {

    return (
        <div>
            <Header />
            <div>
                <h1 style={{ textAlign: "center" }}>Comment</h1>
                <p>Thank you for giving this opportunity to design this website, I'm happy to submit this project and interested
                in the position you provided. Below are some tips that can improve the UI:
                </p>
                <ul>
                    <li>set background image and backgroundColor to make this website more colorful annd vivid.</li>
                    <li>add animation effect and/or hover/transmit/before/after functions in css3 to improve user experience. </li>
                    <li>add a small map when user add a favorite station and select it. </li>
                </ul>
                <br /><br />
                <p>Looking forward to recieve updates from you!</p>
                <footer className="mt-5"
                    style={{ position: "fixed", left: "0", bottom: "0", width: "100vw", backgroundColor: "#444", color: "#eee" }}>
                    <Container fluid={true}>
                        <Row className="border-top justify-content-between p-3">
                            <Col className="p-0" >
                                Copyright &#169; -- Jianyu Chen, All Rights Reserved
                    </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </div>
    )
}
