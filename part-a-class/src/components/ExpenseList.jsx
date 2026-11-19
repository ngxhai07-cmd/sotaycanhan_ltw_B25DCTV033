import { Component } from 'react';

class ExpenseList extends Component {
  handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa khoản chi "${title}"?`)) {
      this.props.onDeleteExpense(id);
    }
  };

  render() {
    const { expenses, totalAmount } = this.props;

    return (
      <div className="card">
        <h2>Danh sách khoản chi</h2>
        {expenses.length === 0 ? (
          <p className="empty-text">Chưa có khoản chi nào.</p>
        ) : (
          <ul className="expense-list">
            {expenses.map((item) => (
              <li key={item.id} className="expense-item">
                <div className="expense-info">
                  <strong>{item.title}</strong>
                  <div className="expense-meta">
                    <span className="tag">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="expense-right">
                  <span className="amount">
                    {Number(item.amount).toLocaleString('vi-VN')} đ
                  </span>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => this.handleDelete(item.id, item.title)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="total-row">
          <span>Tổng cộng:</span>
          <strong>{totalAmount.toLocaleString('vi-VN')} đ</strong>
        </div>
      </div>
    );
  }
}

export default ExpenseList;
