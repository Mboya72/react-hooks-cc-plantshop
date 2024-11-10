import React, { useState } from "react";


function AddPlantForm({ onAddPlant }) {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!name || !image || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const newPlant = {
      name,
      image,
      price: parseFloat(price), // Convert price to a number
    };

    try {
      // Send POST request to the backend API to add the new plant
      const response = await fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });

      if (!response.ok) {
        throw new Error("Failed to add plant.");
      }

      const addedPlant = await response.json();
      
      // Pass the added plant back to the parent component
      onAddPlant(addedPlant);

      // Clear the form
      setName("");
      setImage("");
      setPrice("");
    } catch (error) {
      console.error("Error adding plant:", error);
      alert("There was an error adding the plant.");
    }
  };

  return (
    <div className="add-plant-form">
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default AddPlantForm;
