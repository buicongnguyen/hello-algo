# 최대 용량 문제

높이 배열에서 두 벽을 골라 담을 수 있는 물의 면적을 최대화합니다. 면적은 두 벽의 거리와 더 낮은 벽 높이의 곱입니다.

![최대 용량 문제 예시](max_capacity_problem.assets/max_capacity_example.png)

$$
capacity(i,j) = (j-i) \times \min(height[i], height[j])
$$

```python
def max_capacity(heights):
    left, right = 0, len(heights) - 1
    best = 0
    while left < right:
        best = max(best, (right - left) * min(heights[left], heights[right]))
        if heights[left] <= heights[right]:
            left += 1
        else:
            right -= 1
    return best
```

![초기 상태](max_capacity_problem.assets/max_capacity_initial_state.png)

매 단계에서 더 낮은 벽을 안쪽으로 옮깁니다. 높은 벽을 옮기면 너비만 줄고 높이 제한은 커지지 않으므로 건너뛴 상태는 현재보다 나을 수 없습니다. 시간 복잡도는 $O(n)$입니다.
