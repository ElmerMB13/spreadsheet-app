import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Spreadsheet from './pages/Spreadsheet';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="spreadsheet/:id" element={<Spreadsheet />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
