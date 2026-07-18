# Bài toán N quân hậu

Đặt $n$ quân hậu trên bàn cờ $n \times n$ sao cho không có hai quân cùng hàng, cột hoặc đường chéo.

![Một nghiệm của bài toán 4 quân hậu](n_queens_problem.assets/solution_4_queens.png)

Đặt lần lượt từng hàng. Ba tập hợp ghi lại cột, đường chéo chính $row-col$ và đường chéo phụ $row+col$ đã bị chiếm.

```python
def solve_n_queens(n):
    board = [["."] * n for _ in range(n)]
    columns, diagonals1, diagonals2 = set(), set(), set()
    result = []

    def search(row):
        if row == n:
            result.append(["".join(line) for line in board])
            return
        for col in range(n):
            if col in columns or row - col in diagonals1 or row + col in diagonals2:
                continue
            board[row][col] = "Q"
            columns.add(col); diagonals1.add(row - col); diagonals2.add(row + col)
            search(row + 1)
            board[row][col] = "."
            columns.remove(col); diagonals1.remove(row - col); diagonals2.remove(row + col)

    search(0)
    return result
```

![Cắt tỉa theo cột và đường chéo](n_queens_problem.assets/n_queens_cols_diagonals.png)

Mỗi hàng chỉ đặt một quân nên ràng buộc hàng được bảo đảm tự nhiên; các tập hợp giúp kiểm tra những ràng buộc còn lại trong $O(1)$.
