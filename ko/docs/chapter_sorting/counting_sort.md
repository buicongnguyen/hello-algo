# 계수 정렬

유한한 정수 키 범위에서 각 값의 출현 횟수를 세고 그 정보로 배열을 다시 구성합니다.

![계수 정렬 개요](counting_sort.assets/counting_sort_overview.png)

```python
def counting_sort(values):
    if not values:
        return values
    low, high = min(values), max(values)
    counts = [0] * (high - low + 1)
    for value in values:
        counts[value - low] += 1
    index = 0
    for offset, count in enumerate(counts):
        for _ in range(count):
            values[index] = offset + low
            index += 1
    return values
```

시간은 $O(n + k)$, 공간은 $O(k)$이며 $k$는 키 범위의 폭입니다. 누적 합을 사용하는 버전은 안정적으로 만들 수 있습니다.
