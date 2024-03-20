import React from 'react';

function Filter({ label, options, selectedValue, onChange }) {
  
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={label} className="text-sm">{label}</label>
      <div className="p-1 px-1 rounded cursor-pointer border border-green-300 bg-white shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
        <select
          id={label}
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="outline-none bg-transparent cursor-pointer px-2 py-1"
        >
          <option className="bg-white text-black" value="">All</option>
          {options.map((option, index) => (
            <option key={index} className="bg-white text-black" value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
