# 0-1 배낭 문제

각 물건에는 무게와 가치가 있고 최대 한 번만 선택할 수 있습니다. 용량을 넘지 않으면서 총 가치를 최대화합니다.

![0-1 배낭 예시 데이터](knapsack_problem.assets/knapsack_example.png)

물건 $i$와 용량 $c$에 대한 전이식은 다음과 같습니다.

$$
dp[i,c] = \max(dp[i-1,c], dp[i-1,c-w_i] + v_i)
$$

```python
def knapsack_01(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for current in range(capacity, weight - 1, -1):
            dp[current] = max(dp[current], dp[current - weight] + value)
    return dp[capacity]
```

용량을 역순으로 순회해야 같은 반복에서 물건이 다시 사용되지 않습니다. 시간은 $O(n \times capacity)$, 공간은 $O(capacity)$입니다.

![배낭 재귀 트리](knapsack_problem.assets/knapsack_dfs.png)
