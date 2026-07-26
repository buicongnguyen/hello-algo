# Bài toán tích cắt lớn nhất

!!! question

    Cho số nguyên dương $n$, hãy tách nó thành tổng của ít nhất hai số nguyên dương và tìm tích lớn nhất của các số thu được, như hình dưới.

![Định nghĩa bài toán tích cắt lớn nhất](max_product_cutting_problem.assets/max_product_cutting_definition.png)

Giả sử tách $n$ thành $m$ thừa số nguyên, thừa số thứ $i$ là $n_i$:

$$
n = \sum_{i=1}^{m}n_i
$$

Mục tiêu là tìm tích lớn nhất của mọi thừa số:

$$
\max(\prod_{i=1}^{m}n_i)
$$

Cần xác định có bao nhiêu phần $m$ và mỗi $n_i$ bằng bao nhiêu.

### Xác định chiến lược tham lam

Theo kinh nghiệm, tích của hai số nguyên thường lớn hơn tổng của chúng. Giả sử tách thừa số $2$ khỏi $n$, tích thu được là $2(n-2)$. So sánh với $n$:

$$
\begin{aligned}
2(n-2) & \geq n \newline
2n - n - 4 & \geq 0 \newline
n & \geq 4
\end{aligned}
$$

Khi $n \geq 4$, tách ra một $2$ làm tích tăng, **cho thấy mọi số nguyên lớn hơn hoặc bằng $4$ đều nên tiếp tục được tách**.

**Chiến lược một**: Nếu phương án chứa thừa số $\geq 4$, nên tách tiếp. Phương án cuối chỉ chứa $1$, $2$ và $3$.

![Tách số làm tích tăng](max_product_cutting_problem.assets/max_product_cutting_greedy_infer1.png)

Tiếp theo, xét thừa số nào là tối ưu. Trong $1$, $2$, $3$, rõ ràng $1$ tệ nhất vì $1 \times (n-1) < n$ luôn đúng; tách $1$ làm tích giảm.

Khi $n = 6$, có $3 \times 3 > 2 \times 2 \times 2$. **Điều đó nghĩa là tách $3$ tốt hơn tách $2$**.

**Chiến lược hai**: Phương án có nhiều nhất hai thừa số $2$, vì ba số $2$ luôn có thể được thay bằng hai số $3$ để thu tích lớn hơn.

![Thừa số tách tối ưu](max_product_cutting_problem.assets/max_product_cutting_greedy_infer2.png)

Tóm lại:

1. Với số nguyên $n$, liên tục tách thừa số $3$ cho đến khi phần dư là $0$, $1$ hoặc $2$.
2. Phần dư $0$ nghĩa là $n$ chia hết cho $3$, không cần xử lý thêm.
3. Phần dư $2$ được giữ nguyên, không tách tiếp.
4. Phần dư $1$: vì $2 \times 2 > 1 \times 3$, thay số $3$ cuối và số dư $1$ bằng hai số $2$.

### Triển khai mã

Không cần vòng lặp để tách số. Dùng phép chia nguyên tìm số lượng $3$, ký hiệu $a$, và phép chia lấy dư tìm $b$:

$$
n = 3 a + b
$$

Với trường hợp biên $n \leq 3$, bắt buộc tách ra một $1$, thu tích $1 \times (n - 1)$.

```python
# Mã tích cắt lớn nhất 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

![Cách tính tích cắt lớn nhất](max_product_cutting_problem.assets/max_product_cutting_greedy_calculation.png)

**Độ phức tạp thời gian phụ thuộc cách ngôn ngữ triển khai lũy thừa**. Với Python, có ba cách phổ biến:

- Toán tử `**` và hàm `pow()` đều có độ phức tạp $O(\log⁡ a)$.
- Hàm `math.pow()` gọi hàm `pow()` của thư viện C để tính lũy thừa dấu phẩy động, có độ phức tạp $O(1)$.

Các biến $a$ và $b$ dùng không gian phụ cố định, **nên độ phức tạp không gian là $O(1)$**.

### Chứng minh tính đúng

Dùng phản chứng và chỉ xét trường hợp $n \geq 4$.

1. **Mọi thừa số $\leq 3$**: Giả sử phương án tối ưu chứa thừa số $x \geq 4$. Có thể tách tiếp thành $2(x-2)$ để thu tích lớn hơn hoặc bằng, mâu thuẫn với giả thiết.
2. **Phương án không chứa $1$**: Giả sử phương án tối ưu có thừa số $1$. Có thể gộp nó vào thừa số khác để thu tích lớn hơn, mâu thuẫn với giả thiết.
3. **Phương án có nhiều nhất hai số $2$**: Giả sử phương án tối ưu có ba số $2$. Thay chúng bằng hai số $3$ sẽ cho tích lớn hơn, mâu thuẫn với giả thiết.
