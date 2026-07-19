# 최대 곱 분할 문제

정수 $n$을 둘 이상의 양의 정수로 나누어 그 곱을 최대화합니다.

![최대 곱 분할 문제 정의](max_product_cutting_problem.assets/max_product_cutting_definition.png)

$n > 4$이면 인수 $3$을 떼어 내는 것이 최적 곱을 줄이지 않습니다. 다만 나머지 $1$은 $3+1$ 대신 $2+2$로 바꿔야 합니다.

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

![최적 분할 인수](max_product_cutting_problem.assets/max_product_cutting_greedy_infer2.png)

가능한 한 많은 $3$을 사용하고 남은 $2$, $3$, $4$를 곱합니다. 반복 구현은 $O(n)$이며 거듭제곱을 사용하면 $O(1)$로 줄일 수 있습니다.
