# 동적 계획법 소개

계단 오르기는 기본 예입니다. $i$번째 계단에 도달하는 마지막 이동은 $i-1$ 또는 $i-2$에서 옵니다.

![세 번째 계단에 도달하는 방법 수](intro_to_dynamic_programming.assets/climbing_stairs_example.png)

$$
dp[i] = dp[i-1] + dp[i-2]
$$

순수 재귀는 같은 상태를 반복 계산합니다. 메모이제이션은 위에서 아래로 해결하고 동적 계획법은 의존 순서에 따라 아래에서 위로 표를 채웁니다.

```python
def climbing_stairs(n):
    if n <= 2:
        return n
    previous, current = 1, 2
    for _ in range(3, n + 1):
        previous, current = current, previous + current
    return current
```

![동적 계획법 과정](intro_to_dynamic_programming.assets/climbing_stairs_dp.png)

직전 두 상태만 사용하므로 공간 복잡도를 $O(n)$에서 $O(1)$로 줄일 수 있습니다.
