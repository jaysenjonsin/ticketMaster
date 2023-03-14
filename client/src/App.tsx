import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchForm from './pages/SearchForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/search' element={<SearchForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
