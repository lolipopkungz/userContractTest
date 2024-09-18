//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Token {
  
    struct User {
        string code;
        string firstName;
        string lastName;
        string addressNo;
    }

    User[] public userList;

    function addUser(
        string memory _code,
        string memory _firstName,
        string memory _lastName,
        string memory _addressNo
    ) public {
        User storage user = userList.push();
        user.code = _code;
        user.firstName = _firstName;
        user.lastName = _lastName;
        user.addressNo = _addressNo;
        user.lastName = _lastName;
    }

    function getAll() public view returns (User[] memory) {
        return userList;
    }

    function getId(
    string memory _findCode
)
    public
    view
    returns (
        string memory _code,
        string memory _firstName,
        string memory _lastName,
        string memory _addressNo
    )
{
    for (uint i = 0; i < userList.length; i++) {
        if (keccak256(abi.encodePacked(userList[i].code)) == keccak256(abi.encodePacked(_findCode))) {
            User storage user = userList[i];
            return (user.code, user.firstName, user.lastName, user.addressNo);
        }
    }
    revert("User not found");
}

    
}
