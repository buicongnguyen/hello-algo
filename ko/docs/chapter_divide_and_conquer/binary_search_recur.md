# 분할 정복 탐색 전략

이진 탐색은 중앙 원소와 비교한 뒤 목표가 있을 수 있는 한쪽 절반만 계속 탐색하는 대표적인 분할 정복입니다.

![재귀 이진 탐색](binary_search_recur.assets/binary_search_recur.png)

```python
def binary_search_recursive(values, target, left, right):
    if left > right:
        return -1
    middle = (left + right) // 2
    if values[middle] == target:
        return middle
    if values[middle] < target:
        return binary_search_recursive(values, target, middle + 1, right)
    return binary_search_recursive(values, target, left, middle - 1)
```

매 단계 크기가 절반이므로 시간은 $O(\log n)$, 재귀 스택은 $O(\log n)$입니다.
