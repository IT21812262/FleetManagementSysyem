
import './App.css';
import Header from './Components/Header';
import AddSupplier from './Components/AddSupplier';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/addSupplier" element={<AddSupplier />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


