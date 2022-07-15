import React, { useState, useEffect } from "react";

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

function PageThree() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");

  //password1 for the sign up page
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [displayAll, setDisplayAll] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [validEmail, setValidEmail] = useState(false);

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
      email: emailInput,
      password: passwordInput,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
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
      console.log(data); // this returns both access and refresh tokens as part of the data object
      const access_token = data.access;
      const refresh_token = data.refresh;
      console.log(access_token);
      console.log(refresh_token);
      setAccess(access_token);
      setRefresh(refresh_token);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  // GET /displayAll [[admin]]
  const fetchDisplay = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
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
      setDisplayAll(data);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  // POST /display1 // currently does work, mapping issues
  const fetchSearch = async (url) => {
    const bod = JSON.stringify({
      email: searchInput,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
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
      setDisplayAll(data);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    // console.log(event.target.id);
    if (event.target.id === "email") setEmailInput(event.target.value);
    if (event.target.id === "password") setPasswordInput(event.target.value);
    if (event.target.id === "search") setSearchInput(event.target.value);
  }

  // login email validator
  useEffect(() => {
    // checking on keystroke
    // validEmail.current = inputEmail.includes("@");
    setValidEmail(emailInput.includes("@")); //if input email includes @ then it will setValidEmail as true
  }, [emailInput]);

  // search email validator
  useEffect(() => {
    setValidEmail(searchInput.includes("@"));
  }, [searchInput]);

  function handleLogin(event) {
    event.preventDefault();
    if (validEmail) {
      fetchLogin("http://localhost:5001/users/login");
    } else {
      window.alert(`WRONG ADOPTION SERVER: UR STILL A LOSTBOI MOTHERFUCKER`);
    }
  }

  function handleDisplay(event) {
    event.preventDefault();
    fetchDisplay("http://localhost:5001/users/users");
  }

  function handleSearch(event) {
    event.preventDefault();
    if (validEmail) {
      fetchSearch("http://localhost:5001/users/user");
      console.log(displayAll);
    } else {
      window.alert(`DONT BE A STALKER CALL POLIS`);
    }
  }

  return (
    <div className="App">
      <form>
        <label>USERNAME</label>
        <input type="email" onChange={handleInput} id="email"></input>
        {/* <div>{emailInput}</div> */}
        <label>PASSWORD</label>
        <input type="password" onChange={handleInput} id="password"></input>
        {/* <div>{passwordInput}</div> */}
      </form>
      <button onClick={handleLogin}>LOGIN AND FETCH THE FUCKER</button>
      <button onClick={handleDisplay}>DISPLAY ALL USERS</button>

      <br></br>
      <form>
        <label>SEARCH</label>
        <input
          type="text"
          placeholder="search"
          onChange={handleInput}
          id="search"
        ></input>
      </form>
      <button onClick={handleSearch}>Submit the HUNT</button>
      <p>Access: {access}</p>
      <br></br>
      <p>Refresh: {refresh}</p>
      <div>
        {displayAll &&
          displayAll.map((data, index) => {
            // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
            return (
              <div key={index}>
                <br />
                name: {data.name}
                <br />
                company: {data.company}
                <br />
                date joined: {data.date}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PageThree;
