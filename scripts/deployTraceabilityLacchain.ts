
import { lacchain, ethers } from "hardhat";

const defaultCallParams = { gasLimit: 500000, gasPrice: 0 };

async function main() {
  const accounts = lacchain.getSigners();
  
  console.log(`Deploy with account: ${accounts[0].address}`)
  const Traceability = await ethers.getContractFactory("Traceability", accounts[0]);
  const traceability = await lacchain.deployContract(Traceability);

  console.log(`Traceability smart contract deployed at: ${traceability.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });