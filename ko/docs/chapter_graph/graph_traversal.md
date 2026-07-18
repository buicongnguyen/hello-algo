# 그래프 순회

그래프 순회에서는 사이클 때문에 무한 반복하지 않도록 방문한 정점 집합을 기록해야 합니다.

## 너비 우선 탐색

BFS는 큐를 사용해 간선 거리가 가까운 순서로 탐색합니다. 가중치가 없는 그래프에서는 간선 수가 가장 적은 경로를 찾습니다.

```python
from collections import deque

def graph_bfs(graph, start):
    queue = deque([start])
    visited = {start}
    order = []
    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order
```

![BFS 순회](graph_traversal.assets/graph_bfs.png)

## 깊이 우선 탐색

DFS는 한 경로를 끝까지 따라간 뒤 되돌아갑니다. 재귀나 명시적 스택으로 구현할 수 있습니다.

```python
def graph_dfs(graph, vertex, visited=None, order=None):
    visited = set() if visited is None else visited
    order = [] if order is None else order
    visited.add(vertex)
    order.append(vertex)
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            graph_dfs(graph, neighbor, visited, order)
    return order
```

![DFS 순회](graph_traversal.assets/graph_dfs.png)

인접 리스트에서 BFS와 DFS는 모두 $O(n + m)$ 시간과 $O(n)$ 공간을 사용합니다.
