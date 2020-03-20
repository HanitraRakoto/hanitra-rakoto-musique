import React from "react";
import "./MembreGroupeRock.css";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

/*<StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Real Name</StyledTableCell>
                      <StyledTableCell align="right">Instruments</StyledTableCell>
                      <StyledTableCell align="right">Begin</StyledTableCell>
                      <StyledTableCell align="right">End</StyledTableCell>
                      <StyledTableCell align="right">Gender</StyledTableCell>
                      <StyledTableCell align="right">Abstract</StyledTableCell>
                      <StyledTableCell align="right">Name Variations</StyledTableCell>
                      <StyledTableCell align="right">Birthdate</StyledTableCell> */

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
    {/*<StyledTableCell align="right">{membre.abstract}</StyledTableCell>*/}
    <StyledTableCell align="right">
      {membre.nameVariations.map((nameVariation,index) => { 
        if (index === 0)
          return (nameVariation)
        else
          return (", "+nameVariation)
      })}
    </StyledTableCell>
    <StyledTableCell align="right">{membre.birthDate}</StyledTableCell>
  </StyledTableRow>
);

export default MembreGroupeRock;
