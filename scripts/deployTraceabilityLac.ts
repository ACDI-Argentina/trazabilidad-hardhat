
import { lacchain, ethers } from "hardhat";

const defaultCallParams = { gasLimit: 500000, gasPrice: 0 };

async function main() {
  const accounts = lacchain.getSigners();
  

  console.log(`Deploy with account: ${accounts[0].address}`)
  const Traceability = await ethers.getContractFactory("Traceability", accounts[0]);
  const traceability = await lacchain.deployContract(Traceability);

  console.log(`Traceability smart contract deployed at: ${traceability.address}`);

  // Add gas limit 3145728
  const storeHashTx = await traceability.storeHash("demo-id", "demo-hash", defaultCallParams);
  await storeHashTx.wait();// wait until the transaction is mined

  const storeHashTx2 = await traceability.storeHash("demo-id-2", "3f46dcaa0c39ec4bc2490a2eff06879e0b8b159fb5d28c521b99fca2a52b876c", defaultCallParams);
  await storeHashTx2.wait();// wait until the transaction is mined
  

  const stored1 = await traceability.hashes("demo-id");
  console.log("stored: ", stored1);

  const stored2 = await traceability.hashes("demo-id-2");
  console.log("stored: ", stored2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });