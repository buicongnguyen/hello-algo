# AVL 트리

AVL 트리는 스스로 균형을 유지하는 BST입니다. 모든 노드에서 왼쪽과 오른쪽 서브트리의 높이 차이는 1을 넘지 않습니다. 균형 인수는 왼쪽 높이에서 오른쪽 높이를 뺀 값입니다.

![AVL 회전 경우](avl_tree.assets/avltree_rotation_cases.png)

## 회전

- 왼쪽-왼쪽 불균형: 오른쪽 회전.
- 오른쪽-오른쪽 불균형: 왼쪽 회전.
- 왼쪽-오른쪽 불균형: 자식을 왼쪽 회전한 뒤 루트를 오른쪽 회전.
- 오른쪽-왼쪽 불균형: 자식을 오른쪽 회전한 뒤 루트를 왼쪽 회전.

```python
def height(node):
    return -1 if node is None else node.height

def update_height(node):
    node.height = max(height(node.left), height(node.right)) + 1

def balance_factor(node):
    return height(node.left) - height(node.right)
```

BST 방식으로 삽입하거나 삭제한 뒤 아래에서 위로 높이를 갱신하고 불균형 노드를 회전합니다. 높이가 $O(\log n)$으로 유지되므로 탐색, 삽입, 삭제도 모두 $O(\log n)$입니다.
