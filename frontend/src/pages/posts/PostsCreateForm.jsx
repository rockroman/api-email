import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert, Image } from "react-bootstrap";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEdit.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
// import { axiosRequest } from "../../context/CurrentUserCntxt";
import { axiosReq } from "../../api/axiosDefault";
import { useNavigate } from "react-router-dom";

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = postData;

  //
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  //ref to an Image
  const imageInput = useRef(null);

  //submitting data to the API
  const handlleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageInput.current.files.length) {
      formData.append("image", imageInput.current.files[0]);
    } else {
      formData.append("image", "");
    }

    try {
      const { data } = await axiosReq.post(`/api/posts/`, formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status1 !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={styles.Input}
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />

        {errors.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Content</Form.Label>
        <Form.Control
          className={styles.Input}
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
        {errors.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue} `}
        onClick={() => navigate(-1)}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handlleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <>
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message={"Click or tap yo upload an Image"}
                    />
                  </Form.Label>
                </>
              )}
              <Form.Control
                type="file"
                ref={imageInput}
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
              {errors.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
