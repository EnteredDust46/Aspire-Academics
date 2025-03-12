import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './App.css';
import logo from './assets/aspire-academics.png';

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
      <Link to="/services">Services</Link>
      <Link to="/tutors">Meet Our Tutors</Link>
      <Link to="/apply">Apply</Link>
      <Link to="/testimonials">Testimonials</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </motion.nav>
);

const Section = ({ title, content, imageUrl, children, subtitle }) => (
  <motion.section
    className="section"
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + imageUrl})` }}
    variants={fadeIn}
    initial="hidden"
    animate="show"
  >
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
  </motion.section>
);

const Home = () => (
  <Section
    title="Welcome to Aspire Academics"
    subtitle="Empowering Students Through Personalized Learning"
    content={[
      "At Aspire Academics, we believe every student has the potential to excel. Our personalized tutoring approach focuses on building confidence, developing strong study habits, and achieving academic success.",
      "Our experienced tutors work one-on-one with students to identify their unique learning styles and create customized study plans that deliver results.",
      "Whether you're preparing for standardized tests, need help with specific subjects, or want to advance your academic career, we're here to support your educational journey."
    ]}
    imageUrl="/images/home.jpg"
  />
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
    imageUrl="/images/about.jpg"
  />
);

const Services = () => (
  <Section
    title="Our Services"
    subtitle="Comprehensive Academic Support"
    content={[
      "SAT/ACT Test Preparation: Structured programs with practice tests, strategies, and personalized feedback to maximize your scores.",
      "Mathematics: From algebra to calculus, our tutors break down complex concepts into manageable steps.",
      "Sciences: Expert guidance in biology, chemistry, physics, and other scientific disciplines.",
      "English & Writing: Develop strong writing skills, literary analysis, and reading comprehension.",
      "Foreign Languages: Spanish, French, and other language tutoring with native speakers.",
      "Study Skills: Learn effective time management, organization, and test-taking strategies."
    ]}
    imageUrl="/images/services.jpg"
  />
);

const Tutors = () => (
  <Section
    title="Meet Our Tutors"
    subtitle="Expert Educators Dedicated to Your Success"
    content={[
      "Our tutors are more than just teachers - they're mentors who are passionate about helping students achieve their full potential.",
      "Each tutor brings unique expertise and teaching methods, allowing us to match students with the perfect instructor for their learning style."
    ]}
    imageUrl="/images/tutors.jpg"
  >
    <div className="tutors-grid">
      {[1, 2, 3, 4].map((num) => (
        <motion.div key={num} className="tutor-card" whileHover={{ scale: 1.05 }}>
          <img src={`/images/tutor${num}.jpg`} alt={`Tutor ${num}`} className="tutor-image" />
          <h4>Dr. Sarah Johnson</h4>
          <p>Ph.D. in Mathematics</p>
          <p>10+ years teaching experience</p>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Apply = () => (
  <Section
    title="Apply to Aspire Academics"
    subtitle="Join Our Community of Learners and Educators"
    content={[
      "Whether you're seeking academic support or want to join our team of dedicated tutors, we're excited to hear from you.",
      "Our tutoring services are available both online and in-person, with flexible scheduling to accommodate your needs.",
      "For tutors, we offer competitive compensation, professional development opportunities, and a supportive teaching environment."
    ]}
    imageUrl="/images/apply-bg.jpg"
  >
    <div className="apply-buttons">
      <Link to="/apply-tutor" className="apply-button">Apply to be a Tutor</Link>
      <Link to="/apply-student" className="apply-button">Apply for Tutoring</Link>
    </div>
  </Section>
);

const ApplyTutor = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Add required fields
    formData.append('access_key', process.env.REACT_APP_WEB3FORMS_KEY);
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('phone', e.target.phone.value);
    formData.append('subjects', Array.from(e.target.subjects.selectedOptions).map(opt => opt.value).join(', '));
    formData.append('message', e.target.experience.value);
    formData.append('from_name', "Aspire Academics Website");
    formData.append('subject', 'New Tutor Application');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        navigate('/thank-you');
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
      title="Tutor Application" 
      content={[
        "Join our team of passionate educators and make a difference in students' lives.",
        "We're looking for experienced tutors in all academic subjects, particularly in STEM fields, standardized test prep, and writing."
      ]}
      imageUrl="/images/tutor-apply.jpg"
    >
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <select name="subjects" multiple required>
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="test-prep">Test Prep</option>
        </select>
        <textarea name="experience" placeholder="Describe your teaching experience and qualifications" required></textarea>
        <motion.button type="submit" whileHover={{ scale: 1.05 }}>Submit Application</motion.button>
      </form>
    </Section>
  );
};

const ApplyStudent = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Add required fields
    formData.append('access_key', process.env.REACT_APP_WEB3FORMS_KEY);
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('phone', e.target.phone.value);
    formData.append('grade', e.target.grade.value);
    formData.append('subjects', Array.from(e.target.subjects.selectedOptions).map(opt => opt.value).join(', '));
    formData.append('message', e.target.requirements.value);
    formData.append('from_name', "Aspire Academics Website");
    formData.append('subject', 'New Student Application');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Response:', data);

      if (data.success) {
        navigate('/thank-you');
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
      title="Student Application" 
      subtitle="Start Your Journey to Academic Success"
      content={[
        "We're excited to help you achieve your academic goals! Please fill out the form below to get started with our tutoring services.",
        "One of our academic advisors will contact you within 24 hours to discuss your needs and create a personalized learning plan."
      ]}
      imageUrl="/images/student-apply.jpg"
    >
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <select name="grade" required>
          <option value="">Select Grade Level</option>
          <option value="elementary">Elementary School</option>
          <option value="middle">Middle School</option>
          <option value="high">High School</option>
          <option value="college">College</option>
          <option value="adult">Adult Learner</option>
        </select>
        <select name="subjects" multiple required>
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="history">History</option>
          <option value="sat">SAT Prep</option>
          <option value="act">ACT Prep</option>
        </select>
        <textarea name="requirements" placeholder="Tell us about your academic goals and any specific areas where you need help" required></textarea>
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
    imageUrl="/images/testimonials.jpg"
  >
    <div className="testimonials-grid">
      <motion.div className="testimonial-card" whileHover={{ scale: 1.02 }}>
        <img src="/images/student1.jpg" alt="Sarah M." className="testimonial-image" />
        <h4>Sarah M. - Harvard University</h4>
        <p>"Thanks to Aspire Academics' SAT prep, I improved my score by 300 points and got into my dream school!"</p>
      </motion.div>
      <motion.div className="testimonial-card" whileHover={{ scale: 1.02 }}>
        <img src="/images/student2.jpg" alt="James K." className="testimonial-image" />
        <h4>James K. - High School Senior</h4>
        <p>"My math grades went from C's to A's after just one semester of tutoring. The personalized attention made all the difference."</p>
      </motion.div>
      <motion.div className="testimonial-card" whileHover={{ scale: 1.02 }}>
        <img src="/images/student3.jpg" alt="Emily R." className="testimonial-image" />
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
      imageUrl="/images/contact.jpg"
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
    imageUrl="/images/thank-you.jpg"
  >
    <Link to="/" className="apply-button">Return Home</Link>
  </Section>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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