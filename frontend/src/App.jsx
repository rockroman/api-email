import Button from "react-bootstrap/Button";
import styles from "./App.module.css";
import NavigationBar from "./components/NavigationBar";
import "./api/axiosDefault";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostsCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./context/CurrentUserCntxt";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./profiles/ProfilePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || " ";
  return (
    <div className={styles.App}>
      <NavigationBar />
      <Container className={styles.Main}>
        <Routes>
          <Route
            path="/feed"
            element={
              <PostsPage
                message="No results founs adjust the Search keyword or follow a user"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />

          <Route
            path="/"
            element={
              <PostsPage message="No results founs adjust the Search keyword " />
            }
          />
          <Route
            path="/liked"
            element={
              <PostsPage
                message="No results founs adjust the Search keyword or like a post"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path="/signIn" element={<SignInForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/posts/create" element={<PostCreateForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
