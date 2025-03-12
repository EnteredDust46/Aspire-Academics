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
    content="Our experienced tutors are passionate about education and skilled in guiding students to achieve their academic goals. Each tutor brings a unique teaching philosophy and is dedicated to providing individualized support. [Placeholder for Tutor Bios, Relevant Experience, and Profile Pictures.]"
    imageUrl="/images/tutors.jpg"
  />
);

const Testimonials = () => (
  <Section
    title="What Our Students Say"
    content={'"Aspire Academics transformed my learning experience. The personalized attention helped me excel in SAT and improve my overall academic performance." - Jane Doe [Placeholder for additional testimonials and student success stories with picture slots.]'}
    imageUrl="/images/testimonials.jpg"
  />
);

const Apply = () => {
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

  return (
    <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
      <h2>Join Our Community</h2>
      <div>
        <button onClick={() => setIsTutorOpen(!isTutorOpen)}>
          Apply to be a Tutor
        </button>
        {isTutorOpen && (
          <form className="form">
            <input name="name" placeholder="Full Name" required />
            <input name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Why do you want to be a tutor? Please include your relevant experience." required></textarea>
            <motion.button whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
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
            <motion.button whileHover={{ scale: 1.05 }}>Request Tutoring</motion.button>
          </form>
        )}
      </div>
    </motion.section>
  );
};

const Contact = () => (
  <motion.section className="section" variants={fadeIn} initial="hidden" animate="show">
    <h2>Contact Us</h2>
    <p>Have any questions? Reach out to us and we’ll be happy to help!</p>
    <form className="form">
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <motion.button whileHover={{ scale: 1.05 }}>Send Message</motion.button>
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
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </Router>
  );
}
