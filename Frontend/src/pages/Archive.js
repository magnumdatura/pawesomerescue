import React, { useContext, useState, useEffect } from "react";
import ReactContext from "../context/react-context";

const Archive = () => {
  const reactCtx = useContext(ReactContext);
  const [listingArchives, setListingArchives] = useState([]);

  useEffect(() => {
    displayListingsArchives("http://localhost:5001/listings/displayAll");
  }, []);

  const displayListingsArchives = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer" + reactCtx.access,
      },
    };

    try {
      const res = await fetch(url, options);

      if (res.status !== 200) {
        throw new Error("Could not fetch listings archive");
      }

      const data = await res.json();
      console.log(data);

      const archives = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].isArchive === true) {
          archives.push(data[i]);
        }
      }

      console.log(archives);
      setListingArchives(archives);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {listingArchives &&
        listingArchives.map((item) => {
          return (
            <div className="ml-4 my-2 mx-3 pl-2 w-64 h-96 inline-block m-2 p-2 rounded-lg shadow-lg">
              <h2 className="text-xl">{item.title}</h2>
              <img src={item.image} />
              <p>Pet Name: {item.petName}</p>
              <p>Species: {item.species}</p>
              <p>Breed: {item.breed}</p>
              <p>Sex: {item.sex}</p>
              <p>Size: {item.size}</p>
              <p>Age: {item.age}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Archive;
