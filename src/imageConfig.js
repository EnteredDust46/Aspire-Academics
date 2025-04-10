// Central place to manage all image paths
const images = {
  logo: 'assets/aspire-academics.png',
  hero: 'images/hero-student.jpg',
  about: 'images/about.jpg',
  services: 'images/services.jpg',
  tutors: 'images/tutors.jpg',
  apply: 'images/about.jpg',
  studentApply: 'images/about.jpg',
  tutorApply: 'images/about.jpg',
  testimonials: 'images/testimonials.jpg',
  contact: 'images/contact.jpg',
  thankYou: 'images/thank-you.jpg',
  learning: 'images/learning.jpg',
  student1: 'images/student1.jpg',
  student2: 'images/student1.jpg',
  student3: 'images/student1.jpg',
};

// Function to get the correct path with PUBLIC_URL
export const getImagePath = (key) => {
  if (!images[key]) {
    console.error(`Image key "${key}" not found`);
    return '';
  }
  return `${process.env.PUBLIC_URL}${images[key]}`;
};

export default images; 