import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Backet = ({ selected, setSelected, open, setOpen }) => {
  const filterSelected = (id) => {
    setSelected(selected.filter((e) => e.id !== id));
  };

  const uniqeProducts = Array.from(new Set(selected));

  return (
    <>
      <div className="relative w-fit h-full flex flex-row gap-1 items-center">
        {uniqeProducts.length > 0 ? (
          <h1 className="p-2 w-[30px] h-[30px] flex items-center justify-center bg-yellow">
            {uniqeProducts.length}
          </h1>
        ) : (
          ""
        )}
        <AiOutlineShoppingCart
          className="text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open ? (
        <div className="fixed top-0 right-0 bg-blackwish md:w-[60%] w-[100%] h-screen z-[1000] p-4 overflow-y-auto">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl font-bold">Backet</h1>
            <LiaTimesSolid
              className="text-2xl cursor-pointer text-yellow"
              onClick={() => setOpen(!open)}
            />
          </div>
          {uniqeProducts.length > 0 ? (
            <>
              {uniqeProducts.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="flex sm:flex-row flex-col gap-2 mt-3 bg-black p-2"
                  >
                    <div className="sm:w-[50%] w-full">
                      <img
                        src={data?.images[0]}
                        className="aspect-square object-cover"
                      />
                    </div>
                    <div className="sm:w-[50%] w-full flex flex-col gap-2">
                      <p className="text-xl font-bold">{data.title}</p>
                      <p>{data.description}</p>
                      <div className="flex flex-row justify-between">
                        <p className="text-lg font-semibold text-yellow">
                          Price: {data.price}$
                        </p>
                        <MdOutlineRemoveShoppingCart
                          className="text-2xl cursor-pointer"
                          onClick={() => filterSelected(data.id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h1>Backet is empty!</h1>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Backet;
