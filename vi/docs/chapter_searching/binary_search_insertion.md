# Điểm chèn bằng tìm kiếm nhị phân

Điểm chèn là vị trí giữ mảng có thứ tự sau khi thêm mục tiêu. Nếu có phần tử trùng, có thể chọn vị trí đầu tiên hoặc vị trí sau cùng.

![Ví dụ điểm chèn](binary_search_insertion.assets/binary_search_insertion_example.png)

## Chèn trước phần tử bằng mục tiêu

```python
def insertion_index(values, target):
    left, right = 0, len(values)
    while left < right:
        middle = (left + right) // 2
        if values[middle] < target:
            left = middle + 1
        else:
            right = middle
    return left
```

## Chèn sau phần tử bằng mục tiêu

Đổi điều kiện thành `values[middle] <= target` để tiếp tục tìm về bên phải. Cả hai phiên bản chạy trong $O(\log n)$.

![Quá trình tìm điểm chèn](binary_search_insertion.assets/binary_search_insertion_step8.png)
