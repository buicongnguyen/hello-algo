# Sắp xếp chọn

Mỗi vòng, sắp xếp chọn tìm phần tử nhỏ nhất trong đoạn chưa sắp xếp rồi đổi nó với phần tử đầu đoạn.

![Quá trình sắp xếp chọn](selection_sort.assets/selection_sort_step11.png)

```python
def selection_sort(values):
    for i in range(len(values) - 1):
        smallest = i
        for j in range(i + 1, len(values)):
            if values[j] < values[smallest]:
                smallest = j
        values[i], values[smallest] = values[smallest], values[i]
```

Thời gian luôn là $O(n^2)$, không gian $O(1)$. Phép đổi xa có thể đảo thứ tự các phần tử bằng nhau nên thuật toán không ổn định.
