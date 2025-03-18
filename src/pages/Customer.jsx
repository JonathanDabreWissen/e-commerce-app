import useGetData from "../hooks/useGetData"; // Adjust path if needed

const Customer = () => {
  const { data: customers, loading, error, refetch } = useGetData("customers");

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Customer List</h2>
      
      <button 
        onClick={refetch}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Refresh Data
      </button>

      {loading && <p className="text-center text-gray-500">Loading customers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {customers && customers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Pincode</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{customer.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{customer.address}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{customer.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No customers found.</p>
      )}
    </div>
  );
};

export default Customer;
