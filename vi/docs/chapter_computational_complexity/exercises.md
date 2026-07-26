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
3. Độ phức tạp thời gian và không gian của hai cách là gì? Hãy mô tả số bước bằng $T(n)$ và bộ nhớ cực đại bằng $S(n)$.

??? success "Đáp án"

    1. `i` lần lượt bằng `1, 2, 3, 4`, còn `s` bằng `1, 3, 6, 10`.
    2. Chuỗi lời gọi là `sum_recur(4) → sum_recur(3) → sum_recur(2) → sum_recur(1)`. Khi quay lui, kết quả lần lượt là `1`, `2 + 1 = 3`, `3 + 3 = 6`, `4 + 6 = 10`.
    3. Cả hai mất $O(n)$ thời gian. Bản lặp chỉ giữ số biến cố định nên dùng $O(1)$ không gian; bản đệ quy giữ tối đa $n$ khung lời gọi nên dùng $O(n)$ không gian.

        Điểm khác biệt xuất hiện ở thời điểm sâu nhất của quá trình. Vòng lặp chỉ giữ trạng thái hiện tại, còn bốn lời gọi đệ quy đều chưa hoàn tất và phải giữ địa chỉ quay về. Khi tổng quát hóa từ `4` sang đầu vào lớn, số khung đồng thời tăng cùng kích thước dữ liệu.

### Độ phức tạp thời gian của ba đoạn mã

Hãy xếp ba đoạn sau từ độ phức tạp thấp đến cao. Đừng chỉ nhìn số vòng lặp được viết trong mã; hãy đếm tổng số lần thân vòng lặp thực sự chạy theo $n$.

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

    Thứ tự là Đoạn 3 với $O(\log n)$, Đoạn 1 với $O(n)$ và Đoạn 2 với $O(n^2)$. Đoạn 3 chia đôi `n` sau mỗi vòng nên chạy khoảng $\log_2 n$ lần. Đoạn 1 chạy đúng một lượt cho mỗi phần tử. Đoạn 2 thực hiện tổng cộng $n+(n-1)+\dots+1=n(n+1)/2$ lượt; hạng bậc hai chi phối khi đầu vào lớn.

### Cách đảo nào dùng ít không gian hơn?

So sánh hai cách đảo mảng có độ dài $n$: tạo một mảng mới có cùng độ dài, hoặc dùng hai chỉ mục đi từ hai đầu vào giữa và hoán đổi tại chỗ. Cách nào là thao tác “tại chỗ”, và khi nào không được phép dùng cách ấy?

??? success "Đáp án"

    Mảng mới cần $O(n)$ không gian vì phải giữ một bản sao có cùng số phần tử. Cách hai chỉ mục chỉ cần $O(1)$ không gian và là thao tác tại chỗ, nhưng nó làm thay đổi đầu vào.

    Chỉ nên chọn cách tại chỗ khi hợp đồng của hàm cho phép sửa `nums`. Nếu dữ liệu gốc phải được giữ nguyên hoặc còn được thành phần khác dùng chung, chi phí sao chép của cách thứ nhất là cần thiết.

## Bài tập lập trình

### Số Fibonacci

Với $F(0)=0$, $F(1)=1$ và $F(n)=F(n-1)+F(n-2)$ khi $n\ge2$, hãy dùng vòng lặp để tính $F(n)$, không dùng đệ quy.

??? tip "Gợi ý"

    Xử lý riêng `n = 0` và `n = 1`. Chỉ cần giữ hai số hạng trước; khi cập nhật, đừng ghi đè giá trị cũ trước khi dùng. Cách này dùng $O(1)$ bộ nhớ phụ vì không lưu toàn bộ dãy.

[LeetCode](https://leetcode.com/problems/fibonacci-number/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
