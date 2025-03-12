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
      <Link to="/contact">Contact</Link>
    </div>
  </motion.nav>
);

const Section = ({ title, content, imageUrl }) => (
  <motion.section
    className="section"
    style={{ backgroundImage: `url(${imageUrl})` }}
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
    <motion.h2 whileHover={{ scale: 1.05 }}>{title}</motion.h2>
    <motion.p>{content}</motion.p>
  </motion.section>
);

const Home = () => (
  <Section
    title="Empowering Academic Excellence"
    content="Welcome to Aspire Academics. Our mission is to transform learning into an enjoyable and effective experience for students everywhere."
    imageUrl="/images/home.jpg"
  />
);

const About = () => (
  <Section
    title="Our Mission"
    content="We strive to provide the best tutoring services with dedicated and professional tutors, ensuring that every student reaches their potential."
    imageUrl="/images/about.jpg"
  />
);

const Services = () => (
  <Section
    title="Our Services"
    content="We offer tutoring in various subjects including Math, Science, English, and Test Preparation. Our personalized approach ensures every student's unique needs are met."
    imageUrl="/images/services.jpg"
  />
);

const MeetTutors = () => (
  <Section
    title="Meet Our Tutors"
    content="Our team of experts is dedicated to fostering a love for learning and helping students excel."
    imageUrl="/images/tutors.jpg"
  />
);

const StressFree = () => (
  <Section
    title="Learning Without Stress"
    content="We create a calm and supportive environment where learning becomes an engaging journey."
    imageUrl="/images/stressfree.jpg"
  />
);

const Apply = () => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

  return (
    <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
      <h2>Apply</h2>
      <div>
        <button onClick={() => setIsTutorOpen(!isTutorOpen)}>
          Apply to be a Tutor
        </button>
        {isTutorOpen && (
          <form className="form">
            <input name="name" placeholder="Full Name" required />
            <input name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Why do you want to tutor?" required></textarea>
            <motion.button whileHover={{ scale: 1.05 }}>Submit</motion.button>
          </form>
        )}
      </div>
      <div>
        <button onClick={() => setIsStudentOpen(!isStudentOpen)}>
          Apply for Tutoring
        </button>
        {isStudentOpen && (
          <form className="form">
            <input name="name" placeholder="Full Name" required />
            <input name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Which subjects do you need help with?" required></textarea>
            <motion.button whileHover={{ scale: 1.05 }}>Submit</motion.button>
          </form>
        )}
      </div>
    </motion.section>
  );
};

const Contact = () => (
  <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
    <h2>Contact Us</h2>
    <form className="form">
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
        <Route path="/tutors" element={<MeetTutors />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stress-free" element={<StressFree />} />
      </Routes>
    </Router>
  );
}
