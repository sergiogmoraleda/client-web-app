import React from "react";

const User = (props) => {
  const { user } = props;
  if (!user || !user.username) {
    return (
      <div>
        <p>Error: No se pudo cargar el usuario</p>
      </div>
    );
  }
  return (
    <div>
         <div>
        <span style={{ marginRight: "10px" }}>{user.username}</span>
        <span style={{ marginRight: "10px" }}>{user.stats.wins}</span>
        <span style={{ marginRight: "10px" }}>{user.stats.defeat}</span>
        <span style={{ marginRight: "10px" }}>{user.stats.kda}</span>
        <span style={{ marginRight: "10px" }}>
          {user.stats.headshotAccuracy}%
        </span>
      </div>
        
    </div>
);
};


export default User;
