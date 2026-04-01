import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ELSIPage from './pages/ELSI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/elsi" element={<ELSIPage />} />
      </Routes>
    </Router>
  );
}

export default App
