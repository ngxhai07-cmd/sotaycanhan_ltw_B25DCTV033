import { useState, useRef } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function ExpenseForm({ onAddExpense, disabled }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const titleInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Vui lòng nhập nội dung chi tiêu.');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError('Số tiền phải lớn hơn 0.');
      return;
    }
    if (!date) {
      setError('Vui lòng chọn ngày chi.');
      return;
    }

    setError('');
    const success = await onAddExpense({
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });

    if (success) {
      setTitle('');
      setAmount('');
      setCategory('Ăn uống');
      setDate(new Date().toISOString().split('T')[0]);
      titleInputRef.current?.focus();
    }
  };

  return (
    <form className="card expense-form" onSubmit={handleSubmit}>
      <h2>Thêm khoản chi mới</h2>
      {error && <p className="error-msg">{error}</p>}

      <div className="form-grid">
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Nội dung chi (VD: Bún chả)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số tiền (VNĐ)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={disabled}>
        {disabled ? 'Đang xử lý...' : '+ Thêm khoản chi'}
      </button>
    </form>
  );
}
