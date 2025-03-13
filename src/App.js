import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGraduationCap, 
  faChalkboardTeacher, 
  faChartLine, 
  faClock, 
  faVideo, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import logo from './assets/aspire-academics.png';
import WeeklySchedule from './components/WeeklySchedule';
import { getImagePath } from './imageConfig';

// Initialize FontAwesome
library.add(
  faGraduationCap, 
  faChalkboardTeacher, 
  faChartLine, 
  faClock, 
  faVideo, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope
);

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
    <Link to="/" className="logo-container">
      <img src={logo} alt="Aspire Academics" className="logo-image" />
    </Link>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/how-it-works">How It Works</Link>
      <Link to="/services">Services</Link>
      <Link to="/tutors">Meet Our Tutors</Link>
      <Link to="/apply">Apply</Link>
      <Link to="/testimonials">Testimonials</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </motion.nav>
);

const Section = ({ title, content, imageUrl, children, subtitle, className }) => (
  <motion.section
    className={`section ${className || ''}`}
    style={{ backgroundImage: imageUrl ? `url(${process.env.PUBLIC_URL}/images/${imageUrl})` : 'linear-gradient(135deg, var(--primary-dark), var(--primary-light))' }}
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
    <div className="section-content-wrapper">
      <motion.h2 whileHover={{ scale: 1.05 }}>{title}</motion.h2>
      {subtitle && <motion.h3>{subtitle}</motion.h3>}
      {Array.isArray(content) ? (
        content.map((paragraph, index) => (
          <motion.p key={index}>{paragraph}</motion.p>
        ))
      ) : (
        <motion.p>{content}</motion.p>
      )}
      {children}
    </div>
  </motion.section>
);

const Home = () => (
  <>
    <motion.section 
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="hero-content">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Transform Your Academic Journey
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-subtitle"
        >
          Personalized tutoring that empowers students to achieve their full potential
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/apply-student" className="cta-button primary">Get Started</Link>
          <Link to="/services" className="cta-button secondary">Learn More</Link>
        </motion.div>
      </div>
      <motion.div 
        className="hero-image-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/hero-student.jpg`} alt="Student learning" className="hero-image" />
      </motion.div>
    </motion.section>

    <motion.section 
      className="features-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="features-grid">
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <i className="fas fa-graduation-cap"></i>
          <h3>Expert Tutors</h3>
          <p>Learn from experienced educators passionate about student success</p>
        </motion.div>
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <i className="fas fa-chalkboard-teacher"></i>
          <h3>Personalized Learning</h3>
          <p>Customized study plans tailored to your unique needs and goals</p>
        </motion.div>
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <i className="fas fa-chart-line"></i>
          <h3>Proven Results</h3>
          <p>Track your progress with measurable improvements in grades and scores</p>
        </motion.div>
      </div>
    </motion.section>

    <motion.section 
      className="stats-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="stats-grid">
        <div className="stat-item">
          <motion.span 
            className="stat-number"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            95%
          </motion.span>
          <p>Student Satisfaction</p>
        </div>
        <div className="stat-item">
          <motion.span 
            className="stat-number"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          >
            500+
          </motion.span>
          <p>Students Helped</p>
        </div>
        <div className="stat-item">
          <motion.span 
            className="stat-number"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            30+
          </motion.span>
          <p>Expert Tutors</p>
        </div>
      </div>
    </motion.section>
  </>
);

const About = () => (
  <Section
    title="About Us"
    subtitle="Our Mission and Values"
    content={[
      "Founded by experienced educators, Aspire Academics is committed to delivering excellence in education through personalized tutoring services.",
      "We carefully select our tutors based on their academic achievements, teaching experience, and passion for education. All our tutors undergo rigorous training and background checks.",
      "Our approach combines traditional teaching methods with modern learning technologies to create an engaging and effective learning experience.",
      "We measure our success through our students' achievements and their growing confidence in tackling academic challenges."
    ]}
    imageUrl="about.jpg"
  />
);

const Services = () => (
  <Section
    title="Our Services"
    subtitle="Comprehensive Academic Support"
    content={[
      "We offer a wide range of tutoring services to help students achieve their academic goals.",
      "All our programs are customized to meet individual student needs and learning styles."
    ]}
    imageUrl="services.jpg"
  >
    <div className="services-grid">
      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <i className="fas fa-graduation-cap"></i>
        <h3>Academic Tutoring</h3>
        <p>One-on-one tutoring in all major subjects for K-12 and college students</p>
        <ul>
          <li>Mathematics</li>
          <li>Sciences</li>
          <li>English & Literature</li>
          <li>History & Social Studies</li>
          <li>Foreign Languages</li>
        </ul>
      </motion.div>

      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <i className="fas fa-book"></i>
        <h3>Test Preparation</h3>
        <p>Comprehensive prep for standardized tests</p>
        <ul>
          <li>SAT & ACT</li>
          <li>AP Exams</li>
          <li>GRE & GMAT</li>
          <li>Subject Tests</li>
          <li>State Assessments</li>
        </ul>
      </motion.div>

      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <i className="fas fa-tasks"></i>
        <h3>Study Skills</h3>
        <p>Building fundamental academic skills</p>
        <ul>
          <li>Time Management</li>
          <li>Note-Taking</li>
          <li>Organization</li>
          <li>Test-Taking Strategies</li>
          <li>Research Methods</li>
        </ul>
      </motion.div>
    </div>
  </Section>
);

const Tutors = () => (
  <Section
    title="Meet Our Tutors"
    subtitle="Expert Educators Dedicated to Your Success"
    content={[
      "Our tutors are carefully selected based on their academic excellence, teaching experience, and passion for education.",
      "Each tutor undergoes thorough background checks and regular training to ensure the highest quality of instruction."
    ]}
    imageUrl="tutors.jpg"
  >
    <div className="tutors-grid">
      <motion.div 
        className="tutor-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/student1.jpg`} alt="Math & Science Tutor" className="tutor-image" />
        <div className="tutor-info">
          <h3>Dr. Sarah Johnson</h3>
          <h4>Math & Science Specialist</h4>
          <p>Ph.D. in Physics | 10+ Years Teaching Experience</p>
          <p>Specializes in AP Physics, Calculus, and SAT Math</p>
        </div>
      </motion.div>

      <motion.div 
        className="tutor-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/student2.jpg`} alt="English & Literature Tutor" className="tutor-image" />
        <div className="tutor-info">
          <h3>Prof. Michael Chen</h3>
          <h4>English & Literature Expert</h4>
          <p>M.A. in English Literature | Published Author</p>
          <p>Specializes in Essay Writing and SAT Verbal</p>
        </div>
      </motion.div>

      <motion.div 
        className="tutor-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/student3.jpg`} alt="Test Prep Specialist" className="tutor-image" />
        <div className="tutor-info">
          <h3>Ms. Amanda Torres</h3>
          <h4>Test Prep Specialist</h4>
          <p>B.S. in Education | Certified Test Prep Instructor</p>
          <p>Specializes in SAT, ACT, and GRE Preparation</p>
        </div>
      </motion.div>
    </div>
  </Section>
);

const Apply = () => (
  <Section
    title="Apply Now"
    subtitle="Start Your Journey to Academic Success"
    content={[
      "We're excited to help you achieve your academic goals! Please select whether you're applying as a student or tutor."
    ]}
    imageUrl="about.jpg"
    className="apply-section"
  >
    <div className="apply-buttons">
      <Link to="/apply-student" className="apply-button">Apply as Student</Link>
      <Link to="/apply-tutor" className="apply-button">Apply as Tutor</Link>
    </div>
  </Section>
);

const ApplyTutor = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    navigate('/thank-you');
  };

  return (
    <Section
      title="Tutor Application"
      subtitle="Join Our Team of Educators"
      content={[
        "We're looking for experienced tutors in all academic subjects, particularly in STEM fields, standardized test prep, and writing."
      ]}
      imageUrl="about.jpg"
    >
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <div className="form-row">
          <input type="text" name="education" placeholder="Highest Education" required />
          <input type="date" name="availability" placeholder="Available Start Date" required />
        </div>
        <select name="subjects" multiple required>
          <option value="">Select Subjects You Can Teach</option>
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="history">History</option>
          <option value="sat">SAT Prep</option>
          <option value="act">ACT Prep</option>
        </select>
        <textarea name="experience" placeholder="Describe your teaching experience" required rows="5"></textarea>
        <motion.button type="submit" whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
      </form>
    </Section>
  );
};

const ApplyStudent = () => {
  const [preferredTimes, setPreferredTimes] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    navigate('/thank-you');
  };

  return (
    <Section 
      title="Student Application" 
      subtitle="Begin Your Academic Journey"
      content={[
        "We're excited to help you achieve your academic goals! Please fill out the form below to get started with our tutoring services.",
        "One of our academic advisors will contact you within 24 hours to discuss your needs and create a personalized learning plan."
      ]}
      imageUrl="about.jpg"
    >
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Student Name" required />
        <input type="email" name="email" placeholder="Parent/Guardian Email" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <div className="form-row">
          <select name="grade" required>
            <option value="">Select Grade Level</option>
            <option value="elementary">Elementary School</option>
            <option value="middle">Middle School</option>
            <option value="high">High School</option>
            <option value="college">College</option>
          </select>
          <select name="subject" required>
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="history">History</option>
            <option value="sat">SAT Prep</option>
            <option value="act">ACT Prep</option>
          </select>
        </div>
        <WeeklySchedule setPreferredTimes={setPreferredTimes} />
        <textarea name="goals" placeholder="What are your academic goals?" required rows="5"></textarea>
        <motion.button type="submit" whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
      </form>
    </Section>
  );
};

const Testimonials = () => (
  <Section
    title="Student Success Stories"
    subtitle="Real Results from Real Students"
    content={[
      "Our tutoring services have helped hundreds of students achieve their academic goals. Here are some of their stories:",
    ]}
    imageUrl="testimonials.jpg"
  >
    <div className="testimonials-grid">
      <motion.div className="testimonial-card" whileHover={{ scale: 1.02 }}>
        <img src={`${process.env.PUBLIC_URL}/images/student1.jpg`} alt="Sarah M." className="testimonial-image" />
        <h4>Sarah M. - Harvard University</h4>
        <p>"Thanks to Aspire Academics' SAT prep, I improved my score by 300 points and got into my dream school!"</p>
      </motion.div>
      <motion.div className="testimonial-card" whileHover={{ scale: 1.02 }}>
        <img src={`${process.env.PUBLIC_URL}/images/student2.jpg`} alt="James K." className="testimonial-image" />
        <h4>James K. - High School Senior</h4>
        <p>"My math grades went from C's to A's after just one semester of tutoring. The personalized attention made all the difference."</p>
      </motion.div>
      <motion.div className="testimonial-card" whileHover={{ scale: 1.02 }}>
        <img src={`${process.env.PUBLIC_URL}/images/student3.jpg`} alt="Emily R." className="testimonial-image" />
        <h4>Emily R. - Medical Student</h4>
        <p>"The study skills I learned at Aspire Academics helped me excel in pre-med and get into medical school."</p>
      </motion.div>
    </div>
  </Section>
);

const Contact = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    const accessKey = process.env.REACT_APP_WEB3FORMS_KEY;
    console.log('Access Key:', accessKey); // Debug log
    
    if (!accessKey) {
      alert('Error: Web3Forms access key not found');
      return;
    }
    
    // Add required fields
    formData.append('access_key', accessKey);
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('message', e.target.message.value);
    formData.append('from_name', "Aspire Academics Website");
    formData.append('subject', 'New Contact Form Submission');
    
    try {
      console.log('Submitting form with data:', Object.fromEntries(formData)); // Debug log
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Response:', data); // Debug log

      if (data.success) {
        alert('Message sent successfully! We will get back to you soon.');
        e.target.reset();
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again. Error: ' + error.message);
    }
  };

  return (
    <Section
      title="Contact Us"
      subtitle="We're Here to Help"
      content={[
        "Have questions about our tutoring services? Want to learn more about our programs? Reach out to us!",
        "Our team typically responds within 24 hours."
      ]}
      imageUrl="contact.jpg"
    >
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Education Lane<br />Academic City, ST 12345</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <p>(555) 123-4567</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>admin@aspireacademicstutoring.com</p>
          </div>
        </div>
        <form className="form contact-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="tel" name="phone" placeholder="Phone (optional)" />
          <select name="inquiry-type" required>
            <option value="">Select Inquiry Type</option>
            <option value="tutoring">Tutoring Services</option>
            <option value="test-prep">Test Preparation</option>
            <option value="pricing">Pricing Information</option>
            <option value="other">Other</option>
          </select>
          <textarea name="message" placeholder="Your Message" required rows="5"></textarea>
          <motion.button type="submit" whileHover={{ scale: 1.05 }}>Send Message</motion.button>
        </form>
      </div>
    </Section>
  );
};

const ThankYou = () => (
  <Section 
    title="Thank You!" 
    subtitle="We've Received Your Submission"
    content={[
      "Thank you for reaching out to Aspire Academics. We will review your submission and get back to you within 24 hours.",
      "In the meantime, feel free to explore our services and resources."
    ]}
    imageUrl="thank-you.jpg"
  >
    <Link to="/" className="apply-button">Return Home</Link>
  </Section>
);

const HowItWorks = () => (
  <>
    <Section
      title="How It Works"
      subtitle="Your Path to Academic Excellence"
      content={[
        "Our streamlined process makes it easy to get started with personalized tutoring that fits your schedule and learning style.",
      ]}
      imageUrl="learning.jpg"
    />
    
    <motion.section 
      className="process-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="process-steps">
        <motion.div 
          className="process-step"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="step-number">1</div>
          <img src={`${process.env.PUBLIC_URL}/images/student1.jpg`} alt="Initial Consultation" className="step-image" />
          <h3>Initial Consultation</h3>
          <p>Schedule a free consultation to discuss your academic goals and challenges. We'll learn about your learning style and match you with the perfect tutor.</p>
        </motion.div>

        <motion.div 
          className="process-step"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="step-number">2</div>
          <img src={`${process.env.PUBLIC_URL}/images/student2.jpg`} alt="Personalized Plan" className="step-image" />
          <h3>Personalized Learning Plan</h3>
          <p>Your tutor creates a customized study plan targeting your specific needs and goals, incorporating proven teaching methods and materials.</p>
        </motion.div>

        <motion.div 
          className="process-step"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="step-number">3</div>
          <img src={`${process.env.PUBLIC_URL}/images/student3.jpg`} alt="Regular Sessions" className="step-image" />
          <h3>Regular Sessions</h3>
          <p>Attend regular one-on-one tutoring sessions, either online or in-person. Track your progress and adjust the plan as needed to ensure optimal results.</p>
        </motion.div>
      </div>

      <div className="process-features">
        <motion.div 
          className="feature"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <i className="fas fa-clock"></i>
          <h4>Flexible Scheduling</h4>
          <p>Choose from morning, afternoon, or evening sessions that fit your schedule</p>
        </motion.div>

        <motion.div 
          className="feature"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <i className="fas fa-video"></i>
          <h4>Online & In-Person</h4>
          <p>Select the learning format that works best for you</p>
        </motion.div>

        <motion.div 
          className="feature"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <i className="fas fa-chart-line"></i>
          <h4>Progress Tracking</h4>
          <p>Regular assessments and progress reports to measure improvement</p>
        </motion.div>
      </div>
    </motion.section>
  </>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tutors" element={<Tutors />} />
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