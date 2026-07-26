# 선택 정렬

<u>선택 정렬</u>의 원리는 매우 직관적입니다. 매 반복에서 정렬되지 않은 구간의 최솟값을 선택하여 정렬된 구간의 끝으로 옮깁니다.

길이가 $n$인 배열을 다음과 같이 처리합니다.

1. 처음에는 모든 원소가 정렬되지 않았으므로 정렬되지 않은 인덱스 구간은 $[0, n-1]$입니다.
2. $[0, n-1]$에서 가장 작은 원소를 찾아 인덱스 $0$의 원소와 교환합니다. 이제 첫 원소는 올바른 위치에 고정됩니다.
3. $[1, n-1]$에서 가장 작은 원소를 찾아 인덱스 $1$의 원소와 교환합니다. 이제 앞의 두 원소가 고정됩니다.
4. 같은 과정을 계속합니다. $n - 1$번 선택하고 교환하면 앞의 $n - 1$개 원소가 모두 올바른 위치에 놓입니다.
5. 남은 원소는 반드시 가장 큰 원소이므로 추가 반복이 필요 없습니다.

**1단계**

![선택 정렬 1단계](selection_sort.assets/selection_sort_step1.png)

**2단계**

![선택 정렬 2단계](selection_sort.assets/selection_sort_step2.png)

**3단계**

![선택 정렬 3단계](selection_sort.assets/selection_sort_step3.png)

**4단계**

![선택 정렬 4단계](selection_sort.assets/selection_sort_step4.png)

**5단계**

![선택 정렬 5단계](selection_sort.assets/selection_sort_step5.png)

**6단계**

![선택 정렬 6단계](selection_sort.assets/selection_sort_step6.png)

**7단계**

![선택 정렬 7단계](selection_sort.assets/selection_sort_step7.png)

**8단계**

![선택 정렬 8단계](selection_sort.assets/selection_sort_step8.png)

**9단계**

![선택 정렬 9단계](selection_sort.assets/selection_sort_step9.png)

**10단계**

![선택 정렬 10단계](selection_sort.assets/selection_sort_step10.png)

**11단계**

![선택 정렬 11단계](selection_sort.assets/selection_sort_step11.png)

구현에서 변수 $k$는 정렬되지 않은 구간에서 지금까지 발견한 최솟값의 인덱스를 기억합니다. 한 번의 내부 순회가 끝난 뒤에만 실제 교환을 수행하므로 한 라운드의 데이터 이동 횟수는 제한적입니다.

$r$번째 라운드 뒤에는 정확히 $r$개의 원소로 이루어진 접두사가 확정됩니다. 이 불변식은 각 접두사가 전체 배열에서 가장 작은 원소들을 오름차순으로 담고 있음을 보장하며 알고리즘의 정확성을 설명합니다.

```python
# 잠긴 원문의 공식 선택 정렬 구현이 삽입됩니다.
```

## 알고리즘 특성

- **시간 복잡도 $O(n^2)$, 비적응형**: 바깥 반복은 $n - 1$번 실행됩니다. 정렬되지 않은 구간의 길이는 차례로 $n$, $n - 1$, $\dots$, $3$, $2$이므로 살펴보는 횟수의 합은 $\frac{(n - 1)(n + 2)}{2}$입니다. 입력이 이미 거의 정렬되어 있어도 비교 수는 줄지 않습니다.
- **공간 복잡도 $O(1)$, 제자리 정렬**: 포인터 $i$와 $j$ 및 최솟값 인덱스만 유지하므로 배열 크기와 무관한 고정 공간을 사용합니다.
- **불안정 정렬**: 멀리 떨어진 두 원소를 교환할 때 `nums[i]`가 같은 키를 가진 다른 원소의 뒤로 이동할 수 있어 원래 상대적 순서가 바뀝니다.

![선택 정렬의 불안정성 예](selection_sort.assets/selection_sort_instability.png)
