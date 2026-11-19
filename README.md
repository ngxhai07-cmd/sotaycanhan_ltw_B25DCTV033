# LTW - Bài thực hành 03: Ứng dụng Sổ chi tiêu cá nhân

- **Họ và tên:** Nguyễn Xuân Hải
- **Mã sinh viên:** B25DCTV033
- **Môn học:** Lập trình Web (RIPT1306-20261-08)

## Cấu trúc thư mục

- `part-a-class/`: Ứng dụng Sổ chi tiêu cá nhân xây dựng bằng **Class Component** (dữ liệu mẫu trong state, đồng hồ dùng `componentDidMount` / `componentWillUnmount`, cập nhật tiêu đề tab bằng `componentDidUpdate`).
- `part-b-hooks/`: Viết lại toàn bộ bằng **Function Component + Hooks** (`useState`, `useEffect`, `useRef`, `useContext`), tích hợp **MockAPI** qua custom hook `useFetch` (kèm trạng thái loading & lỗi), chế độ Sáng/Tối và đầy đủ các yêu cầu nâng cao (`useClock`, thống kê tổng tiền theo loại, ô tìm kiếm có độ trễ debounce).

## Cách chạy dự án

> Yêu cầu đã cài đặt **Node.js** (khuyến nghị phiên bản >= 18).

### 1. Chạy Phần A (Class Component)
```bash
cd part-a-class
npm install
npm run dev
```

### 2. Chạy Phần B (Function Component + Hooks)
1. Tạo một project trên [MockAPI](https://mockapi.io/) với resource tên `expenses` gồm các trường: `title` (String), `amount` (Number), `category` (String), `date` (String).
2. Mở file `part-b-hooks/src/App.jsx` và thay đường dẫn MockAPI của bạn vào hằng số `API_URL`.
3. Chạy lệnh:
```bash
cd part-b-hooks
npm install
npm run dev
```

## Hooks đã giúp khắc phục các thách thức của Class Component ở những chỗ nào trong bài?

1. **Gom gọn logic vòng đời bị chia tách (Lifecycle splitting):**
   - *Ở Phần A (Class):* Logic đồng hồ phải tách làm hai phương thức riêng biệt (`setInterval` ở `componentDidMount` và `clearInterval` ở `componentWillUnmount`). Logic cập nhật tiêu đề tab trình duyệt (`document.title`) cũng phải gọi lặp lại ở cả `componentDidMount` và `componentDidUpdate` kèm điều kiện kiểm tra `if (prevState.expenses !== this.state.expenses)` để tránh chạy dư thừa.
   - *Ở Phần B (Hooks):* Mỗi side-effect được gom trọn vẹn trong một `useEffect` kèm hàm dọn dẹp (`return () => clearInterval(...)`) ngay bên trong và mảng phụ thuộc `[totalAll]`, giúp code mạch lạc và hạn chế rò rỉ bộ nhớ.

2. **Tái sử dụng logic có state dễ dàng qua Custom Hooks:**
   - *Ở Phần A (Class):* Logic đồng hồ hay thao tác gọi API gắn chặt với từng Class Component, khó tách ra tái sử dụng nếu không dùng các mẫu phức tạp như HOC hay Render Props.
   - *Ở Phần B (Hooks):* Dễ dàng đóng gói thành các custom hook độc lập như `useFetch` (quản lý GET/POST/DELETE cùng trạng thái `loading`/`error`), `useClock` (đồng hồ tự cập nhật mỗi giây) và `useDebounce` (trì hoãn tìm kiếm) để tái sử dụng ở bất kỳ component nào.

3. **Giảm mã thừa (boilerplate) và tránh lỗi ngữ cảnh `this`:**
   - Function Component kết hợp `useState` loại bỏ hoàn toàn `constructor`, `super(props)`, `this.state`, `this.setState` cũng như nguy cơ mất ngữ cảnh `this` khi truyền hàm xử lý sự kiện xuống component con.

4. **Chia sẻ state toàn cục và thao tác DOM trực tiếp gọn nhẹ:**
   - `useContext` (trong `ThemeContext`) cho phép chia sẻ và chuyển đổi chế độ Sáng/Tối ở `Header` và toàn bộ ứng dụng mà không phải truyền props qua nhiều cấp (prop drilling).
   - `useRef` giúp tham chiếu trực tiếp tới ô nhập nội dung trong `ExpenseForm` để tự động `focus()` lại ngay sau khi thêm khoản chi thành công.
