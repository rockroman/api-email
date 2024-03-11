import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../context/CurrentUserCntxt";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutside from "../hooks/useClickOutside";
import { removeTokenTimestamp } from "../Utils";

const NavigationBar = () => {
  const currentUser = useCurrentUser();

  // logout functionality
  const setCurrentUser = useSetCurrentUser();
  const handleSignout = async () => {
    try {
      // axios.post("/api/dj-rest-auth/logout/");
      axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };
  const loggedOutIcons = (
    <>
      <NavLink to="/login/" className={styles.NavLink}>
        <i className="fas fa-sign-in-alt mx-1"></i>Sign in
      </NavLink>
      <NavLink to="/signUp" className={styles.NavLink}>
        <i className="fas fa-user-plus mx-1"></i>Sign up
      </NavLink>
    </>
  );

  const addPostIcon = (
    <>
      <NavLink to="/posts/create" className={styles.NavLink}>
        <i className="far fa-plus-square mx-1"></i>Add Post
      </NavLink>
    </>
  );

  const loggedInIcons = (
    <>
      <NavLink to="/feed" className={styles.NavLink}>
        <i className="fas fa-stream mx-1"></i>Feed
      </NavLink>
      <NavLink to="/liked" className={styles.NavLink}>
        <i className="fas fa-heart mx-1"></i>Liked
      </NavLink>
      <NavLink to="/" className={styles.NavLink} onClick={handleSignout}>
        <i className="fas fa-sign-out-alt mx-1"></i>Sign out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar
          src={currentUser?.profile_image}
          height={35}
          text={currentUser?.username}
        />
      </NavLink>
    </>
  );

  //burger menu collapse functionality
  //imported from custom hook
  const { expanded, setExpanded, ref } = useClickOutside();

  return (
    <>
      <Navbar
        expanded={expanded}
        expand="md"
        fixed="top"
        className={styles.NavBar}
      >
        <Container>
          <NavLink to="/" className={styles.NavLink}>
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
            ref={ref}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink to="/" className={styles.NavLink}>
                <i className="fas fa-home mx-1"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavigationBar;
