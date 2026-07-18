# 무한 배낭 문제

무한 배낭은 각 물건을 여러 번 사용할 수 있습니다. 현재 상태에서 같은 물건을 다시 쓸 수 있으므로 용량 배열을 정순으로 순회합니다.

![무한 배낭 예시 데이터](unbounded_knapsack_problem.assets/unbounded_knapsack_example.png)

```python
def unbounded_knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for current in range(weight, capacity + 1):
            dp[current] = max(dp[current], dp[current - weight] + value)
    return dp[capacity]
```

## 동전 교환

동전 교환은 정확한 금액을 만드는 최소 동전 수를 구하는 변형입니다.

```python
def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for current in range(coin, amount + 1):
            dp[current] = min(dp[current], dp[current - coin] + 1)
    return -1 if dp[amount] == amount + 1 else dp[amount]
```

![동전 교환 예시](unbounded_knapsack_problem.assets/coin_change_example.png)

조합 수를 셀 때는 `min` 대신 덧셈을 사용합니다. 동전 종류를 바깥 반복으로 두면 같은 조합의 순열을 중복해서 세지 않습니다.
