# Sắp xếp chọn

<u>Sắp xếp chọn</u> có nguyên lý rất trực quan: trong mỗi lượt, chọn phần tử nhỏ nhất của vùng chưa sắp xếp rồi đưa nó vào cuối vùng đã sắp xếp.

Giả sử mảng có độ dài $n$. Quy trình gồm các bước sau.

1. Ban đầu mọi phần tử đều chưa được sắp xếp, tức vùng chỉ số chưa sắp xếp là $[0, n-1]$.
2. Chọn phần tử nhỏ nhất trong $[0, n-1]$ rồi hoán đổi với phần tử ở chỉ số $0$. Khi đó phần tử đầu tiên đã ở đúng vị trí.
3. Chọn phần tử nhỏ nhất trong $[1, n-1]$ rồi hoán đổi với phần tử ở chỉ số $1$. Khi đó hai phần tử đầu tiên đã được cố định.
4. Tiếp tục tương tự. Sau $n - 1$ lượt chọn và hoán đổi, $n - 1$ phần tử đầu đều đúng vị trí.
5. Phần tử còn lại chắc chắn là phần tử lớn nhất, vì vậy không cần thêm một lượt xử lý.

**Bước 1**

![Bước 1 của sắp xếp chọn](selection_sort.assets/selection_sort_step1.png)

**Bước 2**

![Bước 2 của sắp xếp chọn](selection_sort.assets/selection_sort_step2.png)

**Bước 3**

![Bước 3 của sắp xếp chọn](selection_sort.assets/selection_sort_step3.png)

**Bước 4**

![Bước 4 của sắp xếp chọn](selection_sort.assets/selection_sort_step4.png)

**Bước 5**

![Bước 5 của sắp xếp chọn](selection_sort.assets/selection_sort_step5.png)

**Bước 6**

![Bước 6 của sắp xếp chọn](selection_sort.assets/selection_sort_step6.png)

**Bước 7**

![Bước 7 của sắp xếp chọn](selection_sort.assets/selection_sort_step7.png)

**Bước 8**

![Bước 8 của sắp xếp chọn](selection_sort.assets/selection_sort_step8.png)

**Bước 9**

![Bước 9 của sắp xếp chọn](selection_sort.assets/selection_sort_step9.png)

**Bước 10**

![Bước 10 của sắp xếp chọn](selection_sort.assets/selection_sort_step10.png)

**Bước 11**

![Bước 11 của sắp xếp chọn](selection_sort.assets/selection_sort_step11.png)

Trong mã, biến $k$ ghi nhớ chỉ số của phần tử nhỏ nhất đang thấy trong vùng chưa sắp xếp:

Sau lượt thứ $r$, tiền tố đã cố định có đúng $r$ phần tử; đây là bất biến giúp kiểm tra tính đúng đắn của thuật toán.

```python
# Mã sắp xếp chọn chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Độ phức tạp thời gian $O(n^2)$, không thích nghi**: vòng ngoài chạy $n - 1$ lượt. Vùng chưa sắp xếp có độ dài lần lượt là $n$, $n - 1$, $\dots$, $3$ và $2$, nên tổng số lần xét là $\frac{(n - 1)(n + 2)}{2}$. Dữ liệu đã gần có thứ tự cũng không làm giảm số phép so sánh.
- **Độ phức tạp không gian $O(1)$, sắp xếp tại chỗ**: các con trỏ $i$ và $j$ chỉ chiếm lượng bộ nhớ cố định.
- **Không ổn định**: phép đổi chỗ có thể đưa `nums[i]` sang phía sau một phần tử có khóa bằng nó, làm thay đổi thứ tự tương đối ban đầu.

![Ví dụ về tính không ổn định của sắp xếp chọn](selection_sort.assets/selection_sort_instability.png)
