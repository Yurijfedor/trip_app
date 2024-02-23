import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/filterSlice";
import searchIcon from "../assets/icons8-search.svg";

const SearshInput = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search your trip"
      value={searchTerm}
      onChange={handleSearch}
      style={{
        width: "200px",
        height: "50px",
        outline: "none",
        borderColor: "transparent",
        borderRadius: "10px",
        backgroundColor: "#e6ebf4",
        backgroundImage: `url(${searchIcon})`,
        backgroundPosition: "10px center",
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        paddingLeft: "40px",
      }}
    />
  );
};

export default SearshInput;
