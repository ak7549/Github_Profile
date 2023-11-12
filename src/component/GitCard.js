import React, { useEffect, useState } from "react";
import "../style/Card.css";

const GitCard = () => {
  const [data, setData] = useState([]);
  const [repositry, setRepositry] = useState([]);
  const [input, setInput] = useState("");

  let url = "https://api.github.com/users/";
  let url2 = "https://api.github.com/users/repos/";

  const getUsers = async (username) => {
    let response = await fetch(url + username);
    let result = await response.json();
    setData(result);
    // console.log(result);
  };

  useEffect(() => {
    getUsers("ak7549");
  }, []);

  const getRepos = async (username) => {
    let response = await fetch(url + username + "/repos");
    let result = await response.json();
    setRepositry(result);
    // console.log(result);
  };

  useEffect(() => {
    getRepos("ak7549");
  }, []);

  // const handleInput = (e) => {
  //   setInput(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers(input);
    getRepos(input);
  };

  return (
    <div className="main container mt-3">
      <div className="center">
        <div className="input">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button type="submit" className="">
              {" "}
              Search
            </button>
          </form>
        </div>
        <div class="card container mt-3" style={{ width: "26rem" }}>
          <img src={data.avatar_url} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{data.name}</h5>
            <p class="card-text bio">{data.bio}</p>
            <p class="card-text follower">
              <span className="follo mx-2"> Followers {data.followers} </span>
              <span className="ollowing mx-2">
                {" "}
                Following {data.following}{" "}
              </span>
              <span className="reposs">Repositry {data.public_repos}</span>
            </p>

            <div className="repos">
              {repositry.map((elem, i) => {
                return (
                  <a href={elem.html_url} target="_blank">
                    {elem.name}{" "}
                  </a>
                );
              })}
            </div>
            <p class="card-text mt-3">
              <span className="url">Url: {data.html_url} </span> <br />
              <span className="url"> Location: {data.location}</span> <br />
              <span className="url">Created-At: {data.created_at}</span>
            </p>
            {/* <div className="footer">
              <p>GitHubProfile</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitCard;
