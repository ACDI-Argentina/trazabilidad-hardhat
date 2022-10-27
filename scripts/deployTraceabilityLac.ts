
import { lacchain, ethers } from "hardhat";

async function main() {
  const accounts = lacchain.getSigners();
  
  console.log(`Deploy with account: ${accounts[0].address}`)
  const Traceability = await ethers.getContractFactory("Traceability", accounts[0]);
  const traceability = await lacchain.deployContract(Traceability);

  console.log(`Traceability smart contract deployed at: ${traceability.address}`);

  // Add gas limit 3145728
  const tx = await traceability.storeHash("demo-id","demo-hash");
  console.log(tx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });