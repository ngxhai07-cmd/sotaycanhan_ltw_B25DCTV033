import { Component } from 'react';

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0],
      error: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = this.state;

    if (!title.trim()) {
      this.setState({ error: 'Vui lòng nhập nội dung chi tiêu.' });
      return;
    }
    if (!amount || Number(amount) <= 0) {
      this.setState({ error: 'Số tiền phải lớn hơn 0.' });
      return;
    }
    if (!date) {
      this.setState({ error: 'Vui lòng chọn ngày chi.' });
      return;
    }

    this.props.onAddExpense({
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });

    this.setState({
      title: '',
      amount: '',
      category: 'Ăn uống',
      date: new Date().toISOString().split('T')[0],
      error: '',
    });
  };

  render() {
    const { title, amount, category, date, error } = this.state;
    return (
      <form className="card expense-form" onSubmit={this.handleSubmit}>
        <h2>Thêm khoản chi mới</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="form-grid">
          <input
            type="text"
            name="title"
            placeholder="Nội dung chi (VD: Cơm trưa)"
            value={title}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Số tiền (VNĐ)"
            value={amount}
            onChange={this.handleChange}
          />
          <select name="category" value={category} onChange={this.handleChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          + Thêm khoản chi
        </button>
      </form>
    );
  }
}

export default ExpenseForm;
