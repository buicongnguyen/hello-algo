# 선택 정렬

각 반복에서 정렬되지 않은 구간의 최솟값을 찾고 구간의 첫 원소와 교환합니다.

![선택 정렬 과정](selection_sort.assets/selection_sort_step11.png)

```python
def selection_sort(values):
    for i in range(len(values) - 1):
        smallest = i
        for j in range(i + 1, len(values)):
            if values[j] < values[smallest]:
                smallest = j
        values[i], values[smallest] = values[smallest], values[i]
```

시간은 항상 $O(n^2)$이고 공간은 $O(1)$입니다. 멀리 떨어진 원소를 교환하므로 같은 키의 상대 순서가 바뀔 수 있어 안정적이지 않습니다.
