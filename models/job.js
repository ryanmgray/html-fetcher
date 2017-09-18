const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  data: String
}, {
  toJSON: {
    transform: function (doc, obj) {
      obj.id = obj._id;
      delete obj.__v;
      delete obj._id;
      return obj;
    }
  }
});

jobSchema.methods = {
  // save job to database
  add: function() {
    return this.save((err, job) => {
      if (!err) {
        console.log(`Saving to database... \n Job: ${this.id} \n Status: ${this.status} \n Url: ${this.url}`);
        return job;
      }
      console.log(`Error saving job ${this.id} to database`);
    });
  },
  // update job status and results in database
  update: function(status, data) {
    this.model('Job').findOneAndUpdate({ _id: this.id }, {status: status, data: data}, {new: true}, (err, job) => {
      if (!err) {
        console.log(`Updating database... \n Job: ${this.id} \n Status: ${status} \n Url: ${this.url}`);
      } else {
        console.log(`Error updating job ${this.id} in database`);
      }
    });
  }
}

jobSchema.statics = {
  // retrieve job from database by job id
  get: function(id) {
    return this.model('Job').findOne({ _id: id }, (err, job) => {
      if (!err) {
        console.log(`Searching database... \n Job: ${id}`);
        return job;
      }
      console.log(`Error finding job ${id} in database`);
    });
  }
}

module.exports = mongoose.model('Job', jobSchema);
