import { useState } from "react";
import { update } from "../../services/SpreadsheetService";

const Header = ({ columns, setColumns, spreadsheetId }) => {
  const [timeoutID, setTimeoutID] = useState(null);

  const onStatusChanged = (e) => {
    updateColumns(e, 'type');
  }

  const onChangeCell = (e) => {
    updateColumns(e, 'name');
  }

  const updateColumns = ({ target: { name: key, value } }, prop) => {
    clearTimeout(timeoutID);
    const updatedColumns = { ...columns, [key]: { ...columns[key], [prop]: value } };

    setColumns(updatedColumns);

    setTimeoutID(setTimeout(() => {
      update(spreadsheetId, { columns: updatedColumns })
        .catch(console.error);
    }, 3000));
  }

  const renderColumns = () => {
    return Object.keys(columns).filter(key => key !== 'id').map((key, i) => (
      <th key={i} className="border-r-2 w-52">
        <div className="flex">
          <input
            className="bg-gray-100 font-bold"
            onChange={onChangeCell}
            type="text"
            name={key}
            value={columns[key].name}
          />
          <select name={key} className="bg-gray-100 text-gray-400 cursor-pointer outline-none" value={columns[key].type} onChange={onStatusChanged}>
            <option value="text">Aa</option>
            <option value="number">#</option>
          </select>
        </div>
      </th>
    ));
  }

  return (
    <>
      {renderColumns()}
    </>
  );
};

export default Header;
