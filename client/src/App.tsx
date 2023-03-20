import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/search' element={<SearchPage />} />
          <Route path='/favorites' element={<FavoritePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
