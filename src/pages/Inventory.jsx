import React, { useState } from 'react';
import useGetData from '../hooks/useGetData';
import useAddData from '../hooks/useAddData';
import useUpdateData from '../hooks/useUpdateData';
import useDeleteData from '../hooks/useDeleteData';

const Inventory = () => {
  // Form states
  const [newId, setNewId] = useState('');
  const [newVendors, setNewVendors] = useState('');
  const [newStock, setNewStock] = useState('');
  
  const [editId, setEditId] = useState('');
  const [editVendors, setEditVendors] = useState('');
  const [editStock, setEditStock] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Use the hooks
  const { data: inventory, loading: fetchLoading, error: fetchError, refetch } = useGetData("inventory");
  const { addData, loading: addLoading, error: addError } = useAddData("inventory");
  const { updateData, loading: updateLoading, error: updateError } = useUpdateData("inventory");
  const { deleteData, loading: deleteLoading, error: deleteError } = useDeleteData("inventory");

  // Handle adding new inventory item
  const handleAddItem = async (e) => {
    e.preventDefault();
    
    // Convert input values to the correct types
    const newItem = {
      id: parseInt(newId),
      vendors: newVendors.split(',').map(vendor => parseInt(vendor.trim())),
      stock: parseInt(newStock)
    };
    
    await addData(newItem);
    refetch();
    
    // Reset form
    setNewId('');
    setNewVendors('');
    setNewStock('');
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteData(id);
      refetch();
    }
  };

  // Set up item for editing
  const handleEdit = (item) => {
    setEditId(item.id.toString());
    setEditVendors(item.vendors.join(', '));
    setEditStock(item.stock.toString());
    setIsEditing(true);
  };

  // Handle update operation
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const updatedItem = {
      id: parseInt(editId),
      vendors: editVendors.split(',').map(vendor => parseInt(vendor.trim())),
      stock: parseInt(editStock)
    };

    console.log(updatedItem);
    
    // Use the updateData hook function with the ID parameter
    await updateData(editId, updatedItem);
    refetch();
    
    // Reset form and exit edit mode
    setIsEditing(false);
    setEditId('');
    setEditVendors('');
    setEditStock('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId('');
    setEditVendors('');
    setEditStock('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      
      {/* Error display */}
      {(fetchError || addError || updateError || deleteError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {fetchError || addError || updateError || deleteError}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </h2>
        
        <form onSubmit={isEditing ? handleUpdate : handleAddItem}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID
              </label>
              <input
                type="number"
                value={isEditing ? editId : newId}
                onChange={(e) => isEditing ? setEditId(e.target.value) : setNewId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
                disabled={isEditing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendors (comma separated)
              </label>
              <input
                type="text"
                value={isEditing ? editVendors : newVendors}
                onChange={(e) => isEditing ? setEditVendors(e.target.value) : setNewVendors(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="101, 102, 103"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                value={isEditing ? editStock : newStock}
                onChange={(e) => isEditing ? setEditStock(e.target.value) : setNewStock(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="mr-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              className={`py-2 px-4 rounded text-white ${
                (isEditing ? updateLoading : addLoading)
                  ? 'bg-blue-300'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isEditing ? updateLoading : addLoading}
            >
              {isEditing
                ? updateLoading ? 'Updating...' : 'Update Item'
                : addLoading ? 'Adding...' : 'Add Item'
              }
            </button>
          </div>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
        
        {fetchLoading ? (
          <p className="text-center py-4">Loading inventory data...</p>
        ) : !inventory || inventory.length === 0 ? (
          <p className="text-center py-4">No inventory items found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Vendors</th>
                  <th className="py-2 px-4 border-b text-left">Stock</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{item.id}</td>
                    <td className="py-2 px-4 border-b">
                      {item.vendors.join(', ')}
                    </td>
                    <td className="py-2 px-4 border-b">{item.stock}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-2 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                        disabled={deleteLoading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className={`bg-red-500 text-white py-1 px-2 rounded ${
                          deleteLoading ? 'opacity-50' : 'hover:bg-red-600'
                        }`}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-4">
          <button
            onClick={refetch}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            disabled={fetchLoading}
          >
            {fetchLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;