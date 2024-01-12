import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Login/Register';
import VerifyEmail from './Login/VerifyEmail';
import Login from './Login/Login';
import { AuthProvider } from './component/AuthContext';
import { auth } from './Login/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ClubList from './component/Clubs/Clubs';
import HomePage from './component/Home';
import CreateClub from './component/Clubs/CreateClub';
import CreateMember from './component/Members/CreateMember';
import CreateAnnonce from './component/Annonces/CreateAnnonce';
import Annonces from './component/Annonces/Annonces';
import Members from './component/Members/Members';
import EditClub from './component/Clubs/EditClub';
import EditMember from './component/Members/EditMember';
import EditAnnonce from './component/Annonces/EditAnnonce';
import ClubDetails from './component/Clubs/ClubDetails';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route
                path="/home"
                element={!currentUser ? <Navigate to="/login" /> : <HomePage />}
              />
              <Route path="/" element={!currentUser ? <Navigate to="/login" /> : <Navigate to="/home" />} />

              <Route
                path="/clubs"
                element={!currentUser ? <Navigate to="/login" /> : <ClubList />}
              />
              <Route
                path="/annonces"
                element={!currentUser ? <Navigate to="/login" /> : <Annonces />}
              />
              <Route
                path="/members/:club_id"
                element={!currentUser ? <Navigate to="/login" /> : <Members />}
              />
              <Route
                path="/create-club"
                element={!currentUser ? <Navigate to="/login" /> : <CreateClub />}
              />
              <Route
                path="/clubs/:club_id/create_member"
                element={!currentUser ? <Navigate to="/login" /> : <CreateMember />}
              />
              <Route
                path="/create_annonce"
                element={!currentUser ? <Navigate to="/login" /> : <CreateAnnonce />}
              />
              <Route
                path="/edit_club/:club_id"
                element={!currentUser ? <Navigate to="/login" /> : <EditClub />}
              />
              <Route
                path="/members/:club_id/edit_member/:member_id"
                element={!currentUser ? <Navigate to="/login" /> : <EditMember />}
              />
              <Route
                path="/edit_annonce/:annonce_id"
                element={!currentUser ? <Navigate to="/login" /> : <EditAnnonce />}
              />
              <Route
                path="/clubs/:club_id"
                element={!currentUser ? <Navigate to="/login" /> : <ClubDetails />}
              />

                <Route
                  path="/login"
                  element={
                    !currentUser?.emailVerified ? (
                      <Login />
                    ) : (
                      <Navigate to="/home" replace /> // Redirection vers la page d'accueil après authentification
                    )
                  }
                />
                              <Route
                path="/register"
                element={
                  !currentUser?.emailVerified ? (
                    <Register />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route path="/verify-email" element={<VerifyEmail />} />

            </Routes>
          </header>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
