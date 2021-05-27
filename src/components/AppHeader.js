import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import logo from "../images/steel.svg"
import { StreakContext } from "../providers/StreakProvider";


const AppHeader = () => {
  const { getCurrentUser, logout } = useContext(UserProfileContext);
  const { getStreak, streak } = useContext(StreakContext)
  const user = getCurrentUser();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutAndReturn = () => {
    return logout().then(() => {
      toast.dark("You are now logged out");
      history.push("/login");
    });
  };

  useEffect(() => {
    if (user) { getStreak() }
  }, [])

  return (
    <div>
      <Navbar color="dark" dark expand="lg" >
        <NavbarBrand tag={Link} to="/">
          <img
            id="header-logo"
            src={logo}
            width="40"
            height="40"
            className="mr-1"
            alt="Steel Daily"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Nav className="d-flex justify-content-between w-100">
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              {user ? (
                <>
                  <NavItem>
                    <NavLink to="/NTIgame" tag={Link}>
                      Name That Interval Flash Cards
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/NTIFretboardGame" tag={Link}>
                      Name That Interval Fretboard
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/UnisonFinderGame" tag={Link}>
                      Unison Finder
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/myprofile" tag={Link}>
                      My Profile
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/" onClick={logoutAndReturn}>
                      Logout
                  </NavLink>
                  </NavItem>
                </>
              ) : (
                  <>
                    <NavItem>
                      <NavLink to="/login" tag={Link}>
                        Login
                  </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/register" tag={Link}>
                        Register
                  </NavLink>
                    </NavItem>
                  </>
                )}
            </Nav>
          </Collapse>
          {user ? (
            <Nav className="ml-auto d-none d-lg-flex">
              <NavbarText className="d-sm-none d-md-block">
                Welcome {user.firstName}
              </NavbarText>
              {

                streak ? streak.length ?
                  <NavbarText className="d-sm-none d-md-block">
                    - Current Streak - {streak.length.days}
                  </NavbarText> : null : null
              }
            </Nav>
          ) : null}
        </Nav>
      </Navbar>
    </div>
  );
};

export default AppHeader;
