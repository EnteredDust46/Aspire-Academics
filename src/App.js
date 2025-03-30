import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
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
import coolBackground from './assets/cool-background.png';

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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Link to="/" className="logo-container">
        <img src={logo} alt="Aspire Academics" className="logo-image" />
      </Link>
      <motion.button 
        className="mobile-menu-button" 
        onClick={toggleMobileMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </motion.button>
      <motion.div 
        className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}
        initial={false}
        animate={{ 
          right: mobileMenuOpen ? 0 : '-100%',
          opacity: mobileMenuOpen ? 1 : 0.8
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 40
        }}
      >
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
        <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
        <Link to="/tutors" onClick={() => setMobileMenuOpen(false)}>Meet Our Tutors</Link>
        <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
        <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
        <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
      </motion.div>
    </motion.nav>
  );
};

const Section = ({ title, content, imageUrl, children, subtitle, className }) => {
  // Forced unique image assignment - completely hardcoded for reliability
  let actualImageSrc;
  
  // First determine exactly which section this is
  if (title === "About Us") {
    actualImageSrc = `${process.env.PUBLIC_URL}/images/about-mission.jpg`;
  } 
  else if (title === "Our Services") {
    actualImageSrc = `${process.env.PUBLIC_URL}/images/services-banner.jpg`;
  } 
  else if (title === "Meet Our Tutors") {
    actualImageSrc = `${process.env.PUBLIC_URL}/images/tutors-banner.jpg`;
  } 
  else if (title === "How It Works") {
    actualImageSrc = `${process.env.PUBLIC_URL}/images/howitworks-banner.jpg`;
  } 
  else if (title === "Get Started with Aspire") {
    actualImageSrc = `${process.env.PUBLIC_URL}/images/apply-banner.jpg`;
  } 
  else if (title === "Contact Us") {
    actualImageSrc = `${process.env.PUBLIC_URL}/images/contact-banner.jpg`;
  }
  else {
    // Fallback to using the passed imageUrl prop
    actualImageSrc = `${process.env.PUBLIC_URL}/images/${imageUrl}`;
  }
  
  // Debug logging
  console.log(`Section "${title}" using image: ${actualImageSrc}`);
  
  return (
    <motion.section
      className={`section ${className || ''}`}
      style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-light))' }}
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <div className="section-content-wrapper">
        <motion.h2 whileHover={{ scale: 1.05 }}>{title}</motion.h2>
        {subtitle && <motion.h3>{subtitle}</motion.h3>}
        {(
          <div className="section-image-container">
            {/* Add random query parameter to force image reload and prevent caching */}
            <img 
              src={`${actualImageSrc}?nocache=${new Date().getTime()}`} 
              alt={title} 
              className={`section-image ${title === "Simple, Transparent Pricing" ? "pricing-rounded-image" : ""}`} 
            />
          </div>
        )}
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
};

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
          Achieve More With Aspire
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-subtitle"
        >
          At Aspire Academics, we know how to put ourselves in your shoes—after all, we were in them just a couple years ago!
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to="/apply-student" className="cta-button primary">Become a Student</Link>
          <Link to="/services" className="cta-button secondary">Learn More</Link>
        </motion.div>
      </div>
      <motion.div 
        className="hero-image-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/home-hero.jpg`} alt="Student learning" className="hero-image" />
      </motion.div>
    </motion.section>

    <motion.section 
      className="welcome-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-content-wrapper">
        <h2>Welcome to Aspire Academics</h2>
        <p>Our tutors aren't just awesome at the subjects they teach—they're also high school and college students who aced the same classes and standardized tests while juggling hours of extracurriculars, just like you. We know what it's like to be busy, and we're here to make your learning efficient, engaging, and empowering.</p>
        <p>We believe every student has the potential to excel. Our personalized tutoring approach focuses on building confidence, developing strong study habits, and achieving academic success. Our experienced tutors work one-on-one with students to identify their unique learning styles and create customized study plans that deliver results.</p>
      </div>
    </motion.section>

    <motion.section 
      className="features-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-content-wrapper">
        <h2>Why Choose Aspire?</h2>
        <p>Our tutors aren't just teachers—they're mentors. We know the shortcuts, tricks, and best ways to master material because we've been there ourselves. Whether you need help breaking down tough concepts, staying motivated, or balancing school with extracurriculars, we're here to help in any way we can.</p>
        <p>With flexible scheduling, competitive pricing, and approachable tutors, Aspire Academics makes learning feel like an opportunity to grow—not just as a chore.</p>
      </div>
      <div className="features-grid">
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <i className="fas fa-graduation-cap"></i>
          <h3>Expert Tutors</h3>
          <p>Learn from experienced educators passionate about student success!</p>
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
      <div className="get-started-section">
        <div className="section-content-wrapper">
          <h2>Get Started Today!</h2>
          <p>Ready to achieve more? Click below to begin your journey with Aspire Academics.</p>
          <Link to="/apply-student" className="cta-button primary">Get Started</Link>
        </div>
      </div>
    </motion.section>

    <motion.section 
      className="stats-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="westford-founders">
        <motion.h3
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{ color: 'black !important' }}
        >
          Started by students that went to Westford Academy!
        </motion.h3>
      </div>
    </motion.section>
  </>
);

const About = () => (
  <>
    <Section
      title="About Us"
      subtitle="Our Mission"
      content={[
        "Aspire Academics was founded with a simple goal: to provide high-quality, personalized tutoring that helps students reach their full potential.",
        "Our team of experienced tutors is passionate about education and committed to helping students build confidence and achieve academic success."
      ]}
      imageUrl="about-mission.jpg"
      className="about-section"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/about-mission.jpg)` }}
    />
    
    <motion.section 
      className="team-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 style={{ color: 'var(--text-dark)' }}>Meet Our Founders</h2>
      <div className="team-grid">
        <motion.div 
          className="team-member"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/about-adam.jpg`} alt="Adam Kamenetsky" className="team-image" />
          <h3 style={{ color: 'var(--primary-color)' }}>Adam Kamenetsky</h3>
          <p className="team-title">Co-Founder</p>
          <p>Adam is a current freshman at the University of Florida majoring in aerospace engineering. In high school, he had a 4.41 GPA and scored a 1540 on his SATs, while also participating in Speech and Debate and DECA. In his free time, he enjoys eating sushi, going to the gym, and skiing.</p>
        </motion.div>
        
        <motion.div 
          className="team-member"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/about-meaghan.jpg`} alt="Meaghan Lu" className="team-image" />
          <h3 style={{ color: 'var(--primary-color)' }}>Meaghan Lu</h3>
          <p className="team-title">Co-Founder</p>
          <p>Meaghan is a current freshman at the University of Michigan majoring in statistics. In high school, she had a 4.39 GPA and scored 1540 on her SATs, while also being involved in DECA, cross country, and Book Club. In her free time, she enjoys baking, finding new places to eat, and watching Modern Family.</p>
        </motion.div>
      </div>
    </motion.section>
  </>
);

const Services = () => (
  <>
    <Section
      title="Our Services"
      subtitle="Personalized Learning Solutions"
      content={[
        "We offer comprehensive tutoring services across a wide range of subjects and grade levels.",
        "Whether you're looking for help with standardized test prep, specific subject tutoring, or general academic support, our experienced tutors are here to help."
      ]}
      imageUrl="services-banner.jpg"
      className="services-section"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/services-banner.jpg)` }}
    />
    
    <motion.section 
      className="services-grid"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/services-tests.jpg`} alt="Standardized Tests" className="service-image" />
        <h3>Standardized Tests</h3>
        <p>Trusted guidance for the SAT & ACT, with proven strategies from tutors who've scored in the 99% and above.</p>
      </motion.div>
      
      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/services-highschool.jpg`} alt="High School Coursework" className="service-image" />
        <h3>High School Coursework</h3>
        <p style={{lineHeight: '1.6', fontSize: '0.95rem', color: '#333', textAlign: 'left'}}>
          Comprehensive instruction in mathematics (Algebra I, Geometry, Algebra II, Precalculus, Trigonometry, Calculus) and sciences (Biology, Chemistry, Physics) designed to enhance academic performance and conceptual understanding.
        </p>
      </motion.div>
      
      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/services-middleschool.jpg`} alt="Middle School Coursework" className="service-image" />
        <h3>Middle School Coursework</h3>
        <p style={{lineHeight: '1.6', fontSize: '0.95rem', color: '#333', textAlign: 'left'}}>
          Structured academic support in core curriculum areas including English Language Arts, Mathematics, Science, and Social Studies tailored to middle school students' developmental needs.
        </p>
      </motion.div>
    </motion.section>
  </>
);

const Tutors = () => (
  <>
    <Section
      title="Meet Our Tutors"
      subtitle="Expert Educators"
      content={[
        "Our tutors are carefully selected for their academic excellence, teaching ability, and passion for helping students succeed.",
        "With diverse backgrounds and specialties, we match each student with the perfect tutor for their needs."
      ]}
      imageUrl="tutors-banner.jpg"
    />
    
    <div className="tutors-grid">
      <motion.div 
        className="tutor-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/tutors-math.jpg`} alt="Math & Science Tutor" className="tutor-image" />
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
        <img src={`${process.env.PUBLIC_URL}/images/tutors-english.jpg`} alt="English & Literature Tutor" className="tutor-image" />
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
        <img src={`${process.env.PUBLIC_URL}/images/tutors-test.jpg`} alt="Test Prep Specialist" className="tutor-image" />
        <div className="tutor-info">
          <h3>Ms. Amanda Torres</h3>
          <h4>Test Prep Specialist</h4>
          <p>B.S. in Education | Certified Test Prep Instructor</p>
          <p>Specializes in SAT, ACT, and GRE Preparation</p>
        </div>
      </motion.div>
    </div>
  </>
);

const Apply = () => (
  <Section
    title="Get Started with Aspire"
    subtitle="Choose Your Path"
    content={[
      "Whether you're looking to improve your grades, prepare for standardized tests, or share your knowledge as a tutor, we're here to help you succeed."
    ]}
    imageUrl="apply-banner.jpg"
  >
    <div className="apply-buttons">
      <Link to="/apply-student" className="apply-button">Become a Student</Link>
      <Link to="/apply-tutor" className="apply-button">Become a Tutor</Link>
    </div>
  </Section>
);

const ApplyTutor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    educationLevel: '',
    experience: '',
    subjects: [],
  });
  const [preferredTimes, setPreferredTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, value]
      });
    } else {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter(subject => subject !== value)
      });
    }
  };
  
  const handleScheduleChange = (times) => {
    setPreferredTimes(times);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format the preferred times for the hidden field
    const formattedTimes = condenseTimes(preferredTimes);
    document.getElementById('formatted-availability').value = formattedTimes;
    
    // Format the subjects for the hidden field
    document.getElementById('formatted-subjects').value = formData.subjects.join(', ');
    
    // Submit the form directly to FormSubmit.co
    e.target.submit();
  };
  
  return (
    <motion.section 
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-content-wrapper">
        <h2>Apply to Become a Tutor</h2>
        <p>Join our team of dedicated educators and make a difference in students' lives.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="form" onSubmit={handleSubmit} action="https://formsubmit.co/admin@aspireacademicstutoring.com" method="POST" encType="multipart/form-data">
          {/* Hidden fields for FormSubmit.co */}
          <input type="hidden" name="_subject" value="New Tutor Application" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://aspireacademicstutoring.com/thank-you.html" />
          
          {/* Hidden fields for formatted data */}
          <input type="hidden" id="formatted-availability" name="availability" />
          <input type="hidden" id="formatted-subjects" name="subjects" />
          
          <div className="form-row">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-row">
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={handleInputChange}
            />
            <select 
              name="educationLevel" 
              value={formData.educationLevel}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Education Level</option>
              <option value="college">In College</option>
              <option value="grade12">Grade 12</option>
              <option value="grade11">Grade 11</option>
              <option value="grade10">Grade 10</option>
              <option value="grade9">Grade 9</option>
            </select>
          </div>
          
          <div className="form-row">
            <textarea 
              name="experience" 
              placeholder="Describe your tutoring experience and qualifications" 
              required
              value={formData.experience}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="form-section" style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
            color: 'var(--text-dark)'
          }}>
            <h4 style={{ color: 'var(--primary-dark)' }}>What subjects will you tutor?</h4>
            <div className="checkbox-group" style={{ color: 'var(--text-dark)' }}>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-sat" 
                  value="SAT" 
                  checked={formData.subjects.includes('SAT')}
                  onChange={handleSubjectChange}
                />
                SAT
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-ms" 
                  value="Middle School" 
                  checked={formData.subjects.includes('Middle School')}
                  onChange={handleSubjectChange}
                />
                Middle School
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-biology" 
                  value="Highschool Biology" 
                  checked={formData.subjects.includes('Highschool Biology')}
                  onChange={handleSubjectChange}
                />
                Highschool Biology
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-chemistry" 
                  value="Highschool Chemistry" 
                  checked={formData.subjects.includes('Highschool Chemistry')}
                  onChange={handleSubjectChange}
                />
                Highschool Chemistry
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-physics" 
                  value="Highschool Physics" 
                  checked={formData.subjects.includes('Highschool Physics')}
                  onChange={handleSubjectChange}
                />
                Highschool Physics
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-geometry" 
                  value="Highschool Geometry" 
                  checked={formData.subjects.includes('Highschool Geometry')}
                  onChange={handleSubjectChange}
                />
                Highschool Geometry
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-algebra1" 
                  value="Highschool Algebra 1" 
                  checked={formData.subjects.includes('Highschool Algebra 1')}
                  onChange={handleSubjectChange}
                />
                Highschool Algebra 1
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-algebra2" 
                  value="Highschool Algebra 2" 
                  checked={formData.subjects.includes('Highschool Algebra 2')}
                  onChange={handleSubjectChange}
                />
                Highschool Algebra 2
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-trig" 
                  value="Highschool Trigonometry" 
                  checked={formData.subjects.includes('Highschool Trigonometry')}
                  onChange={handleSubjectChange}
                />
                Highschool Trigonometry
              </label>
            </div>
          </div>
          
          <div className="form-section">
            <h4>Upload your resume (Optional)</h4>
            <input 
              type="file" 
              name="resume" 
              accept=".pdf,.doc,.docx"
            />
            <p className="form-help">If available, please upload your resume in PDF, DOC, or DOCX format. This is optional but helps us better understand your background.</p>
          </div>
          
          <div className="form-section">
            <h4>When are you available to tutor?</h4>
            <p>Select times that work best for your schedule</p>
            <WeeklySchedule 
              setPreferredTimes={setPreferredTimes}
              onScheduleChange={handleScheduleChange}
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

const ApplyStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentEmail: '',
    studentPhone: '',
    grade: '',
    subjects: [],
    referralCode: '',
    message: '',
    preferredTimes: [],
    pricingPlan: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for pricing plan in URL params on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planParam = searchParams.get('plan');
    if (planParam) {
      setFormData(prevData => ({
        ...prevData,
        pricingPlan: planParam
      }));
    }
  }, [location]);
  
  // Helper function to generate a random referral code
  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, value]
      });
    } else {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter(subject => subject !== value)
      });
    }
  };
  
  const handleScheduleChange = (selectedTimes) => {
    setFormData({
      ...formData,
      preferredTimes: selectedTimes
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate a unique referral code for this student
    const newReferralCode = generateReferralCode();
    
    // Set the generated referral code in the hidden input
    document.getElementById('generated-referral-code').value = newReferralCode;
    
    // Format the preferred times for the hidden field
    const formattedTimes = condenseTimes(formData.preferredTimes);
    document.getElementById('student-formatted-availability').value = formattedTimes;
    
    // Format the subjects for the hidden field
    document.getElementById('student-formatted-subjects').value = formData.subjects.join(', ');
    
    // Store the generated referral code in local storage for the thank you page
    localStorage.setItem('userReferralCode', newReferralCode);
    
    // Submit the form directly to FormSubmit.co
    e.target.submit();
  };
  
  return (
    <motion.section 
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-content-wrapper">
        <h2>Apply for Tutoring</h2>
        <p>Take the first step toward academic success by applying for tutoring services.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="form" onSubmit={handleSubmit} action="https://formsubmit.co/admin@aspireacademicstutoring.com" method="POST">
          {/* Hidden fields for FormSubmit.co */}
          <input type="hidden" name="_subject" value="New Student Application" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://aspireacademicstutoring.com/thank-you-student.html" />
          
          {/* Hidden fields for formatted data */}
          <input type="hidden" id="student-formatted-availability" name="availability" />
          <input type="hidden" id="student-formatted-subjects" name="subjects" />
          <input type="hidden" id="generated-referral-code" name="generatedReferralCode" />
          <input type="hidden" name="pricingPlan" value={formData.pricingPlan} />
          
          <div className="form-row">
            <input 
              type="text" 
              name="name" 
              placeholder="Student Name" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-row">
            <input 
              type="email" 
              name="studentEmail" 
              placeholder="Student Email (if applicable)" 
              value={formData.studentEmail}
              onChange={handleInputChange}
            />
            <input 
              type="tel" 
              name="studentPhone" 
              placeholder="Student Phone (if applicable)" 
              value={formData.studentPhone}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-section">
            <h4>Parent/Guardian Information</h4>
          </div>
          
          <div className="form-row">
            <input 
              type="email" 
              name="email" 
              placeholder="Parent Email" 
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Parent Phone Number" 
              required
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-row">
            <input 
              type="text" 
              name="referralCode" 
              placeholder="Referral Code (if you have one)" 
              value={formData.referralCode}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-row">
            <select
              name="pricingPlan"
              value={formData.pricingPlan}
              onChange={handleInputChange}
              required
              className="pricing-plan-select"
            >
              <option value="">Select a Pricing Plan</option>
              <option value="single">Single Session - $60/hour</option>
              <option value="five-pack">5-Session Package - $55/hour (Save $25)</option>
              <option value="ten-pack">10-Session Package - $50/hour (Save $100)</option>
            </select>
          </div>
          
          <div className="form-section" style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
            color: 'var(--text-dark)'
          }}>
            <h4 style={{ color: 'var(--primary-dark)' }}>What subjects do you need help with?</h4>
            <div className="checkbox-group" style={{ color: 'var(--text-dark)' }}>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-sat" 
                  value="SAT" 
                  checked={formData.subjects.includes('SAT')}
                  onChange={handleCheckboxChange}
                />
                SAT
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-ms" 
                  value="Middle School" 
                  checked={formData.subjects.includes('Middle School')}
                  onChange={handleCheckboxChange}
                />
                Middle School
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-biology" 
                  value="Highschool Biology" 
                  checked={formData.subjects.includes('Highschool Biology')}
                  onChange={handleCheckboxChange}
                />
                Highschool Biology
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-chemistry" 
                  value="Highschool Chemistry" 
                  checked={formData.subjects.includes('Highschool Chemistry')}
                  onChange={handleCheckboxChange}
                />
                Highschool Chemistry
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-physics" 
                  value="Highschool Physics" 
                  checked={formData.subjects.includes('Highschool Physics')}
                  onChange={handleCheckboxChange}
                />
                Highschool Physics
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-geometry" 
                  value="Highschool Geometry" 
                  checked={formData.subjects.includes('Highschool Geometry')}
                  onChange={handleCheckboxChange}
                />
                Highschool Geometry
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-algebra1" 
                  value="Highschool Algebra 1" 
                  checked={formData.subjects.includes('Highschool Algebra 1')}
                  onChange={handleCheckboxChange}
                />
                Highschool Algebra 1
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-algebra2" 
                  value="Highschool Algebra 2" 
                  checked={formData.subjects.includes('Highschool Algebra 2')}
                  onChange={handleCheckboxChange}
                />
                Highschool Algebra 2
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="subject-hs-trig" 
                  value="Highschool Trigonometry" 
                  checked={formData.subjects.includes('Highschool Trigonometry')}
                  onChange={handleCheckboxChange}
                />
                Highschool Trigonometry
              </label>
            </div>
          </div>
          
          <div className="form-row">
            <textarea 
              name="goals" 
              placeholder="What are your academic goals? Any specific areas you're struggling with?" 
              value={formData.goals}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="form-section">
            <h4>When are you available for tutoring?</h4>
            <p>Select times that work best for your schedule</p>
            <WeeklySchedule 
              onScheduleChange={handleScheduleChange}
              selectedTimes={formData.preferredTimes}
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Thank you for your submission!";
  const details = location.state?.details || "We'll be in touch soon.";
  
  // Get the referral code from localStorage if it exists
  const [referralCode, setReferralCode] = useState('');
  
  useEffect(() => {
    // Check if there's a referral code in localStorage
    const storedCode = localStorage.getItem('userReferralCode');
    if (storedCode) {
      setReferralCode(storedCode);
      // Clear the code from storage after retrieval to avoid showing it for other forms
      localStorage.removeItem('userReferralCode');
    }
  }, []);
  
  return (
    <motion.section 
      className="thank-you-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="thank-you-container">
        <motion.div 
          className="thank-you-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <i className="fas fa-check-circle"></i>
          <h2>{message}</h2>
          <p>{details}</p>
          
          {referralCode && (
            <motion.div 
              className="referral-code-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3>Your Referral Code</h3>
              <div className="referral-code">{referralCode}</div>
              <p>Share this code with friends to give them a discount on their first sessions!</p>
            </motion.div>
          )}
          
          <motion.button 
            className="return-home-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Home
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

const HowItWorks = () => (
  <>
    <Section
      title="How It Works"
      subtitle="Your Path to Academic Success"
      content={[
        "Our tutoring process is designed to be simple, effective, and tailored to your needs.",
        "From the initial consultation to ongoing sessions, we focus on creating a supportive learning environment that helps students thrive."
      ]}
      imageUrl="howitworks-banner.jpg"
      className="howitworks-section"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/howitworks-banner.jpg)` }}
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
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/howitworks-apply.jpg`} alt="Apply for tutoring" className="process-image" />
          <h3>1. Apply</h3>
          <p>Fill out our simple application form to tell us about your tutoring needs and schedule preferences.</p>
        </motion.div>
        
        <motion.div 
          className="process-step"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/howitworks-match.jpg`} alt="Get matched with a tutor" className="process-image" />
          <h3>2. Get Matched</h3>
          <p>We'll pair you with the perfect tutor based on your subject needs, learning style, and availability.</p>
        </motion.div>
        
        <motion.div 
          className="process-step"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/howitworks-learn.jpg`} alt="Start learning" className="process-image" />
          <h3>3. Start Learning</h3>
          <p>Begin your personalized tutoring sessions and watch your academic confidence and performance improve.</p>
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

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.div 
        className="pricing-section" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="pricing-container">
          <motion.div 
            className="pricing-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that best fits your tutoring needs and academic goals.</p>
            <div className="section-image-container">
              <img 
                src={`${process.env.PUBLIC_URL}/images/pricing-banner.jpg?nocache=${new Date().getTime()}`} 
                alt="Pricing" 
                className="section-image pricing-rounded-image" 
              />
            </div>
          </motion.div>
          
          <div className="pricing-cards">
            {/* Single Session Card */}
            <motion.div 
              className="pricing-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="pricing-image-container">
                <img src={`${process.env.PUBLIC_URL}/images/pricing-single.jpg`} alt="Single Session" className="pricing-image" />
              </div>
              
              <div className="pricing-card-header">
                <h3 className="pricing-title">Single Session</h3>
                <div className="price-container">
                  <span className="currency">$</span>
                  <span className="price">60</span>
                </div>
                <span className="price-period">/hour</span>
              </div>
              
              <div className="pricing-card-content">
                <ul className="pricing-features">
                  <li>One-on-one personalized tutoring</li>
                  <li>Flexible scheduling</li>
                  <li>Expert tutors in your subject</li>
                  <li>Online or in-person options</li>
                  <li>Comprehensive session reports</li>
                </ul>
              </div>
              
              <div className="pricing-card-footer">
                <button 
                  className="pricing-button"
                  onClick={() => navigate('/apply-student?plan=single')}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
            
            {/* 5-Session Package Card */}
            <motion.div 
              className="pricing-card featured"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="pricing-image-container">
                <img src={`${process.env.PUBLIC_URL}/images/pricing-five.jpg`} alt="5-Session Package" className="pricing-image" />
              </div>
              
              <div className="pricing-card-header">
                <h3 className="pricing-title">5-Session Package</h3>
                <div className="price-container">
                  <span className="currency">$</span>
                  <span className="price">55</span>
                </div>
                <span className="price-period">/hour</span>
                <div className="savings-tag">Save $25</div>
              </div>
              
              <div className="pricing-card-content">
                <ul className="pricing-features">
                  <li>One-on-one personalized tutoring</li>
                  <li>Flexible scheduling</li>
                  <li>Expert tutors in your subject</li>
                  <li>Online or in-person options</li>
                  <li>Comprehensive session reports</li>
                </ul>
              </div>
              
              <div className="pricing-card-footer">
                <button 
                  className="pricing-button"
                  onClick={() => navigate('/apply-student?plan=five-pack')}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
            
            {/* 10-Session Package Card */}
            <motion.div 
              className="pricing-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="pricing-image-container">
                <img src={`${process.env.PUBLIC_URL}/images/pricing-ten.jpg`} alt="10-Session Package" className="pricing-image" />
              </div>
              
              <div className="pricing-card-header">
                <h3 className="pricing-title">10-Session Package</h3>
                <div className="price-container">
                  <span className="currency">$</span>
                  <span className="price">50</span>
                </div>
                <span className="price-period">/hour</span>
                <div className="savings-tag">Save $100</div>
              </div>
              
              <div className="pricing-card-content">
                <ul className="pricing-features">
                  <li>One-on-one personalized tutoring</li>
                  <li>Flexible scheduling</li>
                  <li>Expert tutors in your subject</li>
                  <li>Online or in-person options</li>
                  <li>Comprehensive session reports</li>
                </ul>
              </div>
              
              <div className="pricing-card-footer">
                <button 
                  className="pricing-button"
                  onClick={() => navigate('/apply-student?plan=ten-pack')}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Referral Program */}
          <motion.div 
            className="referral-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="referral-container">
              <div className="referral-header">
                <h2>Share the Gift of Learning</h2>
                <p>Refer a friend to Aspire Academics and you'll both benefit.</p>
                <p className="referral-disclaimer">
                  <strong>Note:</strong> The $5 discount applies only to your first referral. 
                  Additional referrals will benefit your friends with their discount, but will not 
                  provide additional discounts for you.
                </p>
              </div>
              
              <div className="referral-benefits">
                <motion.div 
                  className="referral-benefit"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="referral-benefit-icon">💰</div>
                  <h3>$5 Off Per Session</h3>
                  <p>Get $5 off each session for 3 sessions ($15 total savings)</p>
                </motion.div>
                
                <motion.div 
                  className="referral-benefit"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="referral-benefit-icon">🔗</div>
                  <h3>Easy to Share</h3>
                  <p>Receive a unique referral code after signing up</p>
                </motion.div>
                
                <motion.div 
                  className="referral-benefit"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="referral-benefit-icon">♾️</div>
                  <h3>Unlimited Referrals</h3>
                  <p>No limit to how many friends you can refer</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    // Let the form submit directly to FormSubmit.co without preventing default
    setIsSubmitting(true);
    
    // No need to prevent default or use fetch API - let the form submit naturally
    // The form will be redirected to the thank-you page by FormSubmit.co
  };
  
  return (
    <Section
      title="Contact Us"
      subtitle="We're Here to Help"
      content={[
        "Have questions about our tutoring services? Reach out to us and we'll get back to you as soon as possible.",
      ]}
      imageUrl="contact-banner.jpg"
      className="contact-section"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/contact-banner.jpg)` }}
    >
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-method">
            <i className="fas fa-phone"></i>
            <h4>Phone</h4>
            <p><a href="tel:978-483-1649">978-483-1649</a></p>
            <p><a href="tel:978-727-7396">978-727-7396</a></p>
          </div>
          <div className="contact-method">
            <i className="fas fa-envelope"></i>
            <h4>Email</h4>
            <p><a href="mailto:admin@aspireacademicstutoring.com">admin@aspireacademicstutoring.com</a></p>
          </div>
          <div className="contact-method">
            <i className="fas fa-map-marker-alt"></i>
            <h4>Location</h4>
            <p>Westford, MA</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form className="contact-form" action="https://formsubmit.co/admin@aspireacademicstutoring.com" method="POST">
            {/* Hidden fields for FormSubmit.co */}
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://aspireacademicstutoring.com/thank-you.html" />
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-row">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={handleInputChange}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-row">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number (Optional)" 
                value={formData.phone}
                onChange={handleInputChange}
              />
              <select 
                name="inquiryType" 
                value={formData.inquiryType}
                onChange={handleInputChange}
              >
                <option value="general">General Inquiry</option>
                <option value="tutoring">Tutoring Information</option>
                <option value="pricing">Pricing Questions</option>
                <option value="technical">Technical Support</option>
              </select>
            </div>
            
            <textarea 
              name="message" 
              placeholder="Your Message" 
              required
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default function App() {
  // This ensures the coolBackground is applied directly to the body on mount
  useEffect(() => {
    // First, directly set the background styles
    document.body.style.backgroundImage = `url(${coolBackground}), linear-gradient(135deg, #519399 0%, #67bcc4 50%, #ffffff 100%)`;
    document.body.style.backgroundBlendMode = 'overlay';
    document.body.style.backgroundSize = 'cover, 100% 100%';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    
    // For cleanup when component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundBlendMode = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

// Add a helper function to condense consecutive time slots
const condenseTimes = (timeSlots) => {
  if (!timeSlots || timeSlots.length === 0) return '';
  
  // Sort the time slots by day and hour
  const sortedSlots = [...timeSlots].sort();
  
  // Group by day
  const dayGroups = {};
  sortedSlots.forEach(slot => {
    const [day, hour] = slot.split('-');
    if (!dayGroups[day]) {
      dayGroups[day] = [];
    }
    dayGroups[day].push(parseInt(hour));
  });
  
  // Format each day's times
  const formattedGroups = [];
  Object.keys(dayGroups).forEach(day => {
    const hours = dayGroups[day].sort((a, b) => a - b);
    
    // Find consecutive ranges
    const ranges = [];
    let rangeStart = hours[0];
    let rangeEnd = hours[0];
    
    for (let i = 1; i < hours.length; i++) {
      if (hours[i] === rangeEnd + 1) {
        // Continue the current range
        rangeEnd = hours[i];
      } else {
        // End the current range and start a new one
        ranges.push([rangeStart, rangeEnd]);
        rangeStart = hours[i];
        rangeEnd = hours[i];
      }
    }
    // Add the last range
    ranges.push([rangeStart, rangeEnd]);
    
    // Format the ranges
    const formattedRanges = ranges.map(([start, end]) => {
      if (start === end) {
        // Single hour
        const period = start >= 12 ? 'PM' : 'AM';
        const displayHour = start > 12 ? start - 12 : (start === 0 ? 12 : start);
        return `${displayHour}:00 ${period}`;
      } else {
        // Range of hours
        const startPeriod = start >= 12 ? 'PM' : 'AM';
        const endPeriod = end >= 12 ? 'PM' : 'AM';
        const displayStartHour = start > 12 ? start - 12 : (start === 0 ? 12 : start);
        const displayEndHour = end > 12 ? end - 12 : (end === 0 ? 12 : end);
        
        if (startPeriod === endPeriod) {
          return `${displayStartHour}:00-${displayEndHour}:00 ${endPeriod}`;
        } else {
          return `${displayStartHour}:00 ${startPeriod}-${displayEndHour}:00 ${endPeriod}`;
        }
      }
    });
    
    formattedGroups.push(`${day}: ${formattedRanges.join(', ')}`);
  });
  
  return formattedGroups.join('; ');
};