# Bài toán ba lô vô hạn

Trong phần này, chúng ta giải một dạng ba lô phổ biến khác là ba lô vô hạn, sau đó khám phá trường hợp đặc biệt của nó: bài toán đổi tiền xu.

## Bài toán ba lô vô hạn

!!! question

    Cho $n$ loại vật phẩm, trong đó khối lượng vật phẩm thứ $i$ là $wgt[i-1]$, giá trị là $val[i-1]$, và một ba lô sức chứa $cap$. **Mỗi loại vật phẩm có thể được chọn nhiều lần**. Giá trị lớn nhất có thể đặt trong giới hạn sức chứa là bao nhiêu? Dữ liệu ví dụ được minh họa dưới đây.

![Dữ liệu ví dụ của ba lô vô hạn](unbounded_knapsack_problem.assets/unbounded_knapsack_example.png)

### Phương pháp quy hoạch động

Ba lô vô hạn rất giống ba lô 0-1, **chỉ khác ở chỗ số lần chọn một loại vật phẩm không bị giới hạn**.

- Trong ba lô 0-1, mỗi loại chỉ có một vật phẩm, nên sau khi chọn vật phẩm $i$, chỉ còn được chọn trong $i-1$ vật phẩm đầu.
- Trong ba lô vô hạn, số lượng mỗi loại không giới hạn, nên sau khi chọn vật phẩm $i$, **vẫn có thể tiếp tục chọn trong $i$ vật phẩm đầu**.

Theo quy tắc của ba lô vô hạn, trạng thái $[i, c]$ có hai trường hợp chuyển:

- **Không chọn vật phẩm $i$**: giống ba lô 0-1, chuyển tới $[i-1, c]$.
- **Chọn vật phẩm $i$**: khác ba lô 0-1, chuyển tới $[i, c-wgt[i-1]]$.

Phương trình chuyển trạng thái trở thành:

$$
dp[i, c] = \max(dp[i-1, c], dp[i, c - wgt[i-1]] + val[i-1])
$$

### Triển khai mã

So với mã của ba lô 0-1, chỉ có một thay đổi trong phép chuyển trạng thái từ $i-1$ thành $i$; mọi phần còn lại giống nhau:

```python
# Mã quy hoạch động ba lô vô hạn 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

### Tối ưu không gian

Vì trạng thái hiện tại chuyển từ trạng thái bên trái và phía trên, **sau khi tối ưu không gian, mỗi hàng của bảng $dp$ phải được duyệt theo chiều thuận**.

Thứ tự này ngược hoàn toàn với ba lô 0-1. Chuỗi hình dưới minh họa khác biệt.

**Bước 1**

![Tối ưu không gian ba lô vô hạn, bước 1](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step1.png)

**Bước 2**

![Tối ưu không gian ba lô vô hạn, bước 2](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step2.png)

**Bước 3**

![Tối ưu không gian ba lô vô hạn, bước 3](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step3.png)

**Bước 4**

![Tối ưu không gian ba lô vô hạn, bước 4](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step4.png)

**Bước 5**

![Tối ưu không gian ba lô vô hạn, bước 5](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step5.png)

**Bước 6**

![Tối ưu không gian ba lô vô hạn, bước 6](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step6.png)

Mã khá đơn giản, chỉ cần bỏ chiều thứ nhất của mảng `dp`:

```python
# Mã ba lô vô hạn tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

## Bài toán đổi tiền xu

Bài toán ba lô đại diện cho một lớp lớn bài toán quy hoạch động và có nhiều biến thể, trong đó có bài toán đổi tiền xu.

!!! question

    Cho $n$ loại tiền xu, mệnh giá của loại thứ $i$ là $coins[i - 1]$, và số tiền mục tiêu là $amt$. **Mỗi loại xu có thể được chọn nhiều lần**. Cần ít nhất bao nhiêu đồng xu để tạo đúng số tiền mục tiêu? Nếu không thể tạo được, trả về $-1$. Dữ liệu ví dụ được minh họa dưới đây.

![Dữ liệu ví dụ của bài toán đổi tiền xu](unbounded_knapsack_problem.assets/coin_change_example.png)

### Phương pháp quy hoạch động

**Bài toán đổi tiền xu có thể xem là trường hợp đặc biệt của ba lô vô hạn**, với các quan hệ và khác biệt:

- Hai bài toán chuyển đổi tương ứng: “vật phẩm” là “đồng xu”, “khối lượng” là “mệnh giá”, và “sức chứa ba lô” là “số tiền mục tiêu”.
- Mục tiêu tối ưu ngược nhau: ba lô vô hạn tối đa hóa giá trị vật phẩm, còn đổi tiền xu tối thiểu hóa số đồng xu.
- Ba lô vô hạn tìm lời giải “không vượt quá” sức chứa, còn đổi tiền xu yêu cầu “tạo đúng” số tiền mục tiêu.

**Bước 1: Xét quyết định ở mỗi lượt, định nghĩa trạng thái và lập bảng $dp$**

Trạng thái $[i, a]$ tương ứng bài toán con: **số đồng xu ít nhất trong $i$ loại đầu có thể tạo thành số tiền $a$**, ký hiệu $dp[i, a]$.

Bảng $dp$ hai chiều có kích thước $(n+1) \times (amt+1)$.

**Bước 2: Xác định cấu trúc con tối ưu rồi suy ra phương trình chuyển trạng thái**

Phương trình chuyển trạng thái khác ba lô vô hạn ở hai điểm:

- Bài toán tìm giá trị nhỏ nhất, nên toán tử $\max()$ đổi thành $\min()$.
- Mục tiêu là số đồng xu thay vì giá trị vật phẩm, nên khi chọn một đồng xu chỉ cần cộng $1$.

$$
dp[i, a] = \min(dp[i-1, a], dp[i, a - coins[i-1]] + 1)
$$

**Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái**

Khi số tiền mục tiêu là $0$, số đồng xu tối thiểu là $0$, nên mọi $dp[i, 0]$ ở cột đầu bằng $0$.

Khi không có đồng xu, **không thể tạo bất kỳ số tiền nào $> 0$**, tức lời giải không hợp lệ. Để hàm $\min()$ nhận biết và loại chúng, dùng $+ \infty$ làm giá trị biểu diễn; mọi $dp[0, a]$ ở hàng đầu được đặt thành $+ \infty$.

### Triển khai mã

Phần lớn ngôn ngữ không cung cấp biến $+ \infty$ cho kiểu số nguyên và chỉ có thể dùng giá trị lớn nhất của `int`. Tuy nhiên, phép $+ 1$ trong phương trình có thể làm tràn số nguyên.

Vì vậy, dùng $amt + 1$ biểu diễn lời giải không hợp lệ, bởi số đồng xu tối đa để tạo $amt$ không vượt quá $amt$. Trước khi trả về, kiểm tra $dp[n, amt]$ có bằng $amt + 1$ không; nếu có, trả về $-1$ để báo không thể tạo số tiền mục tiêu.

```python
# Mã quy hoạch động đổi tiền xu 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Chuỗi hình dưới mô tả quy hoạch động đổi tiền xu, rất giống ba lô vô hạn.

**Bước 1**

![Quy hoạch động đổi tiền xu, bước 1](unbounded_knapsack_problem.assets/coin_change_dp_step1.png)

**Bước 2**

![Quy hoạch động đổi tiền xu, bước 2](unbounded_knapsack_problem.assets/coin_change_dp_step2.png)

**Bước 3**

![Quy hoạch động đổi tiền xu, bước 3](unbounded_knapsack_problem.assets/coin_change_dp_step3.png)

**Bước 4**

![Quy hoạch động đổi tiền xu, bước 4](unbounded_knapsack_problem.assets/coin_change_dp_step4.png)

**Bước 5**

![Quy hoạch động đổi tiền xu, bước 5](unbounded_knapsack_problem.assets/coin_change_dp_step5.png)

**Bước 6**

![Quy hoạch động đổi tiền xu, bước 6](unbounded_knapsack_problem.assets/coin_change_dp_step6.png)

**Bước 7**

![Quy hoạch động đổi tiền xu, bước 7](unbounded_knapsack_problem.assets/coin_change_dp_step7.png)

**Bước 8**

![Quy hoạch động đổi tiền xu, bước 8](unbounded_knapsack_problem.assets/coin_change_dp_step8.png)

**Bước 9**

![Quy hoạch động đổi tiền xu, bước 9](unbounded_knapsack_problem.assets/coin_change_dp_step9.png)

**Bước 10**

![Quy hoạch động đổi tiền xu, bước 10](unbounded_knapsack_problem.assets/coin_change_dp_step10.png)

**Bước 11**

![Quy hoạch động đổi tiền xu, bước 11](unbounded_knapsack_problem.assets/coin_change_dp_step11.png)

**Bước 12**

![Quy hoạch động đổi tiền xu, bước 12](unbounded_knapsack_problem.assets/coin_change_dp_step12.png)

**Bước 13**

![Quy hoạch động đổi tiền xu, bước 13](unbounded_knapsack_problem.assets/coin_change_dp_step13.png)

**Bước 14**

![Quy hoạch động đổi tiền xu, bước 14](unbounded_knapsack_problem.assets/coin_change_dp_step14.png)

**Bước 15**

![Quy hoạch động đổi tiền xu, bước 15](unbounded_knapsack_problem.assets/coin_change_dp_step15.png)

### Tối ưu không gian

Tối ưu không gian của đổi tiền xu được xử lý giống ba lô vô hạn:

```python
# Mã đổi tiền xu tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

## Bài toán đổi tiền xu II

!!! question

    Cho $n$ loại tiền xu, mệnh giá loại thứ $i$ là $coins[i - 1]$, số tiền mục tiêu là $amt$. Mỗi loại xu có thể được chọn nhiều lần. **Có bao nhiêu tổ hợp tiền xu tạo đúng số tiền mục tiêu?** Dữ liệu ví dụ được minh họa dưới đây.

![Dữ liệu ví dụ của bài toán đổi tiền xu II](unbounded_knapsack_problem.assets/coin_change_ii_example.png)

### Phương pháp quy hoạch động

Khác bài toán trước, mục tiêu là đếm số tổ hợp. Bài toán con trở thành: **số tổ hợp trong $i$ loại xu đầu có thể tạo số tiền $a$**. Bảng $dp$ vẫn là ma trận hai chiều kích thước $(n+1) \times (amt + 1)$.

Số tổ hợp của trạng thái hiện tại bằng tổng số tổ hợp khi không chọn và khi chọn đồng xu hiện tại:

$$
dp[i, a] = dp[i-1, a] + dp[i, a - coins[i-1]]
$$

Khi số tiền mục tiêu là $0$, không chọn đồng xu nào cũng tạo đúng mục tiêu, nên mọi $dp[i, 0]$ ở cột đầu được khởi tạo bằng $1$. Khi không có đồng xu, không thể tạo bất kỳ số tiền nào $>0$, nên mọi $dp[0, a]$ ở hàng đầu bằng $0$.

### Triển khai mã

```python
# Mã quy hoạch động đổi tiền xu II 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

### Tối ưu không gian

Cách tối ưu không gian vẫn giống nhau, chỉ cần bỏ chiều đồng xu:

```python
# Mã đổi tiền xu II tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```
