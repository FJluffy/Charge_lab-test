import React, { Component } from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import Header from '../../components/Header/index';
import axios from '../../helpers/axios';
import { Link } from 'react-router-dom';

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            firstName: '',
            lastName: '',
            primary: '',
            secondary: '',
            favStationId: [],
            favStation: [],
            actStation: [],
            actStationDetail: [],
            stations: [],
            selectedFavSta: null,
            station: []
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
                    favStationId: res.data.user.favorite_charging_stations,
                })
                let _station = []
                for (var i = 0; i < this.state.favStationId.length; i++) {
                    _station.push({ "station": this.state.favStationId[i].station })
                }
                this.setState({ station: _station })
                console.log(this.state.station)
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(`/getAllStation`)
            .then(res => {
                let _stations = res.data.stations;
                this.setState({ stations: _stations })
                console.log(this.state.stations);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteFavSta = i => e => {
        e.preventDefault();
        let _favStation = this.state.favStation;
        _favStation.splice(i, 1);
        this.setState({ favStation: _favStation });

        let _station = this.state.station;
        _station.splice(i, 1);
        this.setState({ station: _station });
    }

    deleteActSta = i => e => {
        e.preventDefault();
        let _actStation = this.state.actStation;
        _actStation.splice(i, 1);
        this.setState({ actStation: _actStation });

        let _actStationDetail = this.state.actStationDetail;
        _actStationDetail.splice(i, 1);
        this.setState({ actStationDetail: _actStationDetail });
    }

    addFavSta = () => (e) => {
        e.preventDefault();
        let id = document.getElementById("favSelect").selectedIndex;
        let _stations = this.state.stations[id];

        for (let i = 0; i < this.state.favStation.length; i++) {
            if (this.state.favStation[i]._id === _stations._id) {
                alert('duplicated favorite station')
                return null;
            }
        }
        let _favStation = this.state.favStation;
        _favStation.push(_stations);
        this.setState({ favStation: _favStation });

        let _station = this.state.station;
        _station.push({ "station": _stations._id });
        this.setState({ station: _station });


    }

    addActSta = () => (e) => {
        e.preventDefault();
        let id = document.getElementById("actSelect").selectedIndex;
        let stations = this.state.stations[id];

        let _actStationDetail = this.state.actStationDetail;
        _actStationDetail.push(stations);
        this.setState({ actStationDetail: _actStationDetail });

        let station = stations._id;
        let charging_time = '';
        let power_consumption = null;
        let cost = null;
        let actSta = { station, charging_time, power_consumption, cost }
        let _actStation = this.state.actStation;
        _actStation.push(actSta);
        this.setState({ actStation: _actStation });
    }

    onChangeTime = i => e => {
        let _actStation = this.state.actStation;
        _actStation[i].charging_time = e.target.value;
        this.setState({ actStation: _actStation });
    }

    onChangeConsumption = i => e => {
        let _actStation = this.state.actStation;
        _actStation[i].power_consumption = Number(e.target.value);
        this.setState({ actStation: _actStation });
    }

    onChangeCost = i => e => {
        let _actStation = this.state.actStation;
        _actStation[i].cost = Number(e.target.value);
        this.setState({ actStation: _actStation });
    }

    userUpdate = () => e => {
        e.preventDefault();
        const body = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "primary": this.state.primary,
            "secondary": this.state.secondary,
            "favorite_charging_stations": this.state.station,
            "active_charging_stations": this.state.actStation
        }
        console.log(body);
        axios.post(`/updateUser`, body)
            .then(res => {
                if (res.data.user) {
                    alert('Successsfully updated user profile');
                    setTimeout(function () { window.location.href = "/profile" }, 1000);
                } else {
                    alert('update station status failed')
                }
            });


    }

    render() {
        return (
            <>
                <Header />
                <Container>
                    <div style={{ textAlign: "center" }}><h1 style={{ color: "#222", margin: "auto", padding: "20px" }}>
                        User Update</h1></div>
                    <Form onSubmit={this.userUpdate()}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Input
                                    label="First Name"
                                    value={this.state.firstName}
                                    type="text"
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <Input
                                    label="Last Name"
                                    value={this.state.lastName}
                                    type="text"
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <Input
                                    label={this.state.primary.includes("@") ? "Email" : "Phone Number"}
                                    value={this.state.primary}

                                    type={this.state.primary.includes("@") ? "email" : "number"}
                                //onChange={(e) => this.setState({ primary: e.target.value })}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <Input
                                    label={this.state.primary.includes("@") ? "Phone Number" : "Email"}
                                    value={this.state.secondary}
                                    type={this.state.primary.includes("@") ? "number" : "email"}
                                    onChange={(e) => this.setState({ secondary: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={12} md={6}>
                                <div style={{ color: "#666", fontSize: "25px" }}>Favorate Charging Station:</div>
                                <ul>{this.state.favStation.map((fav, i) => {
                                    return ([
                                        <br />,
                                        <div style={{ border: "0.1px solid #ccc", width: "150px", marginTop: "15px" }}></div>,
                                        <li>Station Name: {this.state.favStation[i].name}</li>,
                                        <li>Location: {this.state.favStation[i].location}</li>,
                                        <button onClick={this.deleteFavSta(i)}
                                            style={{ width: "100px", backgroundColor: "#e44", color: "white" }}>delete</button>
                                    ])
                                })}</ul>
                                <div><select id="favSelect">
                                    {this.state.stations.map((sta, i) => {
                                        return ([
                                            <option>{this.state.stations[i].name}--{this.state.stations[i].location}</option>
                                        ])
                                    })}
                                </select></div>
                                <button onClick={this.addFavSta()}
                                    style={{ width: "100px", backgroundColor: "#e44", color: "white", marginLeft: "40px" }}>
                                    add</button>
                            </Col>
                            <Col xs={12} md={6}>
                                <div style={{ color: "#666", fontSize: "25px" }}>Active Charging Station:</div>
                                <ul>{this.state.actStation.map((act, id) => {
                                    return ([
                                        <br />,
                                        <div style={{ border: "0.1px solid #ccc", width: "150px", marginTop: "15px" }}></div>,
                                        <li>Station Name: {this.state.actStationDetail[id].name}</li>,
                                        <li>Location: {this.state.actStationDetail[id].location}</li>,
                                        <Input
                                            label="Charge Time:"
                                            value={this.state.actStation[id].charging_time}
                                            type="date"
                                            onChange={this.onChangeTime(id)}
                                        />,
                                        <Input
                                            label="Consumption(L):"
                                            value={this.state.actStation[id].power_consumption}
                                            type="number"
                                            onChange={this.onChangeConsumption(id)}
                                        />,
                                        <Input
                                            label="Cost($):"
                                            value={this.state.actStation[id].cost}
                                            type="number"
                                            onChange={this.onChangeCost(id)}
                                        />,
                                        <button onClick={this.deleteActSta(id)}
                                            style={{ width: "100px", backgroundColor: "#e44", color: "white" }}>delete</button>
                                    ])
                                })}</ul>
                                <div><select id="actSelect">
                                    {this.state.stations.map((sta, i) => {
                                        return ([
                                            <option>{this.state.stations[i].name}--{this.state.stations[i].location}</option>
                                        ])
                                    })}
                                </select></div>
                                <button onClick={this.addActSta()}
                                    style={{ width: "100px", backgroundColor: "#e44", color: "white", marginLeft: "40px" }}>add</button>
                            </Col>
                        </Row>

                        <div style={{ textAlign: "center", marginTop: "80px" }}>
                            <button type="submit" style={{ width: "100px", backgroundColor: "#e33", color: "#eee" }}>Submit</button>

                        </div>
                    </Form>
                    <div style={{ textAlign: "center", margin: "30px" }}>
                        <button style={{ width: "100px", backgroundColor: "#e33" }}>
                            <Link style={{ color: "#eee" }} to="/profile">Cancel</Link>
                        </button></div>
                </Container>

            </>
        )
    }
}
