import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import MainPage from './pages/MainPage';
import ELSIPage from './pages/ELSI';
import ProjectPage from './pages/Project';
import ExperimentPage from './pages/Experiment';
import TeamPage from './pages/Team';
import SponsorsPage from './pages/Sponsors';
import FuturePage from './pages/Future';
import SimulationPage from './pages/Simulation';
import logo from "./assets/images/logo.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "Project", path: "/project" },
  // { name: "Design", path: "/design" },
  { name: "Experiments", path: "/experiments" },
  { name: "Simulations", path: "/simulations" },
  { name: "Future", path: "/future" },
  { name: "ELSI", path: "/elsi" },
  { name: "Team", path: "/team" },
  { name: "Sponsors", path: "/sponsors" },
];

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/project", element: <ProjectPage /> },
  // { path: "/design", element: <DesignPage /> },
  { path: "/team", element: <TeamPage /> },
  { path: "/sponsors", element: <SponsorsPage /> },
  { path: "/future", element: <FuturePage /> },
  { path: "/elsi", element: <ELSIPage /> },
  { path: "/simulations", element: <SimulationPage /> },
  { path: "/experiments", element: <ExperimentPage /> },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = pages.map((page) => (
    <Link
      key={page.path}
      to={page.path}
      onClick={() => setIsMenuOpen(false)}
      className="inline-block rounded px-2 py-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100"
    >
      {page.name}
    </Link>
  ));

  return (
    <Router>
      <nav className="sticky top-0 z-10 w-full border-b bg-white px-6 py-4">
        <div className="flex w-full items-center justify-between gap-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="mr-auto flex-shrink-0">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt=""
                className="h-[22px] w-[22px] object-contain"
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

          <div className="hidden items-center gap-6 md:flex md:ml-auto md:justify-end">
            {navItems}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-xl text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-3 pb-3 pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems}
            </div>
          </div>
        )}
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
