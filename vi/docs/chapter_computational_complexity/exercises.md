# Bài tập

## Ôn tập khái niệm

### Độ phức tạp thời gian và không gian của phép lặp và đệ quy

Hai hàm sau đều tính $1 + 2 + \dots + n$ với $n \ge 1$. Hãy đặt `n = 4`, lần theo đúng thứ tự thực thi rồi so sánh hiệu quả.

```python
def sum_iter(n):
    s = 0
    for i in range(1, n + 1):
        s += i
    return s

def sum_recur(n):
    if n == 1:
        return 1
    return n + sum_recur(n - 1)
```

1. Sau mỗi vòng lặp của `sum_iter(4)`, `s` có giá trị nào?
2. `sum_recur(4)` tạo các lời gọi theo thứ tự nào và kết quả được ghép lại ra sao?
3. Độ phức tạp thời gian và không gian của hai cách là gì?

??? success "Đáp án"

    1. `i` lần lượt bằng `1, 2, 3, 4`, còn `s` bằng `1, 3, 6, 10`.
    2. Chuỗi lời gọi là `sum_recur(4) → sum_recur(3) → sum_recur(2) → sum_recur(1)`. Khi quay lui, kết quả lần lượt là `1`, `2 + 1 = 3`, `3 + 3 = 6`, `4 + 6 = 10`.
    3. Cả hai mất $O(n)$ thời gian. Bản lặp chỉ giữ số biến cố định nên dùng $O(1)$ không gian; bản đệ quy giữ tối đa $n$ khung lời gọi nên dùng $O(n)$ không gian.

### Độ phức tạp thời gian của ba đoạn mã

Hãy xếp ba đoạn sau từ độ phức tạp thấp đến cao.

```python
# Đoạn 1
s = 0
for i in range(n):
    s += i

# Đoạn 2
s = 0
for i in range(n):
    for j in range(i, n):
        s += j

# Đoạn 3
while n > 1:
    n = n // 2
```

??? success "Đáp án"

    Thứ tự là Đoạn 3 với $O(\log n)$, Đoạn 1 với $O(n)$ và Đoạn 2 với $O(n^2)$. Đoạn 3 chia đôi `n` sau mỗi vòng; Đoạn 2 thực hiện tổng cộng $n+(n-1)+\dots+1=n(n+1)/2$ lượt.

### Cách đảo nào dùng ít không gian hơn?

So sánh hai cách đảo mảng: tạo một mảng mới có cùng độ dài, hoặc dùng hai chỉ mục đi từ hai đầu vào giữa và hoán đổi tại chỗ.

??? success "Đáp án"

    Mảng mới cần $O(n)$ không gian. Cách hai chỉ mục chỉ cần $O(1)$ không gian và là thao tác tại chỗ, nhưng nó làm thay đổi đầu vào.

## Bài tập lập trình

### Số Fibonacci

Với $F(0)=0$, $F(1)=1$ và $F(n)=F(n-1)+F(n-2)$ khi $n\ge2$, hãy dùng vòng lặp để tính $F(n)$, không dùng đệ quy.

??? tip "Gợi ý"

    Xử lý riêng `n = 0` và `n = 1`. Chỉ cần giữ hai số hạng trước; khi cập nhật, đừng ghi đè giá trị cũ trước khi dùng.

[LeetCode](https://leetcode.com/problems/fibonacci-number/)
