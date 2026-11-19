import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useFetch } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import CategoryStats from './components/CategoryStats';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import './App.css';

// THAY LINK MOCKAPI CỦA BẠN VÀO ĐÂY
const API_URL = 'https://6afe58353a0e70bc8d535465.mockapi.io/expenses';

function ExpenseTracker() {
  const { data: expenses, loading, error, refetch, addItem, deleteItem } = useFetch(API_URL);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 400);

  const totalAll = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  useEffect(() => {
    document.title = `Tổng chi: ${totalAll.toLocaleString('vi-VN')} đ`;
  }, [totalAll]);

  const filteredExpenses = expenses.filter((item) => {
    const matchCategory =
      selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const matchSearch = (item.title || '')
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase());
    return matchCategory && matchSearch;
  });

  const filteredTotal = filteredExpenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  return (
    <div className="container">
      <Header />

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button type="button" className="btn-secondary" onClick={refetch}>
            Thử lại
          </button>
        </div>
      )}

      <CategoryStats expenses={expenses} />
      <ExpenseForm onAddExpense={addItem} disabled={loading} />
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading && <p className="loading-text">⏳ Đang đồng bộ dữ liệu...</p>}

      <ExpenseList
        expenses={filteredExpenses}
        totalAmount={filteredTotal}
        onDeleteExpense={deleteItem}
        disabled={loading}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseTracker />
    </ThemeProvider>
  );
}
