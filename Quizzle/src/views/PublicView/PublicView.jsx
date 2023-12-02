import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Public from "../../components/Public/Public";
import Dashboard from "../../components/Dashboard/Dashboard";


const PublicView = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? <Dashboard></Dashboard> : <Public></Public> }

    </>
  )
}

export default PublicView;