# 해싱으로 선형 탐색 최적화

해시 테이블은 추가 메모리로 인덱스를 만들어 반복 탐색의 평균 비용을 $O(n)$에서 $O(1)$로 줄일 수 있습니다.

## 두 수의 합 예제

모든 쌍을 확인하는 완전 탐색은 $O(n^2)$입니다.

![완전 탐색으로 두 수의 합 찾기](replace_linear_by_hashing.assets/two_sum_brute_force.png)

```python
def two_sum(values, target):
    seen = {}
    for index, value in enumerate(values):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index
    return []
```

![해시 테이블로 두 수의 합 찾기](replace_linear_by_hashing.assets/two_sum_hashtable_step3.png)

이 해법은 $O(n)$ 시간과 $O(n)$ 공간을 사용하며, 공간으로 시간을 줄이는 대표적인 사례입니다.
