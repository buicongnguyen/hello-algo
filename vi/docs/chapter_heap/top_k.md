# Bài toán top-k

Bài toán top-k yêu cầu tìm $k$ phần tử lớn nhất hoặc nhỏ nhất trong tập dữ liệu. Sắp xếp toàn bộ tốn $O(n \log n)$ và thường làm nhiều việc hơn cần thiết.

## Dùng heap kích thước k

Để tìm $k$ phần tử lớn nhất, duy trì một heap cực tiểu gồm tối đa $k$ phần tử. Phần tử ở gốc là ngưỡng nhỏ nhất hiện tại.

```python
import heapq

def top_k_largest(values, k):
    if k <= 0:
        return []
    heap = values[:k]
    heapq.heapify(heap)
    for value in values[k:]:
        if value > heap[0]:
            heapq.heapreplace(heap, value)
    return heap
```

![Quá trình top-k bằng heap](top_k.assets/top_k_heap_step9.png)

Thời gian là $O(n \log k)$ và không gian là $O(k)$. Cách này đặc biệt hữu ích với luồng dữ liệu vì không cần lưu toàn bộ đầu vào.
