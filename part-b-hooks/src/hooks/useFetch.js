import { useState, useEffect, useCallback } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url || url.includes('YOUR_MOCKAPI_ID')) {
      setError('Vui lòng thay đường dẫn MockAPI của bạn vào biến API_URL trong src/App.jsx.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Lỗi tải dữ liệu (HTTP ${res.status})`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      setError(err.message || 'Không thể kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addItem = async (newItem) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error(`Lỗi thêm khoản chi (HTTP ${res.status})`);
      const created = await res.json();
      setData((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      setError(err.message || 'Không thể thêm khoản chi.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Lỗi xóa khoản chi (HTTP ${res.status})`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || 'Không thể xóa khoản chi.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData, addItem, deleteItem };
}
