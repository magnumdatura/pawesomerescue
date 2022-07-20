import React, { useContext, useEffect } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const Profile = () => {
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

      if (data.length > 1) {
        reactCtx.setUserRole("admin");
        console.log(reactCtx.userRole);
      }
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
      window.location.reload();
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
  }, [reactCtx.loginState]);

  return (
    <div className="App">
      <div>
        {reactCtx.userProfile &&
          reactCtx.userProfile.map((data, index) => {
            // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
            return (
              <div
                key={index}
                className="ml-4 my-2 mx-3 pl-2 w-1/4 h-1/4 inline-block m-2 p-2 rounded-lg shadow-lg"
              >
                <div>
                  <p className="p-1 capitalize">Name: {data.name}</p>
                </div>
                <div>
                  <p id="email" className="p-1">
                    Email Address: {data.email}
                  </p>
                </div>
                <div>
                  <p className="p-1 capitalize">
                    Profile Type: {data.profileType}
                  </p>
                </div>
                <div>
                  <p className="p-1 capitalize">
                    Address: {data.contact?.address}
                  </p>
                </div>
                <div>
                  <p className="p-1 capitalize">Phone: {data.contact?.phone}</p>
                </div>
                <div>
                  <p className="p-1 capitalize">Role: {data.role}</p>
                </div>
                <div>
                  <button
                    id={data._id}
                    onClick={handleDelete}
                    className="text-center mx-auto block w-50 m-1 px-3 text-white font-semibold button-85"
                  >
                    <Link to="/home">Delete</Link>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
