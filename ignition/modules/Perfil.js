const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoPerfil12", (m) => {

  const contrato = m.contract("Perfil", []);

  return { contrato };
});
