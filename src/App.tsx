import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ELSIPage from './pages/ELSI';
import ProjectIdeasPage from './pages/ProjectIdeas';
import TeamPage from './pages/Team';
import SponsorsPage from './pages/Sponsors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/elsi" element={<ELSIPage />} />
        <Route path="/project-ideas" element={<ProjectIdeasPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
