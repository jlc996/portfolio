
const Counter = require('../models/Counter');

// Generate the next unique project ID using MongoDB's atomic counter
const generateId = async (counterName) => {
  const counter = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { sequenceValue: 1 } },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );

  // Format the sequence as PRJ-0001, PRJ-0002, etc.
  return `PRJ-${String(counter.sequenceValue).padStart(4, '0')}`;
};

module.exports = generateId;