import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Chat from "./containers/chat"
import Dashboard from './containers/dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/chat" Component={Chat}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
