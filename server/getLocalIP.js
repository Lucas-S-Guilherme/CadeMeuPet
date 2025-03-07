const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let interfaceName in interfaces) {
    for (let iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; // Retorna o IP local da máquina
      }
    }
  }
  return 'localhost'; // Se não encontrar, usa localhost
}

module.exports = getLocalIP;
