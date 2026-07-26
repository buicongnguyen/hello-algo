# 동적 리스트

**리스트**는 순서가 있는 원소 집합을 나타내는 추상 자료구조 개념입니다. 사용자가 용량 제한을 직접 관리하지 않아도 접근, 갱신, 삽입, 삭제, 순회를 지원합니다.

여기서 추상 자료구조란 사용자가 기대하는 동작을 정의하지만 내부 저장 방식을 하나로 고정하지 않는다는 뜻입니다. 같은 리스트 인터페이스도 연결 리스트나 동적 배열로 구현할 수 있고, 구현에 따라 각 연산의 성능이 달라집니다.

리스트는 연결 리스트나 배열로 구현할 수 있습니다.

- 연결 리스트는 크기 증가, 삽입, 삭제, 검색, 갱신을 자연스럽게 지원합니다.
- 배열도 같은 연산을 지원하지만 길이가 고정되어 용량이 제한된 리스트라고 볼 수 있습니다.

데이터 양을 미리 모르면 고정 배열 크기를 정하기 어렵습니다. 너무 작으면 공간이 부족하고 너무 크면 낭비됩니다. **동적 배열**은 실행 중 자동으로 확장하여 이 문제를 해결합니다.

동적 배열은 **크기**와 **용량**을 구분합니다. 크기는 현재 저장된 유효한 원소 수이고, 용량은 기반 배열에 확보된 전체 칸 수입니다. 크기가 용량보다 작은 동안에는 끝에 바로 원소를 추가할 수 있습니다. 두 값이 같아지면 더 큰 배열을 만들고 기존 원소를 복사한 뒤 새 원소를 넣습니다.

Python의 `list`, Java의 `ArrayList`, C++의 `vector`, C#의 `List`처럼 표준 라이브러리의 많은 리스트형은 동적 배열로 구현됩니다. 이 절에서는 ‘리스트’와 ‘동적 배열’을 같은 뜻으로 사용합니다.

사용자는 보통 기반 배열의 용량을 직접 보지 않고 리스트의 현재 원소 수만 다룹니다. 추가 연산이 용량을 넘으면 구현이 새 저장 공간을 준비하고 원소를 옮기는 과정을 감춥니다. 이 추상화 덕분에 고정 배열보다 편리하지만, 내부에서는 여전히 연속 메모리와 복사 비용이라는 배열의 성질이 유지됩니다. 따라서 리스트 인터페이스가 자동 확장을 제공한다고 해서 모든 삽입과 삭제가 빠른 것은 아닙니다.

## 기본 연산

### 초기화

빈 리스트를 만들거나 주어진 값으로 초기화할 수 있습니다.

```python
empty: list[int] = []
nums: list[int] = [1, 3, 2, 5, 4]
```

??? pythontutor "시각화 실행"

    [Python Tutor에서 리스트 초기화 보기](https://pythontutor.com/render.html#code=empty%20%3D%20%5B%5D%0Anums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

빈 리스트는 원소가 없지만 이후 데이터를 받을 준비가 된 컨테이너입니다. 주어진 값으로 초기화하면 라이브러리가 필요한 용량을 확보하고 값을 순서대로 배치합니다. 언어에 따라 원소형을 명시하거나 실행 중 각 객체의 형 정보를 함께 저장합니다.

초기 길이와 내부 용량은 같을 수도 있고 다를 수도 있습니다. 구현은 앞으로의 추가를 대비해 더 많은 칸을 미리 확보할 수 있으며, 그 빈칸은 유효한 리스트 원소로 간주하지 않습니다. 따라서 순회 범위와 인덱스 유효성 검사는 항상 용량이 아니라 현재 크기를 기준으로 해야 합니다.

### 접근과 갱신

동적 리스트는 배열을 기반으로 하므로 인덱스로 접근하거나 갱신하는 데 $O(1)$ 시간이 걸립니다.

접근은 값을 읽고, 갱신은 같은 위치의 값을 바꿉니다. 두 연산 모두 시작 주소와 인덱스로 목표 위치를 계산하므로 리스트 길이에 관계없이 일정한 횟수의 주소 계산만 필요합니다. 다만 인덱스가 유효 범위를 벗어나면 오류를 발생시키거나 언어가 정한 방식으로 처리해야 합니다.

```python
nums = [1, 3, 2, 5, 4]
value = nums[1]
nums[1] = 0
```

??? pythontutor "시각화 실행"

    [Python Tutor에서 접근과 갱신 보기](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Avalue%20%3D%20nums%5B1%5D%0Anums%5B1%5D%20%3D%200&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### 삽입과 삭제

리스트 끝에 추가하는 연산은 보통 분할 상환 관점에서 $O(1)$입니다. 중간 삽입과 삭제에는 여전히 원소 이동이 필요하므로 $O(n)$입니다.

끝에 추가할 때 남는 용량이 있으면 마지막 유효 원소 다음 칸에 기록하고 크기만 늘리면 됩니다. 중간 삽입은 삽입 위치부터 뒤의 원소를 오른쪽으로 옮겨 빈칸을 만들고, 중간 삭제는 뒤의 원소를 왼쪽으로 당겨 빈틈을 없앱니다. 동적 배열이 길이를 자동 관리해도 연속 저장이라는 물리적 특성은 그대로입니다.

```python
nums = [1, 3, 2, 5, 4]
nums.append(6)
nums.insert(3, 7)
nums.pop(3)
```

??? pythontutor "시각화 실행"

    [Python Tutor에서 삽입과 삭제 보기](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Anums.append%286%29%0Anums.insert%283%2C7%29%0Anums.pop%283%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

용량이 가득 차면 더 큰 배열을 할당하고 데이터를 복사해야 하므로 그 한 번의 추가 연산은 `O(n)`입니다. 하지만 확장할 때마다 용량을 일정 비율로 늘리면 여러 번의 끝 추가 연산에 대한 평균 비용은 여전히 `O(1)`입니다.

이를 분할 상환 분석이라고 합니다. 가끔 발생하는 비싼 확장 비용을 그 전에 수행된 값싼 추가 연산 전체에 나누어 계산합니다. 용량을 한 칸씩만 늘리면 거의 매번 복사해야 하지만, 일정 배수로 늘리면 확장 사이에 처리할 수 있는 값싼 추가 횟수도 함께 증가합니다.

예를 들어 용량이 두 배가 되면 확장 직후에는 이전 크기만큼의 빈칸이 새로 생깁니다. 다음 여러 번의 끝 추가는 복사 없이 값을 쓰고 크기만 늘립니다. 한 번의 큰 비용 뒤에 많은 상수 비용 연산이 이어지므로 전체 연산 수로 나눈 평균이 작아집니다. 다만 특정 한 번의 추가가 반드시 빠르다는 보장은 아니므로, 최악 지연 시간이 중요한 시스템에서는 미리 용량을 예약하는 기능도 고려합니다.

### 순회

배열과 마찬가지로 인덱스, 값 또는 두 정보를 함께 사용해 순회할 수 있습니다.

인덱스가 필요한 알고리즘은 첫 형태를, 값만 처리하는 알고리즘은 두 번째 형태를 사용할 수 있습니다. 인덱스와 값을 함께 받으면 별도의 조회 없이 위치와 내용을 동시에 활용할 수 있습니다. 세 방식 모두 현재 크기 범위의 원소만 방문하고 아직 사용하지 않는 용량은 건너뜁니다.

```python
nums = [1, 3, 2, 5, 4]
for i in range(len(nums)):
    print(nums[i])
for num in nums:
    print(num)
for i, num in enumerate(nums):
    print(i, num)
```

??? pythontutor "시각화 실행"

    [Python Tutor에서 리스트 순회 보기](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Afor%20i%2Cnum%20in%20enumerate%28nums%29%3A%0A%20%20%20%20print%28i%2Cnum%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### 리스트 이어 붙이기

기존 리스트 끝에 다른 리스트를 이어 붙일 수 있습니다.

이어 붙이기는 두 번째 리스트의 원소를 순서대로 첫 번째 리스트 뒤에 복사합니다. 필요한 최종 용량을 미리 확보할 수 있다면 반복 확장을 줄일 수 있습니다. 원본 리스트 자체를 수정하는 연산과 새 리스트를 반환하는 연산은 언어마다 이름과 동작이 다를 수 있습니다.

두 리스트의 총길이가 현재 용량을 넘으면 이어 붙이기 전에 한 번 이상 확장할 수 있습니다. 같은 리스트를 자기 자신에 이어 붙이는 경우처럼 원본과 대상이 겹칠 때에는 구현이 원래 길이를 먼저 기억하거나 임시 복사본을 사용해야 안전합니다. 라이브러리 함수가 새 리스트를 만드는지 기존 리스트를 바꾸는지 확인하면 예상하지 못한 별칭 문제를 피할 수 있습니다.

```python
nums = [1, 3, 2]
nums.extend([5, 4])
```

??? pythontutor "시각화 실행"

    [Python Tutor에서 리스트 이어 붙이기 보기](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%5D%0Anums.extend%28%5B5%2C4%5D%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### 정렬

정렬한 리스트에는 이진 탐색이나 투 포인터 같은 기법을 적용할 수 있습니다.

표준 라이브러리의 정렬 함수는 일반적으로 충분히 검증되고 최적화되어 있습니다. 기본 오름차순 외에 비교 함수나 키 함수를 제공해 객체를 특정 필드 기준으로 정렬할 수 있습니다. 정렬은 원소 순서를 바꾸므로 기존 인덱스가 의미를 갖는 데이터에서는 주의해야 합니다.

정렬 뒤에는 작은 값부터 큰 값까지라는 순서 조건을 활용해 탐색 범위를 절반씩 줄이거나 양쪽 끝에서 포인터를 이동할 수 있습니다. 반면 정렬 자체에도 비용이 들고 원래 입력 순서를 잃을 수 있으므로, 한 번만 조회하는 데이터라면 먼저 정렬하는 것이 항상 이득은 아닙니다. 연산 횟수와 이후에 수행할 작업을 함께 보고 결정해야 합니다.

```python
nums = [1, 3, 2, 5, 4]
nums.sort()
```

??? pythontutor "시각화 실행"

    [Python Tutor에서 리스트 정렬 보기](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Anums.sort%28%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

## 동적 리스트 직접 구현

표준 라이브러리의 구현은 세밀하게 최적화되어 있습니다. 핵심 메커니즘을 이해하기 위해 세 가지 결정을 사용한 간단한 버전을 만들어 봅시다.

- **초기 용량**: 기반 배열은 10칸으로 시작합니다.
- **크기 추적**: `size`는 실제 원소 수를 저장하며 용량과 구분됩니다.
- **확장 메커니즘**: 배열이 가득 차면 용량이 두 배인 배열을 만들고 데이터를 복사합니다.

직접 구현할 때에는 항상 크기가 용량 이하이고, 유효한 원소가 기반 배열의 앞쪽에 빈틈없이 놓인다는 불변식을 유지해야 합니다. 접근과 갱신은 크기를 기준으로 인덱스를 검사하고, 삽입은 필요하면 먼저 확장한 뒤 원소를 옮기며, 삭제는 빈틈이 생기지 않도록 뒤쪽 원소를 당깁니다.

각 메서드는 이 불변식을 깨지 않는 순서로 상태를 갱신해야 합니다. 추가와 삽입은 새 원소를 기록할 공간이 있는지 먼저 확인한 뒤 크기를 늘립니다. 삭제는 반환할 값을 보관하고 뒤의 원소를 앞으로 옮긴 다음 크기를 줄입니다. 인덱스가 잘못되었을 때 일부 원소만 이동한 상태로 실패하지 않도록 검사를 변경보다 먼저 수행하는 것도 중요합니다.

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

`MyList`는 학습용으로 정수만 저장하지만 실제 라이브러리는 제네릭형, 반복자, 예외 안전성, 메모리 할당 전략 등 더 많은 요구를 처리합니다. 또한 삭제 뒤 남은 마지막 칸을 정리하거나 참조를 해제해 객체가 불필요하게 유지되지 않도록 할 수 있습니다.

실제 구현은 용량이 너무 커졌을 때 줄이는 정책, 최대 배열 크기, 정수 오버플로, 할당 실패도 다룹니다. 반복자가 리스트 변경 뒤에도 유효한지, 확장으로 저장 주소가 바뀌면 기존 참조가 어떻게 되는지도 언어별 규칙에 포함됩니다. 학습용 구현은 확장 원리를 드러내는 데 집중하지만 표준 라이브러리는 이런 경계 조건과 성능 최적화를 함께 해결합니다.

동적 리스트는 배열을 더 실용적으로 만들지만 모든 트레이드오프를 없애지는 않습니다. `O(1)` 접근과 좋은 메모리 지역성을 유지하는 대신 용량 일부가 비어 있을 수 있고 가끔 `O(n)` 확장 비용을 지불합니다. 연산 패턴과 데이터 규모를 기준으로 동적 배열과 연결 리스트 중 적합한 구현을 선택해야 합니다.

특히 인덱스 접근, 끝 추가, 중간 삽입의 비율을 따로 살펴보면 선택이 쉬워집니다. 표준 라이브러리의 동적 리스트는 폭넓은 상황에서 좋은 기본값이지만, 성능이 중요한 부분에서는 실제 입력 규모로 용량 변화와 원소 이동 비용을 측정해 보는 것이 좋습니다.
