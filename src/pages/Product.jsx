import { useState } from "react";
import useGetData from "../hooks/useGetData";
import useAddData from "../hooks/useAddData";
import useUpdateData from "../hooks/useUpdateData";
import useDeleteData from "../hooks/useDeleteData";

const Product = () => {
  const { data: products, loading, error, refetch } = useGetData("products");
  const { addData } = useAddData("products");
  const { updateData } = useUpdateData("products");
  const { deleteData } = useDeleteData("products");

  const [product, setProduct] = useState({ id: "", name: "", category: "", price: "", brand: "", rating: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.id) return alert("ID is required");
    await addData(product);
    alert("Product added successfully!");
    refetch();
    setProduct({ id: "", name: "", category: "", price: "", brand: "", rating: "" });
  };

  const handleUpdate = async () => {
    if (!product.id) return alert("ID is required for update");
    await updateData(product.id, product);
    alert("Product updated successfully!");
    refetch();
    setProduct({ id: "", name: "", category: "", price: "", brand: "", rating: "" });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    alert("Product deleted successfully!");
    refetch();
  };

  const handleEdit = (p) => {
    setProduct({ id: p.id, name: p.name, category: p.category, price: p.price, brand: p.brand, rating: p.rating });
    setIsEditing(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Product Management</h2>

      <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-3 bg-gray-100 p-4 rounded-lg shadow">
        <input type="text" name="id" placeholder="ID" value={product.id} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" step="0.1" name="rating" placeholder="Rating" value={product.rating} onChange={handleChange} className="w-full p-2 border rounded" required />
        <div className="flex gap-2">
          <button type="submit" className={`px-4 py-2 rounded ${isEditing ? "bg-yellow-500" : "bg-blue-500"} text-white`}>
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Products List</h3>
        <div className="space-y-2">
          {products?.map((p) => (
            <div key={p.id} className="flex justify-between items-center bg-white p-3 shadow rounded">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">ID: {p.id}</p>
                <p className="text-sm text-gray-600">{p.category} - {p.brand}</p>
                <p className="text-sm text-gray-600">₹{p.price} | Rating: {p.rating}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
