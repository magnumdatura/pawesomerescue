import React, { useContext, useEffect } from "react";
import ReactContext from "../context/react-context";

const Cats = () => {
  const reactCtx = useContext(ReactContext);

  const fetchCatsListings = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);

      function filterByValue(array, string) {
        return array.filter((o) => {
          return Object.keys(o).some((k) => {
            if (typeof o[k] === "string")
              return o[k].toLowerCase().includes(string.toLowerCase());
          });
        });
      }

      const filterCats = filterByValue(data, "cat");
      console.log(filterCats);

      reactCtx.setCatListing(filterCats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCatsListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {reactCtx.catListing &&
        reactCtx.catListing.map((data, index) => {
          // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
          return (
            <span>
              <div key={index} className="listing">
                <div>
                  <img src={data.image} alt="img" />
                </div>
                <div>
                  <h4>{data.title}</h4>
                </div>
                <div>
                  <p>Pet Name: {data.petName}</p>
                </div>
                <div>
                  <p>Species: {data.species}</p>
                </div>
                <div>
                  <p>Breed: {data.breed}</p>
                </div>
              </div>
            </span>
          );
        })}
    </>
  );
};

export default Cats;
