const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoPerfil", (m) => {

  const contrato = m.contract("Perfil", []);

  return { contrato };
});
