# 버블 정렬

인접한 두 원소를 반복해서 비교하고 순서가 잘못되면 교환합니다. 한 라운드가 끝날 때마다 가장 큰 미정렬 원소가 뒤로 이동합니다.

![버블 정렬 개요](bubble_sort.assets/bubble_sort_overview.png)

```python
def bubble_sort(values):
    for end in range(len(values) - 1, 0, -1):
        swapped = False
        for i in range(end):
            if values[i] > values[i + 1]:
                values[i], values[i + 1] = values[i + 1], values[i]
                swapped = True
        if not swapped:
            break
```

평균과 최악은 $O(n^2)$이고 이미 정렬된 데이터는 $O(n)$에 감지합니다. 제자리이며 안정적입니다.
