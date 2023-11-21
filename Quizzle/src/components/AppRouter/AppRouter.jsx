import { Routes, Route } from 'react-router-dom';
import RegisterForm from "../../views/Register/Register"
import Dashboard from '../Dashboard/Dashboard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default AppRouter
