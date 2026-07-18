# 하노이 탑 문제

$n$개의 원판을 출발 기둥에서 목표 기둥으로 옮기되 한 번에 하나만 이동하고 큰 원판을 작은 원판 위에 놓지 않습니다.

![하노이 탑 예제](hanota_problem.assets/hanota_example.png)

전략은 $n-1$개를 보조 기둥으로 옮기고, 가장 큰 원판을 목표로 옮긴 뒤, $n-1$개를 보조 기둥에서 목표로 옮기는 것입니다.

```python
def hanoi(n, source, buffer, target, moves):
    if n == 0:
        return
    hanoi(n - 1, source, target, buffer, moves)
    moves.append((source, target))
    hanoi(n - 1, buffer, source, target, moves)
```

이동 횟수는 $T(n) = 2T(n-1) + 1$이므로 $2^n - 1$입니다. 같은 두 하위 문제를 중앙 연산 주위에서 결합하는 구조를 보여 줍니다.

![하노이 탑 재귀 트리](hanota_problem.assets/hanota_recursive_tree.png)
