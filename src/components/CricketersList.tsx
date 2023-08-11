import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getPlayers, { TPlayer } from "./getPlayers";
import "../css/CricketersList.css";
import ReactPaginate from "react-paginate";

enum SortBy {
  Name = "name",
  Rank = "rank",
  Age = "age",
}

enum FilterBy {
  All = "all",
  Batsman = "batsman",
  Bowler = "bowler",
  AllRounder = "allRounder",
  WicketKeeper = "wicketKeeper",
}

function CricketersList() {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [players, setPlayers] = useState<TPlayer[]>([]);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  
  useEffect(() => {
    getPlayers().then((data) => setPlayers(data));
  }, []);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleFilter = (selectedFilter: FilterBy) => {
    setFilterBy(selectedFilter);
  };
  const handleSort = (sortBy: SortBy) => {
    setSortBy(sortBy);
  };

  const offset = currentPage * pageSize;
  let sortedPlayers = [...players];

  if (sortBy) {
    if (sortBy === SortBy.Name) {
      sortedPlayers = sortedPlayers.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortBy === SortBy.Rank) {
      sortedPlayers = sortedPlayers.sort(
        (a, b) => (a.rank || 0) - (b.rank || 0)
      );
    } else if (sortBy === SortBy.Age) {
      sortedPlayers = sortedPlayers.sort(
        (a, b) =>
          (calculateAge(a.dob) || 0) - (calculateAge(b.dob) || 0)
      );
    }
  }
  const filteredPlayers =
    filterBy === FilterBy.All
      ? sortedPlayers
      : sortedPlayers.filter((player) => player.type === filterBy);

  const pagedPlayers = filteredPlayers.slice(offset, offset + pageSize);


  return (
    <div className="cricketers-list">
      <h2>Cricketers List</h2>
      <div className="filter-controls">
        <span>Filter By:</span>
        <select
          value={filterBy}
          onChange={(e) => handleFilter(e.target.value as FilterBy)}
        >
          <option value={FilterBy.All}>All</option>
          <option value={FilterBy.Batsman}>Batsman</option>
          <option value={FilterBy.Bowler}>Bowler</option>
          <option value={FilterBy.AllRounder}>All-Rounder</option>
          <option value={FilterBy.WicketKeeper}>Wicket Keeper</option>
        </select>
      </div>
      <div className="sort-controls">
        <span>Sort By:</span>
        <button onClick={() => handleSort(SortBy.Name)}>Name</button>
        <button onClick={() => handleSort(SortBy.Rank)}>Rank</button>
        <button onClick={() => handleSort(SortBy.Age)}>Age</button>
      </div>
      <ul>
        {pagedPlayers.map((player) => (
          <li key={player.id} className="cricketer-item">
            <Link to={`/cricketer/${player.id}`} className="cricketer-link">
              {player.name}
            </Link>{" "}
            - <span className="cricketer-type">{player.type}</span>
            <div className="cricketer-details">
              <p>Type: {player.type}</p>
              <p>Points: {player.points}</p>
              <p>Rank: {player.rank}</p>
              <p>Age: {calculateAge(player.dob)}</p>
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        pageCount={Math.ceil(sortedPlayers.length / pageSize)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

function calculateAge(dob: number | null | undefined): number {
  if (dob === null || dob === undefined) {
    return 0; 
  }

  const currentDate = new Date();
  const birthDate = new Date(dob);
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (isNaN(age)) {
    return 0; 
  }

  return age;
}


export default CricketersList;
