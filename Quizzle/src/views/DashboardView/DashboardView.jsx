import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Login from "../Login/Login";


const DashboardView = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? <Dashboard></Dashboard> : <Login></Login> }

    </>
  )
}

export default DashboardView;