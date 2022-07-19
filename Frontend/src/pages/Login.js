import React, { useContext } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

// ways to store authorization tokens from JWT in react fetch || this covers what POSTMAN does
// fetch ('uri', {
//   header: {
//     authorization: "Bearer " + access_token
//   },
//   method: "POST",
//   body: {      (need to stringify) // body is outside headers
//     password:
//     email:
//   }
// })

const Login = () => {
  const reactCtx = useContext(ReactContext);

  //user login details
  //   {
  //     "name": "NatGA2",
  //     "password": "1234Abcd5678",
  //     "password1": "1234Abcd5678",
  //     "email" :"nattan2@gmail.com",
  //     "company" : "GA",
  //     "contact": {
  //         "address" : "woodlands",
  //         "phone": "9991"
  //         },
  //     "role" : "user"
  // }

  //admin
  // {
  //   "name": "NatAdmin",
  //   "password": "1234Abcd5678",
  //   "password1": "1234Abcd5678",
  //   "email" :"nattanAdmin@gmail.com",
  //   "company" : "GA",
  //   "contact": {
  //       "address" : "woodlands",
  //       "phone": "9991"
  //       },
  //   "role" : "admin"
  // }

  //create a create account for the front page

  // POST /login
  const fetchLogin = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.emailInput,
      password: reactCtx.passwordInput,
    });

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
        window.alert("Please Register");
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data); // this returns both access and refresh tokens as part of the data object
      const access_token = data.access;
      const refresh_token = data.refresh;
      console.log(access_token);
      console.log(refresh_token);
      reactCtx.setAccess(access_token);
      reactCtx.setRefresh(refresh_token);
      reactCtx.setLoginState(true);
      // alert("Logged in");
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  // GET /displayAll [[admin]]
  // const fetchDisplay = async (url) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: "Bearer " + reactCtx.access,
  //     },
  //   };

  //   try {
  //     const res = await fetch(url, options);
  //     console.log(res);
  //     console.log(options);

  //     if (res.status !== 200) {
  //       throw new Error("Something went wrong.");
  //     }

  //     const data = await res.json();
  //     // setData(data);
  //     console.log(data);
  //     reactCtx.setDisplayAll(data);
  //   } catch (err) {
  //     // setError(err.message);
  //     console.log(err);
  //   }
  // };

  const fetchSearch = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.searchUserInput,
    });

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
      // setData(data);
      console.log([data]);
      reactCtx.setDisplayAll([data]);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    // console.log(event.target.id);
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
    if (event.target.id === "search")
      reactCtx.setSearchUserInput(event.target.value);
  }

  /////////////////////////////////////////
  // To deal with app crashing when going from registration --> profile, no longer using useEffect below, with the validEmail state as validator. Instead just use .includes('@') directly in the handleLogin / handleSearch checks
  /////////////////////////////////////////

  // login email validator
  // useEffect(() => {
  //   // checking on keystroke
  //   // validEmail.current = inputEmail.includes("@");
  //   reactCtx.setValidEmail(reactCtx.emailInput.includes("@")); //if input email includes @ then it will setValidEmail as true
  //   // eslint-disable-next-line
  // }, [reactCtx.emailInput]);

  // search email validator
  // useEffect(() => {
  //   reactCtx.setValidEmail(reactCtx.searchInput.includes("@"));
  //   // eslint-disable-next-line
  // }, [reactCtx.searchInput]);

  function handleLogin(event) {
    event.preventDefault();
    if (reactCtx.emailInput.includes("@")) {
      fetchLogin("http://localhost:5001/users/login");
    } else {
      window.alert(`WRONG ADOPTION SERVER: UR STILL A LOSTBOI MOTHERFUCKER`);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    if (reactCtx.searchUserInput.includes("@")) {
      fetchSearch("http://localhost:5001/users/user");
    } else {
      window.alert(`DONT BE A STALKER CALL POLIS`);
    }
  }

  return (
    <div className="App">
      {/* links to the registration page */}

      <form>
        <div>
          <div>
            <label className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Email
            </label>
          </div>
          <input
            type="email"
            onChange={handleInput}
            id="email"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <div>
            <label className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Password
            </label>
          </div>
          <input
            type="password"
            onChange={handleInput}
            id="password"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div className="w-full mt-2 mb-2 py-2 text-center">
          <button
            onClick={handleLogin}
            className="inline-block mx-auto mr-2 w-50 px-3 py-2 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
          >
            <Link to="/profile">Login</Link>
          </button>
          <button className="inline-block mx-auto w-50 px-3 py-2 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </form>
      {/* <div>
        <label>Search</label>
      </div>
      <input
        type="text"
        placeholder="search with email"
        onChange={handleInput}
        id="search"
      ></input>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div> */}

      <div>
        {/* {reactCtx.displayAll &&
          reactCtx.displayAll.map((data, index) => {
            // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
            return (
              <div key={index}>
                <br />
                name: {data.name}
                <br />
                date joined: {data.date}
                <br />
                profile type: {data.profileType}
                <br />
                email add: {data.email}
                <br />
                role: {data.role}
              </div>
            );
          })} */}
      </div>
    </div>
  );
};

export default Login;
