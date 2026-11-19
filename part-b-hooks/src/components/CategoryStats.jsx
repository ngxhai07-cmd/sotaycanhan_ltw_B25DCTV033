const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export default function CategoryStats({ expenses }) {
  const totals = CATEGORIES.map((cat) => {
    const sum = expenses
      .filter((item) => item.category === cat)
      .reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    return { category: cat, sum };
  });

  return (
    <div className="stats-grid">
      {totals.map(({ category, sum }) => (
        <div key={category} className="stat-card">
          <span className="stat-label">{category}</span>
          <strong className="stat-value">{sum.toLocaleString('vi-VN')} đ</strong>
        </div>
      ))}
    </div>
  );
}
