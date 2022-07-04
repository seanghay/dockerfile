#!/usr/bin/env node
import https from "node:https";
import fs from "node:fs";

const projectId = process.argv[2];

if (!projectId) {
  console.error("No argument specify!\nTry npm init dockerfile node-16");
  process.exit(1)
}

if (fs.existsSync('Dockerfile')) {
  console.error('Dockerfile already exists')
  process.exit(1);
}

const url = `https://raw.githubusercontent.com/seanghay/dockerfile/main/${projectId}/Dockerfile`;

const download = function (url, dest, cb) {
  let file = null;
  https
    .get(url, function (response) {
      if (response.statusCode == 200) {
        if (file == null) {
          file = fs.createWriteStream(dest);
        }
        response.pipe(file);
        file.on("finish", function () {
          file.close(cb);
        });
      } else {
        console.error(JSON.stringify(projectId) + " not found");
        process.exit(1);
      }
    })
    .on("error", function (err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};

download(url, "Dockerfile", () => console.log("Dockerfile downloaded"));
