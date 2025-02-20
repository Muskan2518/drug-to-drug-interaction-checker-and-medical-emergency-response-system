import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import DD from './DD';
import PregnancyCheck from './Preg';
import MedicalChatBot from './ChatBot';

export default function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={styles.navbar}>
          <NavLink to="/drug" style={styles.link} activeStyle={styles.activeLink}>
            Drug Interaction Checker
          </NavLink>
          <NavLink to="/preg" style={styles.link} activeStyle={styles.activeLink}>
            Pregnancy Safety Check
          </NavLink>
          <NavLink to="/chat" style={styles.link} activeStyle={styles.activeLink}>
            Medical ChatBot
          </NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/drug" element={<DD />} />
          <Route path="/preg" element={<PregnancyCheck />} />
          <Route path="/chat" element={<MedicalChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: '#007bff',
  },
  link: {
    color: 'white',
    margin: '0 15px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  activeLink: {
    textDecoration: 'underline',
  },
};
