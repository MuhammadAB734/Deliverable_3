const circleService = require('../services/circleService');

function parseCircleId(value) {
  const circleId = Number(value);
  if (!Number.isInteger(circleId) || circleId <= 0) {
    const error = new Error('circle id must be a positive integer');
    error.statusCode = 400;
    throw error;
  }
  return circleId;
}

async function getMembers(req, res, next) {
  try {
    const circleId = parseCircleId(req.params.id);
    const data = await circleService.getCircleMembers(circleId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getCycles(req, res, next) {
  try {
    const circleId = parseCircleId(req.params.id);
    const data = await circleService.getCircleCycles(circleId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getMembers, getCycles };
