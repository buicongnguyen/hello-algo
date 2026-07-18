# 이진 트리 구성 문제

중복 키가 없는 전위 순회와 중위 순회가 주어지면 트리를 유일하게 복원할 수 있습니다. 전위 순회의 첫 원소가 루트이고, 중위 순회에서 루트 위치가 왼쪽과 오른쪽 서브트리를 나눕니다.

![전위·중위 순회 분할](build_binary_tree_problem.assets/build_tree_preorder_inorder_division.png)

```python
def build_tree(preorder, inorder):
    positions = {value: i for i, value in enumerate(inorder)}

    def build(pre_left, pre_right, in_left, in_right):
        if pre_left > pre_right:
            return None
        root_value = preorder[pre_left]
        root = TreeNode(root_value)
        middle = positions[root_value]
        left_size = middle - in_left
        root.left = build(pre_left + 1, pre_left + left_size, in_left, middle - 1)
        root.right = build(pre_left + left_size + 1, pre_right, middle + 1, in_right)
        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)
```

위치 맵을 만들면 $O(n)$ 시간과 $O(n)$ 공간에 구성할 수 있습니다.
