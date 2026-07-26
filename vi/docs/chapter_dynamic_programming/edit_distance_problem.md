# Bài toán khoảng cách chỉnh sửa

Khoảng cách chỉnh sửa, còn gọi là khoảng cách Levenshtein, là số phép chỉnh sửa ít nhất cần để biến một chuỗi thành chuỗi khác. Khái niệm này thường được dùng trong truy hồi thông tin và xử lý ngôn ngữ tự nhiên để đo độ tương đồng giữa hai chuỗi.

Trong ký hiệu của bài toán, chuỗi nguồn là $s$, chuỗi đích là $t$, còn bảng $dp$ lưu lời giải cho mọi cặp tiền tố.

!!! question

    Cho hai chuỗi $s$ và $t$, hãy trả về số phép chỉnh sửa ít nhất để biến $s$ thành $t$.

    Có ba loại thao tác: chèn một ký tự, xóa một ký tự hoặc thay một ký tự bằng ký tự khác.

Như hình dưới, biến `kitten` thành `sitting` cần 3 phép chỉnh sửa, gồm 2 lần thay và 1 lần chèn; biến `hello` thành `algo` cũng cần 3 bước, gồm 2 lần thay và 1 lần xóa.

![Dữ liệu ví dụ của khoảng cách chỉnh sửa](edit_distance_problem.assets/edit_distance_example.png)

**Bài toán khoảng cách chỉnh sửa có thể được giải thích tự nhiên bằng mô hình cây quyết định**. Mỗi chuỗi tương ứng một nút, mỗi thao tác chỉnh sửa tương ứng một cạnh.

Nếu không giới hạn thao tác, mỗi nút có thể tỏa ra nhiều cạnh; mỗi cạnh là một thao tác, vì vậy có nhiều đường để biến `hello` thành `algo`.

Theo góc nhìn cây quyết định, mục tiêu là tìm đường ngắn nhất giữa nút `hello` và nút `algo`.

![Biểu diễn khoảng cách chỉnh sửa bằng cây quyết định](edit_distance_problem.assets/edit_distance_decision_tree.png)

### Phương pháp quy hoạch động

**Bước 1: Xét quyết định ở mỗi lượt, định nghĩa trạng thái và lập bảng $dp$**

Mỗi lượt quyết định thực hiện một phép chỉnh sửa trên chuỗi $s$.

Chúng ta muốn kích thước bài toán giảm dần sau mỗi thao tác để tạo các bài toán con. Gọi độ dài của $s$ và $t$ lần lượt là $n$ và $m$. Trước hết xét hai ký tự cuối $s[n-1]$ và $t[m-1]$.

- Nếu $s[n-1]$ và $t[m-1]$ giống nhau, có thể bỏ qua chúng rồi xét trực tiếp $s[n-2]$ và $t[m-2]$.
- Nếu $s[n-1]$ và $t[m-1]$ khác nhau, cần thực hiện một phép chỉnh sửa trên $s$, gồm chèn, xóa hoặc thay, để hai ký tự cuối giống nhau; sau đó bỏ qua chúng và xét bài toán nhỏ hơn.

Mỗi quyết định chỉnh sửa trên $s$ làm thay đổi số ký tự còn cần so khớp trong $s$ và $t$. Vì vậy trạng thái là vị trí ký tự thứ $i$ và thứ $j$ đang xét trong hai chuỗi, ký hiệu $[i, j]$.

Trạng thái $[i, j]$ tương ứng bài toán con: **số phép chỉnh sửa ít nhất để biến $i$ ký tự đầu của $s$ thành $j$ ký tự đầu của $t$**.

Từ đó lập bảng $dp$ hai chiều kích thước $(i+1) \times (j+1)$.

**Bước 2: Xác định cấu trúc con tối ưu rồi suy ra phương trình chuyển trạng thái**

Xét bài toán con $dp[i, j]$. Hai ký tự cuối tương ứng là $s[i-1]$ và $t[j-1]$. Theo ba thao tác chỉnh sửa, có ba trường hợp:

1. Chèn $t[j-1]$ sau $s[i-1]$, bài toán còn lại là $dp[i, j-1]$.
2. Xóa $s[i-1]$, bài toán còn lại là $dp[i-1, j]$.
3. Thay $s[i-1]$ bằng $t[j-1]$, bài toán còn lại là $dp[i-1, j-1]$.

![Chuyển trạng thái của khoảng cách chỉnh sửa](edit_distance_problem.assets/edit_distance_state_transfer.png)

Cấu trúc con tối ưu là: số phép chỉnh sửa ít nhất của $dp[i, j]$ bằng giá trị nhỏ nhất trong $dp[i, j-1]$, $dp[i-1, j]$ và $dp[i-1, j-1]$, cộng chi phí chỉnh sửa hiện tại là $1$:

$$
dp[i, j] = \min(dp[i, j-1], dp[i-1, j], dp[i-1, j-1]) + 1
$$

Lưu ý **khi $s[i-1]$ và $t[j-1]$ giống nhau, ký tự hiện tại không cần chỉnh sửa**, nên phương trình là:

$$
dp[i, j] = dp[i-1, j-1]
$$

**Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái**

Khi cả hai chuỗi rỗng, số bước chỉnh sửa là $0$, tức $dp[0, 0] = 0$. Khi $s$ rỗng nhưng $t$ không rỗng, số bước nhỏ nhất bằng độ dài $t$, tức hàng đầu $dp[0, j] = j$. Khi $s$ không rỗng nhưng $t$ rỗng, số bước nhỏ nhất bằng độ dài $s$, tức cột đầu $dp[i, 0] = i$.

Phương trình cho thấy $dp[i, j]$ phụ thuộc lời giải bên trái, phía trên và phía trên bên trái. Vì vậy có thể duyệt toàn bộ bảng theo thứ tự bằng hai vòng lặp lồng nhau.

### Triển khai mã

```python
# Mã quy hoạch động khoảng cách chỉnh sửa 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Chuỗi hình dưới cho thấy quá trình chuyển trạng thái rất giống bài toán ba lô; cả hai đều là quá trình điền một lưới hai chiều.

**Bước 1**

![Quy hoạch động khoảng cách chỉnh sửa, bước 1](edit_distance_problem.assets/edit_distance_dp_step1.png)

**Bước 2**

![Quy hoạch động khoảng cách chỉnh sửa, bước 2](edit_distance_problem.assets/edit_distance_dp_step2.png)

**Bước 3**

![Quy hoạch động khoảng cách chỉnh sửa, bước 3](edit_distance_problem.assets/edit_distance_dp_step3.png)

**Bước 4**

![Quy hoạch động khoảng cách chỉnh sửa, bước 4](edit_distance_problem.assets/edit_distance_dp_step4.png)

**Bước 5**

![Quy hoạch động khoảng cách chỉnh sửa, bước 5](edit_distance_problem.assets/edit_distance_dp_step5.png)

**Bước 6**

![Quy hoạch động khoảng cách chỉnh sửa, bước 6](edit_distance_problem.assets/edit_distance_dp_step6.png)

**Bước 7**

![Quy hoạch động khoảng cách chỉnh sửa, bước 7](edit_distance_problem.assets/edit_distance_dp_step7.png)

**Bước 8**

![Quy hoạch động khoảng cách chỉnh sửa, bước 8](edit_distance_problem.assets/edit_distance_dp_step8.png)

**Bước 9**

![Quy hoạch động khoảng cách chỉnh sửa, bước 9](edit_distance_problem.assets/edit_distance_dp_step9.png)

**Bước 10**

![Quy hoạch động khoảng cách chỉnh sửa, bước 10](edit_distance_problem.assets/edit_distance_dp_step10.png)

**Bước 11**

![Quy hoạch động khoảng cách chỉnh sửa, bước 11](edit_distance_problem.assets/edit_distance_dp_step11.png)

**Bước 12**

![Quy hoạch động khoảng cách chỉnh sửa, bước 12](edit_distance_problem.assets/edit_distance_dp_step12.png)

**Bước 13**

![Quy hoạch động khoảng cách chỉnh sửa, bước 13](edit_distance_problem.assets/edit_distance_dp_step13.png)

**Bước 14**

![Quy hoạch động khoảng cách chỉnh sửa, bước 14](edit_distance_problem.assets/edit_distance_dp_step14.png)

**Bước 15**

![Quy hoạch động khoảng cách chỉnh sửa, bước 15](edit_distance_problem.assets/edit_distance_dp_step15.png)

### Tối ưu không gian

Vì $dp[i, j]$ phụ thuộc trạng thái phía trên $dp[i-1, j]$, bên trái $dp[i, j-1]$ và phía trên bên trái $dp[i-1, j-1]$, duyệt thuận sẽ làm mất trạng thái phía trên bên trái $dp[i-1, j-1]$, còn duyệt ngược không thể xây trước $dp[i, j-1]$. Do đó cả hai thứ tự đều chưa đủ nếu chỉ dùng một mảng.

Chúng ta dùng biến `leftup` để tạm lưu lời giải phía trên bên trái $dp[i-1, j-1]$, rồi chỉ cần xét lời giải bên trái và phía trên. Tình huống này giống ba lô vô hạn, nên có thể duyệt thuận:

```python
# Mã khoảng cách chỉnh sửa tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```
