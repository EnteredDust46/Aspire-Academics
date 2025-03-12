import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-maroon-700 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">Aspire Academics</h1>
    <div className="space-x-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/apply-tutor">Apply as Tutor</Link>
      <Link to="/apply-tutoring">Apply for Tutoring</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </nav>
);

const Home = () => <h2>Welcome to Aspire Academics</h2>;
const About = () => <h2>About Us</h2>;
const Services = () => <h2>Our Services</h2>;
const ApplyTutor = () => <h2>Apply as a Tutor</h2>;
const ApplyTutoring = () => <h2>Apply for Tutoring</h2>;
const Contact = () => <h2>Contact Us</h2>;

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
