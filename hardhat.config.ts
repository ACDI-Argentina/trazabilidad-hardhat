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
  /*   lacchain: {
      url: "http://localhost:4545",
      nodeAddress:"0x211152ca21d5daedbcfbf61173886bbb1a217242",
      gasPrice: 0,
      expiration: 1736394529,
      privateKeys: [
        '0x8c310b790fc64673c75cea2ce985c0818c91d2e32f5e5c8c2c43aa7d4e74347b', //0x041De422e5b2ccad8F520b432985cF8D8Da32C44 - owner
        '0xfe2348724126d4ec3983063d4a9192b9716b5594c7473af652d1fbe894c2207d'  //0x1550d968A89817b6B598C79141F8BD109BA5ceD4
      ],
    }, */
    lacchain: {
      url: "http://143.198.56.163:4545",
      nodeAddress:"0xcafb22a2cec12ca7fffe3eea0a7a842b64705dca",
      gasPrice: 0,
      expiration: 1736394529,
      privateKeys: [
        '0xe884f1b42d949d1c6e70b3ec34ea04fc53584b9c2401ac249ed135b17214b14d', //0x1e3Cec42FFce9270F36EF8F1Aa5265F00C57cda7 -owner protestnet
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
