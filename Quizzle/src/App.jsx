import Navbar from "./components/NavBar/NavBar";
import Sidebar from "./components/SideBar/SideBar";
import { useState, useEffect } from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/users.services";
import { AuthContext } from "./context/authContext";

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

      setAppState({
        ...appState,
        userData: Object.keys(snapshot.val())[0],
        // Object.keys(snapshot.val())[0] returns the first key of the object
        // Object.keys(snapshot.val()) returns an array of the keys of the object
        // snapshot.val() returns the value of the object
        // Google this part when you have lot's of user data Object.keys(snapshot.val())[0]
      });
    });
  });
  // console.log(user)

  return (
    <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
      <Navbar />
      <Sidebar />
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
