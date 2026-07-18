# 큐

**큐**는 선입선출, 즉 FIFO 규칙을 따르는 선형 자료구조입니다. 원소는 **뒤쪽**에 추가하고 **앞쪽**에서 꺼냅니다.

![큐의 FIFO 규칙](queue.assets/queue_operations.png)

## 기본 연산

- `push()` 또는 `enqueue()`는 뒤쪽에 원소를 추가합니다.
- `pop()` 또는 `dequeue()`는 앞쪽 원소를 꺼냅니다.
- `peek()`은 삭제하지 않고 앞쪽 원소를 읽습니다.
- `is_empty()`와 `size()`는 상태를 확인합니다.

이 연산들은 $O(1)$에 동작하는 것이 바람직합니다.

```python
from collections import deque


queue: deque[int] = deque()
queue.append(1)
queue.append(3)
queue.append(2)
front = queue[0]
removed = queue.popleft()
```

## 큐 구현

### 연결 리스트 구현

머리와 꼬리 노드의 참조를 모두 유지합니다. 꼬리에 새 노드를 추가하고 머리에서 노드를 삭제하면 두 연산 모두 $O(1)$입니다. 머리만 저장하면 꼬리를 찾는 데 $O(n)$이 걸릴 수 있습니다.

![연결 리스트 큐의 삽입과 삭제](queue.assets/linkedlist_queue_step1.png)

### 배열 구현

앞 원소를 삭제하고 모든 원소를 옮기면 $O(n)$입니다. **원형 배열**은 앞 인덱스를 유지하고 모듈로 연산으로 배열 처음으로 돌아가 이 문제를 해결합니다.

```python
class ArrayQueue:
    def __init__(self, capacity: int):
        self._data = [0] * capacity
        self._front = 0
        self._size = 0

    def push(self, value: int) -> None:
        if self._size == len(self._data):
            raise OverflowError("큐가 가득 찼습니다")
        rear = (self._front + self._size) % len(self._data)
        self._data[rear] = value
        self._size += 1

    def pop(self) -> int:
        if self._size == 0:
            raise IndexError("큐가 비어 있습니다")
        value = self._data[self._front]
        self._front = (self._front + 1) % len(self._data)
        self._size -= 1
        return value
```

![원형 배열 기반 큐](queue.assets/array_queue_step1.png)

## 대표적인 활용

- 작업, 인쇄, 요청 처리 대기열
- 너비 우선 탐색과 무가중 그래프의 최단 경로
- 처리 속도가 다른 구성 요소 사이의 데이터 버퍼
- 도착 순서대로 서비스하는 시스템 시뮬레이션
- 분산 시스템의 메시지 큐
