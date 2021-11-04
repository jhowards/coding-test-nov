import React from "react";
import jsonData from "../data/userlist 2.txt";
import { useState, useEffect } from "react";
import SingleUser from "./SingleUser";
import { Row, Col } from "react-bootstrap";

const MembersList = () => {
  const [userData, setuserData] = useState();
  const [sortedUserData, setsortedUserData] = useState();
  const [sortType, setsortType] = useState("a-z");

  //   Fetch user data from txt file and filter over 18s only - on page load
  useEffect(() => {
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
    fetchData();
  }, []);

  //   Get age from DoB
  const getAge = (date) => {
    return (new Date().getTime() - new Date(date).getTime()) / 31536000000;
  };

  //   Filter users by status and re-sort data
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

  //   Order data alphabetically ascending or descending
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

  //  Change order of users alphabetically based on selection
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
    <div className="page__wrapper">
      <div className="memberlist__body">
        <p className="memberlist__heading mb-5">Members List</p>
        <div className="memberlist__forms__labels">
          <label className="select__label__status">Status</label>
          <label className="select__label__order">Order by</label>
        </div>

        <div className="mb-4">
          <select
            name="status"
            id="status"
            className="select__selectform"
            onChange={(e) => handleStatusInput(e)}
          >
            <option value="all" className="memberlist__form__selectoption">
              All
            </option>
            <option value="online" className="memberlist__form__selectoption">
              Online
            </option>
            <option value="away" className="memberlist__form__selectoption">
              Away
            </option>
            <option value="offline" className="memberlist__form__selectoption">
              Offline
            </option>
          </select>

          <select
            name="order"
            id="order"
            className="select__selectform"
            onChange={(e) => handleOrderInput(e)}
          >
            <option value="a-z" className="memberlist__form__selectoption">
              A - Z
            </option>
            <option value="z-a" className="memberlist__form__selectoption">
              Z - A
            </option>
          </select>
        </div>
        <div className="memberlist__users__wrapper">
          <Row xs={2}>
            {sortedUserData &&
              sortedUserData.map((user) => (
                <Col key={user.id} className="memberlist__users__col">
                  <SingleUser user={user} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MembersList;
