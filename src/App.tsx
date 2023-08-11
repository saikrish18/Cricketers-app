import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CricketersList from './components/CricketersList';
import CricketerDetails from './components/CricketerDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/cricketer/:id"
           element={<CricketerDetails/>} />
          <Route  path="/" 
            element={<CricketersList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
