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
            <div
              key={index}
              className="ml-4 my-2 mx-3 pl-2 w-64 h-96 inline-block m-2 p-2 rounded-lg shadow-lg"
            >
              <div>
                {/* <img src={require(`../images/${data.image}`)} alt="img" /> */}
                <img src={require(`../images/charmander.png`)} alt="img" />
              </div>
              <div>
                <p className="text-xl">{data.title}</p>
              </div>
              <div>
                <p className="text-m">Pet Name: {data.petName}</p>
              </div>
              <div>
                <p className="text-m">Species: {data.species}</p>
              </div>
              <div>
                <p className="text-m">Breed: {data.breed}</p>
              </div>
              <div>
                <p className="text-m">
                  Favourite Count: {data.favouritesCount}
                </p>
              </div>
              <div>
                <button id={data._id} onClick={reactCtx.addToFavourites}>
                  Favourite
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Cats;
