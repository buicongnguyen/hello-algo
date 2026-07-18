# Chiến lược tìm kiếm chia để trị

Tìm kiếm nhị phân là ví dụ điển hình: so sánh với phần tử giữa rồi chỉ tiếp tục trên một nửa có thể chứa mục tiêu.

![Tìm kiếm nhị phân đệ quy](binary_search_recur.assets/binary_search_recur.png)

```python
def binary_search_recursive(values, target, left, right):
    if left > right:
        return -1
    middle = (left + right) // 2
    if values[middle] == target:
        return middle
    if values[middle] < target:
        return binary_search_recursive(values, target, middle + 1, right)
    return binary_search_recursive(values, target, left, middle - 1)
```

Mỗi bước giảm kích thước còn một nửa nên thời gian $O(\log n)$ và ngăn xếp đệ quy $O(\log n)$.
