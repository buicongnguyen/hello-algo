# Cây tìm kiếm nhị phân

<u>Cây tìm kiếm nhị phân</u> thỏa mãn đồng thời hai điều kiện sau.

1. Đối với nút gốc, mọi giá trị trong cây con trái $<$ giá trị gốc $<$ mọi giá trị trong cây con phải.
2. Cây con trái và cây con phải của mọi nút cũng là cây tìm kiếm nhị phân, tức tiếp tục thỏa điều kiện `1.` một cách đệ quy.

![Cây tìm kiếm nhị phân](binary_search_tree.assets/binary_search_tree.png)

## Các thao tác trên cây tìm kiếm nhị phân

Cây được đóng gói trong lớp `BinarySearchTree`, với biến thành viên `root` tham chiếu nút gốc. Mọi thao tác đều dựa vào quan hệ thứ tự để chỉ đi xuống một trong hai cây con tại mỗi bước.

### Tìm một nút

Với giá trị đích `num`, bắt đầu tại `root` bằng nút hiện tại `cur` rồi lặp:

- Nếu `cur.val < num`, đích chỉ có thể nằm trong cây con phải, nên đặt `cur = cur.right`.
- Nếu `cur.val > num`, đích chỉ có thể nằm trong cây con trái, nên đặt `cur = cur.left`.
- Nếu `cur.val = num`, đã tìm thấy nút và có thể trả về ngay.

**Bước 1**

![Bước 1 tìm nút trong cây tìm kiếm nhị phân](binary_search_tree.assets/bst_search_step1.png)

**Bước 2**

![Bước 2 tìm nút trong cây tìm kiếm nhị phân](binary_search_tree.assets/bst_search_step2.png)

**Bước 3**

![Bước 3 tìm nút trong cây tìm kiếm nhị phân](binary_search_tree.assets/bst_search_step3.png)

**Bước 4**

![Bước 4 tìm nút trong cây tìm kiếm nhị phân](binary_search_tree.assets/bst_search_step4.png)

Nguyên lý giống tìm kiếm nhị phân: mỗi lần so sánh loại bỏ một phía của cây. Số vòng lặp không vượt quá chiều cao; nếu cây cân bằng, thao tác tìm kiếm cần $O(\log n)$ thời gian.

```python
# Mã tìm kiếm BST chính thức được chèn từ nguồn đã khóa.
```

### Chèn một nút

Với phần tử `num`, cần bảo toàn quan hệ “cây con trái $<$ gốc $<$ cây con phải”. Quá trình gồm hai bước.

1. **Tìm vị trí chèn**: đi từ gốc xuống như khi tìm kiếm cho tới khi vượt qua nút lá và gặp `None`.
2. **Gắn nút mới**: tạo nút chứa `num`, rồi đặt nó vào vị trí `None` vừa tìm được.

![Chèn một nút vào cây tìm kiếm nhị phân](binary_search_tree.assets/bst_insert.png)

Khi cài đặt cần chú ý:

- Cây trong định nghĩa này không chứa giá trị trùng. Nếu `num` đã tồn tại, bỏ qua thao tác chèn.
- Biến `pre` lưu nút của vòng lặp trước. Khi `cur` trở thành `None`, `pre` chính là nút cha cần nối với nút mới.

```python
# Mã chèn BST chính thức được chèn từ nguồn đã khóa.
```

Tương tự tìm kiếm, chèn một nút vào cây cân bằng cần $O(\log n)$ thời gian.

### Xóa một nút

Trước tiên tìm nút đích, sau đó xóa mà vẫn giữ quan hệ “trái $<$ gốc $<$ phải”. Cách xử lý phụ thuộc số con của nút, tức bậc $0$, bậc $1$ hoặc bậc $2$.

Nếu bậc là $0$, nút là lá và có thể ngắt trực tiếp khỏi nút cha.

![Xóa nút bậc 0 trong cây tìm kiếm nhị phân](binary_search_tree.assets/bst_remove_case1.png)

Nếu bậc là $1$, thay vị trí của nút bị xóa bằng nút con duy nhất của nó.

![Xóa nút bậc 1 trong cây tìm kiếm nhị phân](binary_search_tree.assets/bst_remove_case2.png)

Nếu bậc là $2$, không thể ngắt trực tiếp vì sẽ mất hai cây con. Nút thay thế hợp lệ là **nút nhỏ nhất trong cây con phải hoặc nút lớn nhất trong cây con trái**, bởi cả hai đều bảo toàn thứ tự.

Giả sử chọn nút nhỏ nhất của cây con phải, tức nút kế tiếp trong trung thứ tự:

1. Tìm nút kế tiếp của nút cần xóa trong chuỗi trung thứ tự, ký hiệu `tmp`.
2. Chép giá trị của `tmp` vào nút đích, rồi xóa `tmp` khỏi vị trí cũ. Nút `tmp` không có con trái nên quay về trường hợp đơn giản hơn.

**Bước 1**

![Bước 1 xóa nút bậc 2](binary_search_tree.assets/bst_remove_case3_step1.png)

**Bước 2**

![Bước 2 xóa nút bậc 2](binary_search_tree.assets/bst_remove_case3_step2.png)

**Bước 3**

![Bước 3 xóa nút bậc 2](binary_search_tree.assets/bst_remove_case3_step3.png)

**Bước 4**

![Bước 4 xóa nút bậc 2](binary_search_tree.assets/bst_remove_case3_step4.png)

Xóa cũng cần $O(\log n)$ thời gian trên cây cân bằng: tìm nút cần xóa tốn $O(\log n)$ và tìm nút kế tiếp trung thứ tự tốn tối đa $O(\log n)$.

```python
# Mã xóa BST chính thức được chèn từ nguồn đã khóa.
```

### Duyệt trung thứ tự tạo thứ tự tăng dần

Duyệt trung thứ tự tuân theo “trái $\rightarrow$ gốc $\rightarrow$ phải”, còn BST bảo đảm “con trái $<$ gốc $<$ con phải”. Vì vậy, mỗi lần duyệt luôn nhận giá trị nhỏ tiếp theo: **chuỗi trung thứ tự của BST được sắp tăng dần**.

Tính chất này cho phép lấy toàn bộ dữ liệu đã sắp xếp trong $O(n)$ thời gian mà không phải thực hiện một thuật toán sắp xếp bổ sung.

![Chuỗi trung thứ tự của cây tìm kiếm nhị phân](binary_search_tree.assets/bst_inorder_traversal.png)

## Hiệu suất của cây tìm kiếm nhị phân

So với mảng không sắp xếp, BST cân bằng có hiệu suất ổn định cho tìm, chèn và xóa.

Bảng: So sánh hiệu suất giữa mảng và cây tìm kiếm

| Thao tác | Mảng không sắp xếp | Cây tìm kiếm nhị phân |
| --- | --- | --- |
| Tìm phần tử | $O(n)$ | $O(\log n)$ |
| Chèn phần tử | $O(1)$ | $O(\log n)$ |
| Xóa phần tử | $O(n)$ | $O(\log n)$ |

Trong trường hợp lý tưởng, cây cân bằng nên có thể tìm một nút sau tối đa $O(\log n)$ lần đi xuống. Nhưng chuỗi chèn hoặc xóa không thuận lợi có thể làm cây lệch hoàn toàn, khiến BST suy biến thành danh sách liên kết và mọi thao tác giảm xuống $O(n)$.

![Cây tìm kiếm nhị phân bị suy biến](binary_search_tree.assets/bst_degradation.png)

## Ứng dụng thường gặp

- Làm chỉ mục nhiều tầng trong hệ thống để hỗ trợ tìm kiếm, chèn và xóa hiệu quả.
- Làm cấu trúc nền cho một số thuật toán tìm kiếm và các tập hợp có thứ tự.
- Lưu luồng dữ liệu trong khi vẫn duy trì thứ tự, cho phép truy vấn phần tử nhỏ nhất, lớn nhất hoặc theo khoảng.
