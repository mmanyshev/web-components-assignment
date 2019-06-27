
"use strict";

const fs = require("fs");
const path = require("path");

const DIST_FOLDER = path.join(__dirname, "..", "dist");
const SOURCE_FOLDER = path.join(__dirname, "..", "src");

const INDEX_HTML_FILE_PATH = path.join(SOURCE_FOLDER, "assets/index.html");
const COMPONENTS_FOLDER = "app/components";

const COMPONENT_CHUNK_LIST =
  fs.readdirSync(path.join(SOURCE_FOLDER, COMPONENTS_FOLDER))
    .reduce((acc, chunkFile) => {

      acc[chunkFile] =
        path.join(SOURCE_FOLDER, COMPONENTS_FOLDER, chunkFile);

      return acc;

    }, {});

module.exports = {
  DIST_FOLDER,
  SOURCE_FOLDER,
  INDEX_HTML_FILE_PATH,
  COMPONENT_CHUNK_LIST,
};
