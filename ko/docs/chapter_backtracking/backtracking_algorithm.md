# 백트래킹 알고리즘

백트래킹은 결정 트리를 깊이 우선으로 탐색합니다. 상태는 지금까지의 선택을 나타내고 각 간선은 새로운 선택을 뜻합니다.

![전위 순회로 노드 찾기](backtracking_algorithm.assets/preorder_find_nodes.png)

## 시도와 되돌리기

각 반복은 선택, 상태 갱신, 재귀 호출 뒤의 되돌리기로 구성됩니다. 되돌리기는 상태를 시도 직전과 정확히 같게 복구해야 합니다.

```python
def backtrack(state, choices, result):
    if is_solution(state):
        result.append(state.copy())
        return
    for choice in choices:
        if is_valid(state, choice):
            state.append(choice)
            backtrack(state, choices, result)
            state.pop()
```

## 가지치기

제약 조건을 이용하면 유효한 해로 이어질 수 없는 가지를 일찍 버려 탐색 상태 수를 크게 줄일 수 있습니다.

![제약 조건에 따른 가지치기](backtracking_algorithm.assets/preorder_find_constrained_paths.png)

백트래킹은 모델이 직관적이고 모든 해를 찾을 수 있지만 최악의 경우 지수 시간이 걸립니다. 선택 순서와 가지치기 조건이 실제 성능을 좌우합니다.
