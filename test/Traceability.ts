import { GasModelSigner } from "@lacchain/gas-model-provider";
import { expect } from "chai";
import { Contract } from "ethers";
import { lacchain, ethers } from "hardhat";
const defaultCallParams = { gasLimit: 500000, gasPrice: 0 };


//key are case sensitive?
const key1 = "IwNHDG3xJT";
const key2 = "bPLshZuT2m";
const key3 = 'IWNHDG3XJT';
const hash1 = "3f46dcaa0c39ec4bc2490a2eff06879e0b8b159fb5d28c521b99fca2a52b876c";
const hash2 = "46052e2c03ce5ff51e08e84dcbf5030606f76d76e4ea958eb612b42fc57a38ef";

//Siempre ejecutar este test w --network lacchain
interface TraceabilityDeployInfo {
    address: string,
    traceability: Contract,
    owner: string
}

async function storeHash(contract: Contract, key: string, hash: string) {
    const tx1 = await contract.storeHash(key, hash, defaultCallParams);
    return tx1;
}


describe("Test 1", function () {
    console.log("test1")

    async function deploy(sender: GasModelSigner): Promise<TraceabilityDeployInfo> {

        const Traceability = await ethers.getContractFactory("Traceability", sender);
        const traceability = await lacchain.deployContract(Traceability);

        const address = traceability.address;
        const owner = await traceability.owner();

        console.log(`deployed at: ${address} - owner: ${owner}`)

        return {
            address,
            traceability,
            owner
        }
    }

    it("Should set the right owner", async function () {
        const accounts = lacchain.getSigners();
        const { address, traceability, owner } = await deploy(accounts[0]);


        expect(await traceability.owner()).to.equal(accounts[0].address);


        //store and retrieve key
        const tx1 = await storeHash(traceability, key1, hash1);
        //store from account that is not the owner
        await tx1.wait(); //wait until the transaction is mined

        expect(await traceability.hashes(key1)).to.equal(hash1);

        try {
            //Repeat key
            const tx2 = await storeHash(traceability, key1, hash1);
            //store from account that is not the owner
            await tx2.wait(); //wait until the transaction is mined

        } catch (err) {
            console.log(err)

            // tx2 .to be reverted
        }
        

        //try store with another account, should fail also
        try{    
            const Traceability = await ethers.getContractFactory("Traceability", accounts[1]);
            const deployed = Traceability.attach(address);
            const tx3 = await deployed.storeHash(key2, hash2, defaultCallParams);

            await tx3.wait();

            console.log("NEVER")
        } catch(err){
            console.log(err);
        }



    });
})