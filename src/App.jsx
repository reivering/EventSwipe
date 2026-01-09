import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SwipeFeed from './pages/SwipeFeed';
import Profile from './pages/Profile';
import SavedEvents from './pages/SavedEvents';
import Navigation from './components/Navigation';
import EventModal from './components/EventModal';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/swipe"
            element={
              <>
                <Navigation />
                <SwipeFeed />
                <EventModal />
              </>
            }
          />
          <Route
            path="/saved"
            element={
              <>
                <Navigation />
                <SavedEvents />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navigation />
                <Profile />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
