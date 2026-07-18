# 버킷 정렬

값 범위에 따라 원소를 여러 버킷에 분산하고 각 버킷을 정렬한 뒤 결과를 이어 붙입니다.

![버킷 정렬 개요](bucket_sort.assets/bucket_sort_overview.png)

```python
def bucket_sort(values, bucket_count=5):
    if not values:
        return values
    low, high = min(values), max(values)
    width = (high - low + 1) / bucket_count
    buckets = [[] for _ in range(bucket_count)]
    for value in values:
        index = min(int((value - low) / width), bucket_count - 1)
        buckets[index].append(value)
    values[:] = [value for bucket in buckets for value in sorted(bucket)]
    return values
```

데이터가 고르게 분포하면 $k$개 버킷에 대해 $O(n + k)$에 가깝습니다. 성능은 매핑 함수와 데이터 분포에 크게 좌우됩니다.
