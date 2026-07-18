# 부분집합 합 문제

양의 정수 배열과 목표값이 주어졌을 때 합이 정확히 목표가 되는 조합을 찾습니다. 순열과 달리 현재 위치 뒤의 원소만 선택하여 같은 부분집합이 다른 순서로 다시 생성되지 않게 합니다.

![부분집합 탐색과 경계 가지치기](subset_sum_problem.assets/subset_sum_i_naive.png)

```python
def subset_sum(values, target):
    values.sort()
    path, result = [], []

    def search(start, remaining):
        if remaining == 0:
            result.append(path.copy())
            return
        for i in range(start, len(values)):
            if i > start and values[i] == values[i - 1]:
                continue
            if values[i] > remaining:
                break
            path.append(values[i])
            search(i + 1, remaining - values[i])
            path.pop()

    search(0, target)
    return result
```

정렬하면 현재 값이 남은 합보다 클 때 이후 후보를 모두 자를 수 있습니다. $i > start$ 조건은 같은 층의 중복 선택을 제거합니다.

![부분집합 합 백트래킹 과정](subset_sum_problem.assets/subset_sum_i.png)
