# 이진 트리의 배열 표현

완전 이진 트리는 배열에 매우 촘촘하게 저장할 수 있습니다. 인덱스 $i$에 있는 노드의 왼쪽 자식은 $2i + 1$, 오른쪽 자식은 $2i + 2$, 부모는 $\lfloor(i - 1) / 2\rfloor$에 있습니다.

![완전 이진 트리의 배열 표현](array_representation_of_tree.assets/array_representation_complete_binary_tree.png)

```python
class ArrayBinaryTree:
    def __init__(self, values):
        self.values = values

    def left(self, i):
        return 2 * i + 1

    def right(self, i):
        return 2 * i + 2

    def parent(self, i):
        return (i - 1) // 2
```

희소 트리에서는 인덱스 관계를 보존하기 위해 빈 값을 저장해야 하므로 메모리가 낭비됩니다. 따라서 배열 표현은 완전 이진 트리, 특히 힙에 가장 적합합니다.

![빈 위치가 있는 배열 표현](array_representation_of_tree.assets/array_representation_with_empty.png)
