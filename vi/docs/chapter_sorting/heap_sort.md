# Sắp xếp vun đống

Heap sort xây heap cực đại, liên tục đổi phần tử gốc với cuối đoạn chưa sắp xếp rồi dịch gốc xuống.

![Quá trình heap sort](heap_sort.assets/heap_sort_step12.png)

```python
def heap_sort(values):
    def sift_down(i, size):
        while 2 * i + 1 < size:
            child = 2 * i + 1
            if child + 1 < size and values[child + 1] > values[child]:
                child += 1
            if values[i] >= values[child]:
                return
            values[i], values[child] = values[child], values[i]
            i = child
    for i in range(len(values) // 2 - 1, -1, -1):
        sift_down(i, len(values))
    for end in range(len(values) - 1, 0, -1):
        values[0], values[end] = values[end], values[0]
        sift_down(0, end)
```

Thời gian là $O(n \log n)$, không gian $O(1)$ và không ổn định.
