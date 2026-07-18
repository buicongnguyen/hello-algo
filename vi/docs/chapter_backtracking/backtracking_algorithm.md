# Thuật toán quay lui

Quay lui là một dạng tìm kiếm theo chiều sâu trên cây quyết định. Trạng thái mô tả các lựa chọn đã thực hiện; mỗi cạnh là một lựa chọn mới.

![Tìm nút bằng duyệt tiền thứ tự](backtracking_algorithm.assets/preorder_find_nodes.png)

## Thử và hoàn tác

Mỗi vòng lặp thực hiện ba việc: chọn một phương án, cập nhật trạng thái, rồi hoàn tác sau lời gọi đệ quy. Hoàn tác phải đưa trạng thái về đúng giá trị trước lần thử.

```python
def backtrack(state, choices, result):
    if is_solution(state):
        result.append(state.copy())
        return
    for choice in choices:
        if is_valid(state, choice):
            state.append(choice)
            backtrack(state, choices, result)
            state.pop()
```

## Cắt tỉa

Ràng buộc cho phép bỏ qua sớm những nhánh chắc chắn không hợp lệ, giảm mạnh số trạng thái cần duyệt.

![Cắt nhánh không thỏa ràng buộc](backtracking_algorithm.assets/preorder_find_constrained_paths.png)

Quay lui dễ mô hình hóa và tìm được mọi nghiệm, nhưng trường hợp xấu nhất thường tăng theo cấp số nhân. Thứ tự lựa chọn và điều kiện cắt tỉa quyết định hiệu năng thực tế.
