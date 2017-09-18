const async = require('async');
const axios = require('axios');

// create job queue
const queue = async.queue((job, callback) => {
  job.update('started');
  // get HTML for specified URL
  axios.get(`http://${job.url}`)
  .then(res => {
    // update job with HTML
    const html = res.data;
    job.update('complete', html);
    callback();
  })
  .catch(err => {
    job.update('error', 'Invalid URL');
    callback();
  });
});

queue.drain = () => {
  console.log('Job queue has processed all jobs')
}

module.exports = queue;
