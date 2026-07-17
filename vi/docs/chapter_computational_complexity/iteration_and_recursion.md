# Phép lặp và đệ quy

Trong thuật toán, việc thực hiện lặp lại một nhiệm vụ xuất hiện rất thường xuyên và liên quan chặt chẽ đến phân tích độ phức tạp. Trước khi học độ phức tạp thời gian và không gian, ta cần hiểu hai cấu trúc điều khiển cơ bản để lặp lại công việc: **phép lặp** và **đệ quy**.

## Phép lặp

**Phép lặp** là cấu trúc điều khiển thực hiện lặp lại một đoạn mã khi điều kiện còn đúng và dừng khi điều kiện không còn thỏa mãn.

### Vòng lặp `for`

Vòng lặp `for` phù hợp khi **biết trước số lần lặp**. Hàm sau tính tổng $1 + 2 + \dots + n$; trong Python, `range(a, b)` tạo khoảng đóng bên trái, mở bên phải gồm $a, a + 1, \dots, b - 1$.

```python
def for_loop(n: int) -> int:
    res = 0
    for i in range(1, n + 1):
        res += i
    return res
```

![Lưu đồ của hàm tính tổng bằng vòng lặp](iteration_and_recursion.assets/iteration.png)

Số phép toán tỉ lệ với kích thước đầu vào $n$, nghĩa là có quan hệ tuyến tính. Độ phức tạp thời gian chính là công cụ mô tả quan hệ tăng trưởng như vậy.

### Vòng lặp `while`

Với `while`, chương trình kiểm tra điều kiện trước mỗi lượt. Nếu điều kiện đúng, thân vòng lặp tiếp tục chạy; nếu sai, vòng lặp kết thúc.

```python
def while_loop(n: int) -> int:
    res = 0
    i = 1
    while i <= n:
        res += i
        i += 1
    return res
```

`while` linh hoạt hơn vì ta có thể tự thiết kế cách khởi tạo và cập nhật biến điều kiện. Chẳng hạn, một lượt có thể cập nhật biến nhiều lần:

```python
def while_loop_twice(n: int) -> int:
    res = 0
    i = 1
    while i <= n:
        res += i
        i += 1
        if i <= n:
            res += i
            i += 1
    return res
```

Nhìn chung, `for` gọn hơn còn `while` linh hoạt hơn. Hãy chọn cấu trúc phù hợp với yêu cầu cụ thể.

### Vòng lặp lồng nhau

Một vòng lặp có thể nằm bên trong vòng lặp khác:

```python
def nested_for_loop(n: int) -> str:
    result = ""
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            result += f"({i}, {j}) "
    return result
```

![Lưu đồ của vòng lặp lồng nhau](iteration_and_recursion.assets/nested_iteration.png)

Hai vòng lặp, mỗi vòng chạy theo $n$, tạo số phép toán tỉ lệ với $n^2$. Thêm một tầng lồng nhau tương ứng với việc tăng thêm một bậc: bậc ba, bậc bốn, v.v.

## Đệ quy

**Đệ quy** là chiến lược giải bài toán bằng cách để hàm tự gọi lại chính nó. Quá trình gồm hai pha.

1. **Đi xuống**: Hàm liên tục gọi chính nó với tham số nhỏ hoặc đơn giản hơn cho tới điều kiện dừng.
2. **Đi lên**: Từ lớp sâu nhất, các lời gọi lần lượt trả về và tổng hợp kết quả.

Mã đệ quy thường có ba thành phần.

1. **Điều kiện dừng** xác định thời điểm chuyển từ đi xuống sang đi lên.
2. **Lời gọi đệ quy** đưa bài toán tới trường hợp nhỏ hơn.
3. **Giá trị trả về** chuyển kết quả của lớp hiện tại về lớp trước.

Ví dụ tính tổng $1 + 2 + \dots + n$:

```python
def recur(n: int) -> int:
    if n == 1:
        return 1
    return n + recur(n - 1)
```

![Quá trình đệ quy của hàm tính tổng](iteration_and_recursion.assets/recursion_sum.png)

Phép lặp và đệ quy có thể cho cùng kết quả nhưng thể hiện hai cách tư duy khác nhau.

- **Phép lặp** giải từ dưới lên: bắt đầu bằng bước cơ bản rồi lặp hoặc tích lũy cho đến khi hoàn thành.
- **Đệ quy** giải từ trên xuống: chia bài toán thành các bài toán con cùng dạng, tiếp tục chia cho tới trường hợp cơ sở đã biết đáp án.

Với $f(n) = 1 + 2 + \dots + n$, vòng lặp cộng lần lượt từ $1$ đến $n$, còn đệ quy dùng quan hệ $f(n) = n + f(n - 1)$ và dừng tại $f(1) = 1$.

### Ngăn xếp lời gọi

Mỗi khi hàm đệ quy tự gọi, hệ thống cấp một **khung ngăn xếp** mới để lưu biến cục bộ, tham số, địa chỉ trả về và ngữ cảnh khác. Điều này dẫn tới hai hệ quả.

- Khung ngăn xếp chỉ được giải phóng khi lời gọi trả về, nên đệ quy thường dùng nhiều bộ nhớ hơn vòng lặp.
- Mỗi lời gọi hàm có chi phí bổ sung, nên đệ quy thường chậm hơn một vòng lặp tương đương.

Trước khi chạm điều kiện dừng, có thể tồn tại đồng thời $n$ lời gọi chưa trả về, tạo **độ sâu đệ quy $n$**.

![Độ sâu của ngăn xếp lời gọi](iteration_and_recursion.assets/recursion_sum_depth.png)

Ngôn ngữ lập trình thường giới hạn độ sâu đệ quy; đệ quy quá sâu có thể gây tràn ngăn xếp.

### Đệ quy đuôi

Nếu lời gọi đệ quy là thao tác cuối cùng trước khi hàm trả về, trình biên dịch hoặc thông dịch có thể tái sử dụng khung ngăn xếp. Trường hợp này gọi là **đệ quy đuôi**.

- Với đệ quy thông thường, sau khi lời gọi con trả về, lớp trước còn phải tiếp tục tính toán nên ngữ cảnh cũ phải được giữ lại.
- Với đệ quy đuôi, không còn thao tác nào sau lời gọi con, nên về lý thuyết không cần giữ ngữ cảnh lớp trước.

```python
def tail_recur(n: int, res: int = 0) -> int:
    if n == 0:
        return res
    return tail_recur(n - 1, res + n)
```

Trong đệ quy thường, phép cộng diễn ra khi “đi lên”; trong đệ quy đuôi, phép cộng được thực hiện ngay lúc “đi xuống”.

![Quá trình đệ quy đuôi](iteration_and_recursion.assets/tail_recursion_sum.png)

> Nhiều trình biên dịch và thông dịch không hỗ trợ tối ưu đệ quy đuôi. Python không hỗ trợ mặc định, nên hàm ở dạng đệ quy đuôi vẫn có thể bị tràn ngăn xếp.

### Cây đệ quy

Đệ quy thường trực quan hơn vòng lặp khi giải bài toán chia để trị. Xét dãy Fibonacci $0, 1, 1, 2, 3, 5, 8, 13, \dots$.

> **Bài toán:** Tìm số thứ $n$ trong dãy Fibonacci.

Gọi số thứ $n$ là $f(n)$:

- $f(1) = 0$ và $f(2) = 1$;
- $f(n) = f(n - 1) + f(n - 2)$.

```python
def fib(n: int) -> int:
    if n == 1:
        return 0
    if n == 2:
        return 1
    return fib(n - 1) + fib(n - 2)
```

Mỗi lời gọi tạo hai nhánh, rồi các nhánh tiếp tục phân tách thành **cây đệ quy** có khoảng $n$ tầng.

![Cây đệ quy của dãy Fibonacci](iteration_and_recursion.assets/recursion_tree.png)

Tư duy “chia bài toán thành bài toán con” xuất hiện trực tiếp hoặc gián tiếp trong tìm kiếm, sắp xếp, chia để trị, quay lui và quy hoạch động. Đệ quy cũng tự nhiên khi xử lý danh sách liên kết, cây và đồ thị.

## So sánh phép lặp và đệ quy

| Tiêu chí | Phép lặp | Đệ quy |
| --- | --- | --- |
| Cách triển khai | Cấu trúc lặp | Hàm tự gọi chính nó |
| Hiệu quả thời gian | Thường nhanh hơn, không có chi phí gọi hàm lặp lại | Mỗi lời gọi tạo thêm chi phí |
| Bộ nhớ | Thường dùng lượng bộ nhớ cố định | Các lời gọi tích lũy có thể dùng nhiều khung ngăn xếp |
| Bài toán phù hợp | Nhiệm vụ lặp đơn giản, trực quan | Chia bài toán con, cây, đồ thị, chia để trị, quay lui |

> Nếu phần tiếp theo khó hiểu, bạn có thể đọc lại sau khi học chương “Ngăn xếp và hàng đợi”.

Cơ chế đi lên của đệ quy tuân theo nguyên tắc “vào sau, ra trước” của ngăn xếp. Khi gọi hàm, hệ thống đẩy một khung mới vào ngăn xếp lời gọi; khi hàm trả về, khung tương ứng bị lấy ra.

Vì vậy, ta có thể dùng một ngăn xếp tường minh để mô phỏng đệ quy:

```python
def for_loop_recur(n: int) -> int:
    stack = []
    while n > 0:
        stack.append(n)
        n -= 1
    res = 0
    while stack:
        res += stack.pop()
    return res
```

Việc chuyển đệ quy thành phép lặp thường làm mã phức tạp và khó đọc hơn; với bài toán lớn, mô phỏng chính xác ngăn xếp hệ thống cũng không đơn giản. **Hãy chọn phép lặp hay đệ quy dựa trên bản chất bài toán, khả năng đọc hiểu và giới hạn tài nguyên.**
