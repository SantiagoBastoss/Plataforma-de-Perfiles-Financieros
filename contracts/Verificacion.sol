// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import './verifier.sol';


contract Verificacion{

    uint256 nitBanco;
    uint256 claveBanco;

    uint256[2] _pA = [0x1a2a3b6e2ba804a4d3466a5b9047b672da212172728e6fb903dda6771b25cbbc, 0x108686857389327fd6b1872c112f3ff8daed6127eeba8d55103d6ebeab4db1e2];
    uint256[2][2] _pB = [[0x2e94b1fb1aafb2b2e7fb6776f3e50de2da86f19c844579629204c26d00d1a0f5, 0x2b4fe218a04bfafe9bc14f105fb31f59598664cf1bd25fd354697bfa6289bbf5],[0x2b23949fada2b6a6f499115a8ac5f1c3d455186df0f1353b7663c706627ae25d, 0x076a8ba7e1c7d4551921f900598c7c57af8fef79fdc792f0ca4e9e2f3bdd4fd2]];
    uint256[2] _pC = [0x2198f7f4ed785cf8a50a92310bc21b64e0b7acd3175cdd3dd8742110323c0ed5, 0x05227cbeb1683d376aa494f4f7584aa1b3756c5a5f7766c78fb8f0ecc0705636];

    address payable owner;

    Groth16Verifier zkp;

    constructor(uint256 _nitBanco, uint256 _claveBanco) {
        nitBanco = _nitBanco;
        claveBanco = _claveBanco;
        owner = payable(msg.sender);
        zkp = new Groth16Verifier();
    }

    function actualizar_clave(uint256 nuevaClave) external payable{
        require(msg.value==10, "El valor de esta operacion es de 10 ETH");
        claveBanco = nuevaClave;
        owner.transfer(msg.value);
    }

    function realizar_verificacion(uint256 clave_sec, uint _docCliente, uint _claveCliente) external view returns(bool res){

        uint256 docCliente = uint256(_docCliente);
        uint256 claveCliente = uint256(_claveCliente);

        res = zkp.verifyProof(_pA, _pB, _pC, [clave_sec, (nitBanco+docCliente), claveCliente, claveBanco]);
        return res;
    }
}