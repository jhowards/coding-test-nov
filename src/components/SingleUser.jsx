import React from "react";
import StatusIcon from "./StatusIcon";
import StatusText from "./StatusText";

const SingleUser = ({ user }) => {
  return (
    <div className="singleuser__body d-flex">
      <div className="singleuser__statusicon__wrapper my-auto">
        <StatusIcon status={user.status} />
      </div>
      <div className="my-auto ms-3">
        <p className="singleuser__name mb-0">
          {user.firstName + " " + user.lastName}
        </p>
        <StatusText status={user.status} />
      </div>
    </div>
  );
};

export default SingleUser;
