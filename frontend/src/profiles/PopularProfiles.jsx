import React, { useEffect, useState } from "react";
import appStyles from "../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "../context/CurrentUserCntxt";
import Asset from "../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../context/ProfileDataContext";

export const PopularProfiles = ({ mobile }) => {
  const { popularProfiles, isLoading } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      <p>most followed profiles</p>
      {isLoading ? (
        <Asset spinner />
      ) : popularProfiles.results.length ? (
        mobile ? (
          <div className="d-flex justify-content-around">
            {popularProfiles.results.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} mobile />
            ))}
          </div>
        ) : (
          popularProfiles.results.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))
        )
      ) : (
        <p>No Profiles</p>
      )}
    </Container>
  );
};
