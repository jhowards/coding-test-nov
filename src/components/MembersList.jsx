import React from "react";
import jsonData from "../data/userlist 2.txt";
import { useState, useEffect } from "react";
import SingleUser from "./SingleUser";

const MembersList = () => {
  const [userData, setuserData] = useState();
  const [sortedUserData, setsortedUserData] = useState();
  const [sortType, setsortType] = useState("a-z");

  const fetchData = async () => {
    try {
      const response = await fetch(jsonData);
      let data = await response.json();
      const usersOver18 = data.filter((el) => getAge(el.dateOfBirth) >= 18);

      usersOver18.sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
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
      setsortedUserData(sortData(sortType, userData));
    }
    if (e.target.value === "online") {
      const filterData = [...userData].filter((el) => el.status === "active");
      const sortFilteredData = sortData(sortType, filterData);
      setsortedUserData(sortFilteredData);
    }
    if (e.target.value === "away") {
      const filterData = [...userData].filter((el) => el.status === "away");
      const sortFilteredData = sortData(sortType, filterData);
      setsortedUserData(sortFilteredData);
    }
    if (e.target.value === "offline") {
      const filterData = [...userData].filter((el) => el.status === "inactive");
      const sortFilteredData = sortData(sortType, filterData);
      setsortedUserData(sortFilteredData);
    }
  };

  const sortData = (type, data) => {
    if (type === "a-z") {
      const sortData = [...data].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
      return sortData;
    }
    if (type === "z-a") {
      const sortData = [...data].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return 1;
        }
        if (a.firstName > b.firstName) {
          return -1;
        }
        return 0;
      });
      return sortData;
    }
  };

  const handleOrderInput = (e) => {
    if (e.target.value === "a-z") {
      setsortType("a-z");
      setsortedUserData(sortData("a-z", sortedUserData));
    }

    if (e.target.value === "z-a") {
      setsortType("z-a");
      setsortedUserData(sortData("z-a", sortedUserData));
    }
  };

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
