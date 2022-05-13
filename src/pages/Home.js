import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from '../services/SpreadsheetService';

const NoPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    create().then(({ data: spreadsheet }) => {
      navigate(`spreadsheet/${spreadsheet._id}`);
    }).catch(error => {
      console.error(error);
      setErrorMessage(error.message);
    });
  });

  return <h1>{errorMessage}</h1>;
};

export default NoPage;
