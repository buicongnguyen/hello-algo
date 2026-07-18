# Bài toán dựng cây nhị phân

Với thứ tự tiền thứ tự và trung thứ tự không chứa khóa trùng, có thể dựng lại cây duy nhất. Phần tử đầu của tiền thứ tự là gốc; vị trí gốc trong trung thứ tự chia cây con trái và phải.

![Chia tiền thứ tự và trung thứ tự](build_binary_tree_problem.assets/build_tree_preorder_inorder_division.png)

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

Lập bản đồ vị trí giúp thuật toán chạy trong $O(n)$ thời gian và dùng $O(n)$ bộ nhớ.
