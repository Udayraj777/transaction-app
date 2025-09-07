import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path ="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;