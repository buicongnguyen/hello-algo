# Mảng

**Mảng** là cấu trúc dữ liệu tuyến tính lưu các phần tử cùng kiểu trong một vùng nhớ liên tục. Vị trí của một phần tử được gọi là **chỉ mục**.

![Định nghĩa và cách lưu trữ mảng](array.assets/array_definition.png)

## Các thao tác thường gặp trên mảng

### Khởi tạo mảng

Ta có thể khởi tạo mảng có hoặc không có giá trị ban đầu. Khi không chỉ định giá trị, nhiều ngôn ngữ điền giá trị mặc định như $0$. Python dùng `list` làm mảng động, nhưng các ví dụ trong mục này coi danh sách có độ dài cố định để minh họa hành vi của mảng.

```python
# Khởi tạo không có giá trị cụ thể
arr: list[int] = [0] * 5

# Khởi tạo bằng các giá trị cho trước
nums: list[int] = [1, 3, 2, 5, 4]
```

### Truy cập phần tử

Các phần tử nằm liên tục trong bộ nhớ nên địa chỉ của phần tử có thể được tính trực tiếp từ địa chỉ đầu mảng, kích thước phần tử và chỉ mục.

![Cách tính địa chỉ bộ nhớ của phần tử mảng](array.assets/array_memory_location_calculation.png)

Chỉ mục đầu tiên là $0$ vì chỉ mục chính là độ lệch so với địa chỉ đầu mảng. Phần tử đầu tiên có độ lệch bằng $0$.

Nhờ cách tính địa chỉ trực tiếp, mảng hỗ trợ **truy cập ngẫu nhiên** một phần tử trong thời gian $O(1)$.

```python
import random


def random_access(nums: list[int]) -> int:
    """Trả về một phần tử được chọn ngẫu nhiên."""
    index = random.randint(0, len(nums) - 1)
    return nums[index]
```

### Chèn phần tử

Giữa các phần tử mảng không có chỗ trống. Muốn chèn một giá trị tại chỉ mục $i$, ta phải dịch các phần tử từ $i$ trở về sau sang phải một vị trí rồi ghi giá trị mới.

![Ví dụ chèn phần tử vào mảng](array.assets/array_insert_element.png)

Vì độ dài mảng cố định, phần tử cuối có thể bị đẩy ra ngoài. Danh sách động ở phần sau sẽ giải quyết hạn chế này bằng cơ chế mở rộng.

```python
def insert(nums: list[int], num: int, index: int) -> None:
    """Chèn num tại index trong một mảng có độ dài cố định."""
    for i in range(len(nums) - 1, index, -1):
        nums[i] = nums[i - 1]
    nums[index] = num
```

### Xóa phần tử

Để xóa phần tử tại chỉ mục $i$, ta dịch mọi phần tử phía sau sang trái một vị trí. Giá trị cũ ở cuối mảng không còn thuộc phần dữ liệu hợp lệ nên không nhất thiết phải sửa riêng.

![Ví dụ xóa phần tử khỏi mảng](array.assets/array_remove_element.png)

```python
def remove(nums: list[int], index: int) -> None:
    """Xóa logic phần tử tại index."""
    for i in range(index, len(nums) - 1):
        nums[i] = nums[i + 1]
```

Chèn và xóa trong mảng có ba hạn chế chính.

- **Độ phức tạp cao**: trung bình phải dịch nhiều phần tử nên tốn $O(n)$ thời gian.
- **Có thể mất phần tử**: chèn vào mảng cố định có thể làm phần tử cuối bị đẩy ra ngoài.
- **Có thể lãng phí bộ nhớ**: cấp phát một mảng lớn rồi chỉ dùng phần đầu để tránh mất dữ liệu sẽ để lại nhiều ô trống.

### Duyệt mảng

Ta có thể duyệt theo chỉ mục, duyệt trực tiếp từng giá trị hoặc lấy đồng thời chỉ mục và giá trị.

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

### Tìm phần tử

Muốn tìm một giá trị trong mảng chưa sắp xếp, ta duyệt từ đầu và so sánh từng phần tử. Cách này gọi là **tìm kiếm tuyến tính** và có độ phức tạp $O(n)$.

```python
def find(nums: list[int], target: int) -> int:
    for i, num in enumerate(nums):
        if num == target:
            return i
    return -1
```

### Mở rộng mảng

Chương trình không thể giả định vùng nhớ ngay sau mảng còn trống, nên việc kéo dài trực tiếp một mảng là không an toàn. Muốn mở rộng, ta tạo mảng mới lớn hơn và sao chép toàn bộ phần tử. Đây là thao tác $O(n)$.

```python
def extend(nums: list[int], enlarge: int) -> list[int]:
    result = [0] * (len(nums) + enlarge)
    for i, num in enumerate(nums):
        result[i] = num
    return result
```

## Ưu điểm và hạn chế

Các phần tử cùng kiểu và nằm liên tục cung cấp nhiều thông tin để hệ thống tối ưu.

- **Hiệu quả không gian cao**: không cần lưu liên kết giữa các phần tử.
- **Truy cập ngẫu nhiên**: lấy bất kỳ phần tử nào trong $O(1)$.
- **Tính cục bộ bộ nhớ đệm tốt**: khi tải một phần tử, hệ thống thường tải cả dữ liệu lân cận, giúp những lần truy cập tiếp theo nhanh hơn.

Mặt khác, lưu trữ liên tục cũng tạo ra hạn chế.

- **Chèn và xóa chậm** vì phải dịch nhiều phần tử.
- **Độ dài cố định**; mở rộng cần cấp phát và sao chép.
- **Lãng phí không gian** nếu sức chứa lớn hơn nhu cầu thực tế.

## Ứng dụng điển hình

- **Truy cập ngẫu nhiên**: chọn mẫu dựa trên chỉ mục ngẫu nhiên.
- **Sắp xếp và tìm kiếm**: sắp xếp nhanh, sắp xếp trộn và tìm kiếm nhị phân thường thao tác trên mảng.
- **Bảng tra cứu**: dùng một giá trị như mã ASCII làm chỉ mục để tìm quan hệ tương ứng.
- **Học máy**: vector, ma trận và tensor đều được xây dựng theo dạng mảng.
- **Triển khai cấu trúc khác**: ngăn xếp, hàng đợi, bảng băm, đống và ma trận kề của đồ thị đều có thể dựa trên mảng.
