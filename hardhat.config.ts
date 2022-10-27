import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./extender";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks:{
     // @ts-ignore 
    goerli:{
      url: `https://goerli.infura.io/v3/3a0b2f410cd84aa98dccd16f15849713`,
      accounts: [
        "0x8c310b790fc64673c75cea2ce985c0818c91d2e32f5e5c8c2c43aa7d4e74347b"
      ]
    },
    lacchain: {
      url: "http://localhost:4545",
      nodeAddress:"0x211152ca21d5daedbcfbf61173886bbb1a217242",
      gasPrice: 0,
      expiration: 1736394529,
      privateKeys: [
        '0x8c310b790fc64673c75cea2ce985c0818c91d2e32f5e5c8c2c43aa7d4e74347b', //0x041De422e5b2ccad8F520b432985cF8D8Da32C44?
     
      ],

    }
  }
};


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  try{
    const accounts = await hre.lacchain.getSigners();
    console.log("signers: ["+accounts+"]")
    
    for (const account of accounts) {
      console.log(account.address);
    }

  } catch(err){
    console.log(err);
  }
  
});

export default config;
