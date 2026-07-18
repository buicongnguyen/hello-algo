# Bài toán Tháp Hà Nội

Tháp Hà Nội yêu cầu chuyển $n$ đĩa từ cọc nguồn sang cọc đích, mỗi lần chỉ chuyển một đĩa và không đặt đĩa lớn lên đĩa nhỏ.

![Ví dụ Tháp Hà Nội](hanota_problem.assets/hanota_example.png)

Chiến lược: chuyển $n-1$ đĩa sang cọc phụ, chuyển đĩa lớn nhất sang đích, rồi chuyển $n-1$ đĩa từ cọc phụ sang đích.

```python
def hanoi(n, source, buffer, target, moves):
    if n == 0:
        return
    hanoi(n - 1, source, target, buffer, moves)
    moves.append((source, target))
    hanoi(n - 1, buffer, source, target, moves)
```

Số bước thỏa $T(n) = 2T(n-1) + 1$, nên $T(n) = 2^n - 1$. Bài toán minh họa rõ cách hai bài toán con giống nhau được kết hợp quanh một thao tác trung tâm.

![Cây đệ quy Tháp Hà Nội](hanota_problem.assets/hanota_recursive_tree.png)
