# Thao tác cơ bản trên đồ thị

Các thao tác phổ biến gồm thêm hoặc xóa đỉnh, thêm hoặc xóa cạnh, và truy vấn các đỉnh kề.

## Dùng ma trận kề

Thêm hoặc xóa cạnh chỉ cập nhật một hoặc hai ô. Thêm đỉnh cần mở rộng mọi hàng và thêm một hàng mới; xóa đỉnh phải loại bỏ cả hàng lẫn cột.

![Thêm cạnh trong ma trận kề](graph_operations.assets/adjacency_matrix_step2_add_edge.png)

## Dùng danh sách kề

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

![Thêm cạnh trong danh sách kề](graph_operations.assets/adjacency_list_step2_add_edge.png)

Danh sách kề thường hiệu quả hơn với đồ thị thưa. Ma trận kề phù hợp khi đồ thị dày hoặc cần truy vấn cạnh liên tục.
