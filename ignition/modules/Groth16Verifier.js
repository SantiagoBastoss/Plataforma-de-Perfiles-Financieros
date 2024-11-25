const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoGroth16Verifier10", (m) => {

  const contrato = m.contract("Groth16Verifier", []);

  return { contrato };
});
