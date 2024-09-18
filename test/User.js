// UserContract.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserContract", function () {
    let UserContract;
    let userContract;
    
    beforeEach(async function () {
        UserContract = await ethers.getContractFactory("Token");
        userContract = await UserContract.deploy();
    });

    it("should add a user", async function () {
        await userContract.addUser("001", "God", "Ji", "Bangkok");
        
        const users = await userContract.getAll();
        expect(users.length).to.equal(1);
        expect(users[0].code).to.equal("001");
        expect(users[0].firstName).to.equal("God");
        expect(users[0].lastName).to.equal("Ji");
        expect(users[0].addressNo).to.equal("Bangkok");
    });

    it("should retrieve a user by Code", async function () {
        await userContract.addUser("001", "God", "Ji", "Bangkok");
        
        const user = await userContract.getId("001");
        expect(user._code).to.equal("001");
        expect(user._firstName).to.equal("God");
        expect(user._lastName).to.equal("Ji");
        expect(user._addressNo).to.equal("Bangkok");
    });

    it("should retrieve all users", async function () {
        await userContract.addUser("001", "God", "Ji", "Bangkok");
        await userContract.addUser("002", "Normad", "Ja", "Phayao");
        
        const users = await userContract.getAll();
        expect(users.length).to.equal(2);
        expect(users[0].code).to.equal("001");
        expect(users[1].code).to.equal("002");
    });

    it("should revert when retrieving a non-existent user ID", async function () {
        await expect(userContract.getId("000")).to.be.revertedWith("User not found");
    });
});


