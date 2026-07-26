# Cây nhị phân

Cây nhị phân là cây mà mỗi nút có tối đa hai nút con: trái và phải. Một nút thường lưu giá trị cùng hai tham chiếu.

```python
class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None
```

![Định nghĩa cây nhị phân](binary_tree.assets/binary_tree_definition.png)

## Thuật ngữ cơ bản

- Nút gốc không có nút cha.
- Nút lá không có nút con.
- Cạnh nối hai nút kề nhau.
- Mức của nút tăng dần từ trên xuống; nút gốc nằm ở mức 1.
- Độ sâu của nút bằng số cạnh trên đường đi từ nút gốc tới nút đó.
- Chiều cao của nút là số cạnh trên đường dài nhất từ nút tới một lá.

![Thuật ngữ cây nhị phân](binary_tree.assets/binary_tree_terminology.png)

## Các dạng cây nhị phân

Cây hoàn hảo có mọi tầng được lấp đầy. Cây đầy đủ yêu cầu mỗi nút có không hoặc hai nút con. Cây hoàn chỉnh lấp các tầng từ trên xuống và tầng cuối từ trái sang phải. Trong cây cân bằng, trị tuyệt đối của độ chênh lệch chiều cao giữa cây con trái và cây con phải của mọi nút không vượt quá 1.

## Thao tác

Tương tự danh sách liên kết, cây nhị phân được khởi tạo bằng cách tạo các nút rồi thiết lập tham chiếu giữa chúng. Có thể chèn hoặc loại bỏ một nút bằng cách thay đổi các tham chiếu, nhưng việc chèn có thể làm thay đổi cấu trúc logic ban đầu, còn xóa một nút thường đồng nghĩa với loại bỏ cả cây con bắt đầu tại nút đó. Vì vậy, trong thực tế hai thao tác này thường là một chuỗi thay đổi phối hợp để đạt mục đích cụ thể.
