const router = require('express').Router();
const { addJob, getJob } = require('../controllers/jobs');

router.route('/')
  .post(addJob);
router.route('/:id')
  .get(getJob);

module.exports = router;
