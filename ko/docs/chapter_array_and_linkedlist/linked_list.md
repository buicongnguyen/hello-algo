# 연결 리스트

실행 중인 시스템의 빈 메모리는 여러 곳에 흩어져 있을 수 있습니다. 배열은 연속된 메모리 영역이 필요하므로 전체 여유 메모리가 충분해도 매우 큰 배열을 할당하지 못하는 경우가 있습니다. 연결 리스트는 이런 상황에서 더 유연합니다.

**연결 리스트**는 노드 객체로 이루어진 선형 자료구조입니다. 노드는 참조로 연결되고 각 참조는 다음 노드의 위치를 기록합니다. 따라서 노드가 연속되지 않은 주소에 있어도 됩니다.

![연결 리스트의 정의와 저장 방식](linked_list.assets/linkedlist_definition.png)

각 **노드**는 값과 다음 노드를 가리키는 참조로 구성됩니다.

- 첫 노드는 **머리 노드**, 마지막 노드는 **꼬리 노드**입니다.
- 꼬리 노드는 Python의 `None` 같은 빈 값을 가리킵니다.
- C, C++, Go, Rust에서는 여기서 말하는 참조를 보통 포인터로 표현합니다.
- 각 노드가 참조를 추가로 저장하므로 같은 수의 값을 저장할 때 연결 리스트가 배열보다 많은 메모리를 쓰는 경우가 많습니다.

```python
class ListNode:
    """단일 연결 리스트의 노드입니다."""

    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None
```

## 기본 연산

### 연결 리스트 초기화

노드를 하나씩 만들고 `next` 관계를 설정합니다. 리스트는 여러 독립 객체로 이루어지지만 보통 머리 노드로 전체 리스트를 나타냅니다.

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


n0 = ListNode(1)
n1 = ListNode(3)
n2 = ListNode(2)
n3 = ListNode(5)
n4 = ListNode(4)
n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4
```

### 노드 삽입

인접한 `n0`와 `n1` 사이에 노드 `P`를 삽입한다고 합시다. 이미 `n0`에 대한 참조가 있다면 두 연결만 바꾸면 되므로 삽입에 $O(1)$ 시간이 걸립니다.

![연결 리스트에 노드를 삽입하는 예](linked_list.assets/linkedlist_insert_node.png)

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def insert(n0: ListNode, node: ListNode) -> None:
    node.next = n0.next
    n0.next = node
```

### 노드 삭제

`n0` 바로 다음 노드를 삭제하려면 `n0.next`가 그 노드를 건너뛰고 다음 노드를 가리키게 합니다. 삭제된 노드가 이전 참조를 계속 가지고 있을 수 있지만 머리 노드부터 순회할 때는 더 이상 도달할 수 없습니다.

![연결 리스트에서 노드를 삭제하는 예](linked_list.assets/linkedlist_remove_node.png)

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def remove_after(n0: ListNode) -> None:
    if n0.next is None:
        return
    n0.next = n0.next.next
```

### 노드 접근

연결 리스트는 인덱스로 주소를 직접 계산할 수 없습니다. $i$번째 노드를 얻으려면 머리 노드에서 시작해 연결을 하나씩 따라가야 하므로 접근 복잡도는 $O(n)$입니다.

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def access(head: ListNode | None, index: int) -> ListNode | None:
    for _ in range(index):
        if head is None:
            return None
        head = head.next
    return head
```

### 노드 검색

값이 `target`인 노드를 찾는 것도 선형 탐색입니다.

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def find(head: ListNode | None, target: int) -> int:
    index = 0
    while head is not None:
        if head.value == target:
            return index
        head = head.next
        index += 1
    return -1
```

## 배열과 연결 리스트 비교

| 특성 | 배열 | 연결 리스트 |
| --- | --- | --- |
| 저장 방식 | 연속 메모리 | 분산 메모리 |
| 확장 | 길이가 고정되고 확장 시 복사 필요 | 노드 단위로 유연하게 조절 |
| 메모리 효율 | 구조 비용은 작지만 남는 용량이 생길 수 있음 | 각 노드에 추가 연결 필요 |
| 원소 접근 | $O(1)$ | $O(n)$ |
| 위치를 아는 경우 뒤에 삽입 | 보통 $O(n)$ | $O(1)$ |
| 위치를 아는 경우 뒤의 원소 삭제 | 보통 $O(n)$ | $O(1)$ |

연결 리스트 삽입과 삭제의 $O(1)$ 복잡도는 연산할 위치의 참조를 이미 가지고 있다고 가정합니다. 먼저 위치를 찾아야 한다면 전체 과정은 여전히 $O(n)$이 될 수 있습니다.

## 연결 리스트의 종류

- **단일 연결 리스트**: 각 노드가 값과 다음 노드의 연결을 저장하고 꼬리 노드는 `None`을 가리킵니다.
- **원형 연결 리스트**: 꼬리 노드가 머리 노드를 다시 가리킵니다. 어느 노드든 시작점으로 볼 수 있습니다.
- **이중 연결 리스트**: 각 노드가 이전 노드와 다음 노드의 연결을 모두 저장합니다. 양방향 순회가 가능하지만 메모리를 더 사용합니다.

![자주 사용하는 연결 리스트의 종류](linked_list.assets/linkedlist_common_types.png)

## 대표적인 활용

단일 연결 리스트는 다음 구조에서 자주 사용됩니다.

- **스택과 큐**: 어느 끝에서 추가하고 삭제하는지에 따라 후입선출 또는 선입선출 동작을 만듭니다.
- **해시 테이블**: 체이닝 방식은 충돌한 원소를 연결 리스트에 저장합니다.
- **그래프**: 인접 리스트에서 각 정점은 이웃 정점 목록과 연결됩니다.

이중 연결 리스트는 앞뒤 원소에 빠르게 접근해야 할 때 적합합니다.

- 트리에서 부모 참조 저장
- 브라우저의 앞으로 가기와 뒤로 가기 기록
- 노드의 추가, 삭제, 이동이 빨라야 하는 LRU 캐시 제거 알고리즘

원형 연결 리스트는 주기적으로 반복하는 작업에 적합합니다.

- 운영체제의 라운드 로빈 스케줄링
- 오디오나 비디오 스트림의 순환 버퍼 관리
