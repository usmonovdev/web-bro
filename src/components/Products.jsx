import axios from "../config/axios-config";
import React, { useEffect, useMemo, useState } from "react";
import Backet from "./Backet";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Products = () => {
  const [product, setProduct] = useState([]);

  const [backetOpen, setBacketOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const [categoryOpen, setCateogryOpen] = useState(false);
  const [category, setCategory] = useState("all");

  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get("/products", {
        params: {
          limit: 20,
          skip: count,
        },
      });
      setIsLoading(false)
      setProduct(data.products);
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [count]);

  const filterProducts = () => {
    if (category == "all") {
      return product;
    }
    return product.filter((e) => e.category == category);
  };

  var filtered = useMemo(filterProducts, [category, product, count]);

  return (
    <div className="custom-container py-8 flex flex-col gap-4">
      <div className="flex flex-row justify-between relative">
        <h1
          className="capitalize px-3 py-1 bg-yellow cursor-pointer"
          onClick={() => setCateogryOpen(!categoryOpen)}
        >
          Filter: {category}
        </h1>
        {categoryOpen ? (
          <Filter
            category={category}
            setCategory={setCategory}
            setOpen={setCateogryOpen}
          />
        ) : (
          ""
        )}
        <Backet
          selected={selected}
          setSelected={setSelected}
          open={backetOpen}
          setOpen={setBacketOpen}
        />
      </div>
      {isLoading ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {filtered.length == 0 ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <h1>No products!</h1>
            </div>
          ) : (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {filtered?.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="md:min-h-[450px] min-h-fit w-fit mx-auto"
                  >
                    <div className="w-full overflow-hidden">
                      <img
                        src={data.images[0]}
                        alt={data.title}
                        className="aspect-square object-cover hover:scale-[1.1] transition"
                      />
                    </div>
                    <div className="p-3 flex flex-col gap-1 bg-blackwish">
                      <h1 className="text-xl font-bold">{data.title}</h1>
                      <p className="max-h-[50px] min-h-[50px] text-ellipsis overflow-hidden">
                        {data.description}
                      </p>
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-lg font-semibold text-yellow">
                          Price: {data.price}$
                        </p>
                        <MdOutlineAddShoppingCart
                          className="text-2xl cursor-pointer"
                          onClick={() => setSelected([...selected, data])}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      <Pagination data={filtered.length} value={count} setValue={setCount} />
    </div>
  );
};

export default Products;
