# 기수 정렬

낮은 자릿수부터 높은 자릿수까지 안정적인 정렬을 반복하며, 보통 계수 정렬을 내부 단계로 사용합니다.

![기수 정렬 개요](radix_sort.assets/radix_sort_overview.png)

```python
def radix_sort(values):
    place = 1
    maximum = max(values, default=0)
    while maximum // place:
        buckets = [[] for _ in range(10)]
        for value in values:
            buckets[(value // place) % 10].append(value)
        values[:] = [value for bucket in buckets for value in bucket]
        place *= 10
    return values
```

$d$개 자릿수와 기수 $b$에 대해 시간은 $O(d(n + b))$입니다. 길이가 제한된 정수나 문자열에 적합합니다.
