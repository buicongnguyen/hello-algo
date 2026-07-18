# Cây AVL

Cây AVL là BST tự cân bằng. Với mỗi nút, chênh lệch chiều cao giữa cây con trái và phải không vượt quá 1. Hệ số cân bằng được tính bằng chiều cao cây trái trừ chiều cao cây phải.

![Các trường hợp xoay AVL](avl_tree.assets/avltree_rotation_cases.png)

## Phép xoay

- Lệch trái-trái: xoay phải.
- Lệch phải-phải: xoay trái.
- Lệch trái-phải: xoay trái nút con rồi xoay phải nút gốc.
- Lệch phải-trái: xoay phải nút con rồi xoay trái nút gốc.

```python
def height(node):
    return -1 if node is None else node.height

def update_height(node):
    node.height = max(height(node.left), height(node.right)) + 1

def balance_factor(node):
    return height(node.left) - height(node.right)
```

Sau khi chèn hoặc xóa như BST, cập nhật chiều cao từ dưới lên và xoay tại nút mất cân bằng đầu tiên. Nhờ duy trì chiều cao $O(\log n)$, tìm kiếm, chèn và xóa đều có độ phức tạp $O(\log n)$.
