# Bảng băm

**Bảng băm** lưu các cặp khóa–giá trị và dùng hàm băm để ánh xạ khóa đến chỉ mục của một mảng nền. Trong điều kiện tốt, thêm, xóa và tìm kiếm đều có chi phí trung bình $O(1)$.

![Biểu diễn trừu tượng của bảng băm](hash_map.assets/hash_table_lookup.png)

## Các thao tác thường gặp

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

Không nên giả định thứ tự duyệt của mọi cách triển khai bảng băm. Một số ngôn ngữ duy trì thứ tự chèn như một đặc tính riêng, nhưng bản chất của phép tra cứu vẫn dựa trên băm.

## Triển khai bảng băm đơn giản

Hàm băm nhận khóa và trả về một số nguyên. Chỉ mục thường được tính bằng phép modulo:

$$
index = hash(key) \bmod capacity
$$

![Nguyên lý hoạt động của hàm băm](hash_map.assets/hash_function.png)

Ví dụ tối giản sau dùng các bucket là danh sách để xử lý xung đột.

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

## Xung đột băm và mở rộng

Hai khóa khác nhau có thể được ánh xạ đến cùng chỉ mục; đây là **xung đột băm**.

![Ví dụ xung đột băm](hash_map.assets/hash_collision.png)

**Hệ số tải** đo mức độ đầy của bảng:

$$
load\ factor = \frac{size}{capacity}
$$

Khi hệ số tải tăng, xung đột thường xuất hiện nhiều hơn. Bảng băm sẽ cấp phát mảng lớn hơn rồi tính lại vị trí cho mọi cặp khóa–giá trị. Quá trình này gọi là **rehash** và tốn $O(n)$ cho lần mở rộng, nhưng mở rộng không xảy ra ở mọi thao tác.

![Mở rộng và băm lại bảng](hash_map.assets/hash_table_reshash.png)

Trong trường hợp xấu nhất, nhiều khóa rơi vào cùng bucket và thao tác có thể suy giảm đến $O(n)$. Hàm băm tốt, hệ số tải hợp lý và chiến lược xử lý xung đột giúp duy trì hiệu năng trung bình gần $O(1)$.
