# 이진 탐색 경계

배열에 목표와 같은 값이 여러 개 있으면 일반 이진 탐색은 그중 임의 위치를 반환할 수 있습니다. 경계를 찾으려면 목표를 만난 뒤에도 범위를 계속 줄여야 합니다.

![원소를 이용한 경계 탐색](binary_search_edge.assets/binary_search_edge_by_element.png)

```python
def left_boundary(values, target):
    index = insertion_index(values, target)
    return index if index < len(values) and values[index] == target else -1

def right_boundary(values, target):
    index = insertion_index_right(values, target) - 1
    return index if index >= 0 and values[index] == target else -1
```

왼쪽 경계는 목표 앞 삽입 위치이고, 오른쪽 경계는 목표 뒤 삽입 위치에서 1을 뺀 값입니다.

![왼쪽 경계에서 오른쪽 경계 구하기](binary_search_edge.assets/binary_search_right_edge_by_left_edge.png)
