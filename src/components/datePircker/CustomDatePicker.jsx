import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="relative">
      {/* Button to open Date Picker */}
      <button
        className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100"
        onClick={(e) => e.preventDefault()}
      >
        <FaRegCalendarAlt className="text-gray-500" />
        Add date
      </button>

      {/* Date Picker */}
      <div className="absolute mt-2 z-50">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          calendarClassName="bg-gray-900 text-white p-3 rounded-lg shadow-lg"
          dayClassName={(date) =>
            selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth()
              ? "bg-purple-700 text-white rounded-full"
              : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-full"
          }
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
