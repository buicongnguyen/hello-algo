# Bài toán ba lô phân số

!!! question

    Cho $n$ vật phẩm, trong đó khối lượng vật thứ $i$ là $wgt[i-1]$, giá trị là $val[i-1]$, và một ba lô sức chứa $cap$. Mỗi vật phẩm chỉ được chọn một lần, **nhưng có thể chọn một phần vật phẩm và giá trị tỷ lệ với khối lượng đã chọn**. Tổng giá trị lớn nhất có thể đặt vào ba lô mà không vượt sức chứa là bao nhiêu? Dữ liệu ví dụ được minh họa dưới đây.

![Dữ liệu ví dụ của ba lô phân số](fractional_knapsack_problem.assets/fractional_knapsack_example.png)

Ba lô phân số nhìn chung rất giống ba lô 0-1. Trạng thái gồm vật phẩm hiện tại $i$ và sức chứa $c$, mục tiêu là tối đa hóa giá trị trong giới hạn sức chứa.

Khác biệt là bài toán cho phép chọn một phần vật phẩm. Như hình dưới, **có thể chia vật phẩm tùy ý và tính giá trị theo tỷ lệ khối lượng được chọn**.

1. Với vật phẩm $i$, giá trị trên một đơn vị khối lượng là $val[i-1] / wgt[i-1]$, gọi là giá trị đơn vị.
2. Nếu đặt phần khối lượng $w$ của vật phẩm $i$ vào ba lô, giá trị tăng thêm là $w \times val[i-1] / wgt[i-1]$.

![Giá trị vật phẩm trên mỗi đơn vị khối lượng](fractional_knapsack_problem.assets/fractional_knapsack_unit_value.png)

### Xác định chiến lược tham lam

Tối đa hóa tổng giá trị **về bản chất là ưu tiên những vật phẩm có giá trị đơn vị cao hơn**. Từ quan sát này, suy ra chiến lược:

1. Sắp xếp vật phẩm theo giá trị đơn vị giảm dần.
2. Duyệt toàn bộ danh sách, **mỗi lượt tham lam chọn vật phẩm có giá trị đơn vị cao nhất**.
3. Nếu sức chứa còn lại không đủ, lấy một phần vật phẩm hiện tại để lấp đầy ba lô.

![Chiến lược tham lam của ba lô phân số](fractional_knapsack_problem.assets/fractional_knapsack_greedy_strategy.png)

### Triển khai mã

Định nghĩa lớp `Item` để sắp xếp vật phẩm theo giá trị đơn vị. Sau đó tham lam duyệt danh sách đã sắp xếp, dừng khi ba lô đầy và trả về kết quả:

```python
# Mã ba lô phân số 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Thuật toán sắp xếp dựng sẵn thường tốn $O(n \log n)$ thời gian; độ phức tạp không gian thường là $O(\log n)$ hoặc $O(n)$ tùy ngôn ngữ và cách triển khai.

Ngoài sắp xếp, trường hợp xấu nhất phải duyệt toàn bộ danh sách vật phẩm, **nên phần duyệt có độ phức tạp thời gian $O(n)$**, với $n$ là số vật phẩm.

Do khởi tạo một danh sách đối tượng `Item`, **độ phức tạp không gian là $O(n)$**.

### Chứng minh tính đúng

Dùng phản chứng. Giả sử vật phẩm $x$ có giá trị đơn vị cao nhất và một thuật toán tạo lời giải tối ưu `res`, nhưng lời giải không chứa vật phẩm $x$.

Hãy lấy một đơn vị khối lượng của bất kỳ vật phẩm nào trong ba lô ra và thay bằng một đơn vị khối lượng của $x$. Vì $x$ có giá trị đơn vị cao nhất, tổng giá trị sau thay thế phải lớn hơn `res`. **Điều này mâu thuẫn với giả thiết `res` là tối ưu, nên mọi lời giải tối ưu phải chứa vật phẩm $x$**.

Có thể tạo phản chứng tương tự cho các vật phẩm còn lại. Tóm lại, **vật phẩm có giá trị đơn vị cao hơn luôn là lựa chọn tốt hơn**, chứng minh chiến lược tham lam là đúng.

Trong hình dưới, nếu xem khối lượng và giá trị đơn vị là trục ngang và trục dọc của biểu đồ hai chiều, ba lô phân số trở thành bài toán “tìm diện tích lớn nhất trong một khoảng hữu hạn trên trục ngang”. Hình dung hình học này giúp giải thích hiệu quả của chiến lược.

![Biểu diễn hình học của ba lô phân số](fractional_knapsack_problem.assets/fractional_knapsack_area_chart.png)
