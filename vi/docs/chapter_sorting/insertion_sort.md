# Sắp xếp chèn

Sắp xếp chèn duy trì một đoạn đầu đã có thứ tự. Mỗi phần tử mới được dịch trái cho tới đúng vị trí.

![Tổng quan sắp xếp chèn](insertion_sort.assets/insertion_sort_overview.png)

```python
def insertion_sort(values):
    for i in range(1, len(values)):
        current = values[i]
        j = i - 1
        while j >= 0 and values[j] > current:
            values[j + 1] = values[j]
            j -= 1
        values[j + 1] = current
```

Xấu nhất là $O(n^2)$ nhưng gần $O(n)$ với dữ liệu gần có thứ tự. Thuật toán ổn định, tại chỗ và hiệu quả cho mảng nhỏ.
