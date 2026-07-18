# 힙 구성

원소를 하나씩 삽입해 힙을 만들면 $O(n \log n)$이 필요합니다. 제자리 힙 구성 알고리즘은 마지막 비리프 노드부터 루트 방향으로 각 노드를 아래로 이동시킵니다.

```python
def build_max_heap(values):
    for i in range(len(values) // 2 - 1, -1, -1):
        sift_down(values, i)
    return values
```

![힙 구성 연산 수](build_heap.assets/heapify_operations_count.png)

한 번의 하향 이동은 최대 $O(\log n)$이지만 대부분의 노드는 리프 가까이에 있어 거의 움직이지 않습니다. 전체 이동 횟수는 수렴하는 급수로 제한되므로 힙 구성은 $O(n)$ 시간과 $O(1)$ 보조 공간을 사용합니다.
