import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../Utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    console.log("request to get user");
    try {
      const { data } = await axiosRes.get("/api/dj-rest-auth/user/");
      // const { data } = await axiosResponse.get("dj-rest-auth/user/");
      // console.log(data);
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      // console.log("request interceptor called"),
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/api/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/api/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  // res
  // await axios.post("/api/dj-rest-auth/token/refresh/");
  // await axios.post("/dj-rest-auth/token/refresh/");

  // req
  // await axios.post("/api/dj-rest-auth/token/refresh/");
  // await axios.post("/dj-rest-auth/token/refresh/");

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

// export { axiosRequest, axiosResponse };
