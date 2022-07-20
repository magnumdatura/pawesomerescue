import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";

const Favourite = () => {
  const reactCtx = useContext(ReactContext);

  const userProfile = reactCtx.userProfile;
  console.log(userProfile);
  const favIDArr = userProfile[0]?.favourites;
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
      console.log(favIDArr);
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
      {userFavourites == "" ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <p>Log in to view your favourites!</p>
        </div>
      ) : (
        userFavourites.map((item) => {
          return (
            <div className="ml-4 my-2 mx-3 pl-2 w-64 h-96 inline-block m-2 p-2 rounded-lg shadow-lg">
              <h2 className="text-xl">{item[0].title}</h2>
              <img src={item[0].image} />
              <p>Pet Name: {item[0].petName}</p>
              <p>Species: {item[0].species}</p>
              <p>Breed: {item[0].breed}</p>
              <p>Sex: {item[0].sex}</p>
              <p>Size: {item[0].size}</p>
              <p>Age: {item[0].age}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Favourite;
