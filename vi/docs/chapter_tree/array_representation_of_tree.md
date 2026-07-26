# Biểu diễn cây nhị phân bằng mảng

Trong cách biểu diễn liên kết, đơn vị lưu trữ của cây nhị phân là nút `TreeNode`; các nút nối với nhau bằng tham chiếu. Phần trước đã dùng mô hình này để mô tả các thao tác cơ bản. Cây nhị phân cũng có thể được biểu diễn bằng mảng khi có quan hệ xác định giữa chỉ số và vị trí của nút trong cây.

## Biểu diễn cây nhị phân hoàn hảo

Trước hết xét một cây nhị phân hoàn hảo. Lưu các nút vào mảng theo thứ tự duyệt theo mức, khi đó mỗi nút tương ứng duy nhất với một chỉ số.

Từ đặc điểm của duyệt theo mức, có thể suy ra công thức ánh xạ giữa cha và con: **nếu chỉ số của một nút là $i$, chỉ số con trái là $2i + 1$ và chỉ số con phải là $2i + 2$**. Hình dưới cho thấy các quan hệ ánh xạ này.

![Biểu diễn cây nhị phân hoàn hảo bằng mảng](array_representation_of_tree.assets/array_representation_binary_tree.png)

**Công thức ánh xạ đóng vai trò tương tự tham chiếu trong biểu diễn liên kết.** Từ một nút bất kỳ trong mảng, chương trình tính trực tiếp vị trí con trái và con phải mà không cần lưu con trỏ trong từng nút.

## Biểu diễn cây nhị phân bất kỳ

Cây hoàn hảo là trường hợp đặc biệt. Trong cây thông thường, nhiều vị trí ở các mức giữa có thể rỗng. Nếu chuỗi duyệt theo mức bỏ qua các vị trí rỗng, không thể suy ra số lượng và phân bố của chúng. Vì vậy, **nhiều cây có cấu trúc khác nhau có thể tạo cùng một chuỗi giá trị theo mức**.

Hình sau minh họa một cây không hoàn hảo mà cách ghi liên tiếp các giá trị không thể xác định duy nhất cấu trúc.

![Một chuỗi theo mức có thể tương ứng với nhiều cây](array_representation_of_tree.assets/array_representation_without_empty.png)

Giải pháp là **ghi tường minh mọi vị trí rỗng bằng `None` trong chuỗi theo mức**. Khi cả khoảng trống cũng được bảo toàn, mỗi chỉ số tiếp tục đại diện cho một vị trí cố định và chuỗi có thể xác định duy nhất cây.

```python
# Mã biểu diễn mảng có vị trí rỗng chính thức được chèn từ nguồn đã khóa.
```

![Biểu diễn một cây nhị phân bất kỳ bằng mảng](array_representation_of_tree.assets/array_representation_with_empty.png)

<u>Cây nhị phân hoàn chỉnh</u> đặc biệt phù hợp với cách biểu diễn bằng mảng. Theo định nghĩa, các vị trí rỗng chỉ có thể xuất hiện ở cuối mức thấp nhất, phía bên phải. Do đó, mọi `None` đều nằm ở cuối chuỗi duyệt theo mức và có thể bỏ qua khi lưu trữ.

Hình dưới cho thấy một cây hoàn chỉnh được đặt liên tục trong mảng mà không cần chèn khoảng trống ở giữa.

![Biểu diễn cây nhị phân hoàn chỉnh bằng mảng](array_representation_of_tree.assets/array_representation_complete_binary_tree.png)

Cài đặt đầy đủ dưới đây hỗ trợ các thao tác:

- từ một chỉ số, lấy giá trị nút, con trái, con phải và nút cha;
- sinh chuỗi duyệt tiền thứ tự, trung thứ tự, hậu thứ tự và theo mức;
- bỏ qua các vị trí rỗng khi đọc giá trị nhưng vẫn giữ công thức ánh xạ chỉ số.

```python
# Mã cây nhị phân biểu diễn bằng mảng chính thức được chèn từ nguồn đã khóa.
```

## Ưu điểm và hạn chế

Biểu diễn bằng mảng có các ưu điểm sau:

- Bộ nhớ liên tục thân thiện với bộ nhớ đệm, giúp truy cập và duyệt nhanh.
- Không phải lưu hai tham chiếu trong từng nút nên tiết kiệm phần không gian con trỏ.
- Có thể truy cập ngẫu nhiên một vị trí bằng chỉ số và suy ra cha hoặc con trong thời gian hằng số.

Tuy nhiên, cách này cũng có các hạn chế:

- Mảng cần vùng nhớ liên tục nên kém phù hợp với cây dữ liệu rất lớn hoặc thường xuyên thay đổi kích thước.
- Thêm hoặc xóa ở giữa có thể kéo theo thao tác chèn, xóa hay tái bố trí mảng với chi phí cao.
- Nếu cây thưa và có nhiều `None`, phần lớn ô mảng không chứa dữ liệu nút, làm hiệu suất sử dụng không gian giảm mạnh.

Vì vậy, cây hoàn chỉnh như heap thường dùng mảng rất hiệu quả, còn cây thưa hoặc thay đổi cấu trúc thường phù hợp hơn với biểu diễn liên kết.
