# Tìm kiếm nhị phân

Tìm kiếm nhị phân áp dụng cho mảng đã sắp xếp. Mỗi bước so sánh phần tử giữa với mục tiêu rồi loại bỏ một nửa khoảng tìm kiếm.

![Ví dụ tìm kiếm nhị phân](binary_search.assets/binary_search_example.png)

```python
def binary_search(values, target):
    left, right = 0, len(values) - 1
    while left <= right:
        middle = (left + right) // 2
        if values[middle] < target:
            left = middle + 1
        elif values[middle] > target:
            right = middle - 1
        else:
            return middle
    return -1
```

Thời gian là $O(\log n)$ và không gian lặp là $O(1)$. Cần thống nhất rõ khoảng đóng $[left, right]$ hoặc nửa mở $[left, right)$ để tránh lỗi lệch một đơn vị.

![Hai quy ước khoảng tìm kiếm](binary_search.assets/binary_search_ranges.png)
