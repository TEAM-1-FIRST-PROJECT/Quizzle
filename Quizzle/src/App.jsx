import Navbar from "./Components/NavBar/NavBar";
import { useState, useEffect } from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/users.services";
import { AuthContext } from "./context/authContext";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/SideBar/SideBar";
import Loader from "./components/Loader/Loader";
import Snowfall from 'react-snowfall'

const App = () => {
  const [user, loading] = useAuthState(auth);
  const darkMode = false; 
 
  const [appState, setAppState] = useState({
    user,
    userData: false,
  });

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) {
      return;
    }

    getUserData(user.uid).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error("User data not found");
      }
      const username = Object.keys(snapshot.val())[0];
      setAppState({
        ...appState,
        userData: snapshot.val()[username],
      });
    });
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
      <div className="bg-hero-pattern-3 bg-cover bg-fixed dark:bg-hero-pattern-4 dark:bg-fixed dark:bg-cover">
       <Snowfall />
        <Toaster />
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-grow overflow-auto">
            <AppRouter />
          </div>
        </div >
        <Footer/>
      </div>
    </AuthContext.Provider>
  );
};

export default App;