import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Container from "@material-ui/core/Container";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./paymentHistory.style";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function PaymentHistory({ userUniqueId }) {
  const classes = useStyles();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    getFetch();
  }, []);

  const getFetch = async () => {
    const result = await axios.get(
      `http://localhost:5000/payment_history/getHistory/${userUniqueId}`
    );
    setHistory([...result.data]);
  };

  // console.log(history);

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>наименование операции</TableCell>
              <TableCell>цена</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history ? (
              history.map((h) => (
                <TableRow key={h.id}>
                  <TableCell>{h.info}</TableCell>
                  <TableCell>{h.cost} p.</TableCell>
                </TableRow>
              ))
            ) : (
              <p>загрузка истории ...</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
