import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Data from "../components/Data/index.js";
import Header from "../components/Header.js";
import { show, update } from "../services/SpreadsheetService.js";

const Spreadsheet = () => {
  const params = useParams();
  const [doesSpreadsheetExist, setDoesSpreadsheetExist] = useState(false);
  const [columns, setColumns] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    show(params.id)
      .then(({ data: spreadsheet }) => {
        setDoesSpreadsheetExist(true)
        setColumns(spreadsheet.columns);
        setRows(spreadsheet.rows);
      }).catch(error => {
        console.error(error);
      });
  }, [params]);

  const addColumn = () => {
    const nextKey = Object.keys(columns).length;
    const updatedColumns = { ...columns, [nextKey]: { name: '', type: 'text' } };
    const updatedRows = rows.map(item => ({ ...item, [nextKey]: '' }));

    update(params.id, { columns: updatedColumns, rows: updatedRows })
      .then(() => {
        setColumns(updatedColumns);
        setRows(updatedRows);
      })
      .catch(console.error);
  }

  const addRow = () => {
    const { id, ...rest } = columns;
    const newRow = { ...Object.keys(rest).reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}) };
    const updatedRows = [...rows, newRow];

    update(params.id, { rows: updatedRows })
      .then(() => {
        setRows(updatedRows);
      })
      .catch(console.error);
  }

  return (
    <div className="grid place-items-center h-screen">
      {
        doesSpreadsheetExist ? <div className="flex justify-center">
          <div>
            <table>
              <thead className="text-left">
                <tr className="bg-gray-100">
                  <Header spreadsheetId={params.id} columns={columns} setColumns={setColumns} />
                </tr>
              </thead>
              <tbody className="text-left">
                <Data columns={columns} rows={rows} setRows={setRows} spreadsheetId={params.id} />
              </tbody>
            </table>
            {
              Object.keys(columns).length > 0 &&
              <div className="flex justify-center w-full">
                <button onClick={addRow} className="font-bold text-blue-600 w-full">+ Add Row</button>
              </div>
            }
          </div>
          <div className="relative float-left">
            <button onClick={addColumn} className="font-bold text-blue-600 w-40 bg-gray-100">+ Add Column</button>
          </div>
        </div> :
          <h2>Spreadsheet not found</h2>
      }
    </div>
  );
};

export default Spreadsheet;
