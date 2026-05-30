import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ELSIPage from './pages/ELSI';
import ProjectPage from './pages/Project';
import DesignPage from './pages/Design';
import ExperimentPage from './pages/Experiment';
import TeamPage from './pages/Team';
import SponsorsPage from './pages/Sponsors';
import FuturePage from './pages/Future';
import SimulationPage from './pages/Simulation';
import logo from "./assets/images/logo.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "ELSI", path: "/elsi" },
  { name: "Project", path: "/project" },
  { name: "Design", path: "/design" },
  { name: "Experiments", path: "/experiments" },
  { name: "Simulations", path: "/simulations" },
  { name: "Future", path: "/future" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Team", path: "/team" },
];

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/elsi", element: <ELSIPage /> },
  { path: "/project", element: <ProjectPage /> },
  { path: "/design", element: <DesignPage /> },
  { path: "/team", element: <TeamPage /> },
  { path: "/sponsors", element: <SponsorsPage /> },
  { path: "/future", element: <FuturePage /> },
  { path: "/simulations", element: <SimulationPage /> },
  { path: "/experiments", element: <ExperimentPage /> },
];

function App() {
  return (
    <Router>
      <nav className="w-full border-b px-6 py-4 flex items-center gap-6 bg-white">
        <Link
          to="/"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img
              src={logo}
              alt=""
              style={{ width: "22px", height: "22px", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'Krub', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.9rem, 1.67vw, 1.5rem)",
                lineHeight: "100%",
                color: "#2E343F",
              }}
            >
              UBC BIOMOD
            </span>
          </div>
        </Link>

        <div className="flex gap-6 ml-auto">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="inline-block px-2 py-1 rounded hover:scale-110 hover:bg-gray-100 transition-all duration-200"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </nav>

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
