import React from "react";

const SingleUser = ({ user }) => {
  return (
    <div className="singleuser__body d-flex">
      <div className="my-auto ms-2">
        <p className="singleuser__name mb-0">
          {user.firstName + " " + user.lastName}
        </p>
        <p className="singleuser__status mb-0">{user.status}</p>
      </div>
    </div>
  );
};

export default SingleUser;
