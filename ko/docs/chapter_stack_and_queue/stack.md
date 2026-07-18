# 스택

**스택**은 후입선출, 즉 LIFO 규칙을 따르는 선형 자료구조입니다. 원소는 **스택 꼭대기**라고 부르는 한쪽 끝에서만 추가하거나 꺼낼 수 있고 반대쪽 끝은 바닥입니다.

![스택의 LIFO 규칙](stack.assets/stack_operations.png)

## 기본 연산

- `push()`는 꼭대기에 원소를 $O(1)$로 추가합니다.
- `pop()`은 꼭대기 원소를 삭제하고 $O(1)$로 반환합니다.
- `peek()`은 삭제하지 않고 꼭대기 원소를 $O(1)$로 읽습니다.
- `is_empty()`와 `size()`는 상태를 $O(1)$로 확인합니다.

```python
class ArrayStack:
    """동적 배열 기반 정수 스택입니다."""

    def __init__(self):
        self._data: list[int] = []

    def size(self) -> int:
        return len(self._data)

    def is_empty(self) -> bool:
        return not self._data

    def push(self, value: int) -> None:
        self._data.append(value)

    def pop(self) -> int:
        if self.is_empty():
            raise IndexError("스택이 비어 있습니다")
        return self._data.pop()

    def peek(self) -> int:
        if self.is_empty():
            raise IndexError("스택이 비어 있습니다")
        return self._data[-1]
```

## 스택 구현

### 연결 리스트 구현

머리 노드를 꼭대기로 사용합니다. `push()`는 새 노드를 머리 앞에 연결하고 `pop()`은 머리를 다음 노드로 옮깁니다. 두 연산은 몇 개의 연결만 바꾸므로 $O(1)$이지만 노드마다 참조 메모리가 추가로 필요합니다.

![연결 리스트 스택의 삽입과 삭제](stack.assets/linkedlist_stack_step1.png)

### 배열 구현

배열 끝을 꼭대기로 정하면 추가와 삭제 때 원소를 옮길 필요가 없습니다. 동적 배열의 `push()`는 분할 상환 $O(1)$이지만 한 번의 확장은 $O(n)$이 될 수 있습니다.

![배열 스택의 삽입과 삭제](stack.assets/array_stack_step1.png)

## 두 구현 비교

| 기준 | 동적 배열 | 연결 리스트 |
| --- | --- | --- |
| `push()` / `pop()` | 분할 상환 $O(1)$ | $O(1)$ |
| 메모리 비용 | 남는 용량이 생길 수 있음 | 노드마다 연결 하나 추가 |
| 캐시 효율 | 보통 좋음 | 보통 더 낮음 |
| 확장 | 가끔 복사 필요 | 노드 단위로 유연하게 추가 |

## 대표적인 활용

- 함수 호출과 재귀 호출 스택
- 편집기의 실행 취소와 다시 실행
- 괄호 검사와 수식 계산
- 깊이 우선 탐색과 백트래킹
- 브라우저의 이전 페이지 기록
