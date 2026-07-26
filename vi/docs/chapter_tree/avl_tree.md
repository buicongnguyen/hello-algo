# Cây AVL *

Sau nhiều lần chèn và xóa, cây tìm kiếm nhị phân có thể suy biến thành danh sách liên kết. Khi đó, độ phức tạp của các thao tác giảm từ $O(\log n)$ xuống $O(n)$.

Hình dưới cho thấy một BST trở nên lệch sau khi xóa hai nút.

![Cây AVL suy biến sau khi xóa nút](avl_tree.assets/avltree_degradation_from_removing_node.png)

Ngay cả một cây hoàn hảo ban đầu cũng có thể nghiêng mạnh sang trái sau khi chèn liên tiếp hai nút, làm đường tìm kiếm dài hơn.

![Cây AVL suy biến sau khi chèn nút](avl_tree.assets/avltree_degradation_from_inserting_node.png)

Năm 1962, G. M. Adelson-Velsky và E. M. Landis đề xuất <u>cây AVL</u>. Cấu trúc này dùng một chuỗi thao tác xoay sau khi chèn hoặc xóa để ngăn cây suy biến, nhờ đó duy trì các thao tác ở $O(\log n)$. AVL đặc biệt hữu ích khi dữ liệu cần tìm kiếm và cập nhật thường xuyên với hiệu suất có thể dự đoán.

## Thuật ngữ thường dùng trong cây AVL

AVL vừa là cây tìm kiếm nhị phân vừa là cây nhị phân cân bằng, nên còn được gọi là <u>cây tìm kiếm nhị phân cân bằng</u>. Nó bảo toàn thứ tự của BST và đồng thời giới hạn chênh lệch chiều cao giữa hai cây con.

### Chiều cao nút

Các thao tác AVL cần đọc chiều cao liên tục, vì vậy lớp nút bổ sung trường `height`.

```python
# Lớp nút AVL chính thức được chèn từ nguồn đã khóa.
```

“Chiều cao nút” là số cạnh từ nút đến lá xa nhất. Chiều cao của nút lá là $0$, còn nút rỗng được quy ước là $-1$. Hai hàm tiện ích sau đọc chiều cao và cập nhật nó từ hai nút con.

```python
# Mã cập nhật chiều cao chính thức được chèn từ nguồn đã khóa.
```

Sau mọi thay đổi liên kết hoặc phép xoay, phải cập nhật chiều cao theo thứ tự từ dưới lên; nếu cập nhật quá sớm, giá trị của nút cha sẽ dựa trên dữ liệu con cũ.

### Hệ số cân bằng

<u>Hệ số cân bằng</u> bằng chiều cao cây con trái trừ chiều cao cây con phải; hệ số của nút rỗng được định nghĩa là $0$. Dấu của hệ số cho biết cây nghiêng về phía nào, còn trị tuyệt đối cho biết mức mất cân bằng.

```python
# Mã tính hệ số cân bằng chính thức được chèn từ nguồn đã khóa.
```

!!! tip

    Ký hiệu hệ số cân bằng là $f$. Mọi nút trong cây AVL phải thỏa $-1 \le f \le 1$.

## Phép xoay trong cây AVL

Điểm cốt lõi của AVL là phép <u>xoay</u>. Xoay thay đổi quan hệ cha–con cục bộ để phục hồi cân bằng nhưng không làm thay đổi chuỗi duyệt trung thứ tự. Do đó, nó vừa giữ tính chất của BST vừa đưa cây trở lại trạng thái cân bằng.

Một nút có trị tuyệt đối hệ số cân bằng $> 1$ được gọi là nút mất cân bằng. Tùy hướng nghiêng của nút và của nút con cao hơn, có bốn trường hợp: xoay phải, xoay trái, xoay trái rồi phải, hoặc xoay phải rồi trái.

### Xoay phải

Trong hình, đi từ dưới lên thì nút 3 là nút mất cân bằng đầu tiên. Gọi nó là `node`, con trái là `child`. Phép xoay phải đưa `child` lên làm gốc mới của cây con và hạ `node` xuống phía phải, trong khi vẫn giữ mọi giá trị bên trái nhỏ hơn gốc và mọi giá trị bên phải lớn hơn gốc.

**Bước 1**

![Bước 1 xoay phải](avl_tree.assets/avltree_right_rotate_step1.png)

**Bước 2**

![Bước 2 xoay phải](avl_tree.assets/avltree_right_rotate_step2.png)

**Bước 3**

![Bước 3 xoay phải](avl_tree.assets/avltree_right_rotate_step3.png)

**Bước 4**

![Bước 4 xoay phải](avl_tree.assets/avltree_right_rotate_step4.png)

Nếu `child` có con phải `grand_child`, phải nối `grand_child` thành con trái của `node`; nếu bỏ bước này, một phần cây sẽ bị mất khỏi cấu trúc.

![Xoay phải khi có grand_child](avl_tree.assets/avltree_right_rotate_with_grandchild.png)

Tên “xoay” là hình ảnh trực quan; mã thực tế chỉ đổi các tham chiếu và cập nhật chiều cao theo đúng thứ tự.

```python
# Mã xoay phải chính thức được chèn từ nguồn đã khóa.
```

### Xoay trái

Xoay trái là ảnh gương của xoay phải và dùng khi cây nghiêng về phải.

![Phép xoay trái](avl_tree.assets/avltree_left_rotate.png)

Nếu `child` có con trái `grand_child`, nối `grand_child` thành con phải của `node` trước khi hoàn tất gốc mới.

![Xoay trái khi có grand_child](avl_tree.assets/avltree_left_rotate_with_grandchild.png)

Logic hai phép xoay đối xứng: đổi `left` thành `right` và ngược lại trong xoay phải sẽ cho cài đặt xoay trái.

```python
# Mã xoay trái chính thức được chèn từ nguồn đã khóa.
```

### Xoay trái rồi xoay phải

Nếu nút mất cân bằng nghiêng trái nhưng con trái lại nghiêng phải, một phép xoay đơn không thể sửa đúng cấu trúc. Trước hết xoay trái tại `child`, sau đó xoay phải tại `node`.

![Xoay trái rồi xoay phải](avl_tree.assets/avltree_left_right_rotate.png)

### Xoay phải rồi xoay trái

Trường hợp ảnh gương là nút nghiêng phải nhưng con phải nghiêng trái. Trước hết xoay phải tại `child`, sau đó xoay trái tại `node`.

![Xoay phải rồi xoay trái](avl_tree.assets/avltree_right_left_rotate.png)

### Chọn phép xoay

Bốn dạng mất cân bằng tương ứng một-một với bốn phương án xoay.

![Bốn trường hợp xoay của cây AVL](avl_tree.assets/avltree_rotation_cases.png)

Bảng: Điều kiện chọn phép xoay

| Hệ số của nút mất cân bằng | Hệ số của nút con phía cao hơn | Phép xoay |
| --- | --- | --- |
| $> 1$ (nghiêng trái) | $\geq 0$ | Xoay phải |
| $> 1$ (nghiêng trái) | $<0$ | Xoay trái rồi xoay phải |
| $< -1$ (nghiêng phải) | $\leq 0$ | Xoay trái |
| $< -1$ (nghiêng phải) | $>0$ | Xoay phải rồi xoay trái |

Hàm tổng quát kiểm tra dấu của hai hệ số, thực hiện phép xoay phù hợp và trả về gốc mới. Nhờ vậy, mã chèn và xóa chỉ cần gọi cùng một thao tác khôi phục cân bằng.

```python
# Mã chọn và thực hiện phép xoay chính thức được chèn từ nguồn đã khóa.
```

## Các thao tác thường dùng

### Chèn nút

Chèn AVL bắt đầu giống chèn BST. Điểm khác là đường từ nút mới về gốc có thể xuất hiện nhiều nút mất cân bằng. Khi đệ quy quay về, cập nhật chiều cao rồi xoay từ dưới lên, nhờ đó mọi cây con trên đường đi được phục hồi trước khi trả về cho nút cha.

```python
# Mã chèn AVL chính thức được chèn từ nguồn đã khóa.
```

### Xóa nút

Xóa cũng dùng ba trường hợp của BST. Sau khi cấu trúc thay đổi, cập nhật chiều cao và thực hiện phép xoay từ dưới lên. Xóa có thể làm mất cân bằng ở nhiều mức, nên không được dừng sau phép sửa đầu tiên.

```python
# Mã xóa AVL chính thức được chèn từ nguồn đã khóa.
```

### Tìm nút

Tìm kiếm AVL hoàn toàn giống BST: so sánh giá trị hiện tại với đích rồi đi sang cây con trái hoặc phải. Sự cân bằng chỉ bảo đảm chiều cao thấp, nhờ vậy giới hạn số lần so sánh.

## Ứng dụng điển hình

- Tổ chức dữ liệu lớn khi tìm kiếm diễn ra thường xuyên và cần độ trễ ổn định.
- Xây dựng một số hệ thống chỉ mục trong cơ sở dữ liệu hoặc thư viện tập hợp có thứ tự.
- Cây đỏ-đen cũng là cây tìm kiếm nhị phân cân bằng. Điều kiện cân bằng lỏng hơn AVL nên thường cần ít phép xoay hơn khi cập nhật, đổi lại đường tìm kiếm có thể dài hơn đôi chút.
