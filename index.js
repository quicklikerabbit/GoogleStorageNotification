const axios = require("axios");
const config = require("./config.json");
const numeral = require('numeral');

exports.helloGCS = function(event, callback) {
  const file = event.data;

  if (file.resourceState === "not_exists") {
    axios({
      method: 'post',
      url: config.SLACK_WEBHOOK,
      data: {
        text: `File: ${file.name} was deleted from ${file.bucket}`
      }
    });
  } else if (file.metageneration === "1") {
    // metageneration attribute is updated on metadata changes.
    // on create value is 1
    axios({
      method: 'post',
      url: config.SLACK_WEBHOOK,
      data: {
        text: `File: ${file.name} was uploaded to ${file.bucket}.\nSize: ${numeral(file.size).format('0,0')} bytes`
      }
    });
  } else {
    axios({
      method: 'post',
      url: config.SLACK_WEBHOOK,
      data: {
        text: `File: ${file.name} metadata updated.`
      }
    });
  }

  callback();
};
