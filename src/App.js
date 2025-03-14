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
        <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
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
    subtitle="Join our community of learners and educators"
    content={[
      "Ready to enhance your academic journey? Choose the option that fits your needs.",
    ]}
    imageUrl="apply-bg.jpg"
  >
    <div className="apply-buttons">
      <Link to="/apply-student" className="apply-button">Become a Student</Link>
      <Link to="/apply-tutor" className="apply-button">Join Our Tutoring Team</Link>
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
    availability: ''
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

  const handleSubjectsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      subjects: selectedOptions
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Format the preferred times in a condensed way by grouping by day
    const timesByDay = {};
    
    // Group times by day
    preferredTimes.forEach(time => {
      const [day, hour] = time.split('-');
      if (!timesByDay[day]) {
        timesByDay[day] = [];
      }
      timesByDay[day].push(parseInt(hour));
    });
    
    // Format each day's times in a condensed way
    const formattedTimes = Object.entries(timesByDay).map(([day, hours]) => {
      // Sort hours
      hours.sort((a, b) => a - b);
      
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
      
      // Format each range
      const formattedRanges = ranges.map(([start, end]) => {
        const startPeriod = start >= 12 ? 'PM' : 'AM';
        const endPeriod = end >= 12 ? 'PM' : 'AM';
        const displayStart = start > 12 ? start - 12 : (start === 0 ? 12 : start);
        const displayEnd = end > 12 ? end - 12 : (end === 0 ? 12 : end);
        
        if (start === end) {
          return `${displayStart}${startPeriod}`;
        } else {
          return `${displayStart}${startPeriod}-${displayEnd}${endPeriod}`;
        }
      });
      
      return `${day}: ${formattedRanges.join(', ')}`;
    });
    
    try {
      // Use Web3Forms for the form data (which works well)
      const submissionData = {
        access_key: '0e051380-5394-4e26-8ffd-af5cc378e7b6',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        educationLevel: formData.educationLevel,
        experience: formData.experience,
        subjects: formData.subjects.join(', '),
        preferredTimes: formattedTimes.join(', '),
        availability: formData.availability,
        applicationType: 'tutor',
        from_name: 'Aspire Academics Website',
        subject: `New Tutor Application: ${formData.name}`,
        resume_note: 'Resume sent separately via FormSubmit',
        to_email: 'admin@aspireacademicstutoring.com'
      };
    
      // Submit the form data to Web3Forms
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })
      .then(async (response) => {
        const data = await response.json();
        
        if (data.success) {
          // Now handle the resume separately with FormSubmit
          const resumeInput = document.querySelector('input[name="resume"]');
          if (resumeInput && resumeInput.files && resumeInput.files[0]) {
            // Create a proper form for FormSubmit.co
            const formElement = document.createElement('form');
            formElement.method = 'POST';
            formElement.action = 'https://formsubmit.co/admin@aspireacademicstutoring.com';
            formElement.enctype = 'multipart/form-data';
            formElement.style.display = 'none';
            
            // Add form fields
            const nameField = document.createElement('input');
            nameField.type = 'text';
            nameField.name = 'name';
            nameField.value = formData.name;
            
            const emailField = document.createElement('input');
            emailField.type = 'email';
            emailField.name = 'email';
            emailField.value = formData.email;
            
            const subjectField = document.createElement('input');
            subjectField.type = 'hidden';
            subjectField.name = '_subject';
            subjectField.value = `Resume for ${formData.name} - Tutor Application`;
            
            const redirectField = document.createElement('input');
            redirectField.type = 'hidden';
            redirectField.name = '_next';
            redirectField.value = window.location.origin + '/thank-you';
            
            const captchaField = document.createElement('input');
            captchaField.type = 'hidden';
            captchaField.name = '_captcha';
            captchaField.value = 'false';
            
            const honeypotField = document.createElement('input');
            honeypotField.type = 'text';
            honeypotField.name = '_honey';
            honeypotField.style.display = 'none';
            
            // Clone the file input to include the file
            const fileField = resumeInput.cloneNode(true);
            
            // Add all fields to the form
            formElement.appendChild(nameField);
            formElement.appendChild(emailField);
            formElement.appendChild(subjectField);
            formElement.appendChild(redirectField);
            formElement.appendChild(captchaField);
            formElement.appendChild(honeypotField);
            formElement.appendChild(fileField);
            
            // Add form to the document, submit it, and remove it
            document.body.appendChild(formElement);
            formElement.submit();
            
            // Don't navigate yet - let the form submission handle it
            return new Promise(resolve => {
              // We'll resolve after a short delay to allow the form to submit
              setTimeout(resolve, 500);
            });
          }
          return Promise.resolve();
        } else {
          throw new Error(data.message || 'Form submission failed');
        }
      })
      .then(() => {
        setIsSubmitting(false);
        navigate('/thank-you');
      })
      .catch(error => {
        console.error('Error:', error);
        setError('There was a problem submitting your application. Please try again.');
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      setError('There was a problem submitting your application. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      title="Join Our Tutoring Team"
      subtitle="Share your knowledge and make a difference"
      content={[
        "We're looking for passionate educators to join our team. Complete the form below to apply.",
      ]}
      imageUrl="tutor-apply-bg.jpg"
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input 
            name="name" 
            placeholder="Full Name" 
            required 
            value={formData.name}
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone" 
            required
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <select 
            name="educationLevel" 
            required
            value={formData.educationLevel}
            onChange={handleInputChange}
          >
            <option value="">Select Education Level</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">PhD</option>
            <option value="teaching">Teaching Credential</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <textarea 
          name="experience" 
          placeholder="Tell us about your tutoring experience" 
          required 
          rows="5"
          value={formData.experience}
          onChange={handleInputChange}
        ></textarea>
        
        <div className="form-row">
          <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
          <p className="form-help">Upload your resume/CV (PDF, DOC, or DOCX)</p>
        </div>
        
        <p className="file-upload-note">
          Note: Your resume will be attached to your application. Maximum file size is 10MB.
        </p>
        
        <select 
          name="subjects" 
          multiple 
          required
          value={formData.subjects}
          onChange={handleSubjectsChange}
        >
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="history">History</option>
          <option value="sat">SAT Prep</option>
          <option value="act">ACT Prep</option>
          <option value="foreign">Foreign Languages</option>
          <option value="computer">Computer Science</option>
        </select>
        <p className="form-help">Hold Ctrl/Cmd to select multiple subjects</p>
        
        <div className="form-section">
          <h4>When are you available to tutor?</h4>
          <p>Select times that work best for your schedule</p>
          <WeeklySchedule setPreferredTimes={setPreferredTimes} />
        </div>
        
        <textarea 
          name="availability" 
          placeholder="Any additional notes about your availability?" 
          rows="3" 
          value={formData.availability}
          onChange={handleInputChange}
        ></textarea>
        
        <input type="text" name="_honey" style={{ display: 'none' }} />
        <input type="hidden" name="_captcha" value="false" />
        
        {error && <div className="error-message">{error}</div>}
        
        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.05 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </motion.button>
      </form>
    </Section>
  );
};

const ApplyStudent = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [preferredTimes, setPreferredTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    format: '',
    frequency: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSubjects([...subjects, value]);
    } else {
      setSubjects(subjects.filter(subject => subject !== value));
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Format the preferred times in a condensed way by grouping by day
    const timesByDay = {};
    
    // Group times by day
    preferredTimes.forEach(time => {
      const [day, hour] = time.split('-');
      if (!timesByDay[day]) {
        timesByDay[day] = [];
      }
      timesByDay[day].push(parseInt(hour));
    });
    
    // Format each day's times in a condensed way
    const formattedTimes = Object.entries(timesByDay).map(([day, hours]) => {
      // Sort hours
      hours.sort((a, b) => a - b);
      
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
      
      // Format each range
      const formattedRanges = ranges.map(([start, end]) => {
        const startPeriod = start >= 12 ? 'PM' : 'AM';
        const endPeriod = end >= 12 ? 'PM' : 'AM';
        const displayStart = start > 12 ? start - 12 : (start === 0 ? 12 : start);
        const displayEnd = end > 12 ? end - 12 : (end === 0 ? 12 : end);
        
        if (start === end) {
          return `${displayStart}${startPeriod}`;
        } else {
          return `${displayStart}${startPeriod}-${displayEnd}${endPeriod}`;
        }
      });
      
      return `${day}: ${formattedRanges.join(', ')}`;
    });
    
    try {
      const formData = new FormData();
      formData.append('access_key', '0e051380-5394-4e26-8ffd-af5cc378e7b6');
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add preferred times
      formData.append('preferredTimes', formattedTimes.join(', '));
      formData.append('applicationType', 'student');
      
      // Add metadata
      formData.append('from_name', 'Aspire Academics Website');
      formData.append('subject', `New Student Application: ${formData.name}`);
      formData.append('to_email', 'admin@aspireacademicstutoring.com');
      
      // Submit the form
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        const data = await response.json();
        
        if (data.success) {
          setIsSubmitting(false);
          navigate('/thank-you');
        } else {
          throw new Error(data.message || 'Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('There was a problem submitting your application. Please try again.');
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      setError('There was a problem submitting your application. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      title="Become a Student"
      subtitle="Start your journey to academic success"
      content={[
        "Complete the form below to join our tutoring program. We'll match you with the perfect tutor for your needs.",
      ]}
      imageUrl="student-apply-bg.jpg"
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input 
            name="name" 
            placeholder="Full Name" 
            required 
            value={formData.name}
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
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
            required 
            value={formData.phone}
            onChange={handleInputChange}
          />
          <select 
            name="grade" 
            required
            value={formData.grade}
            onChange={handleInputChange}
          >
            <option value="">Select Grade Level</option>
            <option value="elementary">Elementary School</option>
            <option value="middle">Middle School</option>
            <option value="high">High School</option>
            <option value="college">College/University</option>
            <option value="adult">Adult Learner</option>
          </select>
        </div>
        
        <div className="form-section">
          <h4>What subjects do you need help with?</h4>
          <p>Select all that apply</p>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="math" 
                checked={subjects.includes('math')}
                onChange={handleSubjectChange}
              />
              Mathematics
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="science" 
                checked={subjects.includes('science')}
                onChange={handleSubjectChange}
              />
              Science
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="english" 
                checked={subjects.includes('english')}
                onChange={handleSubjectChange}
              />
              English
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="history" 
                checked={subjects.includes('history')}
                onChange={handleSubjectChange}
              />
              History
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="sat" 
                checked={subjects.includes('sat')}
                onChange={handleSubjectChange}
              />
              SAT Prep
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="act" 
                checked={subjects.includes('act')}
                onChange={handleSubjectChange}
              />
              ACT Prep
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="foreign" 
                checked={subjects.includes('foreign')}
                onChange={handleSubjectChange}
              />
              Foreign Languages
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="subjects" 
                value="computer" 
                checked={subjects.includes('computer')}
                onChange={handleSubjectChange}
              />
              Computer Science
            </label>
          </div>
        </div>
        
        <div className="form-section">
          <h4>When are you available for tutoring?</h4>
          <p>Select times that work best for your schedule</p>
          <WeeklySchedule setPreferredTimes={setPreferredTimes} />
        </div>
        
        <div className="form-row">
          <select 
            name="format" 
            required
            value={formData.format}
            onChange={handleInputChange}
          >
            <option value="">Preferred Tutoring Format</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
            <option value="both">Either Online or In-Person</option>
          </select>
          <select 
            name="frequency" 
            required
            value={formData.frequency}
            onChange={handleInputChange}
          >
            <option value="">Preferred Session Frequency</option>
            <option value="once">Once per week</option>
            <option value="twice">Twice per week</option>
            <option value="thrice">Three times per week</option>
            <option value="custom">Custom schedule</option>
          </select>
        </div>
        
        <textarea 
          name="goals" 
          placeholder="What are your academic goals? What specific areas do you want to improve?" 
          rows="4" 
          required
          value={formData.goals}
          onChange={handleInputChange}
        ></textarea>
        
        {error && <div className="error-message">{error}</div>}
        
        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.05 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get Started'}
        </motion.button>
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Prepare the data for submission
    const submissionData = {
      access_key: '0e051380-5394-4e26-8ffd-af5cc378e7b6',
      ...formData,
      from_name: 'Aspire Academics Website',
      subject: `Contact Form: ${formData.inquiryType}`,
      to_email: 'support@aspireacademicstutoring.com'
    };
    
    // Submit the form using JSON instead of FormData
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData)
    })
    .then(async (response) => {
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitting(false);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('There was a problem sending your message. Please try again.');
      setIsSubmitting(false);
    });
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
            <p>support@aspireacademicstutoring.com</p>
          </div>
        </div>
        <form className="form contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input 
              name="name" 
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone (optional)" 
              value={formData.phone}
              onChange={handleInputChange}
            />
            <select 
              name="inquiryType" 
              required
              value={formData.inquiryType}
              onChange={handleInputChange}
            >
              <option value="">Select Inquiry Type</option>
              <option value="tutoring">Tutoring Services</option>
              <option value="test-prep">Test Preparation</option>
              <option value="pricing">Pricing Information</option>
              <option value="other">Other</option>
            </select>
          </div>
          <textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          
          {error && <div className="error-message">{error}</div>}
          
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
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