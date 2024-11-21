const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoPerfil2", (m) => {

  const contrato = m.contract("Perfil", []);

  return { contrato };
});
