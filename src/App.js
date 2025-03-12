import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import './App.css';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
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
      <Link to="/tutors">Meet Our Tutors</Link>
      <Link to="/apply">Apply</Link>
      <Link to="/testimonials">Testimonials</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </motion.nav>
);

const Section = ({ title, content, imageUrl, children }) => (
  <motion.section
    className="section"
    style={{ backgroundImage: `url(${imageUrl})` }}
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
    <motion.h2 whileHover={{ scale: 1.05 }}>{title}</motion.h2>
    <motion.p>{content}</motion.p>
    {children}
  </motion.section>
);

const Apply = () => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

  return (
    <Section
      title="Apply to Aspire Academics"
      content="Join our team as a tutor or apply for personalized tutoring services."
      imageUrl="/images/apply-tutoring.jpg"
    >
      <div className="apply-buttons">
        <button className="apply-button" onClick={() => setIsTutorOpen(!isTutorOpen)}>
          Apply to be a Tutor
        </button>
        <button className="apply-button" onClick={() => setIsStudentOpen(!isStudentOpen)}>
          Apply for Tutoring
        </button>
      </div>

      {isTutorOpen && (
        <form className="form">
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email" required />
          <textarea name="experience" placeholder="Describe your teaching experience" required></textarea>
          <motion.button whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
        </form>
      )}

      {isStudentOpen && (
        <form className="form">
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email" required />
          <textarea name="requirements" placeholder="What subjects do you need help with?" required></textarea>
          <motion.button whileHover={{ scale: 1.05 }}>Request Tutoring</motion.button>
        </form>
      )}
    </Section>
  );
};

const Contact = () => (
  <Section
    title="Contact Us"
    content="We're here to help. Reach out with any questions or inquiries."
    imageUrl="/images/contact.jpg"
  >
    <form className="form">
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <motion.button whileHover={{ scale: 1.05 }}>Send Message</motion.button>
    </form>
  </Section>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
