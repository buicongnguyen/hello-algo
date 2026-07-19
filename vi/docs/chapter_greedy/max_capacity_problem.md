# Bài toán sức chứa lớn nhất

Cho các chiều cao, chọn hai vách tạo thành thùng có diện tích nước lớn nhất. Diện tích là khoảng cách nhân với chiều cao của vách thấp hơn.

![Dữ liệu bài toán sức chứa lớn nhất](max_capacity_problem.assets/max_capacity_example.png)

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

![Trạng thái ban đầu](max_capacity_problem.assets/max_capacity_initial_state.png)

Mỗi bước dịch vách thấp hơn vào trong. Dịch vách cao hơn chỉ làm chiều rộng giảm trong khi giới hạn chiều cao không tăng, nên các trạng thái bị bỏ qua không thể tốt hơn trạng thái hiện tại. Thời gian là $O(n)$.
