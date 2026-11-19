import { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import './App.css';

const SAMPLE_EXPENSES = [
  { id: 1, title: 'Phở bò sáng', amount: 45000, category: 'Ăn uống', date: '2026-11-19' },
  { id: 2, title: 'Đổ xăng xe máy', amount: 50000, category: 'Đi lại', date: '2026-11-18' },
  { id: 3, title: 'Mua tài liệu lập trình web', amount: 85000, category: 'Học tập', date: '2026-11-17' },
  { id: 4, title: 'Vé xem phim cuối tuần', amount: 90000, category: 'Giải trí', date: '2026-11-16' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: SAMPLE_EXPENSES,
      selectedCategory: 'Tất cả',
    };
  }

  getTotalAll = () => {
    return this.state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  };

  updateTabTitle = () => {
    document.title = `Tổng chi: ${this.getTotalAll().toLocaleString('vi-VN')} đ`;
  };

  componentDidMount() {
    this.updateTabTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateTabTitle();
    }
  }

  handleAddExpense = (newExpense) => {
    this.setState((prev) => ({
      expenses: [newExpense, ...prev.expenses],
    }));
  };

  handleDeleteExpense = (id) => {
    this.setState((prev) => ({
      expenses: prev.expenses.filter((item) => item.id !== id),
    }));
  };

  handleSelectCategory = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { expenses, selectedCategory } = this.state;
    const filteredExpenses =
      selectedCategory === 'Tất cả'
        ? expenses
        : expenses.filter((item) => item.category === selectedCategory);

    const filteredTotal = filteredExpenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    return (
      <div className="container">
        <Header />
        <ExpenseForm onAddExpense={this.handleAddExpense} />
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={this.handleSelectCategory}
        />
        <ExpenseList
          expenses={filteredExpenses}
          totalAmount={filteredTotal}
          onDeleteExpense={this.handleDeleteExpense}
        />
      </div>
    );
  }
}

export default App;
