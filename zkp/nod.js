const snarkjs = require("snarkjs");
const fs = require("fs");

async function run() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 80240, b: 19876, c: 65432, d: 2197103190161320, e: 3}, "./zkp/autenticador_js/autenticador.wasm", "./zkp/autenticador_0001.zkey");

    const  prueba  = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);


    console.log("Prueba: ");
    console.log(prueba);

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    console.log("PRUEBA: ");

    console.log(prueba.slice(0, 140));
    console.log(prueba.slice(141, 424));
    console.log(prueba.slice(425, 565));
    console.log(prueba.slice(566, 843));

    const vKey = JSON.parse(fs.readFileSync("./zkp/verification_key.json"));
    

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }

}

run().then(() => {
    process.exit(0);
});