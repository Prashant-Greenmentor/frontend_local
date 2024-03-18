// TableHeader.js
import React from "react";

const TableHeader = ({ headings, sortColumns, onSortChange, columnsWithoutSort }) => {

  return (
    <thead className="bg-gray-50 text-gray-500">
      <tr>
        {headings.map((heading, index) => (
          <th
            key={index}
            scope="col"
            className={`py-3 px-6 font-helvetica text-xs font-medium text-center whitespace-nowrap border border-gray-300`}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
