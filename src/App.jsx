import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import appFirebase from "./credenciales";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import "@fontsource/poppins";

// COMPONENTS
import Sidebar from "./components/Sidebar";

// PAGES
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Login from "./pages/Login";
import AddMatery from "./pages/AddMatery";

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SidebarProvider>
      <Router>
        <div className="flex h-screen overflow-hidden">
          {user && <Sidebar user={user} />}
          <MainContent user={user} />
        </div>
      </Router>
    </SidebarProvider>
  );
}

const MainContent = ({ user }) => {
  const { expanded } = useSidebar();

  return (
    <main className={`flex-1 overflow-auto ${user ? (expanded ? "ml-64" : "ml-16") : ""}`}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/" />} />
        <Route path="/aboutme" element={user ? <AboutMe user={user} /> : <Navigate to="/" />} />
        <Route path="/addmatery" element={user ? <AddMatery user={user} /> : <Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default App;
