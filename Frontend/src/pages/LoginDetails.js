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
  }, [reactCtx.rerouteLogin]);

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
