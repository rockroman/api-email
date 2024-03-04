import React from "react";
import styles from "../styles/Profile.module.css";
import btnStyles from "../styles/Button.module.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Avatar from "../components/Avatar";
import { useCurrentUser } from "../context/CurrentUserCntxt";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const {
    id,
    owner,
    created_at,
    posts_count,
    image,
    following_id,
    followers_count,
    following_count,
    is_owner,
    content,
  } = profile;
  const currentUser = useCurrentUser();
  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => {}}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => {}}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
