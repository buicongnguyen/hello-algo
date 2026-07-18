# 그래프의 기본 연산

대표적인 그래프 연산은 정점 추가·삭제, 간선 추가·삭제, 인접 정점 조회입니다.

## 인접 행렬 사용

간선 추가나 삭제는 한두 개의 행렬 원소만 갱신합니다. 정점을 추가하려면 모든 행을 확장하고 새 행을 넣어야 하며, 정점을 삭제할 때는 행과 열을 함께 제거해야 합니다.

![인접 행렬에 간선 추가](graph_operations.assets/adjacency_matrix_step2_add_edge.png)

## 인접 리스트 사용

```python
class GraphAdjList:
    def __init__(self):
        self.adj = {}

    def add_vertex(self, vertex):
        self.adj.setdefault(vertex, set())

    def add_edge(self, a, b):
        self.add_vertex(a)
        self.add_vertex(b)
        self.adj[a].add(b)
        self.adj[b].add(a)

    def remove_edge(self, a, b):
        self.adj.get(a, set()).discard(b)
        self.adj.get(b, set()).discard(a)
```

![인접 리스트에 간선 추가](graph_operations.assets/adjacency_list_step2_add_edge.png)

인접 리스트는 보통 희소 그래프에 효율적입니다. 인접 행렬은 그래프가 조밀하거나 간선 존재 여부를 자주 조회할 때 유리합니다.
