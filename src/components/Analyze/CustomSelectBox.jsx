import React, { useState, useEffect, useRef } from "react";

function CustomSelectBox({ options, onSelectChange, handleFormChange, value }) {
  const keyRef = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const customKeyValue = "";

  useEffect(() => {
    if (selectedValue === customKeyValue) {
      setShowKey(true);
      if (keyRef.current) {
        keyRef.current.focus();
      }
    } else {
      setShowKey(false);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (value && !options?.find(i=>i.id===value)) {
      setSelectedValue(customKeyValue);
    } else {
      setSelectedValue(value);
    }
  }, [value, options]);

  function onCancelClick(evt) {
    setSelectedValue(value);
    setShowButton(true);
  }
console.log(selectedValue)
  return (
    <>
      {showButton && (
        <div className="flex justify-between px-2">
          {!showKey && (
            <select
              value={selectedValue}
              name="electricity_board"
              className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

              onChange={(evt) => {
                handleFormChange(evt);
                setSelectedValue(evt.target.value);
                onSelectChange(evt.target.value);
              }}
            >
              <option value="" disabled>
                    Choose the electricity Board
                  </option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.electricity_board}
                </option>
              ))}
              <option value={customKeyValue}>Other</option>
            </select>
          )}
          {showKey && (
            <input
              type="text"
              className="appearance-none block w-full bg-gray-50 text-neutral-700 text-xs border-0 py-1.5 px-4 leading-tight focus:outline-none"

              name="electricity_board"
              value={selectedValue!=="other"?options?.find(i=>i.id===value)?.electricity_board:selectedValue}
              
              ref={keyRef}
              placeholder="Enter electricity_board"
              onChange={handleFormChange}
            />
          )}
          {showKey && (
            <input
              className="cursor-pointer rounded-lg px-1 inline-block "
              type="button"
              value="X"
              onClick={onCancelClick}
            />
          )}
        </div>
      )}
    </>
  );
}

export default CustomSelectBox;
