# 순열 문제

순열은 각 위치에 아직 사용하지 않은 원소를 하나씩 선택합니다. 재귀 트리의 깊이는 $n$이고 각 리프가 완성된 순열 하나를 나타냅니다.

![순열 재귀 트리](permutations_problem.assets/permutations_i.png)

```python
def unique_permutations(values):
    values.sort()
    used = [False] * len(values)
    path, result = [], []

    def search():
        if len(path) == len(values):
            result.append(path.copy())
            return
        for i, value in enumerate(values):
            if used[i]:
                continue
            if i > 0 and values[i] == values[i - 1] and not used[i - 1]:
                continue
            used[i] = True
            path.append(value)
            search()
            path.pop()
            used[i] = False

    search()
    return result
```

중복 원소가 있으면 먼저 정렬하고 같은 탐색 층에서 동일한 값이 정해진 순서로만 선택되게 합니다.

![중복 순열 가지치기](permutations_problem.assets/permutations_ii_pruning.png)
