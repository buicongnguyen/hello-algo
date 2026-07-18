# 동적 계획법 문제 해결 절차

실전 절차는 의사 결정 확인, 상태 정의, 전이식 도출, 경계 조건 설정, 계산 순서 결정입니다.

![최소 경로 합 예시](dp_solution_pipeline.assets/min_path_sum_example.png)

비용 격자에서 $dp[i][j]$는 $(i,j)$에 도달하는 최소 합입니다.

$$
dp[i][j] = grid[i][j] + \min(dp[i-1][j], dp[i][j-1])
$$

```python
def min_path_sum(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [float("inf")] * cols
    dp[0] = 0
    for row in range(rows):
        for col in range(cols):
            from_left = dp[col - 1] if col > 0 else float("inf")
            dp[col] = grid[row][col] + min(dp[col], from_left)
    return dp[-1]
```

![상태 정의와 dp 표](dp_solution_pipeline.assets/min_path_sum_solution_state_definition.png)

1차원 배열에서 갱신 전 `dp[col]`은 위쪽 값이고 `dp[col-1]`은 왼쪽 값입니다.
