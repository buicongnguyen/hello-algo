# Duyệt cây nhị phân

Xét theo cấu trúc vật lý, cây được xây dựng từ các nút liên kết bằng tham chiếu. Vì vậy, quá trình duyệt phải lần theo các tham chiếu để thăm từng nút. Tuy nhiên, cây là cấu trúc dữ liệu phi tuyến nên cách duyệt phức tạp hơn danh sách liên kết và cần đến các chiến lược tìm kiếm.

Bốn cách duyệt cây nhị phân thường dùng là duyệt theo mức, duyệt tiền thứ tự, duyệt trung thứ tự và duyệt hậu thứ tự.

## Duyệt theo mức

<u>Duyệt theo mức</u> đi qua cây từ trên xuống dưới, hết mức này đến mức kế tiếp. Trong cùng một mức, các nút được thăm từ trái sang phải.

Về bản chất, đây là <u>duyệt theo chiều rộng</u>, còn gọi là <u>tìm kiếm theo chiều rộng (BFS)</u>, vì biên tìm kiếm mở rộng đồng thời theo từng lớp.

![Duyệt cây nhị phân theo mức](binary_tree_traversal.assets/binary_tree_bfs.png)

### Cài đặt bằng mã

BFS thường được cài đặt bằng hàng đợi. Hàng đợi tuân theo nguyên tắc “vào trước, ra trước”, còn BFS xử lý các nút theo thứ tự chúng được phát hiện theo từng lớp; hai cơ chế này khớp tự nhiên với nhau.

Ở đầu mỗi vòng, lấy nút ở đầu hàng đợi. Sau khi ghi nhận giá trị của nút đó, đưa con trái rồi con phải (nếu tồn tại) vào cuối hàng đợi. Nhờ vậy, mọi nút của mức hiện tại luôn được xử lý trước các nút của mức tiếp theo.

```python
# Mã BFS chính thức được chèn từ nguồn đã khóa.
```

### Phân tích độ phức tạp

- **Độ phức tạp thời gian là $O(n)$**: mỗi nút được đưa vào và lấy khỏi hàng đợi đúng một lần, nên tổng thời gian là $O(n)$, với $n$ là số nút.
- **Độ phức tạp không gian là $O(n)$**: trong trường hợp xấu nhất là cây nhị phân đầy đủ, ngay trước khi duyệt mức cuối, hàng đợi có thể đồng thời chứa tối đa $(n + 1) / 2$ nút và chiếm $O(n)$ không gian.

## Duyệt tiền thứ tự, trung thứ tự và hậu thứ tự

Ba cách duyệt này đều thuộc <u>duyệt theo chiều sâu</u>, còn gọi là <u>tìm kiếm theo chiều sâu (DFS)</u>. DFS đi sâu nhất có thể trên một nhánh, sau đó quay lui để xử lý nhánh khác.

Hình dưới minh họa DFS trên cây nhị phân. Có thể tưởng tượng **đi một vòng quanh đường biên của cây**: tại mỗi nút có ba thời điểm—trước khi vào cây con trái, giữa hai cây con, và sau khi rời cây con phải—tương ứng với tiền thứ tự, trung thứ tự và hậu thứ tự.

![Duyệt tiền thứ tự, trung thứ tự và hậu thứ tự](binary_tree_traversal.assets/binary_tree_dfs.png)

### Cài đặt bằng mã

DFS thường được mô tả ngắn gọn bằng đệ quy. Tiền thứ tự xử lý “gốc–trái–phải”, trung thứ tự xử lý “trái–gốc–phải”, còn hậu thứ tự xử lý “trái–phải–gốc”. Vị trí của thao tác ghi nhận nút trong hàm đệ quy quyết định thứ tự thu được.

```python
# Mã DFS chính thức được chèn từ nguồn đã khóa.
```

!!! tip

    Tìm kiếm theo chiều sâu cũng có thể cài đặt bằng vòng lặp với một ngăn xếp tường minh. Bản đệ quy thường dễ đọc hơn, còn bản lặp cho phép kiểm soát trực tiếp bộ nhớ ngăn xếp.

Quá trình đệ quy của duyệt tiền thứ tự gồm hai pha ngược nhau.

1. **Đi xuống**: tạo lời gọi đệ quy mới và thăm nút kế tiếp.
2. **Quay về**: lời gọi hiện tại kết thúc, nghĩa là nút và phần cây thuộc phạm vi của lời gọi đó đã được xử lý.

**Bước 1**

![Bước 1 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step1.png)

**Bước 2**

![Bước 2 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step2.png)

**Bước 3**

![Bước 3 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step3.png)

**Bước 4**

![Bước 4 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step4.png)

**Bước 5**

![Bước 5 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step5.png)

**Bước 6**

![Bước 6 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step6.png)

**Bước 7**

![Bước 7 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step7.png)

**Bước 8**

![Bước 8 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step8.png)

**Bước 9**

![Bước 9 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step9.png)

**Bước 10**

![Bước 10 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step10.png)

**Bước 11**

![Bước 11 của duyệt tiền thứ tự](binary_tree_traversal.assets/preorder_step11.png)

### Phân tích độ phức tạp

- **Độ phức tạp thời gian là $O(n)$**: mỗi nút được thăm đúng một lần nên cần $O(n)$ thời gian.
- **Độ phức tạp không gian là $O(n)$**: trong trường hợp xấu nhất, cây suy biến thành danh sách liên kết, độ sâu đệ quy đạt $n$ và các khung ngăn xếp chiếm $O(n)$ không gian.
