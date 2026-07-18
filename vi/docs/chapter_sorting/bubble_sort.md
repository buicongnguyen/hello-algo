# Sắp xếp nổi bọt

Sắp xếp nổi bọt liên tục so sánh các cặp kề nhau và đổi chỗ khi sai thứ tự. Sau mỗi vòng, phần tử lớn nhất chưa sắp xếp nổi về cuối.

![Tổng quan sắp xếp nổi bọt](bubble_sort.assets/bubble_sort_overview.png)

```python
def bubble_sort(values):
    for end in range(len(values) - 1, 0, -1):
        swapped = False
        for i in range(end):
            if values[i] > values[i + 1]:
                values[i], values[i + 1] = values[i + 1], values[i]
                swapped = True
        if not swapped:
            break
```

Trung bình và xấu nhất là $O(n^2)$; dữ liệu đã có thứ tự được nhận ra trong $O(n)$. Thuật toán tại chỗ và ổn định.
