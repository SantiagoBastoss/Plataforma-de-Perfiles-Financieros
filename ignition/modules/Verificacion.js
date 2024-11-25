const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoVerificacion10", (m) => {

  const contrato = m.contract("Verificacion", [123456789, 987654321]);

  return { contrato };
});
