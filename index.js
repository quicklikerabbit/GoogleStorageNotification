const axios = require("axios");
const config = require("./config.json")

exports.helloGCS = function(event, callback) {
  const file = event.data;
  console.log(file);

  if (file.resourceState === "not_exists") {
    console.log(`File ${file.name} deleted.`);
    axios({
      method: 'post',
      url: config.SLACK_WEBHOOK,
      data: {
        text: `File: ${file.name} was deleted!`
      }
    });
  } else if (file.metageneration === "1") {
    // metageneration attribute is updated on metadata changes.
    // on create value is 1
    console.log(`File ${file.name} uploaded.`);
    axios({
      method: 'post',
      url: config.SLACK_WEBHOOK,
      data: {
        text: `File: ${file.name} was uploaded!`
      }
    });
  } else {
    console.log(`File ${file.name} metadata updated.`);
    axios({
      method: 'post',
      url: config.SLACK_WEBHOOK,
      data: {
        text: `File: ${file.name} metadata updated!`
      }
    });
  }

  callback();
};
