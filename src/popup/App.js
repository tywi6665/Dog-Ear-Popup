/*global chrome*/
import React, { useState, useEffect } from 'react';
import RecipeEntry from "../components/RecipeEntry";
import '../App.scss';

import socketIOClient from "socket.io-client";

const ENDPOINT = "https://still-hamlet-76887.herokuapp.com/?EIO=3&transport=polling";

function App() {

  const [loadClient, setLoadClient] = useState(true);
  const [currentTabURL, setCurrentTabURL] = useState("");
  const [recipe, setRecipe] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTab = tabs[0].url;
      console.log(activeTab)
      if (typeof activeTab == "undefined") {
        console.log("URL not Found")
      } else {
        setCurrentTabURL(activeTab)
      }
    });
  }, [])

  const scrapeData = () => {
    setIsClicked(true)
    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", function () {
      socket.emit("from_client", currentTabURL);
    });

    socket.on("from_server", data => {
      console.log('Connection to server established.', data);
      setRecipe(data)
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }

  return (

    <div id="popup_page">
      <header>
        <div className="dog-image">
          <img src="./graphics/dog.png" alt="Woof woof" />
        </div>
        <h2>Dog-Ear Recipe Extension</h2>
      </header>
      {loadClient && currentTabURL && isClicked ?
        (<>
          {Object.keys(recipe).length ?
            <>
              <div className="back">
                <button onClick={() => setIsClicked(false)}></button>
              </div>
              <h3><em>Example Recipe Entry:</em></h3>
              <RecipeEntry
                recipe={recipe}
                key={recipe.id}
                url={currentTabURL}
                setIsClicked={setIsClicked}
              />
            </>
            :
            <>
              <div className="dog-loader">
                <div className="dog-head">
                  <img src="http://www.clker.com/cliparts/j/3/Z/Y/D/5/dog-head-md.png" />
                </div>
                <div className="dog-body">
                </div>
              </div>
              <p className="dog-loader-p"><em>Scraping data...</em></p>
            </>
          }
        </>)
        :
        <div className="buttons">
          <div className="link">
            <button onClick={() => scrapeData()}>Create Recipe Entry</button>
          </div>
          <div className="link">
            <a href="https://tywi6665.github.io/Dog-Ear-Client/" target="_blank">Go to Recipe Repository</a>
          </div>
        </div>
      }
    </div>

  );
}

export default App;
