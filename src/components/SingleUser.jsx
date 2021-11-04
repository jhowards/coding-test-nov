import React from "react";

const SingleUser = ({ user }) => {
  return (
    <div>
      <h5>{user.firstName + " " + user.lastName}</h5>
      <h5>{user.status}</h5>
    </div>
  );
};

export default SingleUser;
