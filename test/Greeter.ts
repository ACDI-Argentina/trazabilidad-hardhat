import { ethers, lacchain } from "hardhat";

(async function(){
    const accounts = lacchain.getSigners();
    console.log(accounts)
    const Greeter = await ethers.getContractFactory("Greeter", accounts[2]);
    const greeter = await lacchain.deployContract(Greeter, "Hello, world!");
    console.log(`deployed at: ${greeter.address}`)
    
})();