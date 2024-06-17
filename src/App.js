import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import MechanicsPage from './pages/MechanicsPage';
import WarehousePage from './pages/WarehousePage';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/services"
            element={<ServicesPage />}
          />
          <Route
            path="/mechanics"
            element={<MechanicsPage />}
          />
          <Route
            path="/warehouse"
            element={<WarehousePage />}
          />
          <Route
            path="/admin"
            element={<AdminPanel />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
