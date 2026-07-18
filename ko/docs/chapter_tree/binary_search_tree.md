# 이진 탐색 트리

이진 탐색 트리(BST)는 왼쪽 서브트리의 모든 키가 현재 키보다 작고, 오른쪽 서브트리의 모든 키가 더 크며, 두 서브트리도 같은 조건을 만족합니다.

![이진 탐색 트리](binary_search_tree.assets/binary_search_tree.png)

## 탐색과 삽입

```python
def search(root, target):
    node = root
    while node:
        if node.value == target:
            return node
        node = node.left if target < node.value else node.right
    return None
```

삽입할 때도 같은 비교 규칙을 따라 빈 참조까지 내려간 뒤 새 노드를 연결합니다.

## 삭제

- 리프 노드: 바로 삭제합니다.
- 자식이 하나인 노드: 해당 노드를 자식으로 대체합니다.
- 자식이 둘인 노드: 중위 순회 후속 노드의 값으로 대체한 뒤 그 후속 노드를 삭제합니다.

## 성능

중위 순회는 오름차순 결과를 만듭니다. 탐색, 삽입, 삭제의 평균 비용은 $O(\log n)$이지만 트리가 한쪽으로 치우치면 $O(n)$으로 퇴화할 수 있습니다.

![퇴화한 BST](binary_search_tree.assets/bst_degradation.png)
