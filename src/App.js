import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <h1 className="logo">Aspire Academics</h1>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/apply-tutor">Apply as Tutor</Link>
      <Link to="/apply-tutoring">Apply for Tutoring</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </nav>
);

const Home = () => (
  <section className="section">
    <h2>Welcome to Aspire Academics</h2>
    <p>Empowering learners to achieve their best through personalized tutoring.</p>
  </section>
);

const About = () => (
  <section className="section">
    <h2>About Us</h2>
    <p>Aspire Academics is dedicated to providing high-quality tutoring to help students excel.</p>
  </section>
);

const Services = () => (
  <section className="section">
    <h2>Our Services</h2>
    <p>We offer personalized tutoring sessions for various subjects and grade levels.</p>
  </section>
);

const ApplyTutor = () => (
  <section className="section">
    <h2>Apply as a Tutor</h2>
    <form className="form">
      <input placeholder="Full Name" required />
      <input placeholder="Email" required />
      <textarea placeholder="Why do you want to tutor?" required></textarea>
      <button type="submit">Submit</button>
    </form>
  </section>
);

const ApplyTutoring = () => (
  <section className="section">
    <h2>Apply for Tutoring</h2>
    <form className="form">
      <input placeholder="Full Name" required />
      <input placeholder="Email" required />
      <textarea placeholder="What subjects do you need help with?" required></textarea>
      <button type="submit">Submit</button>
    </form>
  </section>
);

const Contact = () => (
  <section className="section">
    <h2>Contact Us</h2>
    <p>Email us at <a href="mailto:contact@aspireacademics.com">contact@aspireacademics.com</a></p>
  </section>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/apply-tutor" element={<ApplyTutor />} />
        <Route path="/apply-tutoring" element={<ApplyTutoring />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}