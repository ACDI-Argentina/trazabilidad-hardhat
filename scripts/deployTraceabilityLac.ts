
import { lacchain, ethers } from "hardhat";

async function main() {
  const accounts = lacchain.getSigners();

  console.log(`Deploy with account: ${accounts[0].address}`)
  const Traceability = await ethers.getContractFactory("Traceability", accounts[0]);
  const traceability = await lacchain.deployContract(Traceability);

  console.log(`Traceability smart contract deployed at: ${traceability.address}`);

  // Add gas limit 3145728
  const storeHashTx = await traceability.storeHash("demo-id", "demo-hash");

  // wait until the transaction is mined
  await storeHashTx.wait();

  
  const stored = await traceability.hashes("demo-id");
  console.log(stored);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });