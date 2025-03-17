import { useState } from "react";
import axios from "axios";

const useDeleteData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:4000/${url}/${id}`);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
