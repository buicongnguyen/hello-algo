# Bài toán sức chứa lớn nhất

!!! question

    Cho mảng $ht$, trong đó mỗi phần tử là chiều cao của một vách ngăn thẳng đứng. Hai vách bất kỳ cùng khoảng không ở giữa có thể tạo thành một vật chứa.

    Sức chứa bằng tích của chiều cao và chiều rộng, tức diện tích. Chiều cao được quyết định bởi vách thấp hơn, chiều rộng là hiệu chỉ số của hai vách.

    Hãy chọn hai vách sao cho sức chứa lớn nhất và trả về giá trị đó. Dữ liệu ví dụ được minh họa dưới đây.

![Dữ liệu ví dụ của sức chứa lớn nhất](max_capacity_problem.assets/max_capacity_example.png)

Vật chứa được tạo bởi hai vách bất kỳ, **nên trạng thái là chỉ số của hai vách, ký hiệu $[i, j]$**.

Sức chứa bằng chiều cao nhân chiều rộng; chiều cao là vách thấp hơn và chiều rộng là hiệu chỉ số. Gọi sức chứa là $cap[i, j]$, công thức là:

$$
cap[i, j] = \min(ht[i], ht[j]) \times (j - i)
$$

Gọi độ dài mảng là $n$. Số cách chọn hai vách, tức tổng số trạng thái, là $C_n^2 = \frac{n(n - 1)}{2}$. Cách trực tiếp nhất là **liệt kê vét cạn mọi trạng thái** để tìm sức chứa lớn nhất, tốn $O(n^2)$ thời gian.

### Xác định chiến lược tham lam

Có một lời giải hiệu quả hơn. Xét trạng thái $[i, j]$ với $i < j$ và $ht[i] < ht[j]$. Khi đó $i$ là vách thấp, $j$ là vách cao.

![Trạng thái ban đầu](max_capacity_problem.assets/max_capacity_initial_state.png)

**Nếu di chuyển vách cao $j$ vào trong về phía vách thấp $i$, sức chứa chắc chắn giảm**.

Sau khi di chuyển $j$, chiều rộng $j-i$ chắc chắn giảm. Vì chiều cao do vách thấp hơn quyết định, chiều cao chỉ có thể giữ nguyên, khi $i$ vẫn thấp hơn, hoặc giảm, khi vách mới ở $j$ trở thành vách thấp hơn.

![Trạng thái sau khi di chuyển vách cao vào trong](max_capacity_problem.assets/max_capacity_moving_long_board.png)

Ngược lại, **chỉ khi di chuyển vách thấp $i$ vào trong thì sức chứa mới có khả năng tăng**. Chiều rộng chắc chắn giảm nhưng **chiều cao có thể tăng**, nếu vách mới tại $i$ cao hơn. Hình sau cho thấy diện tích tăng sau khi di chuyển vách thấp.

![Trạng thái sau khi di chuyển vách thấp vào trong](max_capacity_problem.assets/max_capacity_moving_short_board.png)

Từ đó suy ra chiến lược: khởi tạo hai con trỏ ở hai đầu, mỗi lượt di chuyển con trỏ ứng với vách thấp hơn vào trong cho đến khi chúng gặp nhau.

Quy trình:

1. Ban đầu, con trỏ $i$ và $j$ ở hai đầu mảng.
2. Tính sức chứa $cap[i, j]$ của trạng thái hiện tại và cập nhật kết quả lớn nhất.
3. So sánh chiều cao vách $i$ và $j$, di chuyển con trỏ của vách thấp hơn vào trong một vị trí.
4. Lặp bước `2.` và `3.` đến khi $i$ và $j$ gặp nhau.

**Bước 1**

![Quá trình tham lam sức chứa lớn nhất, bước 1](max_capacity_problem.assets/max_capacity_greedy_step1.png)

**Bước 2**

![Quá trình tham lam sức chứa lớn nhất, bước 2](max_capacity_problem.assets/max_capacity_greedy_step2.png)

**Bước 3**

![Quá trình tham lam sức chứa lớn nhất, bước 3](max_capacity_problem.assets/max_capacity_greedy_step3.png)

**Bước 4**

![Quá trình tham lam sức chứa lớn nhất, bước 4](max_capacity_problem.assets/max_capacity_greedy_step4.png)

**Bước 5**

![Quá trình tham lam sức chứa lớn nhất, bước 5](max_capacity_problem.assets/max_capacity_greedy_step5.png)

**Bước 6**

![Quá trình tham lam sức chứa lớn nhất, bước 6](max_capacity_problem.assets/max_capacity_greedy_step6.png)

**Bước 7**

![Quá trình tham lam sức chứa lớn nhất, bước 7](max_capacity_problem.assets/max_capacity_greedy_step7.png)

**Bước 8**

![Quá trình tham lam sức chứa lớn nhất, bước 8](max_capacity_problem.assets/max_capacity_greedy_step8.png)

**Bước 9**

![Quá trình tham lam sức chứa lớn nhất, bước 9](max_capacity_problem.assets/max_capacity_greedy_step9.png)

### Triển khai mã

Mã chạy nhiều nhất $n$ lượt, **nên độ phức tạp thời gian là $O(n)$**.

Các biến $i$, $j$ và $res$ chỉ dùng lượng không gian phụ cố định, **nên độ phức tạp không gian là $O(1)$**.

```python
# Mã sức chứa lớn nhất 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

### Chứng minh tính đúng

Tham lam nhanh hơn liệt kê vét cạn vì mỗi lượt lựa chọn sẽ “bỏ qua” một số trạng thái.

Trong trạng thái $cap[i, j]$, giả sử $i$ là vách thấp và $j$ là vách cao. Khi tham lam di chuyển vách thấp $i$ vào trong một vị trí, các trạng thái sau bị bỏ qua và **không còn được kiểm tra về sau**:

$$
cap[i, i+1], cap[i, i+2], \dots, cap[i, j-2], cap[i, j-1]
$$

![Các trạng thái bị bỏ qua khi di chuyển vách thấp](max_capacity_problem.assets/max_capacity_skipped_states.png)

Quan sát kỹ, **các trạng thái bị bỏ qua chính là những trạng thái thu được khi di chuyển vách cao $j$ vào trong**. Phần chứng minh trên cho thấy thao tác đó chắc chắn làm sức chứa giảm. Vì vậy, không trạng thái bị bỏ qua nào có thể là lời giải tối ưu, **nên việc bỏ qua không làm mất giá trị tối ưu**.

Phân tích trên cho thấy di chuyển vách thấp là một thao tác “an toàn” và chiến lược tham lam là đúng.
