const snarkjs = require("snarkjs");
const fs = require("fs");

async function run() {
    try {
        const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 89, b: 43, c: 5, d: 1585804, e: 3}, "./zkp/autenticador_js/autenticador.wasm", "./zkp/autenticador_0001.zkey");

        console.log("Proof: ");
        console.log(JSON.stringify(proof, null, 1));

        const vKey = JSON.parse(fs.readFileSync("./zkp/verification_key.json"));

        const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

        if (res === true) {
            console.log("Verification OK");
        } else {
            console.log("Invalid proof");
        }

        (await circomlib.buildPoseidon()).arguments

        return true;

    } catch (error) {
        console.log(error)
    }

    console.log("Si se hace");
    return false;
}

run().then(() => {
    process.exit(0);
});