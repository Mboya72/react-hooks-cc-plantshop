import React, { useState } from "react";

function PlantCard({ plant, onStockChange }) {
  // State for in-stock status (could be controlled by the parent if needed)
  const [isInStock, setIsInStock] = useState(plant.isInStock);

  // Handle toggle of stock status
  const handleToggleStock = async () => {
    const newStockStatus = !isInStock;
    setIsInStock(newStockStatus);

    // Optionally, call a function to update the stock status on the server
    if (onStockChange) {
      await onStockChange(plant.id, newStockStatus);  // Pass the plant id and the new status to the parent
    }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button
        className={isInStock ? "primary" : "secondary"}
        onClick={handleToggleStock}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
