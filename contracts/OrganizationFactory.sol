// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Organization.sol";

contract OrganizationFactory {
    Organization[] public organizations;

    event OrganizationCreated(address indexed organization, string name);
    function createOrganization(
        string memory name,
        uint256 sharePrice
    ) public {
        Organization newOrg = new Organization(name, sharePrice, msg.sender);
        organizations.push(newOrg);
        emit OrganizationCreated(address(newOrg), name);
    }
    function getOrganizations() external view returns (Organization[] memory) {
        return organizations;
    }
}
