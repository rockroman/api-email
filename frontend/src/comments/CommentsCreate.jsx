import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../styles/CommentCreateEditForm.module.css";
import Avatar from "../components/Avatar";
import { axiosRes } from "../api/axiosDefault";
import { Button } from "react-bootstrap";

const CommentCreateForm = (props) => {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/api/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Button
        className="btn d-block ms-auto"
        disabled={!content.trim()}
        type="submit"
        role="button"
        style={{
          border: "none",
          backgroundColor: "#242a3d",
          color: "aliceblue",
          borderRadius: "100px",
          padding: "4px 10px",
          minWidth: "75px",
          margin: "5px",
        }}
      >
        post
      </Button>
    </Form>
  );
};

export default CommentCreateForm;
