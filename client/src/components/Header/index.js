import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { signout } from '../../actions';

export default function Header(props) {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signout());
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span style={{ cursor: "pointer" }}
                        onClick={() => { window.location.href = "/profile" }} className="nav-link" >
                        Profile</span>
                    {/* <Link to="/profile" style={{ cursor: "pointer" }} className="nav-link">Profile</Link> */}
                </li>
                <li className="nav-item">
                    <span style={{ cursor: "pointer" }} className="nav-link" onClick={logout}>Signout</span>
                </li>
            </Nav>
        );
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        );
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
                <Container fluid>
                    {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                    <Link to="/" className="navbar-brand">Home</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </div>
    )
}