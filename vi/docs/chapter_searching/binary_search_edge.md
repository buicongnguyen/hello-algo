# Biên của tìm kiếm nhị phân

Khi mảng chứa nhiều phần tử bằng mục tiêu, tìm kiếm thông thường có thể trả về bất kỳ vị trí nào. Tìm biên cần tiếp tục thu hẹp sau khi đã gặp mục tiêu.

![Tìm biên theo phần tử](binary_search_edge.assets/binary_search_edge_by_element.png)

```python
def left_boundary(values, target):
    index = insertion_index(values, target)
    return index if index < len(values) and values[index] == target else -1

def right_boundary(values, target):
    index = insertion_index_right(values, target) - 1
    return index if index >= 0 and values[index] == target else -1
```

Biên trái chính là điểm chèn trước mục tiêu. Biên phải bằng điểm chèn sau mục tiêu trừ một.

![Suy ra biên phải từ biên trái](binary_search_edge.assets/binary_search_right_edge_by_left_edge.png)
