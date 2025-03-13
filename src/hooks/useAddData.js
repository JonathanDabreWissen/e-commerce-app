import { useState } from "react";
import axios from "axios";

const useAddData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (newData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:4000/${url}`, newData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Returning response if needed
    } catch (err) {
      setError(err.message);
      console.error("Error adding data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { addData, loading, error };
};

export default useAddData;
