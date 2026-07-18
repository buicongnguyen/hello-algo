# Sắp xếp nhanh

Quicksort chọn một chốt, phân hoạch phần tử nhỏ hơn sang trái và lớn hơn sang phải, rồi đệ quy hai nửa.

![Tổng quan quicksort](quick_sort.assets/quick_sort_overview.png)

```python
def quick_sort(values, left=0, right=None):
    right = len(values) - 1 if right is None else right
    if left >= right:
        return
    pivot = values[(left + right) // 2]
    i, j = left, right
    while i <= j:
        while values[i] < pivot:
            i += 1
        while values[j] > pivot:
            j -= 1
        if i <= j:
            values[i], values[j] = values[j], values[i]
            i, j = i + 1, j - 1
    quick_sort(values, left, j)
    quick_sort(values, i, right)
```

Trung bình là $O(n \log n)$, xấu nhất $O(n^2)$. Chọn chốt ngẫu nhiên hoặc trung vị giúp giảm nguy cơ phân hoạch lệch. Quicksort thường không ổn định.
