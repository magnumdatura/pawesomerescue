import React, { useContext, useEffect } from "react";
import ReactContext from "../context/react-context";

const LoginDetails = () => {
  const reactCtx = useContext(ReactContext);

  const fetchDisplay = async (url) => {
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
      // setData(data);
      console.log(data);
      reactCtx.setUserProfile(data);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };
  //WIP NAT
  const fetchDelete = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.EmailInput,
    });

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data);
      reactCtx.setUserProfile(data);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };
  //WIP
  function handleDelete(event) {
    event.preventDefault();
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    fetchDelete("http://localhost:5001/users/user");
  }

  useEffect(() => {
    fetchDisplay("http://localhost:5001/users/users"); // eslint-disable-next-line
  }, []);

  ////////////////
  // Display users favorites :: WIP :: LIONEL
  ////////////////

  const displayUserFavourites = async (listingId) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
    };

    try {
      const res = await fetch(
        "http://localhost:5001/listings/displayAll",
        options
      );

      if (res.status !== 200) {
        throw new Error("Could not fetch favourites from listing database.");
      }

      const data = await res.json();
      console.log(data);

      function filterByValue(array, string) {
        return array.filter((o) => {
          // .filter will return array of the values that passed .some (boolean) test
          return Object.keys(o).some((k) => {
            if (typeof o[k] === "string") return o[k].includes(string);
          });
        });
      }

      const filterFavourites = filterByValue(data, listingId);
      console.log(filterFavourites);
      return (
        <span>
          {/* <div>
            <img src={filterFavourites[0].image} />
          </div> */}
          <div>
            <h3>Name: {filterFavourites[0].petName}</h3>
          </div>
        </span>
      );
    } catch (err) {
      console.log(err);
    }
  };

  console.log(reactCtx.userProfile);

  // const hardcodeId = reactCtx.displayAll[0].favourites[1];
  // console.log(hardcodeId);
  // displayUserFavourites(hardcodeId)

  // console.log(favouritesArr)

  ////////////////
  // WIP :: LIONEL
  //////////////////

  return (
    <div className="App">
      <div>
        {reactCtx.userProfile &&
          reactCtx.userProfile.map((data, index) => {
            // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
            return (
              <span>
                <div key={index} className="listing">
                  <div>
                    <h4>Name: {data.name}</h4>
                  </div>
                  <div>
                    Email Address:
                    <p id="email">{data.email}</p>
                  </div>
                  <div>
                    <p>Profile Type: {data.profileType}</p>
                  </div>
                  <div>
                    <p>Address: {data.contact.address}</p>
                  </div>
                  <div>
                    <p>Phone: {data.contact.phone}</p>
                  </div>
                  <div>
                    <p>Role: {data.role}</p>
                  </div>
                  <div>
                    <h2>
                      Favourites:
                      {data.favourites.map((favouriteID, index) => {
                        const displayFavourites =
                          displayUserFavourites(favouriteID);
                        console.log(displayFavourites);
                        // return (
                        //   <span>
                        //     <div>
                        //       <h4>{displayFavourites}</h4>
                        //     </div>
                        //   </span>
                        // );

                        // {return (
                        //   <div key={index}>
                        //     <p>{favouriteID}</p>
                        //   </div>
                        // )};
                      })}
                    </h2>
                  </div>
                  <div>
                    <button id={data._id} onClick={handleDelete}>
                      NAT IS WORKING ON THIS DELETE BUTTON
                    </button>
                  </div>
                </div>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default LoginDetails;
