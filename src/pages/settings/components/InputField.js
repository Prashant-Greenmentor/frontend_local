export function InputField({
    label,
    name,
    value="",
    onChange,
    type = "text",
    Decoration,
    inputClassName = "",
    placeholder,
    decorationClassName = "",
    disabled,
  }) {
    return (
      <div className="flex flex-col items-stretch w-full">
        <label htmlFor={name}>{label}</label>
        <div className="w-full flex">
          <div
            className={`flex items-center rounded-tr-none rounded-br-none rounded  py-3 text-gray-600 bg-gray-100  border border-green-400 border-r-0 peer-focus:border-green-400 peer-focus:bg-white transition-colors duration-300 ${
              disabled ? "bg-gray-200" : ""
            } ${decorationClassName}`}
          >
            {Decoration &&  <Decoration className="colored-svg mr-4 w-6 h-6 ml-3" /> }
          </div>
          <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            aria-label={label}
            className={` grid w-full p-3 text-gray-600 bg-gray-100 border border-green-400  focus:border-green-400 focus:bg-white focus:outline-none focus:ring-0 appearance-none  rounded transition-colors duration-300 ${
              disabled ? "bg-gray-200" : ""
            } ${inputClassName}`}
            disabled={disabled}
  
          />
        </div>
      </div>
    );
  }