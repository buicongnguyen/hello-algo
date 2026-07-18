# 해시 테이블

**해시 테이블**은 키–값 쌍을 저장하고 해시 함수로 키를 기반 배열의 인덱스에 매핑합니다. 조건이 좋으면 삽입, 삭제, 검색의 평균 비용이 모두 $O(1)$입니다.

![해시 테이블의 추상적 표현](hash_map.assets/hash_table_lookup.png)

## 기본 연산

```python
table: dict[str, int] = {}
table["Alice"] = 100
table["Bob"] = 85
score = table["Alice"]
table["Alice"] = 95
table.pop("Bob")
for name, value in table.items():
    print(name, value)
```

모든 해시 테이블 구현이 같은 순회 순서를 보장한다고 가정하면 안 됩니다. 일부 언어는 삽입 순서를 별도의 특성으로 유지하지만 조회의 핵심은 여전히 해싱입니다.

## 간단한 해시 테이블 구현

해시 함수는 키를 받아 정수를 반환합니다. 인덱스는 보통 모듈로 연산으로 계산합니다.

$$
index = hash(key) \bmod capacity
$$

![해시 함수의 동작 원리](hash_map.assets/hash_function.png)

다음 단순 구현은 각 버킷에 리스트를 두어 충돌을 처리합니다.

```python
class HashMap:
    def __init__(self, capacity: int = 16):
        self._buckets: list[list[tuple[str, int]]] = [
            [] for _ in range(capacity)
        ]

    def _index(self, key: str) -> int:
        return hash(key) % len(self._buckets)

    def put(self, key: str, value: int) -> None:
        bucket = self._buckets[self._index(key)]
        for i, (stored_key, _) in enumerate(bucket):
            if stored_key == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key: str) -> int:
        for stored_key, value in self._buckets[self._index(key)]:
            if stored_key == key:
                return value
        raise KeyError(key)

    def remove(self, key: str) -> None:
        bucket = self._buckets[self._index(key)]
        for i, (stored_key, _) in enumerate(bucket):
            if stored_key == key:
                bucket.pop(i)
                return
        raise KeyError(key)
```

## 해시 충돌과 확장

서로 다른 두 키가 같은 인덱스에 매핑될 수 있는데 이를 **해시 충돌**이라고 합니다.

![해시 충돌의 예](hash_map.assets/hash_collision.png)

**적재율**은 테이블이 얼마나 찼는지 나타냅니다.

$$
load\ factor = \frac{size}{capacity}
$$

적재율이 높아지면 일반적으로 충돌이 늘어납니다. 해시 테이블은 더 큰 배열을 할당하고 모든 키–값 쌍의 위치를 다시 계산합니다. 이를 **재해싱**이라 하며 확장하는 한 번에는 $O(n)$이 들지만 매 연산마다 일어나지는 않습니다.

![해시 테이블 확장과 재해싱](hash_map.assets/hash_table_reshash.png)

최악의 경우 많은 키가 같은 버킷에 들어가 연산이 $O(n)$까지 느려질 수 있습니다. 좋은 해시 함수, 적절한 적재율, 충돌 처리 전략이 평균 성능을 $O(1)$에 가깝게 유지합니다.
