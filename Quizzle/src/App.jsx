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

const App = () => {
  const [user] = useAuthState(auth);
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
        // Object.keys(snapshot.val())[0] returns the first key of the object
        // Object.keys(snapshot.val()) returns an array of the keys of the object
        // snapshot.val() returns the value of the object
        // Google this part when you have lot's of user data Object.keys(snapshot.val())[0]
      });
    });
  });

  return (
    <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
      <div className="bg-hero-pattern-3 bg-cover bg-fixed bg-blend-multiply">
      <Toaster />
      <Navbar className="fixed top-0 left-0 w-full z-10 " />
      <div className="flex ">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-grow overflow-auto">
          <AppRouter />
        </div>
      </div>
        <Footer className="fixed bottom-0 left-0 w-full z-10" />
        </div>
    </AuthContext.Provider>
  );
};

export default App;
