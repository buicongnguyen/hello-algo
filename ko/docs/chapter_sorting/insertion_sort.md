# 삽입 정렬

배열 앞쪽에 정렬된 구간을 유지하고 새 원소를 올바른 위치까지 왼쪽으로 이동합니다.

![삽입 정렬 개요](insertion_sort.assets/insertion_sort_overview.png)

```python
def insertion_sort(values):
    for i in range(1, len(values)):
        current = values[i]
        j = i - 1
        while j >= 0 and values[j] > current:
            values[j + 1] = values[j]
            j -= 1
        values[j + 1] = current
```

최악은 $O(n^2)$이지만 거의 정렬된 데이터에서는 $O(n)$에 가깝습니다. 안정적이고 제자리이며 작은 배열에 효율적입니다.
