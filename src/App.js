import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/members/:club_id" element={<Members/>} />
          <Route path="/create-club" element={<CreateClub />} />
          <Route path="/clubs/:club_id/create_member" element={<CreateMember />} />
          <Route path="/create_annonce" element={<CreateAnnonce />} />
          <Route path="/edit_club/:club_id" element={<EditClub />} />
          <Route path="/members/:club_id/edit_member/:member_id" element={<EditMember />} />
          <Route path="/edit_annonce/:annonce_id" element={<EditAnnonce />} />
          <Route path="/clubs/:club_id" element={<ClubDetails />} />     
        </Routes>

        </header>
      </div>
    </Router>
  );
}

export default App;
