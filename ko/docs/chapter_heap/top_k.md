# Top-k 문제

Top-k 문제는 데이터 집합에서 가장 크거나 작은 $k$개의 원소를 찾습니다. 전체 정렬은 $O(n \log n)$이어서 필요한 것보다 더 많은 작업을 할 수 있습니다.

## 크기 k인 힙 사용

가장 큰 $k$개를 찾을 때는 최대 $k$개의 원소를 담는 최소 힙을 유지합니다. 힙의 루트가 현재 선택된 원소 중 가장 작은 경계값입니다.

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

![힙을 이용한 top-k 과정](top_k.assets/top_k_heap_step9.png)

시간 복잡도는 $O(n \log k)$이고 공간 복잡도는 $O(k)$입니다. 전체 입력을 저장할 필요가 없으므로 스트리밍 데이터에도 잘 맞습니다.
