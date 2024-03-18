import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ headings, dataRows, paginationObject }) => {

  return (
    <>
      <div className="flex flex-col justify-center mb-4">
        <div className="overflow-x-auto h-[62.5vh]">
          <table className="min-w-full mx-auto text-left text-sm font-light z-0">
            <TableHeader headings={headings} />
            <TableBody dataRows={dataRows} />
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
