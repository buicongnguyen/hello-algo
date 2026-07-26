# 그래프 순회

트리는 일대다 관계를 나타내지만 그래프는 자유도가 더 높아 모든 다대다 관계를 표현할 수 있습니다. 따라서 트리는 그래프의 특수한 형태로 볼 수 있습니다. **트리 순회 역시 그래프 순회의 특수한 경우입니다.**

트리와 그래프 모두 순회를 위해 탐색 알고리즘을 사용합니다. 그래프 순회는 <u>너비 우선 탐색</u>과 <u>깊이 우선 탐색</u>으로 나뉩니다.

## 너비 우선 탐색

**너비 우선 탐색(BFS)은 가까운 곳에서 먼 곳으로 진행합니다. 한 정점에서 시작하여 가장 가까운 정점을 먼저 방문하고 바깥쪽으로 한 층씩 확장합니다.** 그림에서는 왼쪽 위 정점에서 시작해 먼저 그 정점과 인접한 모든 정점을 방문한 뒤, 다음 정점의 인접 정점으로 이어 가며 전체 그래프를 방문합니다.

![그래프의 너비 우선 탐색](graph_traversal.assets/graph_bfs.png)

### 알고리즘 구현

BFS는 보통 큐를 사용합니다. 큐의 선입선출 성질이 가까운 곳에서 먼 곳으로 진행하는 방식과 잘 맞습니다.

1. 시작 정점 `startVet`을 큐에 넣고 반복을 시작합니다.
2. 매 반복에서 큐의 맨 앞 정점을 꺼내 방문했다고 기록한 뒤, 아직 방문하지 않은 모든 인접 정점을 큐의 뒤에 넣습니다.
3. 방문할 정점이 남지 않을 때까지 `2.`단계를 반복합니다.

같은 정점을 다시 방문하지 않도록 해시 집합 `visited`에 방문한 정점을 기록합니다.

!!! tip

    해시 집합은 `value` 없이 `key`만 저장하는 해시 테이블로 볼 수 있습니다. `key` 삽입, 삭제, 조회, 갱신은 $O(1)$이 걸립니다. 각 `key`가 고유하므로 해시 집합은 중복 데이터를 제거할 때 자주 사용됩니다.

```python
# 잠긴 원문의 BFS 구현이 이 위치에 삽입됩니다.
```

코드는 비교적 추상적이므로 다음 각 상태에서 큐와 `visited`의 내용을 함께 확인해 보세요.

**1단계**

![BFS 1단계](graph_traversal.assets/graph_bfs_step1.png)

**2단계**

![BFS 2단계](graph_traversal.assets/graph_bfs_step2.png)

**3단계**

![BFS 3단계](graph_traversal.assets/graph_bfs_step3.png)

**4단계**

![BFS 4단계](graph_traversal.assets/graph_bfs_step4.png)

**5단계**

![BFS 5단계](graph_traversal.assets/graph_bfs_step5.png)

**6단계**

![BFS 6단계](graph_traversal.assets/graph_bfs_step6.png)

**7단계**

![BFS 7단계](graph_traversal.assets/graph_bfs_step7.png)

**8단계**

![BFS 8단계](graph_traversal.assets/graph_bfs_step8.png)

**9단계**

![BFS 9단계](graph_traversal.assets/graph_bfs_step9.png)

**10단계**

![BFS 10단계](graph_traversal.assets/graph_bfs_step10.png)

**11단계**

![BFS 11단계](graph_traversal.assets/graph_bfs_step11.png)

!!! question "너비 우선 순회 순서는 유일한가요?"

    아닙니다. BFS는 가까운 곳에서 먼 곳으로 방문하는 순서만 요구하며, **거리가 같은 정점들의 순서는 자유롭게 달라질 수 있습니다.** 그림에서 정점 $1$과 $3$의 방문 순서를 바꿀 수 있고, 정점 $2$, $4$, $6$의 순서도 마찬가지입니다.

### 복잡도 분석

**시간 복잡도**: 모든 정점은 큐에 한 번 들어가고 한 번 나오므로 $O(|V|)$이 걸립니다. 무방향 그래프에서 인접 정점을 순회할 때 각 간선은 $2$번 방문되므로 $O(2|E|)$이 걸립니다. 합계는 $O(|V| + |E|)$입니다.

**공간 복잡도**: 목록 `res`, 집합 `visited`, 큐 `que`에는 최대 $|V|$개의 정점이 들어가므로 $O(|V|)$ 공간을 사용합니다.

## 깊이 우선 탐색

**깊이 우선 탐색(DFS)은 한 경로에서 가능한 한 멀리 먼저 이동하고, 더 갈 곳이 없으면 되돌아갑니다.** 그림에서는 왼쪽 위 정점에서 시작해 현재 정점의 인접 정점 하나를 방문하고 막다른 곳까지 계속 진행합니다. 이후 가장 가까운 갈림길로 돌아가 다른 방향을 시도하며 모든 정점을 방문할 때까지 반복합니다.

![그래프의 깊이 우선 탐색](graph_traversal.assets/graph_dfs.png)

### 알고리즘 구현

“가장 깊이 갔다가 돌아오기”는 보통 재귀로 구현합니다. BFS와 마찬가지로 DFS도 해시 집합 `visited`에 방문한 정점을 기록하여 사이클을 계속 도는 일을 막습니다.

```python
# 잠긴 원문의 DFS 구현이 이 위치에 삽입됩니다.
```

다음 그림에서:

- **직선 점선은 재귀가 아래로 진행함**을 나타냅니다. 새 호출이 시작되어 새 정점을 방문합니다.
- **곡선 점선은 위로 되돌아감**을 나타냅니다. 재귀 호출이 끝나 호출한 곳으로 반환됩니다.

그림과 코드를 함께 보며 각 호출이 언제 시작되고, 어떤 정점이 표시되며, 언제 반환되는지 전체 과정을 따라가 보세요.

**1단계**

![DFS 1단계](graph_traversal.assets/graph_dfs_step1.png)

**2단계**

![DFS 2단계](graph_traversal.assets/graph_dfs_step2.png)

**3단계**

![DFS 3단계](graph_traversal.assets/graph_dfs_step3.png)

**4단계**

![DFS 4단계](graph_traversal.assets/graph_dfs_step4.png)

**5단계**

![DFS 5단계](graph_traversal.assets/graph_dfs_step5.png)

**6단계**

![DFS 6단계](graph_traversal.assets/graph_dfs_step6.png)

**7단계**

![DFS 7단계](graph_traversal.assets/graph_dfs_step7.png)

**8단계**

![DFS 8단계](graph_traversal.assets/graph_dfs_step8.png)

**9단계**

![DFS 9단계](graph_traversal.assets/graph_dfs_step9.png)

**10단계**

![DFS 10단계](graph_traversal.assets/graph_dfs_step10.png)

**11단계**

![DFS 11단계](graph_traversal.assets/graph_dfs_step11.png)

!!! question "깊이 우선 순회 순서는 유일한가요?"

    아닙니다. 한 정점에서 아직 방문하지 않은 어느 방향을 먼저 선택해도 됩니다. 즉 인접 정점의 순서를 바꾸어도 여전히 DFS입니다.

    트리 순회를 예로 들면 “루트 $\rightarrow$ 왼쪽 $\rightarrow$ 오른쪽”, “왼쪽 $\rightarrow$ 루트 $\rightarrow$ 오른쪽”, “왼쪽 $\rightarrow$ 오른쪽 $\rightarrow$ 루트”는 각각 전위, 중위, 후위 순회입니다. 우선순위는 다르지만 모두 깊이 우선 탐색입니다.

### 복잡도 분석

**시간 복잡도**: 모든 정점은 $1$번 방문되어 $O(|V|)$이 걸리고, 모든 간선은 $2$번 방문되어 $O(2|E|)$이 걸립니다. 합계는 $O(|V| + |E|)$입니다.

**공간 복잡도**: 목록 `res`와 집합 `visited`에는 최대 $|V|$개의 정점이 들어가며, 최대 재귀 깊이도 $|V|$이므로 $O(|V|)$ 공간을 사용합니다.

BFS와 DFS의 방문 표시 시점도 정확성에 영향을 줍니다. BFS에서는 정점을 큐에 넣을 때 바로 방문 표시를 해야 여러 이웃이 같은 정점을 중복해서 큐에 넣지 않습니다. DFS에서는 재귀 호출에 들어가기 전에 표시하여 사이클을 따라 즉시 원래 정점으로 돌아오는 일을 막습니다. 표시 시점을 늦추면 최종 도달 집합은 같더라도 불필요한 작업과 메모리 사용이 크게 늘 수 있습니다.

두 탐색은 모든 도달 가능한 정점을 찾지만 목적에 따라 선택이 달라집니다. 가중치가 없는 그래프에서 시작점으로부터 간선 수가 가장 적은 경로를 찾을 때는 층별로 진행하는 BFS가 적합합니다. 경로 하나를 깊게 탐색하거나 재귀적 구조, 사이클 검사, 위상 관계를 다룰 때는 DFS가 자연스럽습니다. 그래프가 비연결이면 바깥 반복문으로 아직 방문하지 않은 정점을 찾아 새 순회를 시작해야 전체 그래프를 덮을 수 있습니다.
