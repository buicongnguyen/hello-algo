# 이진 탐색 삽입 위치

삽입 위치는 목표를 추가한 뒤에도 배열이 정렬되도록 하는 인덱스입니다. 같은 값이 이미 있다면 첫 값 앞이나 마지막 값 뒤를 선택할 수 있습니다.

![삽입 위치 예제](binary_search_insertion.assets/binary_search_insertion_example.png)

## 목표와 같은 값 앞에 삽입

```python
def insertion_index(values, target):
    left, right = 0, len(values)
    while left < right:
        middle = (left + right) // 2
        if values[middle] < target:
            left = middle + 1
        else:
            right = middle
    return left
```

## 목표와 같은 값 뒤에 삽입

조건을 `values[middle] <= target`으로 바꾸어 오른쪽을 계속 탐색합니다. 두 방식 모두 $O(\log n)$입니다.

![삽입 위치 탐색 과정](binary_search_insertion.assets/binary_search_insertion_step8.png)
