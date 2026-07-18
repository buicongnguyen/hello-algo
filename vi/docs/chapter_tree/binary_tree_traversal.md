# Duyệt cây nhị phân

Duyệt cây thăm mỗi nút đúng một lần. Hai nhóm chính là duyệt theo mức bằng hàng đợi và duyệt theo chiều sâu bằng đệ quy hoặc ngăn xếp.

## Duyệt theo mức

![Duyệt theo chiều rộng](binary_tree_traversal.assets/binary_tree_bfs.png)

```python
from collections import deque

def level_order(root):
    if root is None:
        return []
    queue, result = deque([root]), []
    while queue:
        node = queue.popleft()
        result.append(node.value)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result
```

## Duyệt theo chiều sâu

![Duyệt theo chiều sâu](binary_tree_traversal.assets/binary_tree_dfs.png)

- Tiền thứ tự: gốc, trái, phải.
- Trung thứ tự: trái, gốc, phải.
- Hậu thứ tự: trái, phải, gốc.

Mỗi cách duyệt có độ phức tạp thời gian $O(n)$. Không gian phụ thuộc vào chiều cao cây hoặc độ rộng lớn nhất của một tầng.
