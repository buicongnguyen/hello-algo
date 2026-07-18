# 이진 탐색

이진 탐색은 정렬된 배열에 적용합니다. 중앙 원소와 목표를 비교할 때마다 탐색 범위의 절반을 버립니다.

![이진 탐색 예제](binary_search.assets/binary_search_example.png)

```python
def binary_search(values, target):
    left, right = 0, len(values) - 1
    while left <= right:
        middle = (left + right) // 2
        if values[middle] < target:
            left = middle + 1
        elif values[middle] > target:
            right = middle - 1
        else:
            return middle
    return -1
```

시간 복잡도는 $O(\log n)$이고 반복 구현의 공간 복잡도는 $O(1)$입니다. 닫힌 구간 $[left, right]$ 또는 반열린 구간 $[left, right)$ 중 하나를 일관되게 사용해야 경계 오류를 피할 수 있습니다.

![두 가지 탐색 구간](binary_search.assets/binary_search_ranges.png)
