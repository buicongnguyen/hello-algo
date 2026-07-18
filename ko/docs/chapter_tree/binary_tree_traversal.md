# 이진 트리 순회

트리 순회는 모든 노드를 한 번씩 방문합니다. 대표적인 방법은 큐를 사용하는 레벨 순회와 재귀 또는 스택을 사용하는 깊이 우선 순회입니다.

## 레벨 순회

![너비 우선 순회](binary_tree_traversal.assets/binary_tree_bfs.png)

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

## 깊이 우선 순회

![깊이 우선 순회](binary_tree_traversal.assets/binary_tree_dfs.png)

- 전위 순회: 루트, 왼쪽, 오른쪽.
- 중위 순회: 왼쪽, 루트, 오른쪽.
- 후위 순회: 왼쪽, 오른쪽, 루트.

각 순회의 시간 복잡도는 $O(n)$입니다. 보조 공간은 트리 높이 또는 한 레벨의 최대 너비에 따라 달라집니다.
