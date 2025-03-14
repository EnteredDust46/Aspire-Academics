import React, { useState, useEffect } from 'react';
import './WeeklySchedule.css';

const WeeklySchedule = ({ setPreferredTimes, onScheduleChange }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    toggleSlot(slotId);
  };
  
  // Handle mouse enter on a slot during drag
  const handleMouseEnter = (day, hour) => {
    if (isDragging) {
      const slotId = `${day}-${hour}`;
      const isSelected = selectedSlots.includes(slotId);
      
      // Only toggle if the current selection state doesn't match our drag mode
      if (dragSelectMode && !isSelected) {
        toggleSlot(slotId);
      } else if (!dragSelectMode && isSelected) {
        toggleSlot(slotId);
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
  
  const toggleSlot = (slotId) => {
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
    if (typeof slot === 'string' && slot.includes('-')) {
      const [day, hour] = slot.split('-');
      const hourNum = parseInt(hour);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum);
      return `${day} at ${displayHour}:00 ${period}`;
    }
    return slot; // Return as is if not in expected format
  };
  
  return (
    <div className="weekly-schedule">
      {isMobile && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
          Scroll horizontally to see all days
        </p>
      )}
      <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '10px', textAlign: 'center' }}>
        Click and drag to select multiple time slots
      </p>
      <div className="schedule-container">
        <div className="schedule-grid">
          {/* Time labels column */}
          <div className="time-header"></div>
          {days.map(day => (
            <div className="day-header" key={day}>{day}</div>
          ))}
          
          {/* Generate time slots */}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="time-slot">
                {hour > 12 ? `${hour-12} PM` : `${hour} AM`}
              </div>
              {days.map(day => (
                <div
                  className={`schedule-slot ${selectedSlots.includes(`${day}-${hour}`) ? 'selected' : ''}`}
                  key={`${day}-${hour}`}
                  onMouseDown={() => handleMouseDown(day, hour)}
                  onMouseEnter={() => handleMouseEnter(day, hour)}
                  onMouseUp={handleMouseUp}
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {selectedSlots.length > 0 && (
        <div className="selected-times">
          <h5>Selected Time Slots:</h5>
          <ul>
            {selectedSlots.map(slot => (
              <li key={slot}>
                {formatSlot(slot)}
                <button onClick={() => removeSlot(slot)}>&times;</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule; 