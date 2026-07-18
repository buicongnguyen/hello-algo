# 동적 리스트

**리스트**는 순서가 있는 원소 집합을 나타내는 추상 자료구조 개념입니다. 사용자가 용량 제한을 직접 관리하지 않아도 접근, 갱신, 삽입, 삭제, 순회를 지원합니다.

리스트는 연결 리스트나 배열로 구현할 수 있습니다.

- 연결 리스트는 크기 증가, 삽입, 삭제, 검색, 갱신을 자연스럽게 지원합니다.
- 배열도 같은 연산을 지원하지만 길이가 고정되어 용량이 제한된 리스트라고 볼 수 있습니다.

데이터 양을 미리 모르면 고정 배열 크기를 정하기 어렵습니다. 너무 작으면 공간이 부족하고 너무 크면 낭비됩니다. **동적 배열**은 실행 중 자동으로 확장하여 이 문제를 해결합니다.

Python의 `list`, Java의 `ArrayList`, C++의 `vector`, C#의 `List`처럼 표준 라이브러리의 많은 리스트형은 동적 배열로 구현됩니다. 이 절에서는 ‘리스트’와 ‘동적 배열’을 같은 뜻으로 사용합니다.

## 기본 연산

### 초기화

빈 리스트를 만들거나 주어진 값으로 초기화할 수 있습니다.

```python
empty: list[int] = []
nums: list[int] = [1, 3, 2, 5, 4]
```

### 접근과 갱신

동적 리스트는 배열을 기반으로 하므로 인덱스로 접근하거나 갱신하는 데 $O(1)$ 시간이 걸립니다.

```python
nums = [1, 3, 2, 5, 4]
value = nums[1]
nums[1] = 0
```

### 삽입과 삭제

리스트 끝에 추가하는 연산은 보통 분할 상환 관점에서 $O(1)$입니다. 중간 삽입과 삭제에는 여전히 원소 이동이 필요하므로 $O(n)$입니다.

```python
nums = [1, 3, 2, 5, 4]
nums.append(6)
nums.insert(3, 7)
nums.pop(3)
```

용량이 가득 차면 더 큰 배열을 할당하고 데이터를 복사해야 하므로 그 한 번의 추가 연산은 $O(n)$입니다. 하지만 확장할 때마다 용량을 일정 비율로 늘리면 여러 번의 끝 추가 연산에 대한 평균 비용은 여전히 $O(1)$입니다.

### 순회

배열과 마찬가지로 인덱스, 값 또는 두 정보를 함께 사용해 순회할 수 있습니다.

```python
nums = [1, 3, 2, 5, 4]
for i in range(len(nums)):
    print(nums[i])
for num in nums:
    print(num)
for i, num in enumerate(nums):
    print(i, num)
```

### 리스트 이어 붙이기

기존 리스트 끝에 다른 리스트를 이어 붙일 수 있습니다.

```python
nums = [1, 3, 2]
nums.extend([5, 4])
```

### 정렬

정렬한 리스트에는 이진 탐색이나 투 포인터 같은 기법을 적용할 수 있습니다.

```python
nums = [1, 3, 2, 5, 4]
nums.sort()
```

## 동적 리스트 직접 구현

표준 라이브러리의 구현은 세밀하게 최적화되어 있습니다. 핵심 메커니즘을 이해하기 위해 세 가지 결정을 사용한 간단한 버전을 만들어 봅시다.

- **초기 용량**: 기반 배열은 10칸으로 시작합니다.
- **크기 추적**: `size`는 실제 원소 수를 저장하며 용량과 구분됩니다.
- **확장 메커니즘**: 배열이 가득 차면 용량이 두 배인 배열을 만들고 데이터를 복사합니다.

```python
class MyList:
    """동적 배열 기반 정수 리스트입니다."""

    def __init__(self):
        self._capacity = 10
        self._array = [0] * self._capacity
        self._size = 0
        self._extend_ratio = 2

    def size(self) -> int:
        return self._size

    def capacity(self) -> int:
        return self._capacity

    def get(self, index: int) -> int:
        self._check_index(index)
        return self._array[index]

    def set(self, value: int, index: int) -> None:
        self._check_index(index)
        self._array[index] = value

    def add(self, value: int) -> None:
        if self._size == self._capacity:
            self._extend_capacity()
        self._array[self._size] = value
        self._size += 1

    def insert(self, value: int, index: int) -> None:
        if index < 0 or index > self._size:
            raise IndexError("인덱스가 범위를 벗어났습니다")
        if self._size == self._capacity:
            self._extend_capacity()
        for j in range(self._size - 1, index - 1, -1):
            self._array[j + 1] = self._array[j]
        self._array[index] = value
        self._size += 1

    def remove(self, index: int) -> int:
        self._check_index(index)
        value = self._array[index]
        for j in range(index, self._size - 1):
            self._array[j] = self._array[j + 1]
        self._size -= 1
        return value

    def to_array(self) -> list[int]:
        return self._array[: self._size]

    def _extend_capacity(self) -> None:
        extra = self._capacity * (self._extend_ratio - 1)
        self._array.extend([0] * extra)
        self._capacity = len(self._array)

    def _check_index(self, index: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError("인덱스가 범위를 벗어났습니다")
```

동적 리스트는 배열을 더 실용적으로 만들지만 모든 트레이드오프를 없애지는 않습니다. $O(1)$ 접근과 좋은 메모리 지역성을 유지하는 대신 용량 일부가 비어 있을 수 있고 가끔 $O(n)$ 확장 비용을 지불합니다.
