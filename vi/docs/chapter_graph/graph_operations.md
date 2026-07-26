# Các thao tác cơ bản trên đồ thị

Thao tác đồ thị có thể chia thành thao tác trên cạnh và thao tác trên đỉnh. Cách cài đặt phụ thuộc vào việc đồ thị được biểu diễn bằng ma trận kề hay danh sách kề.

## Cài đặt dựa trên ma trận kề

Với đồ thị vô hướng có $n$ đỉnh, các thao tác được thực hiện như sau.

- **Thêm hoặc xóa cạnh**: Sửa trực tiếp ô tương ứng trong ma trận kề, tốn $O(1)$. Vì đồ thị vô hướng, phải cập nhật đồng thời cả hai chiều.
- **Thêm đỉnh**: Thêm một hàng và một cột ở cuối ma trận rồi điền toàn bộ bằng $0$, tốn $O(n)$.
- **Xóa đỉnh**: Xóa một hàng và một cột. Trường hợp xấu nhất là xóa hàng và cột đầu, phải dịch $(n-1)^2$ phần tử lên trên và sang trái, tốn $O(n^2)$.
- **Khởi tạo**: Với $n$ đỉnh, tạo danh sách `vertices` dài $n$ trong $O(n)$; tạo ma trận `adjMat` kích thước $n \times n$ trong $O(n^2)$.

**Bước 1 · Khởi tạo**

![Khởi tạo ma trận kề](graph_operations.assets/adjacency_matrix_step1_initialization.png)

**Bước 2 · Thêm cạnh**

![Thêm cạnh trong ma trận kề](graph_operations.assets/adjacency_matrix_step2_add_edge.png)

**Bước 3 · Xóa cạnh**

![Xóa cạnh trong ma trận kề](graph_operations.assets/adjacency_matrix_step3_remove_edge.png)

**Bước 4 · Thêm đỉnh**

![Thêm đỉnh trong ma trận kề](graph_operations.assets/adjacency_matrix_step4_add_vertex.png)

**Bước 5 · Xóa đỉnh**

![Xóa đỉnh trong ma trận kề](graph_operations.assets/adjacency_matrix_step5_remove_vertex.png)

Mã chính thức đa ngôn ngữ cho đồ thị dùng ma trận kề như sau.

```python
# Cài đặt ma trận kề chính thức được chèn từ nguồn đã khóa.
```

## Cài đặt dựa trên danh sách kề

Với đồ thị vô hướng có tổng cộng $n$ đỉnh và $m$ cạnh, các thao tác được thực hiện như sau.

- **Thêm cạnh**: Thêm cạnh vào cuối danh sách của đỉnh tương ứng, tốn $O(1)$. Với đồ thị vô hướng, phải thêm cạnh ở cả hai chiều.
- **Xóa cạnh**: Tìm và xóa cạnh chỉ định trong danh sách của đỉnh, tốn $O(m)$. Cả hai chiều đều phải được xóa.
- **Thêm đỉnh**: Thêm một danh sách mới vào danh sách kề với đỉnh mới làm nút đầu, tốn $O(1)$.
- **Xóa đỉnh**: Duyệt toàn bộ danh sách kề và xóa mọi cạnh chứa đỉnh chỉ định, tốn $O(n + m)$.
- **Khởi tạo**: Tạo $n$ đỉnh và $2m$ cạnh trong danh sách kề, tốn $O(n + m)$.

**Bước 1 · Khởi tạo**

![Khởi tạo danh sách kề](graph_operations.assets/adjacency_list_step1_initialization.png)

**Bước 2 · Thêm cạnh**

![Thêm cạnh trong danh sách kề](graph_operations.assets/adjacency_list_step2_add_edge.png)

**Bước 3 · Xóa cạnh**

![Xóa cạnh trong danh sách kề](graph_operations.assets/adjacency_list_step3_remove_edge.png)

**Bước 4 · Thêm đỉnh**

![Thêm đỉnh trong danh sách kề](graph_operations.assets/adjacency_list_step4_add_vertex.png)

**Bước 5 · Xóa đỉnh**

![Xóa đỉnh trong danh sách kề](graph_operations.assets/adjacency_list_step5_remove_vertex.png)

Cài đặt thực tế khác hình minh họa ở hai điểm.

- Để thêm và xóa đỉnh thuận tiện, đồng thời làm mã ngắn gọn, cài đặt dùng danh sách động thay cho danh sách liên kết.
- Một bảng băm lưu danh sách kề; `key` là thực thể đỉnh và `value` là danh sách các đỉnh kề với nó.

Lớp `Vertex` được dùng để biểu diễn đỉnh. Nếu dùng chỉ số danh sách để phân biệt đỉnh giống ma trận kề, khi xóa đỉnh ở chỉ số $i$ sẽ phải duyệt toàn bộ danh sách kề và giảm mọi chỉ số lớn hơn `i` đi `1`, rất kém hiệu quả. Khi mỗi đỉnh là một thực thể `Vertex` duy nhất, xóa một đỉnh không yêu cầu sửa định danh của các đỉnh còn lại.

```python
# Cài đặt danh sách kề chính thức được chèn từ nguồn đã khóa.
```

## So sánh hiệu suất

Giả sử đồ thị có $n$ đỉnh và $m$ cạnh. Bảng dưới so sánh hiệu quả thời gian và không gian của ma trận kề, danh sách kề dùng danh sách liên kết, và danh sách kề trong đó mỗi danh sách được thay bằng bảng băm.

| Thao tác | Ma trận kề | Danh sách kề (danh sách liên kết) | Danh sách kề (bảng băm) |
| --- | --- | --- | --- |
| Kiểm tra hai đỉnh kề nhau | $O(1)$ | $O(n)$ | $O(1)$ |
| Thêm cạnh | $O(1)$ | $O(1)$ | $O(1)$ |
| Xóa cạnh | $O(1)$ | $O(n)$ | $O(1)$ |
| Thêm đỉnh | $O(n)$ | $O(1)$ | $O(1)$ |
| Xóa đỉnh | $O(n^2)$ | $O(n + m)$ | $O(n)$ |
| Không gian bộ nhớ | $O(n^2)$ | $O(n + m)$ | $O(n + m)$ |

Nhìn vào bảng, danh sách kề dùng bảng băm có vẻ tốt nhất về cả thời gian lẫn không gian. Tuy nhiên trong thực tế, thao tác cạnh trong ma trận kề chỉ cần một lần truy cập hoặc gán mảng nên có hằng số rất nhỏ. Tổng quát, ma trận kề thể hiện nguyên tắc **đổi không gian lấy thời gian**, còn danh sách kề thể hiện **đổi thời gian lấy không gian**.
