//////////////////////////////////////////INSTRUCTIONS////////////////////////////////////////
//////////////////////////////////////////INSTRUCTIONS////////////////////////////////////////
//////////////////////////////////////////INSTRUCTIONS////////////////////////////////////////
//////////////////////////////////////////INSTRUCTIONS////////////////////////////////////////
/**
 * You must have node.js installed on your system
 * STEP 1: install the fluent-ffmpeg & moment packages -> Go to terminal paste the below command
 * npm i -D fluent-ffmpeg moment
 * Once installed
 * STEP 2: put the direcory-path where your videos are stored.
 * You can fnd the directory path simply by opening the directory in your terminal:
 * --> Go to the folder using gui
 * --> right click --> Open in terminal --> copy the path --> that will be your path paste it in the
 * directory variable on line 25;
 * STEP 3: Run the file by pasting below command in terminal (make sure you are in the correct directory in your terminal)
 * node TotalVideoTime.js
 * **/

const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment");
let totalDuration = moment.duration();

const directory =
  "Enter Your Path here";
fs.readdir(directory, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const videoFiles = files.filter((file) => {
    const extension = path.extname(file).toLowerCase();
    return [".mp4", ".mkv", ".avi", ".mov"].includes(extension);
  });

  const filePromises = videoFiles.map((file) => {
    const filePath = path.join(directory, file);

    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
          return;
        }

        const durationInSeconds = metadata.format.duration;
        totalDuration.add(durationInSeconds, "seconds");
        resolve();
      });
    });
  });

  Promise.all(filePromises)
    .then(() => {
      console.log(
        "Total duration:",
        moment.utc(totalDuration.asMilliseconds()).format("HH:mm:ss")
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
