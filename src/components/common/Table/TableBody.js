const TableBody = ({dataRows, additionalClasses}) => {

    return (
      <>
        <tbody className={`bg-white ${additionalClasses}`}>
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td
                  className="py-3 px-3 text-center font-medium text-xs whitespace-nowrap border border-gray-300"
                  key={columnIndex}
                >
                  {column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </>
    );

}

export default TableBody;