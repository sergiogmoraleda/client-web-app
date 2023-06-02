import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

const GET_TOP_USERS = gql`
  query TopUsers($property: String!) {
    topUsers(property: $property, limit: 10) {
      id
      username
      stats {
        wins
        headshotAccuracy
      }
    }
  }
`;

const TopUsers = () => {
  const [property, setProperty] = useState("wins");
  const { data, loading, error } = useQuery(GET_TOP_USERS, {
    variables: { property },
  });

  const handleChangeProperty = (newProperty) => {
    setProperty(newProperty);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const users = data ? data.topUsers : [];

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
      <div>
        <Header />
        <div className="d-flex flex-column align-items-center mt-3">
          <div className="btn-group" role="group" aria-label="Property Selector">
            <button
              type="button"
              className={`btn btn-primary ${property === "wins" ? "active" : ""} ms-2`}
              onClick={() => handleChangeProperty("wins")}
              style={{ backgroundColor: "#128b53", borderColor: "#128b53" }}
            >
              Wins
            </button>
            <button
              type="button"
              className={`btn btn-primary ${
                property === "headshotAccuracy" ? "active" : ""
              } me-2`}
              onClick={() => handleChangeProperty("headshotAccuracy")}
              style={{ backgroundColor: "#128b53", borderColor: "#128b53" }}
            >
              Headshot Accuracy
            </button>
          </div>
          <TableContainer component={Paper} className="bg-dark mt-3">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#128b53" }}>Username</TableCell>
                  {property === "wins" ? (
                    <TableCell style={{ color: "#128b53" }} align="right">Wins</TableCell>
                  ) : (
                    <TableCell style={{ color: "#128b53" }} align="right">Headshot Accuracy</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell style={{ color: "#f5f5dc" }}>{user.username}</TableCell>
                    {property === "wins" ? (
                      <TableCell style={{ color: "#f5f5dc" }} align="right">{user.stats.wins}</TableCell>
                    ) : (
                      <TableCell style={{ color: "#f5f5dc" }} align="right">{user.stats.headshotAccuracy}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
