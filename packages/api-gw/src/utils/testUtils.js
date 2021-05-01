
function buildMockServer(server, plugin) {
  return server().register(plugin);
}

 module.exports = { buildMockServer };
