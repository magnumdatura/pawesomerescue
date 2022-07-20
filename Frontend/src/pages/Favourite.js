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
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Log in to view your favourites!</p>
        </div>
      ) : (
        userFavourites.map((item) => {
          return (
            <div className="ml-4 my-2 mx-3 pl-2 w-64 h-96 inline-block m-2 p-2 rounded-lg shadow-lg">
              <div>
                {/* <img src={require(`../images/${data.image}`)} alt="img" /> */}
                <img src={require(`../images/charmander.png`)} alt="img" />
              </div>
              <div>
                <p className="text-xl">{item[0].title}</p>
              </div>
              <div>
                <p className="text-m">Pet Name: {item[0].petName}</p>
              </div>
              <div>
                <p className="text-m">Species: {item[0].species}</p>
              </div>
              <div>
                <p className="text-m">Breed: {item[0].breed}</p>
              </div>
              <div>
                <p className="text-m">
                  Favourite Count: {item[0].favouritesCount}
                </p>
              </div>
              <div>
                <button
                  id={item[0]._id}
                  onClick={reactCtx.addToFavourites}
                  className="text-center mx-auto block w-50 px-3 text-white font-semibold button-85"
                >
                  ♡
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Favourite;
