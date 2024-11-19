const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ContratoGroth16Verifier", (m) => {

  const contrato = m.contract("Groth16Verifier", []);

  return { contrato };
});
