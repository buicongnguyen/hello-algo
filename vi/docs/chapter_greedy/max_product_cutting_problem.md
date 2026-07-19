# Bài toán tích cắt lớn nhất

Chia số nguyên $n$ thành ít nhất hai số nguyên dương sao cho tích của chúng lớn nhất.

![Định nghĩa bài toán tích cắt lớn nhất](max_product_cutting_problem.assets/max_product_cutting_definition.png)

Với $n > 4$, tách một thừa số $3$ luôn không làm giảm tích tối ưu. Tuy nhiên phần dư $1$ nên đổi từ $3+1$ thành $2+2$.

```python
def max_product_cutting(n):
    if n <= 3:
        return n - 1
    product = 1
    while n > 4:
        product *= 3
        n -= 3
    return product * n
```

![Thừa số cắt tối ưu](max_product_cutting_problem.assets/max_product_cutting_greedy_infer2.png)

Thuật toán dùng nhiều số $3$ nhất có thể, sau đó nhân phần còn lại là $2$, $3$ hoặc $4$. Thời gian là $O(n)$ theo vòng lặp và có thể giảm còn $O(1)$ bằng lũy thừa.
