import pkg from 'hardhat';

const {ethers} = pkg;


async function main() {
  const SecureVault = await ethers.getContractFactory("SecureVault");

  const secureVault = await SecureVault.deploy();

  await secureVault.deployed();

  console.log("SecureVault deployed to:", secureVault.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
