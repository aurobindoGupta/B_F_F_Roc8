const fs = require("fs");

const data = "hello PPL";

const newData = "\nThis is a new line!";
//async operation.
//?create file
// fs.writeFile("exp.txt", data, (err) => {
//   if (err) throw err;
//   console.log("file created Successfully");
// });
//?read file

fs.readFile("exp.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});
//!The utf8 encoding is specified to ensure the file's content is returned as a string.

//?update file

// fs.appendFile("exp.txt", newData, (err) => {
//   if (err) throw err;
//   console.log("File updated successfully!");
// });

//?Delete file

fs.unlink("exp.txt", (err) => {
  if (err) throw err;
  console.log("File deleted successfully!");
});

//!put all inside the scope of create file, becomes callback hell.

// fs.writeFile("example.txt", data, (err) => {
//   if (err) throw err;
//   console.log("File created successfully!");

//   // File has been created - now safe to update the file
//   fs.appendFile("example.txt", newData, (err) => {
//     if (err) throw err;
//     console.log("File updated successfully!");

//     // File has been updated - safe to delete the file
//     fs.unlink("example.txt", (err) => {
//       if (err) throw err;
//       console.log("File deleted successfully!");
//     });
//   });
// });