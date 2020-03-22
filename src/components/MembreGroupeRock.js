import React from "react";
import "./MembreGroupeRock.css";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const MembreGroupeRock = ({ membre }) => (
  <StyledTableRow key={membre.name}>
    <StyledTableCell component="th" scope="row">
      {membre.name}
    </StyledTableCell>
    <StyledTableCell align="right">{membre.realName}</StyledTableCell>
    <StyledTableCell align="right">
      {membre.instruments.map((instrument,index) => { 
        if (index === 0)
          return (instrument)
        else
          return (", "+instrument)
      })}
    </StyledTableCell>
    <StyledTableCell align="right">{membre.begin}</StyledTableCell>
    <StyledTableCell align="right">{membre.end}</StyledTableCell>
    <StyledTableCell align="right">{membre.gender}</StyledTableCell>
    <StyledTableCell align="right">{membre.birthDate}</StyledTableCell>
  </StyledTableRow>
);

export default MembreGroupeRock;
