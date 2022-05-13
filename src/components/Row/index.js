const Row = ({ columns, row, onChangeCell, index }) => {
  const renderRows = () => {
    return Object.keys(row).filter(key => key !== 'id').map((key, i) => (
      <td key={i} className="border-r-2">
        <input
          className="w-full"
          onChange={e => onChangeCell(e, index)}
          type={columns[key].type}
          value={row[key]}
          name={key}
        />
      </td>
    ));
  }

  return (
    <>
      <tr className="border-b-2 border-b-gray-200">
        {renderRows()}
      </tr>
    </>
  );
};

export default Row;
