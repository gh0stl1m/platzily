async function liveness() {
  return {
    status: 'Server Running'
  }
}

module.exports = {
  liveness,
}