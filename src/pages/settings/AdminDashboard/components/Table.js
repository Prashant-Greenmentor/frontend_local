import TableBody from "../../../../components/common/Table/TableBody";
import TableHeader from "../../../../components/common/Table/TableHeader";

export const Table = ({ headings, dataRows, paginationObject }) => {

    return (
      <>
        <div className="flex flex-col justify-center mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full mx-auto text-left text-sm font-light z-0">
              <TableHeader headings={headings} />
              {dataRows&&<TableBody dataRows={dataRows} />}
            </table>
          </div>
        </div>
      </>
    );
  };