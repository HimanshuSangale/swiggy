import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactComponent as SortIcon } from "../sortIcon.svg";
import { ReactComponent as FilterIcon } from "../filterIcon.svg";
import FilterTag from "./FilterTag";
// import FilterIcon from "../filterIcon.svg";

function Filter({
  area,
  filteredData,
  setFilteredData,
  checkedArea,
  setCheckedArea,
  setLoading,
}) {
  const [sort, setSort] = useState("a-z");

  useEffect(() => {
    var apiUrl = "";
    setLoading(true);
    // Append selected areas to the API URL
    // if (checkedArea) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${checkedArea}`;
    // } else {
    //   apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${sort}`;
    // }

    console.log(apiUrl);
    axios
      .get(apiUrl)
      .then((res) => {
        // console.log(res.data.meals);
        setFilteredData(res.data.meals);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request is complete
      });
  }, [checkedArea, setFilteredData, setLoading]);

  const sortData = (data, sortType) => {
    var sortedData = [];
    if (sortType === "a-z") {
      sortedData = [...data].sort((a, b) =>
        a.strMeal.localeCompare(b.strMeal, "en", { sensitivity: "base" })
      );
    } else if (sortType === "z-a") {
      sortedData = [...data].sort((a, b) =>
        b.strMeal.localeCompare(a.strMeal, "en", { sensitivity: "base" })
      );
    }
    // console.log(sortData);
    setFilteredData(sortedData);
  };

  const expandArea = () => {
    const areaDropDown = document.querySelector(".filter-list");
    const sortDropDown = document.querySelector(".sort-list");
    areaDropDown.classList.toggle("hidden");
    // sortDropDown.classList.add("hidden");
    // areaDropDown.classList.toggle("flex");
    // console.log(areaDropDown);
  };

  const expandSort = () => {
    const areaDropDown = document.querySelector(".filter-list");
    const sortDropDown = document.querySelector(".sort-list");
    // areaDropDown.classList.add("hidden");
    sortDropDown.classList.toggle("hidden");
  };

  const changeArea = (e) => {
    const name = e.target.value;
    // console.log("check box:", name);
    setCheckedArea(name);
    setSort("a-z");
  };

  const changeSort = (e) => {
    const name = e.target.value;
    // console.log("check box:", name);
    setSort(name);
    sortData(filteredData, name);
    // setCheckedArea("");
  };

  return (
    <>
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
                    <label className="filter-list-labels">
                      {place.strArea}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <FilterTag
            elementName={"filter"}
            icon={<FilterIcon />}
            data={area}
            value={"strArea"}
            checkList={checkedArea}
            setCheckList={setCheckedArea}
          >
            Filter
          </FilterTag> */}
          {/* <FilterTag
            elementName={"sort"}
            icon={<SortIcon />}
            // data is an array of objects
            data={[{ value: "A-Z" }, { value: "Z-A" }]}
            value={"value"}
            checkList={sort}
            setCheckList={setSort}
          >
            Sort By
          </FilterTag> */}
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
              <li key="a-z">
                <input
                  type="checkbox"
                  value="a-z"
                  onChange={changeSort}
                  checked={sort === "a-z"}
                />
                <label className="sort-list-labels">A-Z</label>
              </li>
              <li key="z-a">
                <input
                  type="checkbox"
                  value="z-a"
                  onChange={changeSort}
                  checked={sort === "z-a"}
                />
                <label className="sort-list-labels">Z-A</label>
              </li>
            </ul>
          </div>
          <div className="filter-btn">Fast Delivery</div>
          <div className="filter-btn">Pure Veg</div>
          <div className="filter-btn">Non Veg</div>
          <div className="filter-btn">Offer</div>
        </div>
      </div>
    </>
  );
}

export default Filter;
