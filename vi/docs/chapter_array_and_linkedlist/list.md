# Danh sách động

**Danh sách** là một khái niệm cấu trúc dữ liệu trừu tượng biểu diễn tập hợp phần tử có thứ tự. Nó hỗ trợ truy cập, cập nhật, chèn, xóa và duyệt mà người dùng không phải tự quản lý giới hạn sức chứa.

Danh sách có thể được triển khai bằng danh sách liên kết hoặc mảng.

- Danh sách liên kết tự nhiên hỗ trợ tăng kích thước, chèn, xóa, tìm và cập nhật.
- Mảng hỗ trợ những thao tác đó nhưng độ dài cố định, nên chỉ là một danh sách có giới hạn sức chứa.

Nếu không biết trước lượng dữ liệu, chọn kích thước mảng cố định rất khó: quá nhỏ thì thiếu chỗ, quá lớn thì lãng phí. **Mảng động** giải quyết vấn đề bằng cách tự mở rộng trong lúc chương trình chạy.

Nhiều kiểu danh sách trong thư viện chuẩn được xây dựng bằng mảng động, chẳng hạn `list` của Python, `ArrayList` của Java, `vector` của C++ và `List` của C#. Trong mục này, “danh sách” và “mảng động” được dùng với ý nghĩa tương đương.

## Các thao tác thường gặp

### Khởi tạo

Ta có thể tạo danh sách rỗng hoặc khởi tạo từ các giá trị cho trước.

```python
empty: list[int] = []
nums: list[int] = [1, 3, 2, 5, 4]
```

### Truy cập và cập nhật

Vì danh sách động dùng mảng làm nền, truy cập hoặc cập nhật theo chỉ mục có độ phức tạp $O(1)$.

```python
nums = [1, 3, 2, 5, 4]
value = nums[1]
nums[1] = 0
```

### Chèn và xóa

Thêm ở cuối danh sách thường tốn $O(1)$ theo nghĩa trung bình dồn. Chèn hoặc xóa ở giữa vẫn cần dịch phần tử nên tốn $O(n)$.

```python
nums = [1, 3, 2, 5, 4]
nums.append(6)
nums.insert(3, 7)
nums.pop(3)
```

Khi sức chứa đã đầy, thao tác thêm phải cấp phát mảng lớn hơn và sao chép dữ liệu, nên riêng lần đó tốn $O(n)$. Tuy nhiên, nếu mỗi lần mở rộng tăng sức chứa theo một hệ số, chi phí trung bình của nhiều lần thêm cuối danh sách vẫn là $O(1)$.

### Duyệt

Giống mảng, danh sách có thể được duyệt theo chỉ mục, theo giá trị hoặc đồng thời cả hai.

```python
nums = [1, 3, 2, 5, 4]
for i in range(len(nums)):
    print(nums[i])
for num in nums:
    print(num)
for i, num in enumerate(nums):
    print(i, num)
```

### Nối danh sách

Một danh sách mới có thể được nối vào cuối danh sách hiện có.

```python
nums = [1, 3, 2]
nums.extend([5, 4])
```

### Sắp xếp

Sau khi sắp xếp, danh sách có thể hỗ trợ các kỹ thuật như tìm kiếm nhị phân và hai con trỏ.

```python
nums = [1, 3, 2, 5, 4]
nums.sort()
```

## Tự triển khai danh sách động

Các thư viện chuẩn có cách triển khai được tối ưu kỹ. Để hiểu cơ chế cốt lõi, ta xây dựng một phiên bản đơn giản với ba quyết định.

- **Sức chứa ban đầu**: mảng nền bắt đầu với 10 ô.
- **Theo dõi kích thước**: biến `size` lưu số phần tử thực tế, khác với sức chứa.
- **Cơ chế mở rộng**: khi mảng đầy, tạo mảng có sức chứa gấp đôi và sao chép dữ liệu.

```python
class MyList:
    """Danh sách số nguyên dựa trên mảng động."""

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
            raise IndexError("Chỉ mục nằm ngoài phạm vi")
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
            raise IndexError("Chỉ mục nằm ngoài phạm vi")
```

Danh sách động làm mảng thực tế hơn nhưng không loại bỏ mọi đánh đổi. Nó giữ truy cập $O(1)$ và tính cục bộ bộ nhớ tốt, đổi lại có thể để trống một phần sức chứa và đôi lúc phải trả chi phí mở rộng $O(n)$.
