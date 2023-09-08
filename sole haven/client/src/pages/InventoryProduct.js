import React from 'react';

const InventoryProduct = ({ product, onRemove, onQuantityChange }) => {

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        onQuantityChange(product.id, newQuantity);
    };

    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>
                <input
                    type="number"
                    value={product.quantity}
                    onChange={handleQuantityChange}
                />
            </td>
            <td>
                <button onClick={() => onRemove(product.id)}>Remove</button>
            </td>
        </tr>
    );
};
export default InventoryProduct;
