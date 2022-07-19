import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";

const Favourite = () => {
  const reactCtx = useContext(ReactContext);
  const userProfile = reactCtx.userProfile;
  console.log(userProfile);
  const favIDArr = userProfile[0].favourites;
  console.log(favIDArr);
  const [userFavourites, setUserFavourites] = useState([]);

  useEffect(() => {
    displayUserFavourites("http://localhost:5001/listings/displayAll");
  }, [userProfile]);

  const displayUserFavourites = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
    };

    try {
      const res = await fetch(url, options);

      if (res.status !== 200) {
        throw new Error("Could not fetch favourites from listing database.");
      }

      const data = await res.json();
      console.log(data);

      // data.forEach((listing) => {
      //   for (const id of favIDArr) {
      //     if (listing._id === id) {
      //       setUserFavourites([...userFavourites, listing]);
      //     }
      //   }
      // });

      function filterByValue(array, string) {
        return array.filter((o) => {
          // .filter will return array of the values that passed .some (boolean) test
          return Object.keys(o).some((k) => {
            if (typeof o[k] === "string") return o[k].includes(string);
          });
        });
      }

      const filterFavourites = favIDArr.map((id, index) => {
        return filterByValue(data, id);
      });

      // console.log(filterFavourites[2][0].petName);
      console.log(filterFavourites);
      setUserFavourites(filterFavourites);
    } catch (err) {
      console.log(err);
    }
  };

  // const userFavourites = userProfile[0].favourites.map((favouriteID, index) => {
  //   displayUserFavourites(favouriteID);
  // });

  // console.log(userFavourites);

  return (
    <div>
      {userFavourites.map((item) => {
        return <div>
          <p>Pet Name: {item[0].petName}</p>
          <p>Pet Age: {item[0].age}</p>
          </div>;
      })}
    </div>
  );
};

export default Favourite;
