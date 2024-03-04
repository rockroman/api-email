import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefault";
import axios from "axios";
import Post from "./Post";
import Asset from "../../components/Asset";
import CommentCreateForm from "../../comments/CommentsCreate";
import { useCurrentUser } from "../../context/CurrentUserCntxt";
import Comment from "../../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  //comments logic
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  // fetching posts logic
  useEffect(() => {
    console.log("Post Page Mounts");
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/api/posts/${id}/`),
          axiosReq.get(`/api/comments/?post=${id}`),
        ]);
        console.log(comments);
        setPost({ results: [post] });
        setComments(comments);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
        // setHasLoaded(true);
      }
    };
    setHasLoaded(false);
    handleMount();
  }, [id]);
  return (
    <Row className="h-100">
      {hasLoaded ? (
        <>
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <p>Popular profiles for mobile</p>
            <Post {...post.results[0]} setPosts={setPost} postPage />
            <Container className={appStyles.Content}>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                "comments"
              ) : null}
              {comments.results.length ? (
                <InfiniteScroll
                  children={comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setPost={setPost}
                      setComments={setComments}
                    />
                  ))}
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => {
                    fetchMoreData(comments, setComments);
                  }}
                />
              ) : currentUser ? (
                <span>No comments yet be the first to comment</span>
              ) : (
                <span>No comments yet ....</span>
              )}
            </Container>
          </Col>
          <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
            Popular profiles for desktop
          </Col>
        </>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Row>
  );
};

export default PostPage;
