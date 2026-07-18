# 덱

**덱**, 즉 양방향 큐는 앞과 뒤 양쪽에서 원소를 추가하고 삭제할 수 있습니다. 따라서 스택, 큐 또는 두 구조의 조합처럼 동작할 수 있습니다.

![덱의 연산](deque.assets/deque_operations.png)

## 기본 연산

- `push_first()`와 `pop_first()`는 앞쪽에서 동작합니다.
- `push_last()`와 `pop_last()`는 뒤쪽에서 동작합니다.
- `peek_first()`와 `peek_last()`는 양 끝을 읽습니다.
- 양 끝의 모든 연산은 $O(1)$이어야 합니다.

```python
from collections import deque


values: deque[int] = deque([3, 2])
values.appendleft(1)
values.append(5)
first = values[0]
last = values[-1]
values.popleft()
values.pop()
```

## 덱 구현 *

### 이중 연결 리스트 구현

각 노드가 이전 노드와 다음 노드의 연결을 저장하고 구조가 머리와 꼬리를 모두 유지합니다. 양쪽의 삽입과 삭제는 몇 개의 연결만 바꾸므로 $O(1)$입니다.

![이중 연결 리스트 기반 덱](deque.assets/linkedlist_deque_step1.png)

### 배열 구현

원형 배열은 두 인덱스 또는 앞 인덱스와 현재 크기를 사용합니다. 모듈로 연산이 논리적 위치를 물리적 위치로 바꾸어 양 끝이 배열 경계를 돌아갈 수 있게 합니다.

![원형 배열 기반 덱](deque.assets/array_deque_step1.png)

동적 배열은 캐시를 잘 활용하지만 가끔 확장해야 합니다. 이중 연결 리스트는 노드 단위로 확장하지만 원소마다 두 연결을 저장합니다.

## 덱의 활용

- 슬라이딩 윈도 최댓값·최솟값을 위한 단조 큐
- 작업 스케줄링과 work stealing
- 양쪽에서 문자를 비교하는 회문 검사
- 크기가 제한된 최근 기록
- 가중치 $0$ 간선은 앞에, $1$ 간선은 뒤에 넣는 0–1 BFS
