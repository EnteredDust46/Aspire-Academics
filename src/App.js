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

const About = () => (
  <Section
    title="Our Mission"
    content="At Aspire Academics, our mission is to empower learners through high-quality tutoring services, fostering academic success and independent growth."
    imageUrl="/images/about.jpg"
  >
    <motion.div className="details">
      <h3>Why Choose Us?</h3>
      <p>We focus on creating a nurturing environment, customizing learning strategies to fit individual needs, and empowering students to achieve their academic goals.</p>
      <h3>Our Values</h3>
      <ul>
        <li>Personalized Learning Plans</li>
        <li>Expert Tutors with Diverse Backgrounds</li>
        <li>Commitment to Academic Excellence</li>
      </ul>
    </motion.div>
  </Section>
);

const Services = () => (
  <Section
    title="Our Services"
    content="We offer tutoring for SAT preparation and high school subjects, including Math, Science, and English."
    imageUrl="/images/services.jpg"
  >
    <motion.div className="details">
      <h3>Customized Approach</h3>
      <p>Each student receives personalized attention tailored to their unique learning style.</p>
      <h3>Flexibility</h3>
      <p>We offer both online and in-person sessions, flexible scheduling, and progress tracking.</p>
    </motion.div>
  </Section>
);

const MeetTutors = () => (
  <Section
    title="Meet Our Tutors"
    content="Our experienced tutors are dedicated to helping students achieve success."
    imageUrl="/images/tutors.jpg"
  >
    <motion.div className="details">
      <h3>Expertise and Passion</h3>
      <p>All tutors are experts in their fields, with a passion for teaching and helping students grow.</p>
      <h3>Personal Profiles</h3>
      <p>Learn about our tutors' backgrounds, experiences, and teaching philosophies.</p>
    </motion.div>
  </Section>
);

const Testimonials = () => (
  <Section
    title="Student Success Stories"
    content='"Aspire Academics provided me with the confidence to excel in my SAT exams." - Student A'
    imageUrl="/images/testimonials.jpg"
  >
    <motion.div className="details">
      <h3>More Stories</h3>
      <p>Read inspiring stories from our students who have overcome challenges and achieved their academic dreams.</p>
    </motion.div>
  </Section>
);

const Contact = () => (
  <Section
    title="Get In Touch"
    content="Have questions or need more information? Contact us today."
    imageUrl="/images/contact.jpg"
  >
    <motion.div className="details">
      <h3>Contact Information</h3>
      <p>Email: info@aspireacademics.com</p>
      <p>Phone: (123) 456-7890</p>
      <h3>Office Hours</h3>
      <p>Monday to Friday, 9 AM to 5 PM</p>
    </motion.div>
  </Section>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tutors" element={<MeetTutors />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
