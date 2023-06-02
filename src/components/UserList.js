import React from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";

const GET_USERS = gql`
  {
    users {
      id
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px",
      }}
    >
      <div>
        <Header />
        <TableContainer
          component={Paper}
          className="bg-dark"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#128b53" }}>Username</TableCell>
                <TableCell style={{ color: "#128b53" }} align="right">
                  Wins
                </TableCell>
                <TableCell style={{ color: "#128b53" }} align="right">
                  Defeats
                </TableCell>
                <TableCell style={{ color: "#128b53" }} align="right">
                  K/D/A
                </TableCell>
                <TableCell style={{ color: "#128b53" }} align="right">
                  Headshot Accuracy&nbsp;(%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" style={{ color: "#f5f5dc" }}>
                    {row.username}
                  </TableCell>
                  <TableCell align="right"style={{ color: "#f5f5dc" }}>{row.wins}</TableCell>
                  <TableCell align="right"style={{ color: "#f5f5dc" }}>{row.defeat}</TableCell>
                  <TableCell align="right"style={{ color: "#f5f5dc" }}>{row.kda}</TableCell>
                  <TableCell align="right"style={{ color: "#f5f5dc" }}>{row.headshotAccuracy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserList;
