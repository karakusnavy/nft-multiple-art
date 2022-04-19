// important information: your filenames should be listed as 1, 2, 3, 4, 5 (example: 1.png, 2.png)
const sourceDirection = "./images/";
const destDirection = "./builds/";
const fs = require("fs");
const fsextra = require("fs-extra");
var multipleStartingIndex = 1;
const multipleEndingIndex = 10000; // copy count
const fileFormat = ".png";
const activeConfig = true;

// count of multipleEndingIndex
const config = {
  1: 10, // 1.png
  2: 25,
  3: 65,
  4: 500,
  5: 1400,
  6: 2000,
  7: 1500,
  8: 1500,
  9: 1500,
  10: 1500,
};

fs.readdir(sourceDirection, async (err, files) => {
  while (multipleStartingIndex <= multipleEndingIndex) {
    await multiAsyncF(files, multipleStartingIndex);
  }
});

async function multiAsyncF(files, i) {
  var randomFileL = Math.floor(Math.random() * files.length);
  randomFileL++;
  if (activeConfig) {
    if (config[randomFileL] > 0) {
      await createNewCopy(sourceDirection, files, randomFileL, i);
    } else {
      delete config[randomFileL];
    }
  } else await createNewCopy(sourceDirection, files, randomFileL, i);
}

async function createNewCopy(sourceDirection, files, randomFileL, i) {
  await fsextra.copySync(
    sourceDirection + files[randomFileL - 1],
    destDirection + i + fileFormat,
    { recursive: true }
  );
  config[randomFileL] = config[randomFileL] - 1;
  console.log(randomFileL + " : " + config[randomFileL]);
  multipleStartingIndex++;
}
