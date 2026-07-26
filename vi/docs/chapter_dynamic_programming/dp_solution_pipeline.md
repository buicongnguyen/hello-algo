# Quy trình giải bài toán quy hoạch động

Hai phần trước đã giới thiệu các đặc trưng chính của bài toán quy hoạch động. Tiếp theo, chúng ta giải quyết hai câu hỏi thực tế hơn.

1. Làm thế nào nhận biết một bài toán quy hoạch động?
2. Quy trình đầy đủ để giải bài toán quy hoạch động gồm những gì và nên bắt đầu từ đâu?

## Nhận diện bài toán

Nói chung, nếu bài toán có bài toán con chồng lặp, cấu trúc con tối ưu và không có hậu hiệu thì thường phù hợp với quy hoạch động. Tuy nhiên, khó rút trực tiếp ba đặc trưng này từ mô tả đề. Vì vậy, chúng ta thường nới lỏng điều kiện và **trước hết quan sát xem bài toán có phù hợp với quay lui, tức tìm kiếm vét cạn, hay không**.

**Bài toán phù hợp với quay lui thường thỏa “mô hình cây quyết định”**: có thể mô tả bài toán bằng cấu trúc cây, trong đó mỗi nút là một quyết định và mỗi đường đi là một chuỗi quyết định.

Nói cách khác, nếu đề bài chứa khái niệm lựa chọn rõ ràng và lời giải được tạo qua chuỗi quyết định, nó thỏa mô hình cây quyết định và thường có thể giải bằng quay lui.

Trên cơ sở đó, bài toán quy hoạch động còn có các dấu hiệu tích cực.

- Đề bài chứa các từ như lớn nhất, nhỏ nhất, nhiều nhất hoặc ít nhất, thể hiện mục tiêu tối ưu.
- Trạng thái có thể biểu diễn bằng danh sách, ma trận nhiều chiều hoặc cây; giữa một trạng thái và các trạng thái lân cận tồn tại quan hệ truy hồi.

Ngược lại, một số dấu hiệu tiêu cực là:

- Mục tiêu là tìm mọi lời giải có thể chứ không phải lời giải tối ưu.
- Đề bài có đặc trưng hoán vị và tổ hợp rõ rệt, yêu cầu trả về nhiều lời giải cụ thể.

Nếu bài toán thỏa mô hình cây quyết định và có dấu hiệu tích cực tương đối rõ, chúng ta có thể tạm giả định đó là bài toán quy hoạch động rồi kiểm chứng trong quá trình giải.

## Các bước giải

Quy trình giải thay đổi theo tính chất và độ khó, nhưng thường gồm: mô tả quyết định, định nghĩa trạng thái, thiết lập bảng $dp$, suy ra phương trình chuyển trạng thái, xác định điều kiện biên và thứ tự chuyển trạng thái.

Trong toàn bộ quy trình, bảng $dp$ là bản ghi có cấu trúc nối mỗi trạng thái với lời giải bài toán con tương ứng.

Để minh họa trực quan, hãy dùng bài toán kinh điển “tổng đường đi nhỏ nhất”.

!!! question

    Cho lưới hai chiều `grid` kích thước $n \times m$, mỗi ô chứa một số nguyên không âm là chi phí. Robot bắt đầu tại ô trên cùng bên trái và mỗi bước chỉ được đi xuống hoặc sang phải cho đến ô dưới cùng bên phải. Hãy trả về tổng chi phí nhỏ nhất của một đường đi từ đầu đến cuối.

Trong ví dụ dưới đây, tổng đường đi nhỏ nhất của lưới là $13$.

![Ví dụ tổng đường đi nhỏ nhất](dp_solution_pipeline.assets/min_path_sum_example.png)

**Bước 1: Xét quyết định ở mỗi lượt, định nghĩa trạng thái và từ đó lập bảng $dp$**

Mỗi lượt, robot quyết định đi xuống hoặc sang phải một ô. Gọi chỉ số hàng và cột hiện tại là $[i, j]$. Sau khi đi xuống hoặc sang phải, chỉ số trở thành $[i+1, j]$ hoặc $[i, j+1]$. Vì vậy trạng thái cần hai biến hàng và cột, ký hiệu $[i, j]$.

Trạng thái $[i, j]$ tương ứng bài toán con: **tổng đường đi nhỏ nhất từ điểm xuất phát $[0, 0]$ đến $[i, j]$**, ký hiệu $dp[i, j]$.

Từ đó thu được ma trận $dp$ hai chiều trong hình sau, có cùng kích thước với lưới đầu vào $grid$.

![Định nghĩa trạng thái và bảng dp](dp_solution_pipeline.assets/min_path_sum_solution_state_definition.png)

!!! note

    Cả quy hoạch động và quay lui đều có thể được mô tả như một chuỗi quyết định. Trạng thái gồm mọi biến quyết định, phải chứa đủ thông tin mô tả tiến độ giải bài toán và suy ra trạng thái tiếp theo.

    Mỗi trạng thái tương ứng một bài toán con. Bảng $dp$ lưu lời giải của mọi bài toán con; mỗi biến độc lập của trạng thái tạo thành một chiều của bảng. Về bản chất, bảng $dp$ là ánh xạ từ trạng thái tới lời giải bài toán con.

**Bước 2: Xác định cấu trúc con tối ưu rồi suy ra phương trình chuyển trạng thái**

Trạng thái $[i, j]$ chỉ có thể chuyển từ ô phía trên $[i-1, j]$ hoặc ô bên trái $[i, j-1]$. Vì vậy cấu trúc con tối ưu là: tổng đường đi nhỏ nhất đến $[i, j]$ được quyết định bởi giá trị nhỏ hơn giữa tổng đường đi nhỏ nhất đến $[i, j-1]$ và $[i-1, j]$.

Từ phân tích trên, suy ra phương trình chuyển trạng thái:

$$
dp[i, j] = \min(dp[i-1, j], dp[i, j-1]) + grid[i, j]
$$

![Cấu trúc con tối ưu và phương trình chuyển trạng thái](dp_solution_pipeline.assets/min_path_sum_solution_state_transition.png)

!!! note

    Dựa trên bảng $dp$ đã định nghĩa, hãy xét quan hệ giữa bài toán gốc và bài toán con, rồi tìm cách dựng lời giải tối ưu của bài toán gốc từ các lời giải tối ưu của bài toán con. Đó chính là cấu trúc con tối ưu.

    Khi đã tìm được cấu trúc con tối ưu, chúng ta dùng nó để lập phương trình chuyển trạng thái.

**Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái**

Trong bài toán này, trạng thái ở hàng đầu chỉ có thể đến từ ô bên trái, còn trạng thái ở cột đầu chỉ có thể đến từ ô phía trên. Do đó hàng đầu $i = 0$ và cột đầu $j = 0$ là các điều kiện biên.

Như hình dưới, vì mỗi ô chuyển từ ô bên trái và ô phía trên, chúng ta duyệt ma trận bằng vòng lặp ngoài theo hàng và vòng lặp trong theo cột.

![Điều kiện biên và thứ tự chuyển trạng thái](dp_solution_pipeline.assets/min_path_sum_solution_initial_state.png)

!!! note

    Trong quy hoạch động, điều kiện biên dùng để khởi tạo bảng $dp$; trong tìm kiếm, chúng dùng để cắt tỉa.

    Thứ tự chuyển trạng thái phải bảo đảm rằng khi tính lời giải bài toán hiện tại, mọi bài toán con nhỏ hơn mà nó phụ thuộc đã được tính đúng.

Từ phân tích trên có thể viết trực tiếp mã quy hoạch động. Tuy nhiên, phân rã bài toán là cách suy nghĩ từ trên xuống, nên thứ tự “tìm kiếm vét cạn $\rightarrow$ ghi nhớ $\rightarrow$ quy hoạch động” thường tự nhiên hơn.

### Phương pháp 1: Tìm kiếm vét cạn

Bắt đầu từ trạng thái $[i, j]$, chúng ta liên tục phân rã thành các trạng thái nhỏ hơn $[i-1, j]$ và $[i, j-1]$. Hàm đệ quy có các thành phần:

- **Tham số đệ quy**: trạng thái $[i, j]$.
- **Giá trị trả về**: tổng đường đi nhỏ nhất từ $[0, 0]$ tới $[i, j]$, tức $dp[i, j]$.
- **Điều kiện dừng**: khi $i = 0$ và $j = 0$, trả về chi phí $grid[0, 0]$.
- **Cắt tỉa**: khi $i < 0$ hoặc $j < 0$, chỉ số vượt biên; trả về chi phí $+\infty$ để biểu diễn trạng thái không khả thi.

Mã triển khai chính thức:

```python
# Mã DFS tổng đường đi nhỏ nhất 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình dưới là cây đệ quy có gốc $dp[2, 1]$. Trong cây có nhiều bài toán con chồng lặp và số lượng của chúng tăng nhanh khi kích thước lưới `grid` lớn hơn.

Về bản chất, nguyên nhân của bài toán con chồng lặp là: **có nhiều đường khác nhau từ góc trên trái tới cùng một ô**.

![Cây đệ quy của tìm kiếm vét cạn](dp_solution_pipeline.assets/min_path_sum_dfs.png)

Mỗi trạng thái có hai lựa chọn đi xuống và sang phải. Tổng số bước từ góc trên trái đến góc dưới phải là $m + n - 2$, nên độ phức tạp thời gian trong trường hợp xấu nhất là $O(2^{m + n})$, trong đó $n$ và $m$ lần lượt là số hàng và số cột. Ước lượng này không xét việc gần biên lưới chỉ còn một lựa chọn, vì vậy số đường thực tế nhỏ hơn đôi chút.

### Phương pháp 2: Ghi nhớ

Chúng ta tạo danh sách ghi nhớ `mem` có cùng kích thước với `grid`, dùng nó để lưu lời giải bài toán con và cắt tỉa phép tính lặp:

```python
# Mã tổng đường đi nhỏ nhất có ghi nhớ 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Như hình dưới, sau khi ghi nhớ, mỗi lời giải bài toán con chỉ cần tính một lần. Vì vậy độ phức tạp thời gian phụ thuộc tổng số trạng thái, tức kích thước lưới $O(nm)$.

![Cây đệ quy sau khi ghi nhớ](dp_solution_pipeline.assets/min_path_sum_dfs_mem.png)

### Phương pháp 3: Quy hoạch động

Triển khai lời giải quy hoạch động bằng vòng lặp như sau:

```python
# Mã quy hoạch động tổng đường đi nhỏ nhất 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Chuỗi hình dưới mô tả quá trình chuyển trạng thái. Thuật toán duyệt toàn bộ lưới nên **độ phức tạp thời gian là $O(nm)$**.

Mảng `dp` có kích thước $n \times m$, vì vậy **độ phức tạp không gian là $O(nm)$**.

=== "<1>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 1](dp_solution_pipeline.assets/min_path_sum_dp_step1.png)

=== "<2>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 2](dp_solution_pipeline.assets/min_path_sum_dp_step2.png)

=== "<3>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 3](dp_solution_pipeline.assets/min_path_sum_dp_step3.png)

=== "<4>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 4](dp_solution_pipeline.assets/min_path_sum_dp_step4.png)

=== "<5>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 5](dp_solution_pipeline.assets/min_path_sum_dp_step5.png)

=== "<6>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 6](dp_solution_pipeline.assets/min_path_sum_dp_step6.png)

=== "<7>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 7](dp_solution_pipeline.assets/min_path_sum_dp_step7.png)

=== "<8>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 8](dp_solution_pipeline.assets/min_path_sum_dp_step8.png)

=== "<9>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 9](dp_solution_pipeline.assets/min_path_sum_dp_step9.png)

=== "<10>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 10](dp_solution_pipeline.assets/min_path_sum_dp_step10.png)

=== "<11>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 11](dp_solution_pipeline.assets/min_path_sum_dp_step11.png)

=== "<12>"
    ![Quy hoạch động tổng đường đi nhỏ nhất, bước 12](dp_solution_pipeline.assets/min_path_sum_dp_step12.png)

### Tối ưu không gian

Vì mỗi ô chỉ phụ thuộc vào ô bên trái và ô phía trên, chúng ta có thể dùng mảng một hàng để biểu diễn bảng $dp$.

Lưu ý rằng mảng `dp` chỉ biểu diễn trạng thái của một hàng, nên không thể khởi tạo trước toàn bộ trạng thái ở cột đầu; thay vào đó phải cập nhật cột đầu khi duyệt từng hàng:

```python
# Mã tổng đường đi nhỏ nhất tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```
