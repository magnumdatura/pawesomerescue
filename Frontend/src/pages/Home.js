import React, { useContext, useEffect } from "react";
import ReactContext from "../context/react-context";

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
      // setData(data);
      console.log(data);
      reactCtx.setListing(data);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDisplayListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* <form>
        <button onClick={handleDisplayListings}>DISPLAY ALL USERS</button>
      </form> */}

      {reactCtx.listing &&
        reactCtx.listing.map((data, index) => {
          // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
          return (
            <span>
              <div key={index} className="listing">
                <div>
                  <img src={data.image} />
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
                  <p>Comments: {data.comments}</p>
                </div>
              </div>
            </span>
          );
        })}
    </>
  );
};

export default Home;
