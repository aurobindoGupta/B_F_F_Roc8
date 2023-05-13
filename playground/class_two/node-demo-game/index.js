const program = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const { type } = require("os");
console.log("Demo Game");

function gamePlay(index) {
  console.log("heya", index);
  inquirer.prompt([
    {
      name: "gameplay",
      message: index.description,
      type: "list",
      choices: index.choices.map((itm) => item.option),
    },
  ]).then(res=> console.log(res));
}
function gameOption() {
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
        let dataObj={};
      if (res.gameChoice === "demo") {
         dataObj = JSON.parse(fs.readFileSync("./demo-game-story.json"));

      }
      else{
         dataObj = JSON.parse(fs.readFileSync("./dragon-game-story.json"));
      }
      if(!dataObj){
        program.command('start').description('Enter Start to start game').action(()=>{
            gamePlay(dataObj.scenes.start);
        })
      }
    })
    .catch((e) => console.error(e));
}
gameOption();
