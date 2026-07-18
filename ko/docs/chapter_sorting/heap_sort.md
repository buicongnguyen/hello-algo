# 힙 정렬

최대 힙을 만든 뒤 루트와 미정렬 구간의 끝을 반복해서 교환하고 새 루트를 아래로 이동합니다.

![힙 정렬 과정](heap_sort.assets/heap_sort_step12.png)

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

시간은 $O(n \log n)$, 공간은 $O(1)$이며 안정적이지 않습니다.
