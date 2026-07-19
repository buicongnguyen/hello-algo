# 그리디 알고리즘

그리디는 주로 최적화 문제에 사용됩니다. 각 단계에서 가장 좋아 보이는 선택을 하고 문제를 줄여 나가며 이전 결정을 다시 검토하지 않습니다.

![동전 교환의 그리디 전략](greedy_algorithm.assets/coin_change_greedy_strategy.png)

```python
def greedy_coin_change(coins, amount):
    result = []
    for coin in sorted(coins, reverse=True):
        count, amount = divmod(amount, coin)
        result.extend([coin] * count)
    return result if amount == 0 else []
```

## 조건과 한계

그리디 전략에는 **그리디 선택 속성**과 **최적 부분 구조**가 필요합니다. 가장 큰 동전을 고르는 방법은 일부 화폐 체계에서는 맞지만 모든 동전 집합에서 맞지는 않습니다.

![그리디와 동적 계획법 비교](greedy_algorithm.assets/coin_change_greedy_vs_dp.png)

그리디를 사용하기 전에 전략을 명확히 하고 반례를 찾으며 지역 선택이 항상 어떤 최적해에 포함될 수 있음을 증명해야 합니다. 올바른 경우 구현이 단순하고 메모리를 적게 쓰며 동적 계획법보다 빠른 경우가 많습니다.
