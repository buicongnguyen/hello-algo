# 분할 정복 알고리즘

분할 정복은 문제를 나누고, 하위 문제를 재귀적으로 해결하며, 부분 결과를 결합하는 세 단계로 구성됩니다.

![병합 정렬의 분할 정복](divide_and_conquer.assets/divide_and_conquer_merge_sort.png)

```python
def divide_and_conquer(problem):
    if problem.is_small():
        return problem.solve_directly()
    parts = problem.divide()
    partial = [divide_and_conquer(part) for part in parts]
    return problem.combine(partial)
```

## 적합한 조건

- 문제를 독립적이고 같은 형태의 하위 문제로 나눌 수 있습니다.
- 크기가 충분히 빨리 줄어 기저 조건에 도달합니다.
- 결합 비용이 분할의 이점을 압도하지 않습니다.

독립적인 하위 문제는 병렬로 실행할 수 있어 다중 코어 시스템에도 적합합니다.

![병렬 계산](divide_and_conquer.assets/divide_and_conquer_parallel_computing.png)
