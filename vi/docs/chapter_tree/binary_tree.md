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
- Mức của nút bằng số cạnh từ gốc tới nút đó.
- Chiều cao của nút là số cạnh trên đường dài nhất từ nút tới một lá.

![Thuật ngữ cây nhị phân](binary_tree.assets/binary_tree_terminology.png)

## Các dạng cây nhị phân

Cây hoàn hảo có mọi tầng được lấp đầy. Cây đầy đủ yêu cầu mỗi nút có không hoặc hai nút con. Cây hoàn chỉnh lấp các tầng từ trên xuống và tầng cuối từ trái sang phải. Cây cân bằng giữ chênh lệch chiều cao giữa hai cây con trong một giới hạn nhỏ.

## Thao tác

Chèn hoặc xóa ở vị trí bất kỳ thường cần tìm vị trí trước. Khi cấu trúc cây được duy trì tốt, nhiều thao tác có thể giảm từ tuyến tính xuống logarit.
