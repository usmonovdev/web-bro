import React, { useEffect, useState } from "react";
import axios from "../config/axios-config";

const Filter = ({ category, setCategory, setOpen }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getCategories = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get("/products/categories");
      setData(data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="absolute top-[40px] z-[1000] max-h-[300px] bg-blackwish overflow-y-auto">
      <div
        className="px-3 py-2 cursor-pointer hover:bg-black"
        onClick={() => {
          setCategory("all");
          setOpen(false);
        }}
      >
        <p className="capitalize">All</p>
      </div>
      {isLoading ? <h1 className="px-3 py-2">Loading...</h1> : <>{data.map((data) => {
        return (
          <div
            key={data}
            className="px-3 py-2 cursor-pointer hover:bg-black"
            onClick={() => {
              setCategory(data);
              setOpen(false);
            }}
          >
            <p className="capitalize">{data}</p>
          </div>
        );
      })}</>}
    </div>
  );
};

export default Filter;
