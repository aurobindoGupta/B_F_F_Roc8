#!/usr/bin/env node

const { data: demoData } = require("./data/demo-game-story");
const { data: dragonData } = require("./data/dragon-game-story");
const inquirer = require("inquirer");
const fs = require("fs");

console.log("Demo Game");

function gamePlay(index, dataObj) {
  let currentIndex = index;

  const currentScene = dataObj.scenes[currentIndex];

  if (currentScene.choices.length <= 0) {
    console.log("\n\n", currentScene.description);
    console.log(`
 _______  _______  __   __  _______    _______  __   __  _______  ______   
|       ||   _   ||  |_|  ||       |  |       ||  | |  ||       ||    _ |  
|    ___||  |_|  ||       ||    ___|  |   _   ||  |_|  ||    ___||   | ||  
|   | __ |       ||       ||   |___   |  | |  ||       ||   |___ |   |_||_ 
|   ||  ||       ||       ||    ___|  |  |_|  ||       ||    ___||    __  |
|   |_| ||   _   || ||_|| ||   |___   |       | |     | |   |___ |   |  | |
|_______||__| |__||_|   |_||_______|  |_______|  |___|  |_______||___|  |_|
`);
    process.exit();
  } else {
    inquirer
      .prompt([
        {
          name: "gameplay",
          message: currentScene.description,
          type: "list",
          choices: currentScene.choices.map((itm) => {
            return itm.option;
          }),
        },
      ])
      .then((res) => {
        const nextIndex = currentScene.choices.filter(
          (item) => item.option === res.gameplay
        );
        console.warn(`You chose:- ${res.gameplay}`);
        gamePlay(nextIndex[0].nextScene, dataObj);
      });
  }
}
(function gameOption() {
  inquirer
    .prompt([
      {
        name: "gameChoice",
        message: "Which game would you like to play",
        type: "list",
        choices: ["Demo", "Dragon"],
      },
    ])
    .then((res) => {
      let dataObj = {};
      if (res.gameChoice.toLowerCase() === "demo") {
        dataObj = demoData;
      } else {
        dataObj = dragonData;
      }
      if (dataObj) {
        console.log("herher", res);
        inquirer
          .prompt([
            {
              name: "gameStart",
              message: `Input "start" to start Game`,
              type: "input",
            },
          ])
          .then(function (response) {
            if (response.gameStart.toLowerCase() === "start") {
              gamePlay(response.gameStart, dataObj);
            } else {
              console.error("Wrong keyword entered.");
            }
          });
      } else {
        console.log("restart game");
      }
    })
    .catch((e) => console.error(e));
})();
