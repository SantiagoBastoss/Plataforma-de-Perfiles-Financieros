const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoBanco", (m) => {

  const contrato = m.contract("Banco", ["Bancolombia", 123456789, 987654321]);

  return { contrato };
});
