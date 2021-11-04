import React from "react";
import jsonData from "../data/userlist 2.txt";
import { useState, useEffect } from "react";
import SingleUser from "./SingleUser";

const MembersList = () => {
  const [userData, setuserData] = useState();
  const [sortedUserData, setsortedUserData] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(jsonData);
      let data = await response.json();
      const usersOver18 = data.filter((el) => getAge(el.dateOfBirth) >= 18);
      setuserData(usersOver18);
      setsortedUserData(usersOver18);
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

  const handleStatusInput = (e) => {
    if (e.target.value === "all") {
      setsortedUserData(userData);
    }
    if (e.target.value === "online") {
      const sortData = [...userData].filter((el) => el.status === "active");
      setsortedUserData(sortData);
    }
    if (e.target.value === "away") {
      const sortData = [...userData].filter((el) => el.status === "away");
      setsortedUserData(sortData);
    }
    if (e.target.value === "offline") {
      const sortData = [...userData].filter((el) => el.status === "inactive");
      setsortedUserData(sortData);
    }
  };

  const handleOrderInput = (e) => {};

  return (
    <div>
      <label>Status</label>
      <select name="status" id="status" onChange={(e) => handleStatusInput(e)}>
        <option value="all">All</option>
        <option value="online">Online</option>
        <option value="away">Away</option>
        <option value="offline">Offline</option>
      </select>

      <label>Order by</label>
      <select name="order" id="order" onChange={(e) => handleOrderInput(e)}>
        <option value="a-z">A - Z</option>
        <option value="z-a">Z - A</option>
      </select>

      {sortedUserData &&
        sortedUserData.map((user) => (
          <div key={user.id}>
            <SingleUser user={user} />
          </div>
        ))}
    </div>
  );
};

export default MembersList;
