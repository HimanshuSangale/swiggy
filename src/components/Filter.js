import axios from "axios";
import React, { useEffect, useState } from "react";

function Filter({ area, setFilteredData }) {
  const [checkedArea, setCheckedArea] = useState("American");
  const [sort, setSort] = useState("");

  useEffect(() => {
    var apiUrl = "";
    // Append selected areas to the API URL
    if (checkedArea) {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${checkedArea}`;
    } else {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${sort}`;
    }
    console.log(apiUrl);
    axios
      .get(apiUrl)
      .then((res) => {
        // console.log(res);
        setFilteredData(res.data.meals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [checkedArea, sort]);

  const expandArea = () => {
    const areaDropDown = document.querySelector(".filter-list");
    areaDropDown.classList.toggle("hidden");
    // areaDropDown.classList.toggle("flex");
    // console.log(areaDropDown);
  };

  const expandSort = () => {
    const areaDropDown = document.querySelector(".sort-list");
    areaDropDown.classList.toggle("hidden");
  };

  const changeArea = (e) => {
    const name = e.target.value;
    // console.log("check box:", name);
    setCheckedArea(name);
    setSort("");
  };

  const changeSort = (e) => {
    const name = e.target.value;
    // console.log("check box:", name);
    setSort(name);
    setCheckedArea("");
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        Restaurants with online food delivery in Pune
      </div>
      <div className="filter-btn-container">
        <button className="filter-btn" onClick={expandArea}>
          Filter
          <span className="filter-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </span>
        </button>
        <div className="filter-list hidden">
          <ul className="flex flex-col items-start">
            {area.map((place) => {
              return (
                <li key={place.strArea}>
                  <input
                    type="checkbox"
                    value={place.strArea}
                    onChange={changeArea}
                    checked={checkedArea === place.strArea ? true : false}
                  />
                  <label className="filter-list-labels">{place.strArea}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="filter-btn" onClick={expandSort}>
          Sort By
          <span className="filter-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
        <div className="sort-list hidden">
          <ul className="flex flex-col items-start">
            <li>
              <input
                type="checkbox"
                value="a"
                onChange={changeSort}
                checked={sort === "a" ? true : false}
              />
              <label className="sort-list-labels">A</label>
            </li>
            <li>
              <input
                type="checkbox"
                value="b"
                onChange={changeSort}
                checked={sort === "b" ? true : false}
              />
              <label className="sort-list-labels">B</label>
            </li>
            <li>
              <input
                type="checkbox"
                value="c"
                onChange={changeSort}
                checked={sort === "c" ? true : false}
              />
              <label className="sort-list-labels">C</label>
            </li>
            <li>
              <input
                type="checkbox"
                value="d"
                onChange={changeSort}
                checked={sort === "d" ? true : false}
              />
              <label className="sort-list-labels">D</label>
            </li>
          </ul>
        </div>
        <div className="filter-btn">Fast Delivery</div>
        <div className="filter-btn">Pure Veg</div>
        <div className="filter-btn">Non Veg</div>
        <div className="filter-btn">Offer</div>
      </div>
    </div>
  );
}

export default Filter;