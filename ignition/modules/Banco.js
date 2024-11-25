const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoBanco12", (m) => {

  const contrato = m.contract("Banco", []);

  return { contrato };
});
