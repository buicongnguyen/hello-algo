# Duyệt đồ thị

Duyệt đồ thị cần theo dõi tập đỉnh đã thăm để tránh lặp vô hạn trên chu trình.

## Duyệt theo chiều rộng

BFS dùng hàng đợi và khám phá theo khoảng cách cạnh tăng dần. Với đồ thị không trọng số, BFS tìm đường đi có ít cạnh nhất.

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

![Duyệt BFS](graph_traversal.assets/graph_bfs.png)

## Duyệt theo chiều sâu

DFS đi sâu theo một nhánh rồi quay lui. Có thể cài đặt bằng đệ quy hoặc ngăn xếp.

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

![Duyệt DFS](graph_traversal.assets/graph_dfs.png)

Với danh sách kề, cả BFS và DFS đều tốn $O(n + m)$ thời gian và $O(n)$ không gian.
