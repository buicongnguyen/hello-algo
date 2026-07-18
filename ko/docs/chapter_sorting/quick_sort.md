# 퀵 정렬

피벗을 고르고 작은 원소를 왼쪽, 큰 원소를 오른쪽으로 분할한 뒤 두 부분을 재귀적으로 정렬합니다.

![퀵 정렬 개요](quick_sort.assets/quick_sort_overview.png)

```python
def quick_sort(values, left=0, right=None):
    right = len(values) - 1 if right is None else right
    if left >= right:
        return
    pivot = values[(left + right) // 2]
    i, j = left, right
    while i <= j:
        while values[i] < pivot:
            i += 1
        while values[j] > pivot:
            j -= 1
        if i <= j:
            values[i], values[j] = values[j], values[i]
            i, j = i + 1, j - 1
    quick_sort(values, left, j)
    quick_sort(values, i, right)
```

평균은 $O(n \log n)$, 최악은 $O(n^2)$입니다. 무작위 피벗이나 중앙값 선택으로 치우친 분할 위험을 줄일 수 있으며 일반적으로 안정적이지 않습니다.
