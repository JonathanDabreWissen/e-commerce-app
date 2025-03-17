import React, { useState } from "react";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";

const DisplayProduct = ({ onEdit }) => {
    const { data, loading, error, refetch } = useGetData("products"); // ✅ Add refetch
    const { deleteData } = useDeleteData("products");
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            setDeleting(true);
            await deleteData(id);
            setDeleting(false);
            refetch(); // ✅ Refetch data after deletion
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2 text-left ">ID</th>
                        <th className="border p-2 text-left ">Name</th>
                        <th className="border p-2 text-left ">Category</th>
                        <th className="border p-2 text-left ">Price</th>
                        <th className="border p-2 text-left ">Brand</th>
                        <th className="border p-2 text-left ">Stock</th>
                        <th className="border p-2 text-left ">Rating</th>
                        <th className="border p-2 text-left ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product) => (
                        <tr key={product.id} className="border-b">
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">{product.category}</td>
                            <td className="border p-2">{product.price}</td>
                            <td className="border p-2">{product.brand}</td>
                            <td className="border p-2">{product.stock}</td>
                            <td className="border p-2">{product.rating}</td>
                            <td className="border p-2 flex gap-2">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="bg-yellow-500 text-white p-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white p-1 rounded"
                                    disabled={deleting} // Disable button while deleting
                                >
                                    {deleting ? "Deleting..." : "Delete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayProduct;
