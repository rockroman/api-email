import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserCntxt";
import { axiosReq } from "../api/axiosDefault";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // using pageprofile later
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/api/profiles/?ordering=-followers_count`
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
        // console.log(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    setIsLoading(true);
    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
