const Counter = require('../models/Counter');

const generateId = async (counterName) => {
  const counter = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { sequenceValue: 1 } },
    {
      new: true,
      upsert: true
    }
  );

  return String(counter.sequenceValue);
};

module.exports = generateId;