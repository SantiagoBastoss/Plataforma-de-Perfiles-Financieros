const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoPerfil1", (m) => {

  const contrato = m.contract("Perfil", []);

  return { contrato };
});
