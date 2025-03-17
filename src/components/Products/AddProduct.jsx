import React, { useState, useEffect } from "react";
import useAddData from "../../hooks/useAddData";
import useUpdateData from "../../hooks/useUpdateData";

const AddProduct = ({ product, clearSelection }) => {
    const { addData } = useAddData("products");
    const { updateData } = useUpdateData("products");

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        vendor_id: "",
        brand: "",
        stock: "",
        rating: "",
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                name: "",
                category: "",
                price: "",
                vendor_id: "",
                brand: "",
                stock: "",
                rating: "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product) {
            await updateData(product.id, formData);
        } else {
            await addData(formData);
        }
        clearSelection(); // Clear form after submission
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="p-2 border rounded" />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" />
            <input type="number" name="vendor_id" value={formData.vendor_id} onChange={handleChange} placeholder="Vendor ID" className="p-2 border rounded" />
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="p-2 border rounded" />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="p-2 border rounded" />
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" className="p-2 border rounded" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {product ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
};

export default AddProduct;
