# Cây tìm kiếm nhị phân

Cây tìm kiếm nhị phân (BST) thỏa ba điều kiện: mọi khóa trong cây con trái nhỏ hơn khóa của nút, mọi khóa trong cây con phải lớn hơn, và hai cây con cũng là BST.

![Cây tìm kiếm nhị phân](binary_search_tree.assets/binary_search_tree.png)

## Tìm kiếm và chèn

```python
def search(root, target):
    node = root
    while node:
        if node.value == target:
            return node
        node = node.left if target < node.value else node.right
    return None
```

Khi chèn, đi theo cùng quy tắc so sánh cho tới một tham chiếu rỗng rồi gắn nút mới tại đó.

## Xóa

- Nút lá: xóa trực tiếp.
- Nút có một con: thay nút bằng nút con.
- Nút có hai con: thay giá trị bằng nút kế tiếp theo thứ tự trung thứ tự, rồi xóa nút kế tiếp đó.

## Hiệu năng

Duyệt trung thứ tự tạo dãy tăng dần. Thao tác tìm, chèn và xóa có chi phí trung bình $O(\log n)$, nhưng có thể suy biến thành $O(n)$ nếu cây lệch hẳn về một phía.

![BST bị suy biến](binary_search_tree.assets/bst_degradation.png)
