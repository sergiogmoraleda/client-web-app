import React from "react";
import User from "./User";
import { useQuery, gql } from "@apollo/client";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const GET_USERS = gql`
  {
    users {
      username
      stats {
        wins
        defeat
        kda
        headshotAccuracy
      }
    }
  }
`;
const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "wins", headerName: "Wins", width: 100 },
    { field: "defeat", headerName: "Defeat", width: 100 },
    { field: "kda", headerName: "KDA", width: 100 },
    { field: "headshotAccuracy", headerName: "Headshot Accuracy", width: 150 },
  ];
  const rows = data
    ? data.users.map((user) => ({
        id: user.id,
        username: user.username,
        wins: user.stats.wins,
        defeat: user.stats.defeat,
        kda: user.stats.kda,
        headshotAccuracy: user.stats.headshotAccuracy,
      }))
    : [];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Wins</TableCell>
            <TableCell align="right">Defeats</TableCell>
            <TableCell align="right">K/D/A</TableCell>
            <TableCell align="right">Headshot Accuracy&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.wins}</TableCell>
              <TableCell align="right">{row.defeat}</TableCell>
              <TableCell align="right">{row.kda}</TableCell>
              <TableCell align="right">{row.headshotAccuracy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
 
};

export default UserList;
