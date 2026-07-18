# 배열

**배열**은 같은 데이터형의 원소를 연속된 메모리 공간에 저장하는 선형 자료구조입니다. 원소의 위치를 **인덱스**라고 합니다.

![배열의 정의와 저장 방식](array.assets/array_definition.png)

## 배열의 기본 연산

### 배열 초기화

초깃값을 지정하거나 지정하지 않고 배열을 만들 수 있습니다. 값을 지정하지 않으면 많은 언어가 $0$ 같은 기본값을 채웁니다. Python의 `list`는 동적 배열이지만 여기서는 배열의 동작을 설명하기 위해 길이가 고정되었다고 가정합니다.

```python
# 특정 값 없이 초기화
arr: list[int] = [0] * 5

# 주어진 값으로 초기화
nums: list[int] = [1, 3, 2, 5, 4]
```

### 원소 접근

원소가 메모리에 연속해서 놓이므로 배열 시작 주소, 원소 크기, 인덱스로 원소 주소를 직접 계산할 수 있습니다.

![배열 원소의 메모리 주소 계산](array.assets/array_memory_location_calculation.png)

첫 인덱스가 $0$인 이유는 인덱스가 배열 시작 주소로부터의 오프셋이기 때문입니다. 첫 원소의 오프셋은 $0$입니다.

주소를 직접 계산할 수 있어 배열은 임의의 원소에 $O(1)$ 시간으로 접근하는 **임의 접근**을 지원합니다.

```python
import random


def random_access(nums: list[int]) -> int:
    """무작위로 선택한 원소를 반환합니다."""
    index = random.randint(0, len(nums) - 1)
    return nums[index]
```

### 원소 삽입

배열 원소 사이에는 빈 공간이 없습니다. 인덱스 $i$에 값을 넣으려면 $i$부터 뒤의 원소를 한 칸씩 오른쪽으로 옮긴 뒤 새 값을 기록해야 합니다.

![배열에 원소를 삽입하는 예](array.assets/array_insert_element.png)

배열 길이는 고정되어 있으므로 마지막 원소가 범위 밖으로 밀려날 수 있습니다. 뒤에서 다룰 동적 리스트는 확장 메커니즘으로 이 한계를 해결합니다.

```python
def insert(nums: list[int], num: int, index: int) -> None:
    """고정 길이 배열의 index에 num을 삽입합니다."""
    for i in range(len(nums) - 1, index, -1):
        nums[i] = nums[i - 1]
    nums[index] = num
```

### 원소 삭제

인덱스 $i$의 원소를 삭제하려면 뒤의 모든 원소를 한 칸씩 왼쪽으로 옮깁니다. 배열 끝에 남은 이전 값은 더 이상 유효한 데이터에 포함되지 않으므로 따로 고치지 않아도 됩니다.

![배열에서 원소를 삭제하는 예](array.assets/array_remove_element.png)

```python
def remove(nums: list[int], index: int) -> None:
    """index의 원소를 논리적으로 삭제합니다."""
    for i in range(index, len(nums) - 1):
        nums[i] = nums[i + 1]
```

배열의 삽입과 삭제에는 세 가지 주요 한계가 있습니다.

- **높은 시간 복잡도**: 평균적으로 많은 원소를 옮겨야 하므로 $O(n)$ 시간이 걸립니다.
- **원소 손실 가능성**: 고정 배열에 삽입하면 마지막 원소가 범위 밖으로 밀려날 수 있습니다.
- **메모리 낭비 가능성**: 손실을 막기 위해 큰 배열을 할당하고 앞부분만 사용하면 빈 칸이 많이 남습니다.

### 배열 순회

인덱스로 순회하거나 값을 직접 순회할 수 있고 인덱스와 값을 함께 얻을 수도 있습니다.

```python
def traverse(nums: list[int]) -> int:
    total = 0
    for i in range(len(nums)):
        total += nums[i]
    for num in nums:
        total += num
    for i, num in enumerate(nums):
        total += nums[i] + num
    return total
```

### 원소 검색

정렬되지 않은 배열에서 값을 찾으려면 처음부터 각 원소를 비교합니다. 이를 **선형 탐색**이라 하며 시간 복잡도는 $O(n)$입니다.

```python
def find(nums: list[int], target: int) -> int:
    for i, num in enumerate(nums):
        if num == target:
            return i
    return -1
```

### 배열 확장

프로그램은 배열 바로 뒤의 메모리가 비어 있다고 가정할 수 없으므로 배열을 그 자리에서 직접 늘리는 것은 안전하지 않습니다. 확장하려면 더 큰 배열을 새로 만들고 모든 원소를 복사해야 합니다. 이 연산은 $O(n)$입니다.

```python
def extend(nums: list[int], enlarge: int) -> list[int]:
    result = [0] * (len(nums) + enlarge)
    for i, num in enumerate(nums):
        result[i] = num
    return result
```

## 장점과 한계

같은 데이터형의 원소가 연속해서 놓이면 시스템이 최적화에 활용할 수 있는 정보가 많아집니다.

- **높은 공간 효율**: 원소 사이의 연결 정보를 저장할 필요가 없습니다.
- **임의 접근**: 어느 원소든 $O(1)$에 가져올 수 있습니다.
- **좋은 캐시 지역성**: 한 원소를 불러올 때 인접 데이터도 함께 적재되는 경우가 많아 다음 접근이 빨라집니다.

반면 연속 저장에는 한계도 있습니다.

- 여러 원소를 옮겨야 하므로 **삽입과 삭제가 느립니다**.
- **길이가 고정**되어 확장할 때 새 공간 할당과 복사가 필요합니다.
- 용량이 실제 요구보다 크면 **공간이 낭비**됩니다.

## 대표적인 활용

- **임의 접근**: 무작위 인덱스로 표본을 선택합니다.
- **정렬과 탐색**: 퀵 정렬, 병합 정렬, 이진 탐색은 흔히 배열에서 동작합니다.
- **조회표**: ASCII 코드 같은 값을 인덱스로 사용해 대응 관계를 찾습니다.
- **머신러닝**: 벡터, 행렬, 텐서는 모두 배열 형태를 기반으로 합니다.
- **다른 구조 구현**: 스택, 큐, 해시 테이블, 힙, 그래프의 인접 행렬을 배열로 만들 수 있습니다.
