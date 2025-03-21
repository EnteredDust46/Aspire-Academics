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
        <img src={`${process.env.PUBLIC_URL}/images/hero-student.jpg`} alt="Student learning" className="hero-image" />
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
  <>
    <Section
      title="About Us"
      subtitle="Our Mission & Values"
      content={[
        "At Aspire Academics, we believe in helping every student strive to meet their full potential—regardless of background, experience, or learning style. Our goal is to provide personalized guidance that equips our students with all the tools they need to succeed academically and beyond."
      ]}
      imageUrl="about-us.jpg"
    />
    
    <motion.section 
      className="team-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2>Meet Our Founders</h2>
      <div className="team-grid">
        <motion.div 
          className="team-member"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/team1.jpg`} alt="Adam Kamenetsky" className="team-image" />
          <h3>Adam Kamenetsky</h3>
          <p className="team-title">Co-Founder</p>
          <p>Adam is a current freshman at the University of Florida majoring in aerospace engineering. In high school, he had a 4.41 GPA and scored a 1540 on his SATs, while also participating in Speech and Debate and DECA. In his free time, he enjoys eating sushi, going to the gym, and skiing.</p>
        </motion.div>
        
        <motion.div 
          className="team-member"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/team2.jpg`} alt="Meaghan Lu" className="team-image" />
          <h3>Meaghan Lu</h3>
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
      title="Services"
      subtitle="OUR SERVICES"
      content={[
        "Comprehensive Academic Support",
        "No matter what you need, we've got you covered! We offer personalized tutoring within a wide range of subjects—from standardized test prep to all your high school or middle school coursework."
      ]}
      imageUrl="services.jpg"
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
        <img src={`${process.env.PUBLIC_URL}/images/service1.jpg`} alt="Service" className="service-image" />
        <h3>Standardized Tests</h3>
        <p>Trusted guidance for the SAT & ACT, with proven strategies from tutors who've scored in the 99% and above.</p>
      </motion.div>
      
      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/service2.jpg`} alt="Service" className="service-image" />
        <h3>High School Coursework</h3>
        <p>Support in math (Algebra I, Geometry, Algebra II, Precalculus, Trigonometry, Calculus), sciences (Biology, Chemistry, Physics).</p>
      </motion.div>
      
      <motion.div 
        className="service-card"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/service3.jpg`} alt="Service" className="service-image" />
        <h3>Middle School Coursework</h3>
        <p>ELA, Math, Science, Social Studies</p>
      </motion.div>
    </motion.section>
  </>
);

const Tutors = () => (
  <>
    <Section
      title="Meet Our Tutors"
      subtitle="Expert Guidance from Dedicated Educators"
      content={[
        "Our tutors are selected for their academic excellence, teaching ability, and passion for helping students succeed.",
        "Our tutors are passionate, dedicated, and committed to helping you succeed. They have been carefully vetted—going through background checks and extensive training—to ensure you get the highest quality of instruction as well as mentors who truly care."
      ]}
      imageUrl="tutors.jpg"
    />
    
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
  </>
);

const Apply = () => (
  <Section
    title="Get Started with Aspire"
    subtitle="Choose Your Path"
    content={[
      "Whether you're looking to improve your grades, prepare for standardized tests, or share your knowledge as a tutor, we're here to help you succeed."
    ]}
    imageUrl="apply-bg.jpg"
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
    setError(null);
    
    // Format the preferred times for better readability
    const formattedTimes = preferredTimes.map(time => {
      const [day, hour] = time.split('-');
      const hourNum = parseInt(hour);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum);
      return `${day} at ${displayHour}:00 ${period}`;
    }).join(', ');
    
    // Add the formatted availability to a hidden field
    document.getElementById('formatted-availability').value = formattedTimes;
    
    // Add subjects as a comma-separated list to a hidden field
    document.getElementById('formatted-subjects').value = formData.subjects.join(', ');
    
    // Submit the form (FormSubmit.co will handle the submission)
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
          <input type="hidden" name="_next" value="https://aspireacademicstutoring.com/thank-you" />
          
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
              <option value="high-school">High School</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
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
          
          <div className="form-section" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h4>What subjects will you tutor?</h4>
            <div className="checkbox-group">
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
            <h4>Upload your resume</h4>
            <input 
              type="file" 
              name="resume" 
              accept=".pdf,.doc,.docx"
              required
            />
            <p className="form-help">Please upload your resume in PDF, DOC, or DOCX format.</p>
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

const Pricing = () => (
  <>
    <Section
      title="Tutoring Packages"
      subtitle="Invest in Your Academic Success"
      content={[
        "We offer competitive pricing with flexible packages to meet your needs. Choose the option that works best for you and start your journey to academic excellence.",
      ]}
      imageUrl="pricing-bg.jpg"
    />
    
    <motion.section 
      className="pricing-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="pricing-container">
        <motion.div 
          className="pricing-card"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="pricing-header">
            <h3>Single Session</h3>
            <img src={`${process.env.PUBLIC_URL}/images/single-session.jpg`} alt="Single tutoring session" className="pricing-image" />
          </div>
          <div className="pricing-content">
            <div className="price">$60<span>/hour</span></div>
            <ul className="pricing-features">
              <li>One-on-one personalized tutoring</li>
              <li>Flexible scheduling</li>
              <li>Expert tutors in your subject</li>
              <li>Online or in-person options</li>
              <li>No long-term commitment</li>
            </ul>
            <Link to="/apply-student" className="pricing-button">Get Started</Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="pricing-card featured"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="pricing-badge">Popular</div>
          <div className="pricing-header">
            <h3>5-Session Package</h3>
            <img src={`${process.env.PUBLIC_URL}/images/five-sessions.jpg`} alt="Five tutoring sessions" className="pricing-image" />
          </div>
          <div className="pricing-content">
            <div className="price">$55<span>/hour</span></div>
            <div className="savings">Save $25</div>
            <ul className="pricing-features">
              <li>All benefits of single sessions</li>
              <li>Consistent tutor assignment</li>
              <li>Progress tracking</li>
              <li>Discounted hourly rate</li>
              <li>Flexible session scheduling</li>
            </ul>
            <Link to="/apply-student" className="pricing-button">Get Started</Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="pricing-card"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="pricing-header">
            <h3>10-Session Package</h3>
            <img src={`${process.env.PUBLIC_URL}/images/ten-sessions.jpg`} alt="Ten tutoring sessions" className="pricing-image" />
          </div>
          <div className="pricing-content">
            <div className="price">$50<span>/hour</span></div>
            <div className="savings">Save $100</div>
            <ul className="pricing-features">
              <li>All benefits of 5-session package</li>
              <li>Comprehensive progress reports</li>
              <li>Best value hourly rate</li>
              <li>Priority scheduling</li>
              <li>Extended session availability</li>
            </ul>
            <Link to="/apply-student" className="pricing-button">Get Started</Link>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="referral-program"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="referral-content">
          <h3>Referral Program</h3>
          <p>Share the gift of learning! Refer a friend to Aspire Academics and you'll both benefit.</p>
          <div className="referral-benefits">
            <div className="benefit">
              <i className="fas fa-gift"></i>
              <h4>$5 Off Per Session</h4>
              <p>Get $5 off each session for 3 sessions ($15 total savings)</p>
            </div>
            <div className="benefit">
              <i className="fas fa-user-plus"></i>
              <h4>Easy to Share</h4>
              <p>Receive a unique referral code after signing up</p>
            </div>
            <div className="benefit">
              <i className="fas fa-infinity"></i>
              <h4>Unlimited Referrals</h4>
              <p>No limit to how many friends you can refer</p>
            </div>
          </div>
          <Link to="/apply-student" className="referral-button">Start Referring</Link>
        </div>
        <div className="referral-image-container">
          <img src={`${process.env.PUBLIC_URL}/images/referral-program.jpg`} alt="Students referring friends" className="referral-image" />
        </div>
      </motion.div>
    </motion.section>
  </>
);

const ApplyStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentEmail: '',
    studentPhone: '',
    grade: '',
    subjects: [],
    goals: '',
    referralCode: ''
  });
  const [preferredTimes, setPreferredTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedReferralCode, setGeneratedReferralCode] = useState('');
  
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
  
  const generateReferralCode = () => {
    const prefix = formData.name.split(' ')[0].substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Format the preferred times for better readability
    const formattedTimes = preferredTimes.map(time => {
      const [day, hour] = time.split('-');
      const hourNum = parseInt(hour);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum);
      return `${day} at ${displayHour}:00 ${period}`;
    }).join(', ');
    
    // Generate a referral code
    const newReferralCode = generateReferralCode();
    setGeneratedReferralCode(newReferralCode);
    
    // Add the formatted availability to a hidden field
    document.getElementById('student-formatted-availability').value = formattedTimes;
    
    // Add subjects as a comma-separated list to a hidden field
    document.getElementById('student-formatted-subjects').value = formData.subjects.join(', ');
    
    // Add the generated referral code to a hidden field
    document.getElementById('generated-referral-code').value = newReferralCode;
    
    // Submit the form (FormSubmit.co will handle the submission)
    const formElement = e.target;
    
    fetch(formElement.action, {
      method: 'POST',
      body: new FormData(formElement)
    })
    .then(response => {
      if (response.ok) {
        setIsSubmitting(false);
        setFormSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('There was a problem submitting your application. Please try again.');
      setIsSubmitting(false);
    });
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
        
        {formSubmitted ? (
          <div className="success-message">
            <h3>Thank you for your application!</h3>
            <p>We'll be in touch with you shortly to discuss the next steps.</p>
            <div className="referral-code-display">
              <h4>Your Referral Code</h4>
              <div className="code">{generatedReferralCode}</div>
              <p>Share this code with friends and you'll both receive $5 off per session for 3 sessions!</p>
            </div>
            <Link to="/" className="return-home-button">Return to Home</Link>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} action="https://formsubmit.co/admin@aspireacademicstutoring.com" method="POST">
            {/* Hidden fields for FormSubmit.co */}
            <input type="hidden" name="_subject" value="New Student Application" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://aspireacademicstutoring.com/thank-you" />
            
            {/* Hidden fields for formatted data */}
            <input type="hidden" id="student-formatted-availability" name="availability" />
            <input type="hidden" id="student-formatted-subjects" name="subjects" />
            <input type="hidden" id="generated-referral-code" name="generatedReferralCode" />
            
            <div className="form-row">
              <input 
                type="text" 
                name="name" 
                placeholder="Student Name" 
                required 
                value={formData.name}
                onChange={handleInputChange}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Parent Email" 
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-row">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Parent Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
              />
              <select 
                name="grade" 
                value={formData.grade}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Grade Level</option>
                <option value="elementary">Elementary School</option>
                <option value="middle">Middle School</option>
                <option value="high-9">High School - 9th Grade</option>
                <option value="high-10">High School - 10th Grade</option>
                <option value="high-11">High School - 11th Grade</option>
                <option value="high-12">High School - 12th Grade</option>
                <option value="college">College</option>
                <option value="adult">Adult Learner</option>
              </select>
            </div>
            
            <div className="form-row">
              <input 
                type="email" 
                name="studentEmail" 
                placeholder="Student Email (if different)" 
                value={formData.studentEmail}
                onChange={handleInputChange}
              />
              <input 
                type="tel" 
                name="studentPhone" 
                placeholder="Student Phone Number (if different)" 
                value={formData.studentPhone}
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
              <div className="referral-info">
                <i className="fas fa-info-circle"></i>
                <span>Have a friend's referral code? Enter it here for $5 off per session for 3 sessions!</span>
              </div>
            </div>
            
            <div className="form-section" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <h4>What subjects do you need help with?</h4>
              <div className="checkbox-group">
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
                <label>
                  <input 
                    type="checkbox" 
                    name="subject-ms-math" 
                    value="Middleschool Math" 
                    checked={formData.subjects.includes('Middleschool Math')}
                    onChange={handleSubjectChange}
                  />
                  Middleschool Math
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    name="subject-ms-science" 
                    value="Middleschool Science" 
                    checked={formData.subjects.includes('Middleschool Science')}
                    onChange={handleSubjectChange}
                  />
                  Middleschool Science
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
        )}
      </div>
    </motion.section>
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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}