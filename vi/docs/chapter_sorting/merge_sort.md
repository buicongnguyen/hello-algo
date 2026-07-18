# Sắp xếp trộn

Merge sort chia mảng thành hai nửa, sắp xếp từng nửa rồi trộn hai dãy có thứ tự.

![Tổng quan merge sort](merge_sort.assets/merge_sort_overview.png)

```python
def merge_sort(values):
    if len(values) <= 1:
        return values
    middle = len(values) // 2
    left = merge_sort(values[:middle])
    right = merge_sort(values[middle:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
```

Thời gian luôn là $O(n \log n)$ và bộ nhớ phụ $O(n)$. Merge sort ổn định và phù hợp với danh sách liên kết hoặc dữ liệu ngoài bộ nhớ.
