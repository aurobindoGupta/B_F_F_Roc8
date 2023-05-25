const readline = require("readline");
const inquirer = require("inquirer"); //always use 8.2.5 for cli
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-hFshaBGuI3S1iyYzO02PPi5L",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// *console.log(process.env.OPENAI_API_KEY);
const history = [];

function getClientInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "YOU> ",
  });
  console.log("Info: Type in exit to close chat");
  rl.prompt();
  rl.on("line", async (line) => {
    if (line.toLowerCase() !== "exit") {
      history.push({ role: "user", content: line });
      const chatgptRes = await getChatGptRes(history);
      if (chatgptRes.content) {
        history.push(chatgptRes);
        console.log("ChatGpt: ", chatgptRes.content);
        rl.prompt();
      } else {
        console.error("Error");
      }
    } else rl.close();
  });
}

(function initialSetup() {
  inquirer
    .prompt([
      {
        name: "gptRes",
        message: "Type start to begin",
        type: "input",
      },
    ])
    .then(async (response) => {
      if (response.gptRes.toLowerCase() === "start") {
        getClientInput();
      } else console.log(response.gptRes, "\nWrong Choice Dumbo");
    });
})();

async function getChatGptRes(chatArr) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatArr,
    });

    return completion.data.choices[0].message;
  } catch {
    (err) => console.error("chatgpt response", err);
  }
}
