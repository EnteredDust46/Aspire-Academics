const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the JSON body
    const payload = JSON.parse(event.body);
    const { form, data } = payload;
    
    // Configure email transporter (Zoho)
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD
      }
    });
    
    // Format the email content based on form type
    let subject, text, html;
    
    if (form === 'student-application') {
      subject = `New Student Application: ${data.name}`;
      text = formatStudentApplicationText(data);
      html = formatStudentApplicationHtml(data);
    } else if (form === 'tutor-application') {
      subject = `New Tutor Application: ${data.name}`;
      text = formatTutorApplicationText(data);
      html = formatTutorApplicationHtml(data);
    } else if (form === 'contact') {
      subject = `New Contact Form: ${data.inquiryType} from ${data.name}`;
      text = formatContactText(data);
      html = formatContactHtml(data);
    } else {
      return { statusCode: 400, body: JSON.stringify({ message: 'Invalid form type' }) };
    }
    
    // Send the email
    const info = await transporter.sendMail({
      from: `"Aspire Academics Website" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.ZOHO_EMAIL,
      subject: subject,
      text: text,
      html: html
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully', id: info.messageId })
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing form submission' })
    };
  }
};

// Helper functions to format email content
function formatStudentApplicationText(data) {
  return `
    New Student Application
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Grade Level: ${data.grade}
    
    Subjects: ${data.subjects.join(', ')}
    
    Preferred Times:
    ${data.preferredTimes.map(time => formatTimeSlot(time)).join('\n')}
    
    Preferred Format: ${data.format}
    Preferred Frequency: ${data.frequency}
    
    Goals:
    ${data.goals}
  `;
}

function formatStudentApplicationHtml(data) {
  return `
    <h2>New Student Application</h2>
    
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Grade Level:</strong> ${data.grade}</p>
    
    <p><strong>Subjects:</strong> ${data.subjects.join(', ')}</p>
    
    <p><strong>Preferred Times:</strong></p>
    <ul>
      ${data.preferredTimes.map(time => `<li>${formatTimeSlot(time)}</li>`).join('')}
    </ul>
    
    <p><strong>Preferred Format:</strong> ${data.format}</p>
    <p><strong>Preferred Frequency:</strong> ${data.frequency}</p>
    
    <p><strong>Goals:</strong><br>
    ${data.goals.replace(/\n/g, '<br>')}</p>
  `;
}

function formatTutorApplicationText(data) {
  return `
    New Tutor Application
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Education: ${data.education}
    
    Experience:
    ${data.experience}
    
    Subjects: ${data.subjects.join(', ')}
    
    Preferred Times:
    ${data.preferredTimes.map(time => formatTimeSlot(time)).join('\n')}
    
    Additional Availability Notes:
    ${data.availability}
  `;
}

function formatTutorApplicationHtml(data) {
  return `
    <h2>New Tutor Application</h2>
    
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Education:</strong> ${data.education}</p>
    
    <p><strong>Experience:</strong><br>
    ${data.experience.replace(/\n/g, '<br>')}</p>
    
    <p><strong>Subjects:</strong> ${data.subjects.join(', ')}</p>
    
    <p><strong>Preferred Times:</strong></p>
    <ul>
      ${data.preferredTimes.map(time => `<li>${formatTimeSlot(time)}</li>`).join('')}
    </ul>
    
    <p><strong>Additional Availability Notes:</strong><br>
    ${data.availability.replace(/\n/g, '<br>')}</p>
  `;
}

function formatContactText(data) {
  return `
    New Contact Form Submission
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone || 'Not provided'}
    Inquiry Type: ${data.inquiryType}
    
    Message:
    ${data.message}
  `;
}

function formatContactHtml(data) {
  return `
    <h2>New Contact Form Submission</h2>
    
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
    
    <p><strong>Message:</strong><br>
    ${data.message.replace(/\n/g, '<br>')}</p>
  `;
}

function formatTimeSlot(slot) {
  const [day, hour] = slot.split('-');
  const hourNum = parseInt(hour);
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;
  return `${day} at ${displayHour}:00 ${period}`;
} 