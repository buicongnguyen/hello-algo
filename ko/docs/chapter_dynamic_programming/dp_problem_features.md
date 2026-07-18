# 동적 계획법 문제의 특징

동적 계획법에 적합한 문제는 보통 세 가지 특징을 가집니다.

## 겹치는 하위 문제

여러 재귀 가지가 같은 상태를 요구합니다. 상태를 저장하면 각 하위 문제를 한 번만 풉니다.

## 최적 부분 구조

큰 문제의 최적해를 하위 문제의 최적해로 구성할 수 있습니다.

![계단 오르기 최소 비용](dp_problem_features.assets/min_cost_cs_example.png)

$$
dp[i] = \min(dp[i-1], dp[i-2]) + cost[i]
$$

## 무후효성

미래는 현재 상태에만 의존하며 그 상태에 도달한 전체 과거에는 의존하지 않습니다. 과거 정보가 필요하다면 상태 정의에 포함해야 합니다.

![제약을 포함한 상태 전이](dp_problem_features.assets/climbing_stairs_constraint_state_transfer.png)
