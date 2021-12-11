const MarketPlace = artifacts.require('./MarketPlace.sol')
require('chai').use(require('chai-as-promised')).should();

contract('MarketPlace', ([deployer, seller, buyer]) => {
    let marketPlace;

    before(async () => {
        marketPlace = await MarketPlace.deployed()
    })

    describe('deployment', async () => {

        it('Deployed Successfully', async () => {

            const address = await marketPlace.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('Has a name', async () => {
            const name = await marketPlace.name();
            assert.equal(name, 'Taoltech Coin Market Place');
        });
    })

    describe('products', async () => {

        let result, productCount;

        before(async () => {
            result = await marketPlace.createProduct('iPhone XR', web3.utils.toWei('1', 'Ether'), {from: seller});
            productCount = await marketPlace.productCount();
        })

        it('creates product', async () => {
            assert.equal(productCount, 1);
            let event = result.logs[0].args;
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'ID is correct')

            await marketPlace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected
        });

        it('sells product', async () => {
            let oldBalance = await web3.eth.getBalance(seller);
            oldBalance = new web3.utils.BN(oldBalance);

            result = await marketPlace.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')})
            const event = result.logs[0].args;

            assert.equal(event.name, 'iPhone XR', 'name is correct')
            assert.equal(event.purchased, true, 'purchased is correct')
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'ID is correct');

            let newBalance = await web3.eth.getBalance(seller);
            newBalance = new web3.utils.BN(newBalance);

            let price = web3.utils.toWei('1', 'Ether');
            price = new web3.utils.BN(price);
            const expectedBalance = oldBalance.add(price);

            assert.equal(expectedBalance.toString(), newBalance.toString());
        });
    })
})