import React, { useState, useEffect } from 'react';
import './WeeklySchedule.css';

const WeeklySchedule = ({ setPreferredTimes, onScheduleChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  
  const [selectedSlots, setSelectedSlots] = useState([]);
  
  const toggleSlot = (day, hour) => {
    const slotId = `${day}-${hour}`;
    const isSelected = selectedSlots.includes(slotId);
    
    let newSelectedSlots;
    if (isSelected) {
      newSelectedSlots = selectedSlots.filter(slot => slot !== slotId);
    } else {
      newSelectedSlots = [...selectedSlots, slotId];
    }
    
    setSelectedSlots(newSelectedSlots);
    if (typeof setPreferredTimes === 'function') {
      setPreferredTimes(newSelectedSlots);
    }
    if (typeof onScheduleChange === 'function') {
      onScheduleChange(newSelectedSlots);
    }
  };
  
  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const formatSlot = (slot) => {
    const [day, hour] = slot.split('-');
    return `${day} at ${formatHour(parseInt(hour))}`;
  };

  const removeSlot = (slot) => {
    const newSelectedSlots = selectedSlots.filter(s => s !== slot);
    setSelectedSlots(newSelectedSlots);
    if (typeof onScheduleChange === 'function') {
      onScheduleChange(newSelectedSlots);
    }
  };

  return (
    <div className="weekly-schedule">
      <div className="schedule-grid">
        <div className="time-header"></div>
        {days.map(day => (
          <div key={day} className="day-header">{day.substring(0, 3)}</div>
        ))}
        
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="time-slot">
              {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
            </div>
            {days.map(day => (
              <div 
                key={`${day}-${hour}`}
                className={`schedule-slot ${selectedSlots.includes(`${day}-${hour}`) ? 'selected' : ''}`}
                onClick={() => toggleSlot(day, hour)}
              ></div>
            ))}
          </React.Fragment>
        ))}
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