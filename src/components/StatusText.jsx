import React from "react";

const StatusText = ({ status }) => {
  if (status === "active") {
    return <p className="singleuser__status mb-0">Online</p>;
  }
  if (status === "away") {
    return <p className="singleuser__status mb-0">Away</p>;
  }
  if (status === "inactive") {
    return <p className="singleuser__status mb-0">Offline</p>;
  }
  return;
};

export default StatusText;
