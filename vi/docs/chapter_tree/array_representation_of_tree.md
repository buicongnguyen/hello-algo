# Biểu diễn cây nhị phân bằng mảng

Cây hoàn chỉnh có thể lưu rất gọn trong mảng. Với nút ở chỉ số $i$, nút con trái nằm tại $2i + 1$, nút con phải tại $2i + 2$, và nút cha tại $\lfloor(i - 1) / 2\rfloor$.

![Biểu diễn cây hoàn chỉnh bằng mảng](array_representation_of_tree.assets/array_representation_complete_binary_tree.png)

```python
class ArrayBinaryTree:
    def __init__(self, values):
        self.values = values

    def left(self, i):
        return 2 * i + 1

    def right(self, i):
        return 2 * i + 2

    def parent(self, i):
        return (i - 1) // 2
```

Với cây thưa, cần dùng giá trị rỗng để giữ đúng quan hệ chỉ số, gây lãng phí bộ nhớ. Vì vậy biểu diễn mảng phù hợp nhất với cây hoàn chỉnh, đặc biệt là heap.

![Biểu diễn cây có vị trí rỗng](array_representation_of_tree.assets/array_representation_with_empty.png)
