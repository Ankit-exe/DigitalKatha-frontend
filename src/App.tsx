import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { SignUp } from "./pages/SignUp";
import { Layout } from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
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
          path="/about"
          element={
            <Layout>
              <About />
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
