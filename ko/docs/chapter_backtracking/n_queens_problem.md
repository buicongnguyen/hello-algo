# N-퀸 문제

$n \times n$ 체스판에 어떤 두 퀸도 같은 행, 열, 대각선에 놓이지 않도록 $n$개의 퀸을 배치합니다.

![4-퀸 문제의 한 해](n_queens_problem.assets/solution_4_queens.png)

한 행씩 배치하면서 사용 중인 열, 주대각선 $row-col$, 부대각선 $row+col$을 세 집합에 기록합니다.

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

![열과 대각선 가지치기](n_queens_problem.assets/n_queens_cols_diagonals.png)

행마다 하나만 배치하므로 행 제약은 자동으로 만족합니다. 나머지 세 집합은 충돌 여부를 $O(1)$에 검사합니다.
