import React, { useEffect, useState } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import PaymentServicesList from "./paymentServicesList";

import Table from "@material-ui/core/Table";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useStyles } from "./paymentServices.styles";

import url from "../../utils/apiUrl";

export default function PaymentServices({ userUniqueId }) {
  const [rows, setRows] = useState([]);
  const [isProductsLoaded, setIsProductsLoaded] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      history.push("/");
    }
    async function getFetch() {
      try {
        const result = await axios.get(`${url}/services/getBankServices`);
        setRows(result.data);
        setIsProductsLoaded(true);
      } catch (e) {
        setIsProductsLoaded(false);
        console.error(e);
      }
    }
    getFetch();
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      {isProductsLoaded ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Название операции</TableCell>
                <TableCell align="center">Цена</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <PaymentServicesList
                  key={row.id}
                  id={row.id}
                  serviceName={row.name}
                  servicePrice={row.cost}
                  userUniqueId={userUniqueId}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress color="secondary" className={classes.progressBar} />
      )}
    </Container>
  );
}
