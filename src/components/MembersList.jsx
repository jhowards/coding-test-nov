import React from "react";
import jsonData from "../data/userlist 2.txt";
import { useState, useEffect } from "react";
import SingleUser from "./SingleUser";

const MembersList = () => {
  const [userData, setuserData] = useState();
  const fetchData = async () => {
    try {
      const response = await fetch(jsonData);
      let data = await response.json();
      const usersOver18 = data.filter((el) => getAge(el.dateOfBirth) >= 18);
      setuserData(usersOver18);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAge = (date) => {
    return (new Date().getTime() - new Date(date).getTime()) / 31536000000;
  };

  console.log(userData);

  return (
    <div>
      {userData &&
        userData.map((user) => (
          <div key={user.id}>
            <SingleUser user={user} />
          </div>
        ))}
    </div>
  );
};

export default MembersList;
