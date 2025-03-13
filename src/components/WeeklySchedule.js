import React, { useState } from 'react';
import './WeeklySchedule.css';

const WeeklySchedule = ({ onScheduleChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM
  
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

  const formatSlot = (slot) => {
    const [day, hour] = slot.split('-');
    return `${day} at ${formatHour(parseInt(hour))}`;
  };

  const removeSlot = (slot) => {
    const newSelectedSlots = new Set(selectedSlots);
    newSelectedSlots.delete(slot);
    setSelectedSlots(newSelectedSlots);
    onScheduleChange(Array.from(newSelectedSlots));
  };

  return (
    <>
      <div className="schedule-container">
        <div className="schedule-grid">
          <div className="time-labels">
            <div className="corner-cell">Time</div>
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
      
      {selectedSlots.size > 0 && (
        <div className="selected-times">
          <h5>Selected Time Slots:</h5>
          <ul>
            {Array.from(selectedSlots).map(slot => (
              <li key={slot}>
                {formatSlot(slot)}
                <button onClick={() => removeSlot(slot)}>&times;</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default WeeklySchedule; 