pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

contract MarketPlace {

    string public name;
    uint public productCount = 0;

    mapping(uint => Product) public products;

    modifier onlyBy(address _account) {
        require(msg.sender == _account, "Unauthorized");
        _;
    }

    struct Product {
        uint id;
        uint price;
        string name;
        address payable owner;
        bool purchased;
        string description;
    }

    event ProductCreated(
        uint id,
        uint price,
        string name,
        address payable owner,
        bool purchased,
        string description
    );

    event ProductPurchased(
        uint id,
        uint price,
        string name,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Taoltech Coin Market Place";
    }

    function createProduct(string memory _name, uint _price, string memory _desc) public {

        require(_price > 0);
        require(bytes(_name).length > 0);
        require(bytes(_desc).length > 0);

        productCount++;
        products[productCount] = Product(productCount, _price, _name, msg.sender, false, _desc);
        emit ProductCreated(productCount, _price, _name, msg.sender, false, _desc);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.owner;

        require(!_product.purchased, "Product is not available");
        require(_seller != msg.sender);
        require(msg.value >= _product.price);
        require(_product.id > 0 && _product.id <= productCount);

        // Transfer ownership
        _product.purchased = true;
        _product.owner = msg.sender;

        products[_id] = _product;

        address(_seller).transfer(msg.value);
        emit ProductPurchased(productCount, _product.price, _product.name, msg.sender, true);
    }

//    function getProducts() external view returns(Product[] memory) {
//        uint counter = 0;
//        Product[] memory _products;
//        for(uint i = 0; i < allProducts.length; i++) {
//            if(!allProducts[i].purchased) {
//                _products[counter] = allProducts[i];
//                counter++;
//            }
//        }
//        return _products;
//    }

//    function myProducts() external view returns(Product[] memory) {
//        uint counter = 0;
//        Product[] memory _products;
//        for(uint i = 0; i < allProducts.length; i++) {
//            if(allProducts[i].owner == msg.sender) {
//                _products[counter] = allProducts[i];
//                counter++;
//            }
//        }
//        return _products;
//    }
}