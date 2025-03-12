import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
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
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + imageUrl})` }}
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
    <motion.h2 whileHover={{ scale: 1.05 }}>{title}</motion.h2>
    <motion.p>{content}</motion.p>
    {children}
  </motion.section>
);

const Apply = () => (
  <Section
    title="Apply to Aspire Academics"
    content="Join our team as a tutor or apply for personalized tutoring services."
    imageUrl="/images/apply-tutoring.jpg"
  >
    <div className="apply-buttons">
      <Link to="/apply-tutor" className="apply-button">Apply to be a Tutor</Link>
      <Link to="/apply-student" className="apply-button">Apply for Tutoring</Link>
    </div>
  </Section>
);

const ApplyTutor = () => {
  const navigate = useNavigate();
  return (
    <Section title="Tutor Application" content="Fill out the form to apply as a tutor." imageUrl="/images/apply-tutor.jpg">
      <form className="form" onSubmit={(e) => { e.preventDefault(); navigate('/thank-you'); }}>
        <input name="name" placeholder="Full Name" required />
        <input name="email" placeholder="Email" required />
        <textarea name="experience" placeholder="Describe your teaching experience" required></textarea>
        <motion.button type="submit" whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
      </form>
    </Section>
  );
};

const ApplyStudent = () => {
  const navigate = useNavigate();
  return (
    <Section title="Student Application" content="Fill out the form to request tutoring services." imageUrl="/images/apply-student.jpg">
      <form className="form" onSubmit={(e) => { e.preventDefault(); navigate('/thank-you'); }}>
        <input name="name" placeholder="Full Name" required />
        <input name="email" placeholder="Email" required />
        <textarea name="requirements" placeholder="Subjects you need help with" required></textarea>
        <motion.button type="submit" whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
      </form>
    </Section>
  );
};

const ThankYou = () => (
  <Section title="Thank You!" content="Your application has been received. We will get back to you soon." imageUrl="/images/thank-you.jpg">
    <Link to="/" className="apply-button">Return Home</Link>
  </Section>
);

const Testimonials = () => (
  <Section
    title="Testimonials"
    content="Hear from our successful students."
    imageUrl="/images/testimonials.jpg"
  >
    <p>"Aspire Academics has been life-changing!" - Happy Student</p>
  </Section>
);

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
        <Route path="/" element={<Section title="Welcome to Aspire Academics" content="Achieve academic excellence with personalized tutoring." imageUrl="/images/home.jpg" />} />
        <Route path="/about" element={<Section title="About Us" content="Empowering learners with personalized tutoring solutions." imageUrl="/images/about.jpg" />} />
        <Route path="/services" element={<Section title="Our Services" content="SAT prep, high school tutoring, and more." imageUrl="/images/services.jpg" />} />
        <Route path="/tutors" element={<Section title="Meet Our Tutors" content="Experienced educators dedicated to your success." imageUrl="/images/tutors.jpg" />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/apply-tutor" element={<ApplyTutor />} />
        <Route path="/apply-student" element={<ApplyStudent />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
