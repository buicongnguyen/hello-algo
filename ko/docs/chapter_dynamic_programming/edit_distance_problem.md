# 편집 거리 문제

레벤슈타인 거리는 한 문자열을 다른 문자열로 바꾸는 데 필요한 삽입, 삭제, 치환의 최소 횟수입니다.

![편집 거리 예시](edit_distance_problem.assets/edit_distance_example.png)

$dp[i][j]$를 `source`의 앞 $i$개 문자를 `target`의 앞 $j$개 문자로 바꾸는 비용이라 정의합니다. 마지막 문자가 같으면 대각선 상태를 사용하고, 다르면 삽입·삭제·치환 중 최솟값을 선택합니다.

```python
def edit_distance(source, target):
    previous = list(range(len(target) + 1))
    for i, left in enumerate(source, 1):
        current = [i]
        for j, right in enumerate(target, 1):
            if left == right:
                current.append(previous[j - 1])
            else:
                current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))
        previous = current
    return previous[-1]
```

![편집 거리 상태 전이](edit_distance_problem.assets/edit_distance_state_transfer.png)

행을 굴려 저장하면 시간 복잡도는 $O(mn)$, 공간 복잡도는 $O(n)$입니다.
