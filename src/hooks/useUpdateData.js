import { useState } from "react";
import axios from "axios";

const useUpdateData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (id, updatedData) => {
    console.log(updateData)
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:4000/${url}/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Returning response if needed
    } catch (err) {
      setError(err.message);
      console.error("Error updating data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
};

export default useUpdateData;