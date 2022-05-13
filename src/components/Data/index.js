import { useState } from "react";
import { update } from "../../services/SpreadsheetService";
import Row from "../Row";

const Data = ({ columns, rows, setRows, spreadsheetId }) => {
  const [timeoutID, setTimeoutID] = useState(null);

  const onChangeCell = ({ target: { name, value } }, index) => {
    clearTimeout(timeoutID);
    const updatedRows = rows.map((item, i) => index === i ? { ...item, [name]: value } : item);
    setRows(updatedRows);

    setTimeoutID(setTimeout(() => {
      update(spreadsheetId, { rows: updatedRows })
        .catch(console.error);
    }, 3000));
  }

  return (
    <>
      {rows.map((row, i) => {
        return (
          <Row key={i} columns={columns} row={row} onChangeCell={onChangeCell} index={i} />
        )
      })}
    </>
  );
};

export default Data;
