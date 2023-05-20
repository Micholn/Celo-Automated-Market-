pragma solidity ^0.8.0;

import "./IERC20.sol";

contract LiquidityPool {
  // Address of each asset in the pool
  address public asset1;
  address public asset2;
  
  // Reserves of each asset in the pool
  uint256 public reserve1;
  uint256 public reserve2;
  
  // Constructor
  constructor(address _asset1, address _asset2) {
    asset1 = _asset1;
    asset2 = _asset2;
  }
  
  // Add liquidity to the pool
  function addLiquidity(uint256 amount1, uint256 amount2) public {
    // Transfer the assets to the pool
    IERC20(asset1).transferFrom(msg.sender, address(this), amount1);
    IERC20(asset2).transferFrom(msg.sender, address(this), amount2);
    
    // Update the reserves
    reserve1 += amount1;
    reserve2 += amount2;
  }
  
  // Remove liquidity from the pool
  function removeLiquidity(uint256 liquidity) public {
    // Calculate the amounts to withdraw
    uint256 amount1 = (liquidity * reserve1) / (reserve1 + reserve2);
    uint256 amount2 = (liquidity * reserve2) / (reserve1 + reserve2);
    
    // Transfer the assets to the user
    IERC20(asset1).transfer(msg.sender, amount1);
    IERC20(asset2).transfer(msg.sender, amount2);
    
    // Update the reserves
    reserve1 -= amount1;
    reserve2 -= amount2;
  }
  
  // Swap one asset for another
  function swap(address fromAsset, address toAsset, uint256 amount) public {
    // Determine the amount to receive based on the reserves
    uint256 toAmount = (amount * reserve2) / reserve1;
    
    // Transfer the assets to the pool
    IERC20(fromAsset).transferFrom(msg.sender, address(this), amount);
    IERC20(toAsset).transfer(msg.sender, toAmount);
    
    // Update the reserves
    reserve1 += amount;
    reserve2 -= toAmount;
  }
}
