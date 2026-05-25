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
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
          Logo
        </div>

        <div className="flex gap-6 ml-auto">
          {pages.map((page) => (
            <Link key={page.path} to={page.path} className="hover:underline">
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

export default App
