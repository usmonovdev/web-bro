import React from "react";

const Pagination = ({ data, value, setValue }) => {
  return (
    <>
      {data <= 19 ? (
        ""
      ) : (
        <div className="flex flex-row justify-end">
          <div className="flex flex-row gap-3">
            {[0, 20, 40, 60, 80].map((data) => {
              return (
                <div
                  className={`w-[40px] h-[40px] flex items-center justify-center hover:bg-yellow cursor-pointer transition ${
                    value == data ? "bg-yellow" : "bg-blackwish"
                  }`}
                  onClick={() => setValue(data)}
                >
                  {data}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
