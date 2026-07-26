# Duyệt đồ thị

Cây biểu diễn quan hệ một–nhiều, còn đồ thị có độ tự do cao hơn và có thể biểu diễn mọi quan hệ nhiều–nhiều. Vì vậy cây có thể được xem là trường hợp đặc biệt của đồ thị. **Phép duyệt cây cũng là một trường hợp đặc biệt của phép duyệt đồ thị.**

Cả cây và đồ thị đều cần thuật toán tìm kiếm để thực hiện phép duyệt. Duyệt đồ thị cũng được chia thành hai loại: <u>tìm kiếm theo chiều rộng</u> và <u>tìm kiếm theo chiều sâu</u>.

## Tìm kiếm theo chiều rộng

**Tìm kiếm theo chiều rộng (BFS) đi từ gần đến xa: bắt đầu từ một đỉnh, luôn thăm các đỉnh gần nhất trước rồi mở rộng ra ngoài theo từng lớp.** Trong hình, từ đỉnh trên bên trái, trước tiên thăm mọi đỉnh kề với nó, sau đó tiếp tục với các đỉnh kề của đỉnh kế tiếp cho đến khi toàn bộ đồ thị đã được thăm.

![Tìm kiếm theo chiều rộng trên đồ thị](graph_traversal.assets/graph_bfs.png)

### Cài đặt thuật toán

BFS thường dùng một hàng đợi. Tính chất vào trước ra trước của hàng đợi khớp với ý tưởng đi từ gần đến xa.

1. Đưa đỉnh bắt đầu `startVet` vào hàng đợi và bắt đầu vòng lặp.
2. Trong mỗi vòng, lấy đỉnh ở đầu hàng đợi, ghi nhận nó đã được thăm, rồi thêm mọi đỉnh kề chưa thăm vào cuối hàng đợi.
3. Lặp bước `2.` cho đến khi không còn đỉnh cần thăm.

Để không đi lại một đỉnh, dùng tập băm `visited` ghi lại các đỉnh đã được thăm.

!!! tip

    Có thể xem tập băm là bảng băm chỉ lưu `key` mà không lưu `value`. Các thao tác chèn, xóa, tra cứu và cập nhật `key` tốn $O(1)$. Vì mỗi `key` là duy nhất, tập băm thường được dùng để loại bỏ dữ liệu trùng lặp.

```python
# Mã BFS chính thức được chèn từ nguồn đã khóa.
```

Mã tương đối trừu tượng; hãy đối chiếu từng trạng thái dưới đây với nội dung hàng đợi và tập `visited`.

**Bước 1**

![BFS bước 1](graph_traversal.assets/graph_bfs_step1.png)

**Bước 2**

![BFS bước 2](graph_traversal.assets/graph_bfs_step2.png)

**Bước 3**

![BFS bước 3](graph_traversal.assets/graph_bfs_step3.png)

**Bước 4**

![BFS bước 4](graph_traversal.assets/graph_bfs_step4.png)

**Bước 5**

![BFS bước 5](graph_traversal.assets/graph_bfs_step5.png)

**Bước 6**

![BFS bước 6](graph_traversal.assets/graph_bfs_step6.png)

**Bước 7**

![BFS bước 7](graph_traversal.assets/graph_bfs_step7.png)

**Bước 8**

![BFS bước 8](graph_traversal.assets/graph_bfs_step8.png)

**Bước 9**

![BFS bước 9](graph_traversal.assets/graph_bfs_step9.png)

**Bước 10**

![BFS bước 10](graph_traversal.assets/graph_bfs_step10.png)

**Bước 11**

![BFS bước 11](graph_traversal.assets/graph_bfs_step11.png)

!!! question "Thứ tự duyệt theo chiều rộng có duy nhất không?"

    Không. BFS chỉ yêu cầu đi theo thứ tự từ gần đến xa; **thứ tự của các đỉnh có cùng khoảng cách có thể thay đổi tùy ý.** Trong hình, thứ tự thăm đỉnh $1$ và $3$ có thể đổi chỗ; thứ tự của các đỉnh $2$, $4$ và $6$ cũng vậy.

### Phân tích độ phức tạp

**Độ phức tạp thời gian**: Mọi đỉnh được đưa vào và lấy khỏi hàng đợi một lần, tốn $O(|V|)$. Khi duyệt các đỉnh kề trong đồ thị vô hướng, mọi cạnh được thăm $2$ lần, tốn $O(2|E|)$. Tổng cộng là $O(|V| + |E|)$.

**Độ phức tạp không gian**: Danh sách `res`, tập `visited` và hàng đợi `que` chứa tối đa $|V|$ đỉnh, nên dùng $O(|V|)$ không gian.

## Tìm kiếm theo chiều sâu

**Tìm kiếm theo chiều sâu (DFS) ưu tiên đi xa nhất có thể trên một đường, sau đó quay lui khi không còn lối đi.** Trong hình, từ đỉnh trên bên trái, thăm một đỉnh kề của đỉnh hiện tại và tiếp tục cho đến ngõ cụt; sau đó quay lại điểm rẽ gần nhất để thử một hướng khác. Quá trình lặp lại cho đến khi mọi đỉnh đã được thăm.

![Tìm kiếm theo chiều sâu trên đồ thị](graph_traversal.assets/graph_dfs.png)

### Cài đặt thuật toán

Mô hình “đi sâu nhất rồi quay lại” thường được cài đặt bằng đệ quy. Giống BFS, DFS cũng cần tập băm `visited` để ghi các đỉnh đã thăm và tránh đi vòng quanh chu trình.

```python
# Mã DFS chính thức được chèn từ nguồn đã khóa.
```

Trong các hình dưới đây:

- **Đường nét đứt thẳng biểu thị đệ quy đi xuống**, tức một lời gọi mới bắt đầu để thăm đỉnh mới.
- **Đường nét đứt cong biểu thị quay lui đi lên**, tức lời gọi đệ quy đã hoàn tất và trả về nơi gọi.

Hãy kết hợp hình với mã và mô phỏng toàn bộ tiến trình: thời điểm từng lời gọi bắt đầu, đỉnh nào được đánh dấu, và khi nào lời gọi trả về.

**Bước 1**

![DFS bước 1](graph_traversal.assets/graph_dfs_step1.png)

**Bước 2**

![DFS bước 2](graph_traversal.assets/graph_dfs_step2.png)

**Bước 3**

![DFS bước 3](graph_traversal.assets/graph_dfs_step3.png)

**Bước 4**

![DFS bước 4](graph_traversal.assets/graph_dfs_step4.png)

**Bước 5**

![DFS bước 5](graph_traversal.assets/graph_dfs_step5.png)

**Bước 6**

![DFS bước 6](graph_traversal.assets/graph_dfs_step6.png)

**Bước 7**

![DFS bước 7](graph_traversal.assets/graph_dfs_step7.png)

**Bước 8**

![DFS bước 8](graph_traversal.assets/graph_dfs_step8.png)

**Bước 9**

![DFS bước 9](graph_traversal.assets/graph_dfs_step9.png)

**Bước 10**

![DFS bước 10](graph_traversal.assets/graph_dfs_step10.png)

**Bước 11**

![DFS bước 11](graph_traversal.assets/graph_dfs_step11.png)

!!! question "Thứ tự duyệt theo chiều sâu có duy nhất không?"

    Không. Với một đỉnh, có thể chọn bất kỳ hướng chưa thăm nào trước; tức thứ tự của các đỉnh kề có thể sắp xếp lại mà vẫn là DFS.

    Lấy duyệt cây làm ví dụ: “gốc $\rightarrow$ trái $\rightarrow$ phải”, “trái $\rightarrow$ gốc $\rightarrow$ phải”, và “trái $\rightarrow$ phải $\rightarrow$ gốc” lần lượt là duyệt tiền thứ tự, trung thứ tự và hậu thứ tự. Chúng có ưu tiên khác nhau nhưng đều thuộc tìm kiếm theo chiều sâu.

### Phân tích độ phức tạp

**Độ phức tạp thời gian**: Mọi đỉnh được thăm $1$ lần, tốn $O(|V|)$; mọi cạnh được thăm $2$ lần, tốn $O(2|E|)$. Tổng cộng là $O(|V| + |E|)$.

**Độ phức tạp không gian**: Danh sách `res` và tập `visited` chứa tối đa $|V|$ đỉnh; độ sâu đệ quy tối đa cũng là $|V|$, nên dùng $O(|V|)$ không gian.
