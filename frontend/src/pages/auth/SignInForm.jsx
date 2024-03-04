// import React, { useContext, useState } from "react";

// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
// import Container from "react-bootstrap/Container";

// import { Link, useNavigate } from "react-router-dom";

// import styles from "../../styles/SignUpForm.module.css";
// import btnStyles from "../../styles/Button.module.css";
// import appStyles from "../../App.module.css";
// import axios from "axios";
// import { useSetCurrentUser } from "../../context/CurrentUserCntxt";
// import { setTokenTimestamp } from "../../Utils";

// function SignInForm() {
//   //   Add your component logic here
//   const [signInData, setSignInData] = useState({
//     username: "",
//     password: "",
//   });

//   // context logic
//   const setCurrentUser = useSetCurrentUser();

//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const { username, password } = signInData;

//   const handleChange = (e) => {
//     setSignInData({
//       ...signInData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/dj-rest-auth/login/", signInData);
//       // const { data } = await axios.post("/dj-rest-auth/login/", signInData);
//       console.log("this is data", data);
//       setCurrentUser(data.user);
//       setTokenTimestamp(data);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       setErrors(err.response?.data);
//     }
//   };

//   return (
//     <Row className={styles.Row}>
//       <Col className="my-auto p-0 p-md-2" md={6}>
//         <Container className={`${appStyles.Content} p-4 `}>
//           <h1 className={styles.Header}>sign in</h1>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="username">
//               <Form.Label className="d-none">Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Username"
//                 name="username"
//                 className={styles.Input}
//                 value={username}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             {errors.username?.map((message, idx) => (
//               <Alert key={idx} variant="warning">
//                 {message}
//               </Alert>
//             ))}

//             <Form.Group controlId="password">
//               <Form.Label className="d-none">password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="password"
//                 name="password"
//                 className={styles.Input}
//                 value={password}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button
//               type="submit"
//               className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
//             >
//               Sign In
//             </Button>
//             {errors.non_field_errors?.map((message, idx) => (
//               <Alert key={idx} variant="warning" className="mt-3">
//                 {message}
//               </Alert>
//             ))}
//           </Form>
//         </Container>
//         <Container className={`mt-3 ${appStyles.Content}`}>
//           <Link className={styles.Link} to="/signup">
//             Don't have an account? <span>Sign up now!</span>
//           </Link>
//         </Container>
//       </Col>
//       <Col
//         md={6}
//         className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
//       >
//         <Image
//           src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
//         />
//       </Col>
//     </Row>
//   );
// }

// export default SignInForm;

import React, { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserCntxt";
import { setTokenTimestamp } from "../../Utils";

function SignInForm() {
  //   Add your component logic here
  const [signInData, setSignInData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // context logic
  const setCurrentUser = useSetCurrentUser();

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { username, email, password } = signInData;

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/dj-rest-auth/login/", signInData);
      // const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      console.log("this is data", data);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group controlId="email">
              <Form.Label className="d-none">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                className={styles.Input}
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            >
              Sign In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
