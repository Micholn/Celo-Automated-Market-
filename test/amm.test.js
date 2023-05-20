const AMMContract = artifacts.require("AMMContract");

contract("AMMContract", (accounts) => {
  let ammContract;

  beforeEach(async () => {
    ammContract = await AMMContract.new();
  });

  it("should have an initial price", async () => {
    const price = await ammContract.getPrice();
    assert.equal(price, 100); // Example assertion
  });

  // Additional test cases can be defined here
});
