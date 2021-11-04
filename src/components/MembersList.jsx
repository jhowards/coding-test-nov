import React from "react";
import jsonData from "../data/userlist 2.txt";
import { useState, useEffect } from "react";
import SingleUser from "./SingleUser";

// const fetchData = async () => {
//   fetch(jsonData)
//     .then((r) => r.text())
//     .then((text) => {
//       return JSON.stringify(text);
//     });
// };

const MembersList = () => {
  const fetchData = async () => {
    try {
      let response = await fetch(jsonData);
      let data = await response.json();
      setuserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [userData, setuserData] = useState();
  console.log(userData);

  return (
    <div>
      {userData &&
        userData.map((user) => (
          <div>
            <SingleUser user={user} />
          </div>
        ))}
    </div>
  );
};

export default MembersList;
