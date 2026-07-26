# 편집 거리 문제

편집 거리는 레벤슈타인 거리라고도 하며, 한 문자열을 다른 문자열로 바꾸는 데 필요한 최소 편집 횟수입니다. 정보 검색과 자연어 처리에서 두 문자열의 유사도를 측정할 때 널리 사용됩니다.

문제의 표기에서 원본 문자열은 $s$, 목표 문자열은 $t$이며, $dp$ 테이블은 두 문자열의 모든 접두사 쌍에 대한 해를 저장합니다.

!!! question

    두 문자열 $s$와 $t$가 주어질 때 $s$를 $t$로 바꾸는 데 필요한 최소 편집 횟수를 반환하세요.

    가능한 연산은 문자 하나 삽입, 문자 하나 삭제, 한 문자를 다른 문자로 교체하는 세 가지입니다.

아래 그림처럼 `kitten`을 `sitting`으로 바꾸려면 교체 2회와 삽입 1회, 모두 3회의 편집이 필요합니다. `hello`를 `algo`로 바꾸는 데도 교체 2회와 삭제 1회, 모두 3단계가 필요합니다.

문자열 $s$와 $t$를 뒤에서부터 비교할 때 현재 끝 문자는 각각 $s[n-1]$과 $t[m-1]$입니다. 이 두 위치를 기준으로 연산을 선택하면 각 선택 뒤에 남는 문제가 더 짧은 접두사 쌍으로 줄어듭니다.

![편집 거리 예제 데이터](edit_distance_problem.assets/edit_distance_example.png)

**편집 거리 문제는 의사 결정 트리 모형으로 자연스럽게 설명할 수 있습니다.** 각 문자열은 노드이고 각 편집 연산은 간선입니다.

연산을 제한하지 않으면 한 노드에서 많은 간선이 뻗을 수 있으며, 각 간선이 하나의 편집이므로 `hello`를 `algo`로 바꾸는 경로는 여러 개입니다.

의사 결정 트리의 관점에서 목표는 노드 `hello`와 노드 `algo` 사이의 최단 경로를 찾는 것입니다.

![의사 결정 트리로 표현한 편집 거리](edit_distance_problem.assets/edit_distance_decision_tree.png)

### 동적 계획법

**1단계: 각 차례의 결정을 살펴보고 상태를 정의한 뒤 $dp$ 테이블을 만듭니다**

매 차례 문자열 $s$에 하나의 편집 연산을 적용합니다.

연산을 수행할 때마다 문제 크기가 줄어 하위 문제가 되도록 구성해야 합니다. $s$와 $t$의 길이를 각각 $n$, $m$이라고 하고 두 문자열의 마지막 문자 $s[n-1]$과 $t[m-1]$부터 살펴봅니다.

- $s[n-1]$과 $t[m-1]$이 같다면 두 문자를 건너뛰고 바로 $s[n-2]$와 $t[m-2]$를 비교합니다.
- 두 문자가 다르면 $s$에 삽입, 삭제, 교체 가운데 하나를 수행하여 마지막 문자를 같게 만든 뒤, 두 문자를 건너뛰고 더 작은 문제를 풉니다.

$s$에 대한 각 편집 결정은 두 문자열에서 아직 맞춰야 할 문자 수를 바꿉니다. 따라서 상태는 두 문자열에서 현재 고려하는 문자 수 $i$, $j$이며 $[i, j]$로 표시합니다.

상태 $[i, j]$는 **$s$의 앞 $i$개 문자를 $t$의 앞 $j$개 문자로 바꾸는 최소 편집 횟수**라는 하위 문제에 대응합니다.

따라서 크기가 $(i+1) \times (j+1)$인 이차원 $dp$ 테이블을 만듭니다.

**2단계: 최적 부분 구조를 찾고 상태 전이 방정식을 유도합니다**

하위 문제 $dp[i, j]$에서 두 마지막 문자는 $s[i-1]$과 $t[j-1]$입니다. 세 편집 연산에 따라 다음 경우가 생깁니다.

1. $s[i-1]$ 뒤에 $t[j-1]$을 삽입하면 남는 문제는 $dp[i, j-1]$입니다.
2. $s[i-1]$을 삭제하면 남는 문제는 $dp[i-1, j]$입니다.
3. $s[i-1]$을 $t[j-1]$로 교체하면 남는 문제는 $dp[i-1, j-1]$입니다.

![편집 거리의 상태 전이](edit_distance_problem.assets/edit_distance_state_transfer.png)

최적 부분 구조는 다음과 같습니다. $dp[i, j]$의 최소 편집 횟수는 $dp[i, j-1]$, $dp[i-1, j]$, $dp[i-1, j-1]$ 중 가장 작은 값에 현재 편집 비용 $1$을 더한 값입니다.

$$
dp[i, j] = \min(dp[i, j-1], dp[i-1, j], dp[i-1, j-1]) + 1
$$

단, **$s[i-1]$과 $t[j-1]$이 같으면 현재 문자를 편집할 필요가 없으므로** 방정식은 다음과 같습니다.

$$
dp[i, j] = dp[i-1, j-1]
$$

**3단계: 경계 조건과 상태 전이 순서를 결정합니다**

두 문자열이 모두 비어 있으면 편집 횟수는 $0$이므로 $dp[0, 0] = 0$입니다. $s$가 비어 있고 $t$가 비어 있지 않으면 최소 편집 횟수는 $t$의 길이이므로 첫 번째 행은 $dp[0, j] = j$입니다. $s$가 비어 있지 않고 $t$가 비어 있으면 최소 편집 횟수는 $s$의 길이이므로 첫 번째 열은 $dp[i, 0] = i$입니다.

상태 전이 방정식에서 $dp[i, j]$는 왼쪽, 위쪽, 왼쪽 위의 해에 의존합니다. 따라서 두 겹 반복문으로 표 전체를 정방향으로 순회할 수 있습니다.

### 코드 구현

```python
# 잠긴 원문의 13개 언어 편집 거리 동적 계획법 공식 코드가 이 위치에 삽입됩니다.
```

다음 단계 그림은 배낭 문제와 매우 비슷한 상태 전이 과정을 보여 줍니다. 두 문제 모두 이차원 격자를 채우는 과정입니다.

=== "<1>"
    ![편집 거리 동적 계획법 1단계](edit_distance_problem.assets/edit_distance_dp_step1.png)

=== "<2>"
    ![편집 거리 동적 계획법 2단계](edit_distance_problem.assets/edit_distance_dp_step2.png)

=== "<3>"
    ![편집 거리 동적 계획법 3단계](edit_distance_problem.assets/edit_distance_dp_step3.png)

=== "<4>"
    ![편집 거리 동적 계획법 4단계](edit_distance_problem.assets/edit_distance_dp_step4.png)

=== "<5>"
    ![편집 거리 동적 계획법 5단계](edit_distance_problem.assets/edit_distance_dp_step5.png)

=== "<6>"
    ![편집 거리 동적 계획법 6단계](edit_distance_problem.assets/edit_distance_dp_step6.png)

=== "<7>"
    ![편집 거리 동적 계획법 7단계](edit_distance_problem.assets/edit_distance_dp_step7.png)

=== "<8>"
    ![편집 거리 동적 계획법 8단계](edit_distance_problem.assets/edit_distance_dp_step8.png)

=== "<9>"
    ![편집 거리 동적 계획법 9단계](edit_distance_problem.assets/edit_distance_dp_step9.png)

=== "<10>"
    ![편집 거리 동적 계획법 10단계](edit_distance_problem.assets/edit_distance_dp_step10.png)

=== "<11>"
    ![편집 거리 동적 계획법 11단계](edit_distance_problem.assets/edit_distance_dp_step11.png)

=== "<12>"
    ![편집 거리 동적 계획법 12단계](edit_distance_problem.assets/edit_distance_dp_step12.png)

=== "<13>"
    ![편집 거리 동적 계획법 13단계](edit_distance_problem.assets/edit_distance_dp_step13.png)

=== "<14>"
    ![편집 거리 동적 계획법 14단계](edit_distance_problem.assets/edit_distance_dp_step14.png)

=== "<15>"
    ![편집 거리 동적 계획법 15단계](edit_distance_problem.assets/edit_distance_dp_step15.png)

### 공간 최적화

$dp[i, j]$는 위쪽 $dp[i-1, j]$, 왼쪽 $dp[i, j-1]$, 왼쪽 위 $dp[i-1, j-1]$에 의존합니다. 정방향으로 순회하면 왼쪽 위 상태 $dp[i-1, j-1]$을 잃고, 역방향으로 순회하면 왼쪽 상태 $dp[i, j-1]$을 먼저 만들 수 없습니다. 따라서 한 배열만으로는 어느 한 순서도 충분하지 않습니다.

변수 `leftup`에 왼쪽 위의 해 $dp[i-1, j-1]$을 임시로 저장하면 왼쪽과 위쪽 해만 배열에서 읽으면 됩니다. 이 상황은 완전 배낭과 비슷하므로 정방향으로 순회할 수 있습니다.

```python
# 잠긴 원문의 13개 언어 공간 최적화 편집 거리 공식 코드가 이 위치에 삽입됩니다.
```
