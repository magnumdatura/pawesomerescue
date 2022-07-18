import React, { useContext, useEffect } from "react";
import ReactContext from "../context/react-context";

const Dogs = () => {
  const reactCtx = useContext(ReactContext);

  const fetchDogsListings = async (url) => {
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

      //working on this {NAT}
      // let filterByValue = data.filter(function (obj) {
      //   //loop through each object
      //   for (key in obj) {
      //     //check if object value contains value you are looking for
      //     if (obj[key].includes("dog")) {
      //       //add this object to the filtered array
      //       return obj;
      //     }
      //   }
      // });

      // console.log(filterByValue([data]));

      reactCtx.setDogListing(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDogsListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {reactCtx.listing &&
        reactCtx.listing.map((data, index) => {
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

export default Dogs;
