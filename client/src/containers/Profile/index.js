import React, { Component } from 'react';
import { Row, Col, Container, Button, ModalTitle } from 'react-bootstrap';
import './style.css';
import Header from '../../components/Header/index';
import axios from '../../helpers/axios';
import { Link } from 'react-router-dom';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            firstName: '',
            lastName: '',
            primary: '',
            secondary: '',
            favStation: [],
            actStation: [],
            actStationDetail: [],
            showRadio: []
        }
    }

    componentDidMount() {
        axios.get(`/getUser`)
            .then(res => {
                this.setState({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    primary: res.data.user.primary,
                    secondary: res.data.user.secondary,
                    favStation: res.data.favSta,
                    actStation: res.data.user.active_charging_stations,
                    actStationDetail: res.data.actSta,
                })
                let favRadio = [];
                for (let i = 0; i < this.state.favStation.length; i++) {
                    favRadio.push(false);
                }
                this.setState({ showRadio: favRadio })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    changeRadioStatus = (i) => {
        let newShowRadio = this.state.showRadio;
        newShowRadio[i] = !this.state.showRadio[i];
        this.setState({ showRadio: newShowRadio });
    }

    updateStatus = (i) => {
        const favSta = this.state.favStation[i];
        console.log(favSta);
        axios.post(`/updateStation`, favSta)
            .then(res => {
                if (res.data.station) {
                    alert('Successsfully updated station status', res.data.station)
                } else {
                    alert('update station status failed')
                }
            });
        let newShowRadio = this.state.showRadio;
        newShowRadio[i] = !this.state.showRadio[i];
        this.setState({ showRadio: newShowRadio });
    }

    onChangeValue = i => e => {
        let favSta = this.state.favStation;
        favSta[i].status = e.target.value;
        this.setState({ favStation: favSta });
    }


    render() {
        const radioComponent = (i) => {
            if (this.state.showRadio[i]) {
                return (
                    <div onChange={this.onChangeValue(i)}>
                        <input type="radio" value="online" name="status" /> online
                        <input type="radio" value="offline" name="status" /> offline
                        <input type="radio" value="in-use" name="status" /> in-use
                        <Button variant="danger" size="sm" onClick={() => this.updateStatus(i)}>confirm</Button>
                    </div>
                )
            } else {
                return null;
            }
        }
        return (
            <>
                <Header />
                <Container>
                    <div style={{ textAlign: "center" }}><h1 style={{ color: "#222", margin: "auto", padding: "20px" }}>
                        User Profile</h1></div>
                    <Row>
                        <Col xs={12} md={6}>
                            <div style={{ color: "#666", fontSize: "25px" }}>
                                First Name: {this.state.firstName}</div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div style={{ color: "#666", fontSize: "25px" }}>
                                Last Name: {this.state.lastName}</div>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={12} md={6}>
                            <div style={{ color: "#666", fontSize: "25px" }}>
                                Email: {this.state.primary.includes("@") ? this.state.primary : this.state.secondary}</div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div style={{ color: "#666", fontSize: "25px" }}>
                                Phone Number: {this.state.primary.includes("@") ? this.state.secondary : this.state.primary}</div>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={12} md={6}>
                            <div style={{ color: "#666", fontSize: "25px" }}>Favorate Charging Station:</div>
                            <ul>{this.state.favStation.map((fav, i) => {
                                return ([
                                    <br />,
                                    <div style={{ border: "0.1px solid #ccc", width: "150px" }}></div>,
                                    <li>Station Name: {this.state.favStation[i].name}</li>,
                                    <li>Location: {this.state.favStation[i].location}</li>,
                                    <li>Status:
                                        <span className={this.state.favStation[i].status} onClick={() => { this.changeRadioStatus(i) }}>
                                            {this.state.favStation[i].status}</span>{radioComponent(i)}</li>
                                ])
                            })}</ul>
                        </Col>
                        <Col xs={12} md={6}>
                            <div style={{ color: "#666", fontSize: "25px" }}>Active Charging Station:</div>
                            <ul>{this.state.actStation.map((act, id) => {
                                return ([
                                    <br />,
                                    <div style={{ border: "0.1px solid #ccc", width: "150px" }}></div>,
                                    <li>Station Name: {this.state.actStationDetail[id].name}</li>,
                                    <li>Location: {this.state.actStationDetail[id].location}</li>,
                                    <li>Charging Time: {this.state.actStation[id].charging_time}</li>,
                                    <li>Consumption: {this.state.actStation[id].power_consumption}L</li>,
                                    <li>Cost: {this.state.actStation[id].cost}$</li>
                                ])
                            })}</ul>
                        </Col>
                    </Row>

                    <div style={{ textAlign: "center" }}><Button variant="danger">
                        <Link style={{ color: "#eee" }} to="/updateUser">Update My Profile</Link></Button></div>
                </Container>

            </>
        )
    }
}
