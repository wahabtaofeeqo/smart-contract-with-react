pragma solidity ^0.5.0;

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
    }

    event ProductCreated(
        uint id,
        uint price,
        string name,
        address payable owner,
        bool purchased
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

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);

        productCount++;
        products[productCount] = Product(productCount, _price, _name, msg.sender, false);

        emit ProductCreated(productCount, _price, _name, msg.sender, false);
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
}