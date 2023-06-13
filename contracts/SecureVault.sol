// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SecureVault {
    struct Vault {
        string title;
        string text;
    }

    mapping(address => mapping(address => Vault[])) private vaults;
    mapping(address => mapping(address => uint)) public vaultCount;

    event VaultCreated(address indexed owner, uint indexed vaultId, string title, string text);

    function createVault(address _owner, string memory _title, string memory _text) public payable {
        Vault memory newVault = Vault(_title, _text);
        uint vaultId = vaultCount[_owner][_owner];
        vaults[_owner][_owner].push(newVault);
        vaultCount[_owner][_owner]++;

        emit VaultCreated(_owner, vaultId, _title, _text);
    }

    function getVault(address _owner, uint _vaultId) public view returns (string memory title, string memory text) {
        require(_vaultId < vaultCount[_owner][_owner], "Invalid vaultId");

        Vault storage selectedVault = vaults[_owner][_owner][_vaultId];
        return (selectedVault.title, selectedVault.text);
    }

    function getVaultList(address _owner) public view returns (Vault[] memory) {
        return vaults[_owner][_owner];
    }
}
