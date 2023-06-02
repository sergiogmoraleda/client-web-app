import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import SearchIcon from '@mui/icons-material/Search';


const SEARCH_USERS = gql`
  query SearchUsers($searchFilter: String!) {
    users(search: $searchFilter) {
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

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const { data, loading, error } = useQuery(SEARCH_USERS, {
    variables: { searchFilter },
  });

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
      <div className="mt-3">
        
        <input type="text" placeholder="Search by username" onChange={(e) => setSearchFilter(e.target.value)} />
        <SearchIcon style={{
          marginLeft: "10px" ,
          color: "#128b53",
          cursor: "pointer",
        }}
        />
      </div>
      <TableContainer component={Paper} className="mt-3 bg-dark">
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
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ color: "#f5f5dc" }}
                >
                  {row.username}
                </TableCell>
                <TableCell style={{ color: "#f5f5dc" }} align="right">
                  {row.wins}
                </TableCell>
                <TableCell style={{ color: "#f5f5dc" }} align="right">
                  {row.defeat}
                </TableCell>
                <TableCell style={{ color: "#f5f5dc" }} align="right">
                  {row.kda}
                </TableCell>
                <TableCell style={{ color: "#f5f5dc" }} align="right">
                  {row.headshotAccuracy}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default Search;
