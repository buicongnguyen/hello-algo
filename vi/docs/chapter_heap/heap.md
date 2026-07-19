# Heap

Heap cực đại yêu cầu mỗi nút cha không nhỏ hơn các nút con; heap cực tiểu dùng quan hệ ngược lại.

![Heap cực tiểu và cực đại](heap.assets/min_heap_and_max_heap.png)

## Biểu diễn và thao tác

Heap thường được lưu trong mảng. Với chỉ mục $i$, hai nút con nằm tại $2i + 1$ và $2i + 2$.

```python
import heapq

heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
smallest = heap[0]
removed = heapq.heappop(heap)
```

- `peek`: $O(1)$.
- `push`: thêm cuối mảng rồi dịch lên, $O(\log n)$.
- `pop`: đổi gốc với phần tử cuối, xóa cuối rồi dịch gốc xuống, $O(\log n)$.

![Biểu diễn heap trong mảng](heap.assets/representation_of_heap.png)

## Cài đặt heap cực đại

```python
def sift_down(values, i):
    size = len(values)
    while True:
        largest = i
        left, right = 2 * i + 1, 2 * i + 2
        if left < size and values[left] > values[largest]:
            largest = left
        if right < size and values[right] > values[largest]:
            largest = right
        if largest == i:
            return
        values[i], values[largest] = values[largest], values[i]
        i = largest
```
