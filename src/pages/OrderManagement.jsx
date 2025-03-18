import { useState } from "react";
import useGetData from "../hooks/useGetData";
import useAddData from "../hooks/useAddData";
import useUpdateData from "../hooks/useUpdateData";
import useDeleteData from "../hooks/useDeleteData";

const OrderManagement = () => {
  const { data: orders, loading, error, refetch } = useGetData("orders");
  const { addData } = useAddData("orders");
  const { updateData } = useUpdateData("orders");
  const { deleteData } = useDeleteData("orders");

  const [formData, setFormData] = useState({
    id: "",
    customer_id: "",
    product_id: "",
    vendor_id: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateData(formData.id, formData);
      setIsEditing(false);
    } else {
      await addData(formData);
    }
    setFormData({ id: "", customer_id: "", product_id: "", vendor_id: "" });
    refetch(); // Refresh order list
  };

  const handleEdit = (order) => {
    setFormData(order);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    refetch();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Manage Orders</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Order ID"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          placeholder="Customer ID"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          placeholder="Product ID"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="vendor_id"
          value={formData.vendor_id}
          onChange={handleChange}
          placeholder="Vendor ID"
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          {isEditing ? "Update Order" : "Add Order"}
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Customer ID</th>
              <th className="border p-2">Product ID</th>
              <th className="border p-2">Vendor ID</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.customer_id}</td>
                <td className="p-2">{order.product_id}</td>
                <td className="p-2">{order.vendor_id}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="p-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;
