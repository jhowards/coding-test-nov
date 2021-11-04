import React from "react";

const StatusIcon = ({ status }) => {
  if (status === "active") {
    return <div className="statusicon__online"></div>;
  }
  if (status === "away") {
    return <div className="statusicon__away"></div>;
  }
  if (status === "inactive") {
    return <div className="statusicon__offline"></div>;
  }
  return;
};

export default StatusIcon;
