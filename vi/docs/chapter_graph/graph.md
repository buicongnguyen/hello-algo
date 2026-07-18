# Đồ thị

Đồ thị $G = (V, E)$ gồm tập đỉnh $V$ và tập cạnh $E$. Cạnh có thể vô hướng hoặc có hướng, có thể mang trọng số, và đồ thị có thể liên thông hoặc không liên thông.

![Quan hệ giữa danh sách liên kết, cây và đồ thị](graph.assets/linkedlist_tree_graph.png)

## Loại đồ thị và thuật ngữ

- Hai đỉnh nối bằng cạnh được gọi là kề nhau.
- Đường đi là chuỗi cạnh nối từ một đỉnh tới đỉnh khác.
- Bậc của đỉnh là số cạnh liên thuộc; đồ thị có hướng còn có bậc vào và bậc ra.

![Đồ thị có hướng và vô hướng](graph.assets/directed_graph.png)

## Ma trận kề

Ma trận kề dùng ma trận $n \times n$. Ô $(i, j)$ cho biết có cạnh từ đỉnh $i$ tới $j$ hay không. Tra cứu cạnh tốn $O(1)$ nhưng bộ nhớ là $O(n^2)$.

![Ma trận kề](graph.assets/adjacency_matrix.png)

## Danh sách kề

Danh sách kề chỉ lưu các cạnh thực sự tồn tại nên dùng $O(n + m)$ bộ nhớ với $m$ cạnh. Cách này phù hợp với đồ thị thưa nhưng kiểm tra một cạnh có thể phải duyệt danh sách láng giềng.

![Danh sách kề](graph.assets/adjacency_list.png)
