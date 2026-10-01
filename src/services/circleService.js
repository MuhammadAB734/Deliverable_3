const circleRepository = require('../repositories/circleRepository');

async function getCircleMembers(circleId) {
  const circle = await circleRepository.findCircleById(circleId);
  if (!circle) {
    const error = new Error('Circle not found');
    error.statusCode = 404;
    throw error;
  }

  const members = await circleRepository.findMembersByCircleId(circleId);
  return { circle, members };
}

async function getCircleCycles(circleId) {
  const circle = await circleRepository.findCircleById(circleId);
  if (!circle) {
    const error = new Error('Circle not found');
    error.statusCode = 404;
    throw error;
  }

  const cycles = await circleRepository.findCyclesByCircleId(circleId);
  return { circle, cycles };
}

module.exports = { getCircleMembers, getCircleCycles };
