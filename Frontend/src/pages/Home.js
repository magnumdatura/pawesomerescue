import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const Home = () => {
  const reactCtx = useContext(ReactContext);

  const fetchDisplayListings = async (url) => {
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
      reactCtx.setListing(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDisplayListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, []);

  const fetchSearchListings = async (url) => {
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
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      function filterByValue(array, string) {
        return array.filter((o) => {
          // this returns an array of values that pass 'true' in the .some test :: .some returns true/false
          return Object.keys(o).some((k) => {
            if (typeof o[k] === "string")
              return o[k].toLowerCase().includes(string.toLowerCase());
          });
        });
      }

      const filterSearch = filterByValue(data, reactCtx.searchListingInput);
      reactCtx.setSearchDisplay(filterSearch);
      console.log(reactCtx.searchDisplay);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, [reactCtx.searchListingInput]);

  function handleListingSearch(event) {
    event.preventDefault();
    if (event.target.id === "searchInput")
      reactCtx.setSearchListingInput(event.target.value);
  }

  function submitListingSearch(event) {
    event.preventDefault();
    fetchSearchListings("http://localhost:5001/listings/displayAll");
  }

  // setInterval(
  //   fetchDisplayListings("http://localhost:5001/listings/displayAll"),
  //   5000
  // );

  const updateListingFavouriteCount = async (url, listingId) => {
    const bod = JSON.stringify({ id: listingId });

    const options = {
      method: "PATCH",
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfileFavouritesArray = async (url, listingId) => {
    const bod = JSON.stringify({ favouriteAdd: listingId });

    const options = {
      method: "POST",
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
      console.log(data);
      window.alert("Listing favourited!");
    } catch (err) {
      console.log(err);
    }
  };

  function addToFavourites(event) {
    event.preventDefault();
    console.log(event.target.id);

    // go to listing and plus one to favourite count
    updateListingFavouriteCount(
      "http://localhost:5001/listings/favourite",
      event.target.id
    );

    // go to profile and add listing ID to profile favourites array
    updateProfileFavouritesArray(
      "http://localhost:5001/users/favourites",
      event.target.id
    );
  }

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Search listings"
          id="searchInput"
          onChange={handleListingSearch}
        ></input>
        {/* WIP NAT */}
        <Link to="/searchlisting">
          <button onClick={submitListingSearch}>Search</button>
        </Link>
      </form>
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
                <div>
                  <p>Favourite Count: {data.favouritesCount}</p>
                </div>
                <div>
                  <button id={data._id} onClick={addToFavourites}>
                    Favourite
                  </button>
                </div>
              </div>
            </span>
          );
        })}
    </>
  );
};

export default Home;
