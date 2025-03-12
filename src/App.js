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

const ApplySection = ({ title, isOpen, toggleOpen, children }) => (
  <div className="apply-section">
    <button className="apply-button" onClick={toggleOpen}>{title}</button>
    {isOpen && (
      <motion.div className="form-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    )}
  </div>
);

const Apply = () => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

  return (
    <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
      <h2 className="section-heading">Join Our Community</h2>
      <ApplySection
        title="Apply to be a Tutor"
        isOpen={isTutorOpen}
        toggleOpen={() => setIsTutorOpen(!isTutorOpen)}
      >
        <form className="form">
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email" required />
          <input name="education" placeholder="Educational Background" required />
          <textarea name="experience" placeholder="Teaching Experience" required></textarea>
          <input name="subjects" placeholder="Subjects of Expertise" required />
          <input name="availability" placeholder="Availability (Days/Times)" required />
          <motion.button className="submit-button" whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
        </form>
      </ApplySection>
      <ApplySection
        title="Apply for Tutoring"
        isOpen={isStudentOpen}
        toggleOpen={() => setIsStudentOpen(!isStudentOpen)}
      >
        <form className="form">
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email" required />
          <input name="grade" placeholder="Current Grade Level" required />
          <input name="subjects" placeholder="Subjects Needing Assistance" required />
          <input name="schedule" placeholder="Preferred Tutoring Schedule" required />
          <textarea name="goals" placeholder="Specific Goals or Challenges" required></textarea>
          <motion.button className="submit-button" whileHover={{ scale: 1.05 }}>Request Tutoring</motion.button>
        </form>
      </ApplySection>
    </motion.section>
  );
};

const Home = () => (
  <Section
    title="Welcome to Aspire Academics"
    content="At Aspire Academics, we empower students to achieve academic excellence through personalized tutoring, fostering independent learning and confidence."
    imageUrl="/images/home.jpg"
  />
);

const About = () => (
  <Section
    title="Our Mission"
    content="Our mission is to provide high-quality tutoring services that not only focus on academic growth but also instill confidence and independent learning habits. We are dedicated to helping students excel in SAT preparation and high school subjects by offering customized learning plans and flexible scheduling."
    imageUrl="/images/about.jpg"
  />
);

const Services = () => (
  <Section
    title="Our Services"
    content="We specialize in SAT preparation and offer comprehensive tutoring in high school subjects, including Mathematics, Science, and English. Our personalized methodologies cater to the unique learning styles of each student."
    imageUrl="/images/services.jpg"
  />
);

const MeetTutors = () => (
  <Section
    title="Meet Our Tutors"
    content="Our experienced tutors are passionate about education and skilled in guiding students to achieve their academic goals. Each tutor brings a unique teaching philosophy and is dedicated to providing individualized support."
    imageUrl="/images/tutors.jpg"
  />
);

const Testimonials = () => (
  <Section
    title="What Our Students Say"
    content='"Aspire Academics transformed my learning experience. The personalized attention helped me excel in SAT and improve my overall academic performance." - Jane Doe'
    imageUrl="/images/testimonials.jpg"
  />
);

const Contact = () => (
  <Section
    title="Contact Us"
    content="Reach out to us with any questions or to learn more about our tutoring services."
    imageUrl="/images/contact.jpg"
  />
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
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
