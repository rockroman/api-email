import React, { useState } from "react";
import styles from "../styles/Comment.module.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { MoreDropdown } from "../components/MoreDropdown";
import { useCurrentUser } from "../context/CurrentUserCntxt";
import { axiosRes } from "../api/axiosDefault";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    id,
    content,
    owner,
    is_owner,
    post,
    profile_id,
    profile_image,
    updated_at,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const [isInappropriate, setIsInappropriate] = useState(false);

  // delete comment functionality
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/api/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComment) => ({
        ...prevComment,
        results: prevComment.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {}
  };
  return (
    <>
      <hr />
      <div className="d-flex">
        <Link to={`profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="w-100 d-flex justify-content-between">
          <div className="align-self-center ms-2">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            {isInappropriate ? (
              <>
                <span>This comment has been marked as inappropriate</span>
                <button
                  className="bg-success"
                  onClick={() => setIsInappropriate(!isInappropriate)}
                >
                  Make it appropriate again
                </button>
              </>
            ) : showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <>
                <p>{content}</p>
                <button
                  className="bg-danger"
                  onClick={() => setIsInappropriate(!isInappropriate)}
                >
                  Mark as Inappropriate
                </button>
              </>
            )}
          </div>
          {is_owner && !showEditForm && (
            <MoreDropdown
              handleDelete={handleDelete}
              handleEdit={() => setShowEditForm(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
