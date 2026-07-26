# 완전 배낭 문제

이 절에서는 또 하나의 대표적인 배낭 문제인 완전 배낭을 풀고, 그 특수한 형태인 동전 교환 문제를 살펴봅니다.

## 완전 배낭 문제

!!! question

    $n$종류의 물건이 있습니다. $i$번째 물건의 무게는 $wgt[i-1]$, 가치는 $val[i-1]$이며 배낭의 용량은 $cap$입니다. **각 종류의 물건을 여러 번 선택할 수 있습니다.** 용량을 넘지 않으면서 담을 수 있는 가치의 최댓값은 얼마입니까? 예제 데이터는 아래 그림과 같습니다.

![완전 배낭 문제의 예제 데이터](unbounded_knapsack_problem.assets/unbounded_knapsack_example.png)

### 동적 계획법

완전 배낭은 0-1 배낭과 매우 비슷하며, **한 종류의 물건을 선택할 수 있는 횟수에 제한이 없다는 점만 다릅니다**.

- 0-1 배낭에서는 각 종류의 물건이 하나뿐이므로 물건 $i$를 선택한 뒤에는 앞의 $i-1$개 물건에서만 다시 선택할 수 있습니다.
- 완전 배낭에서는 각 종류의 수량이 무제한이므로 물건 $i$를 선택한 뒤에도 **앞의 $i$개 물건 안에서 계속 선택할 수 있습니다**.

완전 배낭의 규칙에 따라 상태 $[i, c]$에는 두 전이 경우가 있습니다.

- **물건 $i$를 선택하지 않음**: 0-1 배낭과 마찬가지로 $[i-1, c]$로 전이됩니다.
- **물건 $i$를 선택함**: 0-1 배낭과 달리 $[i, c-wgt[i-1]]$로 전이됩니다.

상태 전이 방정식은 다음과 같습니다.

$$
dp[i, c] = \max(dp[i-1, c], dp[i, c - wgt[i-1]] + val[i-1])
$$

### 코드 구현

0-1 배낭 코드와 비교하면 상태 전이의 $i-1$이 $i$로 바뀌는 한 부분만 다르고 나머지는 같습니다.

```python
# 잠긴 원문의 13개 언어 완전 배낭 동적 계획법 공식 코드가 이 위치에 삽입됩니다.
```

### 공간 최적화

현재 상태는 왼쪽과 위쪽 상태에서 전이되므로 **공간 최적화 뒤에는 $dp$ 테이블의 각 행을 정방향으로 순회해야 합니다**.

이 순서는 0-1 배낭과 정확히 반대입니다. 다음 단계 그림이 그 차이를 보여 줍니다.

=== "<1>"
    ![완전 배낭 공간 최적화 1단계](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step1.png)

=== "<2>"
    ![완전 배낭 공간 최적화 2단계](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step2.png)

=== "<3>"
    ![완전 배낭 공간 최적화 3단계](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step3.png)

=== "<4>"
    ![완전 배낭 공간 최적화 4단계](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step4.png)

=== "<5>"
    ![완전 배낭 공간 최적화 5단계](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step5.png)

=== "<6>"
    ![완전 배낭 공간 최적화 6단계](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step6.png)

코드는 단순합니다. 배열 `dp`의 첫 번째 차원을 제거하면 됩니다.

```python
# 잠긴 원문의 13개 언어 공간 최적화 완전 배낭 공식 코드가 이 위치에 삽입됩니다.
```

## 동전 교환 문제

배낭 문제는 넓은 동적 계획법 문제군을 대표하며 다양한 변형을 가집니다. 동전 교환도 그중 하나입니다.

!!! question

    $n$종류의 동전이 있고 $i$번째 동전의 액면가는 $coins[i - 1]$이며 목표 금액은 $amt$입니다. **각 종류의 동전을 여러 번 선택할 수 있습니다.** 목표 금액을 정확히 만드는 데 필요한 동전의 최소 개수는 얼마입니까? 만들 수 없다면 $-1$을 반환하세요. 예제 데이터는 아래 그림과 같습니다.

![동전 교환 문제의 예제 데이터](unbounded_knapsack_problem.assets/coin_change_example.png)

### 동적 계획법

**동전 교환은 완전 배낭의 특수한 경우로 볼 수 있습니다.** 두 문제의 대응 관계와 차이는 다음과 같습니다.

- “물건”은 “동전”, “무게”는 “액면가”, “배낭 용량”은 “목표 금액”에 대응합니다.
- 최적화 방향이 반대입니다. 완전 배낭은 물건의 가치를 최대화하지만 동전 교환은 동전 수를 최소화합니다.
- 완전 배낭은 용량을 “넘지 않는” 해를 찾지만 동전 교환은 목표 금액을 “정확히 만드는” 해를 요구합니다.

**1단계: 각 차례의 결정을 살펴보고 상태를 정의한 뒤 $dp$ 테이블을 만듭니다**

상태 $[i, a]$는 **앞의 $i$종류 동전으로 금액 $a$를 만드는 데 필요한 최소 동전 수**라는 하위 문제에 대응하며 $dp[i, a]$로 표시합니다.

이차원 $dp$ 테이블의 크기는 $(n+1) \times (amt+1)$입니다.

**2단계: 최적 부분 구조를 찾고 상태 전이 방정식을 유도합니다**

상태 전이 방정식은 완전 배낭과 두 가지 점에서 다릅니다.

- 최솟값을 찾으므로 연산자 $\max()$가 $\min()$으로 바뀝니다.
- 물건 가치가 아니라 동전 수가 목표이므로 동전을 하나 선택할 때 $1$만 더합니다.

$$
dp[i, a] = \min(dp[i-1, a], dp[i, a - coins[i-1]] + 1)
$$

**3단계: 경계 조건과 상태 전이 순서를 결정합니다**

목표 금액이 $0$이면 필요한 최소 동전 수는 $0$이므로 첫 번째 열의 모든 $dp[i, 0]$을 $0$으로 둡니다.

동전이 없으면 **$0$보다 큰 어떤 금액도 만들 수 없으므로** 해가 유효하지 않습니다. 함수 $\min()$이 이런 상태를 구분해 제외하도록 $+\infty$로 표시하고, 첫 번째 행의 모든 $dp[0, a]$를 $+\infty$로 둡니다.

### 코드 구현

대부분의 언어는 정수형에 $+\infty$ 값을 제공하지 않아 `int`의 최댓값을 대신 사용할 수밖에 없습니다. 하지만 상태 전이에서 $+ 1$을 수행하면 정수 오버플로가 생길 수 있습니다.

따라서 $amt + 1$을 유효하지 않은 해의 표시로 사용합니다. 금액 $amt$를 만드는 데 필요한 동전 수는 최대 $amt$개를 넘지 않기 때문입니다. 반환 전에 $dp[n, amt]$가 $amt + 1$인지 확인하고, 그렇다면 목표 금액을 만들 수 없다는 뜻으로 $-1$을 반환합니다.

```python
# 잠긴 원문의 13개 언어 동전 교환 동적 계획법 공식 코드가 이 위치에 삽입됩니다.
```

다음 단계 그림은 완전 배낭과 매우 비슷한 동전 교환의 동적 계획 과정을 보여 줍니다.

=== "<1>"
    ![동전 교환 동적 계획법 1단계](unbounded_knapsack_problem.assets/coin_change_dp_step1.png)

=== "<2>"
    ![동전 교환 동적 계획법 2단계](unbounded_knapsack_problem.assets/coin_change_dp_step2.png)

=== "<3>"
    ![동전 교환 동적 계획법 3단계](unbounded_knapsack_problem.assets/coin_change_dp_step3.png)

=== "<4>"
    ![동전 교환 동적 계획법 4단계](unbounded_knapsack_problem.assets/coin_change_dp_step4.png)

=== "<5>"
    ![동전 교환 동적 계획법 5단계](unbounded_knapsack_problem.assets/coin_change_dp_step5.png)

=== "<6>"
    ![동전 교환 동적 계획법 6단계](unbounded_knapsack_problem.assets/coin_change_dp_step6.png)

=== "<7>"
    ![동전 교환 동적 계획법 7단계](unbounded_knapsack_problem.assets/coin_change_dp_step7.png)

=== "<8>"
    ![동전 교환 동적 계획법 8단계](unbounded_knapsack_problem.assets/coin_change_dp_step8.png)

=== "<9>"
    ![동전 교환 동적 계획법 9단계](unbounded_knapsack_problem.assets/coin_change_dp_step9.png)

=== "<10>"
    ![동전 교환 동적 계획법 10단계](unbounded_knapsack_problem.assets/coin_change_dp_step10.png)

=== "<11>"
    ![동전 교환 동적 계획법 11단계](unbounded_knapsack_problem.assets/coin_change_dp_step11.png)

=== "<12>"
    ![동전 교환 동적 계획법 12단계](unbounded_knapsack_problem.assets/coin_change_dp_step12.png)

=== "<13>"
    ![동전 교환 동적 계획법 13단계](unbounded_knapsack_problem.assets/coin_change_dp_step13.png)

=== "<14>"
    ![동전 교환 동적 계획법 14단계](unbounded_knapsack_problem.assets/coin_change_dp_step14.png)

=== "<15>"
    ![동전 교환 동적 계획법 15단계](unbounded_knapsack_problem.assets/coin_change_dp_step15.png)

### 공간 최적화

동전 교환의 공간 최적화는 완전 배낭과 같은 방식으로 처리합니다.

```python
# 잠긴 원문의 13개 언어 공간 최적화 동전 교환 공식 코드가 이 위치에 삽입됩니다.
```

## 동전 교환 II

!!! question

    $n$종류의 동전이 있고 $i$번째 종류의 액면가는 $coins[i - 1]$, 목표 금액은 $amt$입니다. 각 종류를 여러 번 선택할 수 있습니다. **목표 금액을 정확히 만드는 동전 조합은 몇 가지입니까?** 예제 데이터는 아래 그림과 같습니다.

![동전 교환 II의 예제 데이터](unbounded_knapsack_problem.assets/coin_change_ii_example.png)

### 동적 계획법

앞 문제와 달리 목표는 조합 수를 세는 것입니다. 하위 문제는 **앞의 $i$종류 동전으로 금액 $a$를 만드는 조합 수**가 됩니다. $dp$ 테이블은 여전히 $(n+1) \times (amt + 1)$ 크기의 이차원 행렬입니다.

현재 상태의 조합 수는 현재 동전을 선택하지 않는 경우와 선택하는 경우의 조합 수를 더한 값입니다.

$$
dp[i, a] = dp[i-1, a] + dp[i, a - coins[i-1]]
$$

목표 금액이 $0$이면 동전을 하나도 선택하지 않는 한 가지 방법으로 정확히 만들 수 있으므로 첫 번째 열의 모든 $dp[i, 0]$을 $1$로 초기화합니다. 동전이 없으면 $0$보다 큰 어떤 금액도 만들 수 없으므로 첫 번째 행의 모든 $dp[0, a]$는 $0$입니다.

### 코드 구현

```python
# 잠긴 원문의 13개 언어 동전 교환 II 동적 계획법 공식 코드가 이 위치에 삽입됩니다.
```

### 공간 최적화

공간 최적화도 같은 방식으로 동전 종류 차원을 제거합니다.

```python
# 잠긴 원문의 13개 언어 공간 최적화 동전 교환 II 공식 코드가 이 위치에 삽입됩니다.
```
