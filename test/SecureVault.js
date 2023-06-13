import {expect} from "chai";
import pkg from 'hardhat';

const {ethers} = pkg;

describe("SecureVault", () => {
    let secureVaultResult;
    let owner;
    let vaultId;

    beforeEach(async function () {
        const SecureVault = await ethers.getContractFactory("SecureVault");
        secureVaultResult = await SecureVault.deploy();
        [owner] = await ethers.getSigners();
        const createTransaction = await secureVaultResult.createVault(owner.address, "My Vault", "My Secret");
        const createReceipt = await createTransaction.wait();
        const vaultIdString = await createReceipt.events[0].args.vaultId.toString();
        vaultId = parseInt(vaultIdString);

    });

    it(" Get the vault by owner and vaultId", async () => {
        const [title, text] = await secureVaultResult.getVault(owner.address, vaultId);
        expect(title).to.equal("My Vault");
        expect(text).to.equal("My Secret");
    });

    it("Get the vault by owner", async () => {
        const vaultList = await secureVaultResult.getVaultList(owner.address);
        expect(vaultList).to.have.lengthOf(1);
        expect(vaultList[0].title).to.equal("My Vault");
        expect(vaultList[0].text).to.equal("My Secret");
    });

});
