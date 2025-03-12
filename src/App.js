import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import './App.css';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Navbar = () => (
  <motion.nav
    className="navbar"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="logo">Aspire Academics</h1>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/apply-tutor">Apply as Tutor</Link>
      <Link to="/apply-tutoring">Apply for Tutoring</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </motion.nav>
);

const Section = ({ title, content }) => (
  <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
    <motion.h2 whileHover={{ scale: 1.05 }}>{title}</motion.h2>
    <motion.p>{content}</motion.p>
  </motion.section>
);

const Home = () => (
  <Section title="Welcome to Aspire Academics" content="Empowering learners to achieve their best through personalized tutoring." />
);

const About = () => (
  <Section title="About Us" content="Aspire Academics is dedicated to providing high-quality tutoring to help students excel. We focus on personalized learning strategies that adapt to each student's unique needs." />
);

const Services = () => (
  <Section title="Our Services" content="We offer personalized tutoring sessions for various subjects and grade levels, including math, science, and language arts." />
);

const handleSubmit = async (e, formType) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, formType }),
  });

  alert('Form submitted! A confirmation email has been sent.');
};

const ApplyTutor = () => (
  <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
    <h2>Apply as a Tutor</h2>
    <form className="form" onSubmit={(e) => handleSubmit(e, 'tutor')}>
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Why do you want to tutor?" required></textarea>
      <motion.button whileHover={{ scale: 1.05 }}>Submit</motion.button>
    </form>
  </motion.section>
);

const ApplyTutoring = () => (
  <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
    <h2>Apply for Tutoring</h2>
    <form className="form" onSubmit={(e) => handleSubmit(e, 'tutoring')}>
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <textarea name="message" placeholder="What subjects do you need help with?" required></textarea>
      <motion.button whileHover={{ scale: 1.05 }}>Submit</motion.button>
    </form>
  </motion.section>
);

const Contact = () => (
  <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
    <h2>Contact Us</h2>
    <form className="form" onSubmit={(e) => handleSubmit(e, 'contact')}>
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <motion.button whileHover={{ scale: 1.05 }}>Submit</motion.button>
    </form>
  </motion.section>
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