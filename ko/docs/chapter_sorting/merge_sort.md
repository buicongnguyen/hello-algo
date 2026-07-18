# 병합 정렬

배열을 두 부분으로 나누어 각각 정렬한 뒤 두 정렬된 결과를 병합합니다.

![병합 정렬 개요](merge_sort.assets/merge_sort_overview.png)

```python
def merge_sort(values):
    if len(values) <= 1:
        return values
    middle = len(values) // 2
    left = merge_sort(values[:middle])
    right = merge_sort(values[middle:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
```

항상 $O(n \log n)$ 시간과 $O(n)$ 보조 공간을 사용합니다. 안정적이며 연결 리스트와 외부 정렬에 적합합니다.
