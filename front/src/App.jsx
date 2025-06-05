import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './componenets/Home';
import Register from './componenets/Register';
import Login from './componenets/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
