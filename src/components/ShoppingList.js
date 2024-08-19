import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

// Example fetch function to simulate fetching items from a server
const fetchItems = async () => {
  return [
    { id: 1, name: 'Yogurt', category: 'Dairy', isInCart: false },
    { id: 2, name: 'Pomegranate', category: 'Fruit', isInCart: false },
    { id: 3, name: 'Lettuce', category: 'Vegetable', isInCart: false },
  ];
};

// Example fetch function to simulate adding an item to a server
const addItem = async (item) => {
  // Simulate a delay
  return new Promise((resolve) => setTimeout(() => resolve(item), 500));
};

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);

  // Fetch initial items when the component mounts
  useEffect(() => {
    const loadItems = async () => {
      const initialItems = await fetchItems();
      setItems(initialItems);
    };
    loadItems();
  }, []);

  // Handle category change
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Handle item addition
  const handleAddItem = async (newItem) => {
    const addedItem = await addItem(newItem);
    setItems([...items, { ...addedItem, id: items.length + 1 }]);
  };

  // Filter items based on selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
