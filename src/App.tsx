import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ELSIPage from './pages/ELSI';

function App() {
  return (
    <Router>
        <nav className='w-full border-b px-6 py-4 flex gap-6 bg-white'>
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/elsi" className="hover:underline">
            ELSI
          </Link>
        </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/elsi" element={<ELSIPage />} />
      </Routes>
    </Router>
  );
}

export default App
