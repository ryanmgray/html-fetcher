const Job = require('../models/job');
const queue = require('../helpers/queue');

const addJob = (req, res) => {
  // create new job
  const job = new Job({ url: req.body.url });
  // add new job to database
  job.add().then(data => {
    // add new job to queue
    queue.push(job, err => {
      if (err) {
        console.log(`Error processing ${job.url}, ${err}`);
      } else {
        console.log(`Job queue processing...`);
      }
    });
    data = data.toJSON();
    res.send({
      id: data.id,
      createdAt: data.createdAt,
      status: data.status,
      url: data.url
    });
  }).catch(err => {
    res.send({ error: `Expected {"url": "www.example.com"} in request body` });
  });
}

const getJob = (req, res) => {
  // retrieve job data from database by job id
  Job.get(req.params.id).then(data => {
    data = data.toJSON();
    res.send({
      id: data.id,
      createdAt: data.createdAt,
      status: data.status,
      url: data.url,
      data: data.data
    });
  }).catch(err => {
    res.send({
      id: req.params.id,
      status: 'error',
      error: 'Job id not found in database'
    });
  });
}

module.exports = {
  addJob: addJob,
  getJob: getJob
};
