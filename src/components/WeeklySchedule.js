import React, { useState, useEffect } from 'react';
import './WeeklySchedule.css';

const WeeklySchedule = ({ setPreferredTimes, onScheduleChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSlot, setDragStartSlot] = useState(null);
  const [dragSelectMode, setDragSelectMode] = useState(true); // true = select, false = deselect
  
  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle mouse down on a slot
  const handleMouseDown = (day, hour) => {
    const slotId = `${day}-${hour}`;
    setIsDragging(true);
    setDragStartSlot(slotId);
    
    // Determine if we're selecting or deselecting based on the first slot clicked
    const isSelected = selectedSlots.includes(slotId);
    setDragSelectMode(!isSelected);
    
    // Toggle the slot
    toggleSlot(day, hour);
  };
  
  // Handle mouse enter on a slot during drag
  const handleMouseEnter = (day, hour) => {
    if (isDragging) {
      const slotId = `${day}-${hour}`;
      const isSelected = selectedSlots.includes(slotId);
      
      // Only toggle if the current selection state doesn't match our drag mode
      if (dragSelectMode && !isSelected) {
        toggleSlot(day, hour);
      } else if (!dragSelectMode && isSelected) {
        toggleSlot(day, hour);
      }
    }
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add event listeners for mouse up on the document
  useEffect(() => {
    const handleDocumentMouseUp = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => document.removeEventListener('mouseup', handleDocumentMouseUp);
  }, []);
  
  const toggleSlot = (day, hour) => {
    const slotId = `${day}-${hour}`;
    let updatedSlots;
    
    if (selectedSlots.includes(slotId)) {
      updatedSlots = selectedSlots.filter(slot => slot !== slotId);
    } else {
      updatedSlots = [...selectedSlots, slotId];
    }
    
    setSelectedSlots(updatedSlots);
    
    // If parent component provided a callback, call it
    if (setPreferredTimes) {
      setPreferredTimes(updatedSlots);
    }
    
    if (onScheduleChange) {
      onScheduleChange(updatedSlots);
    }
  };
  
  const removeSlot = (slotId) => {
    const updatedSlots = selectedSlots.filter(slot => slot !== slotId);
    setSelectedSlots(updatedSlots);
    
    if (setPreferredTimes) {
      setPreferredTimes(updatedSlots);
    }
    
    if (onScheduleChange) {
      onScheduleChange(updatedSlots);
    }
  };
  
  const formatSlot = (slot) => {
    const [day, hour] = slot.split('-');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;
    return `${day} at ${displayHour}:00 ${period}`;
  };
  
  return (
    <div className="form-section">
      <h3>Select Your Availability</h3>
      <p>Please select all times you're available for tutoring sessions.</p>
      
      {/* Add a mobile-specific instruction */}
      <p className="mobile-scroll-note">Swipe left/right to view all days</p>
      
      <div className="weekly-schedule">
        <div className="schedule-container">
          <div className="schedule-grid">
            {/* Time labels column */}
            <div className="time-label"></div>
            <div className="day-header">Sunday</div>
            <div className="day-header">Monday</div>
            <div className="day-header">Tuesday</div>
            <div className="day-header">Wednesday</div>
            <div className="day-header">Thursday</div>
            <div className="day-header">Friday</div>
            <div className="day-header">Saturday</div>
            
            {/* Generate time slots */}
            {hours.map(hour => (
              React.Fragment.key(hour, [
                <div className="time-label" key={`time-${hour}`}>
                  {formatSlot(hour > 12 ? `${hour-12} PM` : `${hour} AM`)}
                </div>,
                ...days.map(day => (
                  <div
                    className={`time-slot ${selectedSlots.includes(`${day}-${hour}`) ? 'selected' : ''}`}
                    key={`${day}-${hour}`}
                    onClick={() => toggleSlot(`${day}-${hour}`)}
                  ></div>
                ))
              ])
            ))}
          </div>
        </div>
      </div>
      
      {/* Display selected times */}
      <div className="selected-times">
        <h5>Selected Times:</h5>
        {selectedSlots.length === 0 ? (
          <p>No times selected yet.</p>
        ) : (
          <ul>
            {selectedSlots.map(slot => (
              <li key={slot}>
                {formatSlot(slot)}
                <button onClick={() => removeSlot(slot)}>×</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WeeklySchedule; 