# 힙

최대 힙에서는 모든 부모가 자식보다 작지 않고, 최소 힙에서는 반대 관계를 만족합니다.

![최소 힙과 최대 힙](heap.assets/min_heap_and_max_heap.png)

## 표현과 연산

힙은 보통 배열에 저장합니다. 인덱스 $i$의 두 자식은 $2i + 1$과 $2i + 2$에 있습니다.

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
- `push`: 배열 끝에 추가한 뒤 위로 이동, $O(\log n)$.
- `pop`: 루트와 마지막 원소를 바꾸고 마지막 원소를 제거한 뒤 루트를 아래로 이동, $O(\log n)$.

![배열로 표현한 힙](heap.assets/representation_of_heap.png)

## 최대 힙 구현

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
