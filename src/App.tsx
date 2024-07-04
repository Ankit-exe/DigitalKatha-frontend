import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { Projects } from "./pages/Projects";
import { SignUp } from "./pages/SignUp";
import { Layout } from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { PostCreate } from "./pages/PostCreate";
import { Dashboard } from "./pages/Dashboard";
import { UpdatePost } from "./pages/UpdatPost";
import { PostPage } from "./pages/PostPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { SearchBar } from "./components/SearchBar";
import { Search } from "./pages/Search";
import { Contact } from "./pages/Contact";
import { Privacypolicy } from "./pages/Privacypolicy";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SearchBar />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <Privacypolicy />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/post/:postSlug"
          element={
            <Layout>
              <PostPage />
            </Layout>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/update-post/:postId"
            element={
              <Layout>
                <UpdatePost />
              </Layout>
            }
          />
          <Route
            path="/create-post"
            element={
              <Layout>
                <PostCreate />
              </Layout>
            }
          />
        </Route>

        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
