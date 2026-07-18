# Thuật toán chia để trị

Một quy trình chia để trị gồm ba bước: chia bài toán, trị các bài toán con bằng đệ quy, và kết hợp kết quả.

![Chia để trị trong merge sort](divide_and_conquer.assets/divide_and_conquer_merge_sort.png)

```python
def divide_and_conquer(problem):
    if problem.is_small():
        return problem.solve_directly()
    parts = problem.divide()
    partial = [divide_and_conquer(part) for part in parts]
    return problem.combine(partial)
```

## Khi nào phù hợp

- Bài toán có thể chia thành các bài toán con độc lập cùng dạng.
- Kích thước giảm đủ nhanh để đạt trường hợp cơ sở.
- Chi phí kết hợp không lấn át lợi ích của việc chia.

Các bài toán con độc lập có thể chạy song song, giúp chia để trị phù hợp với hệ thống đa lõi.

![Tính toán song song](divide_and_conquer.assets/divide_and_conquer_parallel_computing.png)
