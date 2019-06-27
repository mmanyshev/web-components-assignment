
"use strict";

const path = require("path");

const DIST_FOLDER = path.join(__dirname, "..", "dist");
const SOURCE_FOLDER = path.join(__dirname, "..", "src");

const INDEX_HTML_FILE_PATH = path.join(SOURCE_FOLDER, "assets/index.html");

module.exports = {
  DIST_FOLDER,
  SOURCE_FOLDER,
  INDEX_HTML_FILE_PATH,
};
