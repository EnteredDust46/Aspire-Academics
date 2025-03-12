import React, { useState } from 'react';
import './WeeklySchedule.css';

const WeeklySchedule = ({ onScheduleChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM
  
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  
  const toggleTimeSlot = (day, hour) => {
    const slot = `${day}-${hour}`;
    const newSelectedSlots = new Set(selectedSlots);
    
    if (selectedSlots.has(slot)) {
      newSelectedSlots.delete(slot);
    } else {
      newSelectedSlots.add(slot);
    }
    
    setSelectedSlots(newSelectedSlots);
    onScheduleChange(Array.from(newSelectedSlots));
  };
  
  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <div className="schedule-container">
      <div className="schedule-grid">
        <div className="time-labels">
          <div className="corner-cell"></div>
          {hours.map(hour => (
            <div key={hour} className="time-label">
              {formatHour(hour)}
            </div>
          ))}
        </div>
        
        {days.map(day => (
          <div key={day} className="day-row">
            <div className="day-label">{day}</div>
            {hours.map(hour => (
              <div
                key={`${day}-${hour}`}
                className={`time-slot ${selectedSlots.has(`${day}-${hour}`) ? 'selected' : ''}`}
                onClick={() => toggleTimeSlot(day, hour)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule; 