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
  
  // Update parent component when selected slots change
  useEffect(() => {
    if (setPreferredTimes) {
      setPreferredTimes(selectedSlots);
    }
    if (onScheduleChange) {
      onScheduleChange(selectedSlots);
    }
  }, [selectedSlots, setPreferredTimes, onScheduleChange]);
  
  // Toggle a slot's selection
  const toggleSlot = (slotId) => {
    setSelectedSlots(prevSlots => {
      if (prevSlots.includes(slotId)) {
        return prevSlots.filter(slot => slot !== slotId);
      } else {
        return [...prevSlots, slotId];
      }
    });
  };
  
  // Remove a specific slot
  const removeSlot = (slotId) => {
    setSelectedSlots(prevSlots => prevSlots.filter(slot => slot !== slotId));
  };
  
  // Format a slot for display
  const formatSlot = (slot) => {
    const [day, hour] = slot.split('-');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;
    return `${day} at ${displayHour}:00 ${period}`;
  };
  
  // Handle mouse events for desktop drag selection
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
  
  // Handle mobile time selection
  const handleMobileTimeSelect = (e) => {
    const { day, hour } = e.target.dataset;
    if (day && hour) {
      toggleSlot(`${day}-${hour}`);
    }
  };
  
  // Render mobile-friendly time selector
  const renderMobileSelector = () => {
    return (
      <div className="mobile-time-selector">
        <div className="mobile-day-selector">
          {days.map(day => (
            <div key={day} className="mobile-day-tab">
              <h4>{day.substring(0, 3)}</h4>
              <div className="mobile-hours">
                {hours.map(hour => {
                  const slotId = `${day}-${hour}`;
                  const isSelected = selectedSlots.includes(slotId);
                  const hourDisplay = hour > 12 ? `${hour-12} PM` : `${hour} AM`;
                  
                  return (
                    <button
                      key={hour}
                      data-day={day}
                      data-hour={hour}
                      className={`mobile-hour-btn ${isSelected ? 'selected' : ''}`}
                      onClick={handleMobileTimeSelect}
                    >
                      {hourDisplay}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="weekly-schedule">
      <h4>Select your available times:</h4>
      <p className="schedule-instructions">Click and drag to select multiple time slots.</p>
      
      {isMobile ? (
        renderMobileSelector()
      ) : (
        <div className="schedule-container">
          <div className="schedule-grid">
            <div className="corner-cell"></div>
            {days.map(day => (
              <div className="day-header" key={day}>
                {day}
              </div>
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
      )}
      
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