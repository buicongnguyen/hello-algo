# Bài toán ba lô 0-1

Bài toán ba lô là ví dụ nhập môn rất phù hợp cho quy hoạch động và cũng là một trong những dạng bài phổ biến nhất. Nó có nhiều biến thể như ba lô 0-1, ba lô vô hạn và ba lô nhiều bản.

Trong phần này, chúng ta giải biến thể phổ biến nhất là ba lô 0-1.

!!! question

    Cho $n$ vật phẩm và một ba lô có sức chứa $cap$. Khối lượng và giá trị của vật phẩm thứ $i$ lần lượt là $wgt[i-1]$ và $val[i-1]$. Mỗi vật phẩm được chọn nhiều nhất một lần. Tổng giá trị lớn nhất có thể đặt vào ba lô mà không vượt sức chứa là bao nhiêu?

Quan sát hình dưới. Số thứ tự vật phẩm $i$ bắt đầu từ $1$, còn chỉ số mảng bắt đầu từ $0$, nên vật phẩm $i$ tương ứng khối lượng $wgt[i-1]$ và giá trị $val[i-1]$.

![Dữ liệu ví dụ của bài toán ba lô 0-1](knapsack_problem.assets/knapsack_example.png)

Có thể xem bài toán ba lô 0-1 là quá trình gồm $n$ lượt quyết định. Với mỗi vật phẩm có hai lựa chọn: không cho vào hoặc cho vào ba lô. Vì vậy bài toán thỏa mô hình cây quyết định.

Mục tiêu là tìm “giá trị lớn nhất có thể đặt trong giới hạn sức chứa”, nên đây rất có thể là bài toán quy hoạch động.

**Bước 1: Xét quyết định ở mỗi lượt, định nghĩa trạng thái và lập bảng $dp$**

Với mỗi vật phẩm, nếu không cho vào thì sức chứa còn lại không đổi; nếu cho vào thì sức chứa còn lại giảm. Từ đó định nghĩa trạng thái bằng số thứ tự vật phẩm hiện tại $i$ và sức chứa $c$, ký hiệu $[i, c]$.

Trạng thái $[i, c]$ tương ứng bài toán con: **giá trị lớn nhất khi xét $i$ vật phẩm đầu tiên với ba lô sức chứa $c$**, ký hiệu $dp[i, c]$.

Mục tiêu là $dp[n, cap]$, vì vậy cần bảng $dp$ hai chiều kích thước $(n+1) \times (cap+1)$.

**Bước 2: Xác định cấu trúc con tối ưu rồi suy ra phương trình chuyển trạng thái**

Sau khi quyết định với vật phẩm $i$, phần còn lại là bài toán con của $i-1$ vật phẩm đầu tiên, gồm hai trường hợp:

- **Không cho vật phẩm $i$ vào**: sức chứa không đổi, trạng thái chuyển thành $[i-1, c]$.
- **Cho vật phẩm $i$ vào**: sức chứa giảm $wgt[i-1]$, giá trị tăng $val[i-1]$, trạng thái chuyển thành $[i-1, c-wgt[i-1]]$.

Cấu trúc con tối ưu là: **giá trị lớn nhất $dp[i, c]$ bằng giá trị lớn hơn giữa phương án không chọn và chọn vật phẩm $i$**. Phương trình chuyển trạng thái:

$$
dp[i, c] = \max(dp[i-1, c], dp[i-1, c - wgt[i-1]] + val[i-1])
$$

Nếu khối lượng vật phẩm hiện tại $wgt[i - 1]$ lớn hơn sức chứa còn lại $c$, lựa chọn duy nhất là không cho vật phẩm đó vào.

**Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái**

Khi không có vật phẩm hoặc sức chứa bằng $0$, giá trị lớn nhất là $0$. Do đó cột đầu $dp[i, 0]$ và hàng đầu $dp[0, c]$ đều bằng $0$.

Trạng thái hiện tại $[i, c]$ chuyển từ trạng thái phía trên $[i-1, c]$ và trạng thái phía trên bên trái $[i-1, c-wgt[i-1]]$. Vì vậy có thể dùng hai vòng lặp lồng nhau để duyệt toàn bộ bảng $dp$ theo chiều thuận.

Tiếp theo, chúng ta lần lượt triển khai tìm kiếm vét cạn, ghi nhớ và quy hoạch động.

### Phương pháp 1: Tìm kiếm vét cạn

Mã tìm kiếm gồm:

- **Tham số đệ quy**: trạng thái $[i, c]$.
- **Giá trị trả về**: lời giải bài toán con $dp[i, c]$.
- **Điều kiện dừng**: khi không còn vật phẩm ($i = 0$) hoặc sức chứa còn lại bằng $0$, dừng đệ quy và trả về $0$.
- **Cắt tỉa**: nếu khối lượng vật phẩm hiện tại vượt sức chứa còn lại, chỉ có thể không chọn nó.

```python
# Mã DFS ba lô 0-1 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Như hình dưới, mỗi vật phẩm sinh hai nhánh tìm kiếm loại và chọn, nên độ phức tạp thời gian là $O(2^n)$.

Cây đệ quy cho thấy các bài toán con chồng lặp như $dp[1, 10]$. Khi số vật phẩm và sức chứa lớn, đặc biệt khi nhiều vật phẩm có cùng khối lượng, số bài toán con bị lặp tăng đáng kể.

![Cây đệ quy tìm kiếm vét cạn của ba lô 0-1](knapsack_problem.assets/knapsack_dfs.png)

### Phương pháp 2: Ghi nhớ

Để mỗi bài toán con chỉ được tính một lần, dùng danh sách `mem` ghi lời giải, trong đó `mem[i][c]` tương ứng $dp[i, c]$.

Sau khi ghi nhớ, **độ phức tạp thời gian phụ thuộc vào số bài toán con**, tức $O(n \times cap)$. Mã chính thức:

```python
# Mã ba lô 0-1 có ghi nhớ 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình sau cho thấy các nhánh tìm kiếm được cắt bỏ nhờ ghi nhớ.

![Cây đệ quy ghi nhớ của ba lô 0-1](knapsack_problem.assets/knapsack_dfs_mem.png)

### Phương pháp 3: Quy hoạch động

Quy hoạch động về bản chất là quá trình điền bảng $dp$ theo các chuyển trạng thái:

```python
# Mã quy hoạch động ba lô 0-1 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Như chuỗi hình dưới, cả độ phức tạp thời gian và không gian đều được quyết định bởi kích thước mảng `dp`, tức $O(n \times cap)$.

=== "<1>"
    ![Quy hoạch động ba lô 0-1, bước 1](knapsack_problem.assets/knapsack_dp_step1.png)

=== "<2>"
    ![Quy hoạch động ba lô 0-1, bước 2](knapsack_problem.assets/knapsack_dp_step2.png)

=== "<3>"
    ![Quy hoạch động ba lô 0-1, bước 3](knapsack_problem.assets/knapsack_dp_step3.png)

=== "<4>"
    ![Quy hoạch động ba lô 0-1, bước 4](knapsack_problem.assets/knapsack_dp_step4.png)

=== "<5>"
    ![Quy hoạch động ba lô 0-1, bước 5](knapsack_problem.assets/knapsack_dp_step5.png)

=== "<6>"
    ![Quy hoạch động ba lô 0-1, bước 6](knapsack_problem.assets/knapsack_dp_step6.png)

=== "<7>"
    ![Quy hoạch động ba lô 0-1, bước 7](knapsack_problem.assets/knapsack_dp_step7.png)

=== "<8>"
    ![Quy hoạch động ba lô 0-1, bước 8](knapsack_problem.assets/knapsack_dp_step8.png)

=== "<9>"
    ![Quy hoạch động ba lô 0-1, bước 9](knapsack_problem.assets/knapsack_dp_step9.png)

=== "<10>"
    ![Quy hoạch động ba lô 0-1, bước 10](knapsack_problem.assets/knapsack_dp_step10.png)

=== "<11>"
    ![Quy hoạch động ba lô 0-1, bước 11](knapsack_problem.assets/knapsack_dp_step11.png)

=== "<12>"
    ![Quy hoạch động ba lô 0-1, bước 12](knapsack_problem.assets/knapsack_dp_step12.png)

=== "<13>"
    ![Quy hoạch động ba lô 0-1, bước 13](knapsack_problem.assets/knapsack_dp_step13.png)

=== "<14>"
    ![Quy hoạch động ba lô 0-1, bước 14](knapsack_problem.assets/knapsack_dp_step14.png)

### Tối ưu không gian

Vì mỗi trạng thái chỉ liên quan tới trạng thái ở hàng phía trên, có thể dùng hai mảng cuộn tiến để giảm độ phức tạp không gian từ $O(n \times cap)$ xuống $O(cap)$.

Liệu chỉ dùng một mảng có được không? Mỗi trạng thái chuyển từ ô ngay phía trên hoặc ô phía trên bên trái. Nếu chỉ có một mảng, khi bắt đầu duyệt hàng $i$, mảng ấy vẫn đang lưu trạng thái của hàng $i-1$.

- Nếu duyệt thuận, khi tới $dp[i, j]$, các giá trị phía trên bên trái $dp[i-1, 1]$ ~ $dp[i-1, j-1]$ có thể đã bị ghi đè, khiến chuyển trạng thái sai.
- Nếu duyệt ngược, không xảy ra ghi đè và chuyển trạng thái vẫn chính xác.

Chuỗi hình dưới minh họa việc chuyển từ hàng $i = 1$ sang hàng $i = 2$ bằng một mảng. Hãy chú ý khác biệt giữa duyệt thuận và duyệt ngược.

=== "<1>"
    ![Tối ưu không gian ba lô 0-1, bước 1](knapsack_problem.assets/knapsack_dp_comp_step1.png)

=== "<2>"
    ![Tối ưu không gian ba lô 0-1, bước 2](knapsack_problem.assets/knapsack_dp_comp_step2.png)

=== "<3>"
    ![Tối ưu không gian ba lô 0-1, bước 3](knapsack_problem.assets/knapsack_dp_comp_step3.png)

=== "<4>"
    ![Tối ưu không gian ba lô 0-1, bước 4](knapsack_problem.assets/knapsack_dp_comp_step4.png)

=== "<5>"
    ![Tối ưu không gian ba lô 0-1, bước 5](knapsack_problem.assets/knapsack_dp_comp_step5.png)

=== "<6>"
    ![Tối ưu không gian ba lô 0-1, bước 6](knapsack_problem.assets/knapsack_dp_comp_step6.png)

Trong mã, chỉ cần bỏ chiều thứ nhất $i$ của mảng `dp` và đổi vòng lặp trong thành duyệt ngược:

```python
# Mã ba lô 0-1 tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```
