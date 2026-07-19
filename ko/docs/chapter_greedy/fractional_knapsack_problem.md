# 분할 배낭 문제

각 물건에는 무게와 가치가 있고 물건의 일부를 담을 수 있습니다. 용량 안에서 총 가치를 최대화합니다.

![분할 배낭 예시 데이터](fractional_knapsack_problem.assets/fractional_knapsack_example.png)

물건을 나눌 수 있으므로 단위 무게당 가치가 큰 순서로 담는 것이 최선입니다.

![단위 무게당 가치](fractional_knapsack_problem.assets/fractional_knapsack_unit_value.png)

```python
def fractional_knapsack(weights, values, capacity):
    items = sorted(zip(weights, values), key=lambda item: item[1] / item[0], reverse=True)
    total = 0.0
    for weight, value in items:
        if capacity == 0:
            break
        taken = min(weight, capacity)
        total += value * taken / weight
        capacity -= taken
    return total
```

![분할 배낭의 그리디 전략](fractional_knapsack_problem.assets/fractional_knapsack_greedy_strategy.png)

교환 논증에 따르면 낮은 밀도의 물건을 높은 밀도보다 먼저 담은 해는 둘을 교환해 무게를 유지하면서 가치를 높일 수 있습니다. 따라서 그리디 순서가 최적입니다.
