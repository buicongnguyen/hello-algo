# Danh sách động

**Danh sách** là một khái niệm cấu trúc dữ liệu trừu tượng biểu diễn tập hợp phần tử có thứ tự. Nó hỗ trợ truy cập, cập nhật, chèn, xóa và duyệt mà người dùng không phải tự quản lý giới hạn sức chứa.

“Trừu tượng” nghĩa là giao diện xác định hành vi mà người dùng mong đợi nhưng không buộc một cách lưu trữ duy nhất. Cùng một giao diện danh sách có thể được cài bằng danh sách liên kết hoặc mảng động, và hiệu suất từng thao tác thay đổi theo cách cài.

Danh sách có thể được triển khai bằng danh sách liên kết hoặc mảng.

- Danh sách liên kết tự nhiên hỗ trợ tăng kích thước, chèn, xóa, tìm và cập nhật.
- Mảng hỗ trợ những thao tác đó nhưng độ dài cố định, nên chỉ là một danh sách có giới hạn sức chứa.

Nếu không biết trước lượng dữ liệu, chọn kích thước mảng cố định rất khó: quá nhỏ thì thiếu chỗ, quá lớn thì lãng phí. **Mảng động** giải quyết vấn đề bằng cách tự mở rộng trong lúc chương trình chạy.

Mảng động phân biệt **kích thước** và **sức chứa**. Kích thước là số phần tử hợp lệ hiện có; sức chứa là tổng số ô đã cấp phát trong mảng nền. Khi kích thước nhỏ hơn sức chứa, có thể ghi trực tiếp vào cuối. Khi hai giá trị bằng nhau, cấu trúc tạo mảng lớn hơn, sao chép dữ liệu rồi mới thêm phần tử.

Nhiều kiểu danh sách trong thư viện chuẩn được xây dựng bằng mảng động, chẳng hạn `list` của Python, `ArrayList` của Java, `vector` của C++ và `List` của C#. Trong mục này, “danh sách” và “mảng động” được dùng với ý nghĩa tương đương.

Người dùng thường chỉ nhìn thấy số phần tử hiện tại, còn thư viện che giấu sức chứa nền và quá trình cấp phát lại. Sự trừu tượng này tiện hơn mảng cố định, nhưng bên trong vẫn chịu các đặc tính của vùng nhớ liên tục và chi phí sao chép. Vì thế, danh sách tự mở rộng không đồng nghĩa mọi phép chèn hoặc xóa đều nhanh.

## Các thao tác thường gặp

### Khởi tạo

Chúng ta có thể tạo danh sách rỗng hoặc khởi tạo từ các giá trị cho trước.

```python
empty: list[int] = []
nums: list[int] = [1, 3, 2, 5, 4]
```

??? pythontutor "Chạy trực quan"

    [Quan sát khởi tạo danh sách trong Python Tutor](https://pythontutor.com/render.html#code=empty%20%3D%20%5B%5D%0Anums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

Danh sách rỗng chưa có phần tử nhưng đã là một vùng chứa sẵn sàng nhận dữ liệu. Khi khởi tạo bằng các giá trị, thư viện cấp đủ sức chứa rồi đặt chúng theo thứ tự. Tùy ngôn ngữ, kiểu phần tử được chỉ định tĩnh hoặc thông tin kiểu được lưu cùng đối tượng lúc chạy.

Độ dài ban đầu và sức chứa nội bộ có thể khác nhau vì cài đặt được phép dành trước ô cho các lần thêm sau. Những ô chưa dùng không phải phần tử hợp lệ; phép duyệt và kiểm tra chỉ mục luôn dựa trên kích thước, không dựa trên sức chứa.

### Truy cập và cập nhật

Vì danh sách động dùng mảng làm nền, truy cập hoặc cập nhật theo chỉ mục có độ phức tạp $O(1)$.

Truy cập đọc giá trị, còn cập nhật thay giá trị ở cùng vị trí. Cả hai đều tính địa chỉ từ vị trí đầu và chỉ mục, nên số bước không phụ thuộc độ dài danh sách. Chỉ mục ngoài phạm vi phải gây lỗi hoặc được xử lý theo hợp đồng của ngôn ngữ.

```python
nums = [1, 3, 2, 5, 4]
value = nums[1]
nums[1] = 0
```

??? pythontutor "Chạy trực quan"

    [Quan sát truy cập và cập nhật trong Python Tutor](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Avalue%20%3D%20nums%5B1%5D%0Anums%5B1%5D%20%3D%200&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### Chèn và xóa

Thêm ở cuối danh sách thường tốn $O(1)$ theo nghĩa trung bình dồn. Chèn hoặc xóa ở giữa vẫn cần dịch phần tử nên tốn $O(n)$.

Nếu còn sức chứa, thêm cuối chỉ ghi vào ô sau phần tử hợp lệ cuối và tăng kích thước. Chèn giữa phải dịch đoạn phía sau sang phải để tạo chỗ; xóa giữa kéo đoạn phía sau sang trái để lấp khoảng trống. Việc tự quản lý độ dài không thay đổi tính chất vật lý của vùng nhớ liên tục.

```python
nums = [1, 3, 2, 5, 4]
nums.append(6)
nums.insert(3, 7)
nums.pop(3)
```

??? pythontutor "Chạy trực quan"

    [Quan sát chèn và xóa trong Python Tutor](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Anums.append%286%29%0Anums.insert%283%2C7%29%0Anums.pop%283%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

Khi sức chứa đã đầy, thao tác thêm phải cấp phát mảng lớn hơn và sao chép dữ liệu, nên riêng lần đó tốn `O(n)`. Tuy nhiên, nếu mỗi lần mở rộng tăng sức chứa theo một hệ số, chi phí trung bình của nhiều lần thêm cuối danh sách vẫn là `O(1)`.

Đây là **phân tích trung bình dồn**: chi phí của lần mở rộng đắt được chia cho nhiều phép thêm rẻ đã diễn ra trước đó. Nếu chỉ tăng từng ô, gần như lần thêm nào cũng phải sao chép; nếu tăng theo một tỉ lệ cố định, số lần thêm rẻ giữa hai lần mở rộng cũng tăng theo.

Ví dụ, khi sức chứa tăng gấp đôi, sau lần mở rộng sẽ có một lượng ô trống bằng kích thước cũ. Nhiều phép thêm tiếp theo chỉ ghi giá trị và tăng kích thước. Tuy vậy, một lần thêm cụ thể vẫn có thể chậm; hệ thống nhạy với độ trễ cực đại nên cân nhắc đặt trước sức chứa.

### Duyệt

Giống mảng, danh sách có thể được duyệt theo chỉ mục, theo giá trị hoặc đồng thời cả hai.

Thuật toán cần vị trí có thể dùng kiểu thứ nhất; thuật toán chỉ xử lý nội dung dùng kiểu thứ hai; kiểu thứ ba cung cấp đồng thời chỉ mục và giá trị. Cả ba chỉ thăm phạm vi kích thước hiện tại và bỏ qua sức chứa chưa sử dụng.

```python
nums = [1, 3, 2, 5, 4]
for i in range(len(nums)):
    print(nums[i])
for num in nums:
    print(num)
for i, num in enumerate(nums):
    print(i, num)
```

??? pythontutor "Chạy trực quan"

    [Quan sát duyệt danh sách trong Python Tutor](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Afor%20i%2Cnum%20in%20enumerate%28nums%29%3A%0A%20%20%20%20print%28i%2Cnum%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### Nối danh sách

Một danh sách mới có thể được nối vào cuối danh sách hiện có.

Phép nối sao chép lần lượt các phần tử của danh sách thứ hai ra sau danh sách thứ nhất. Nếu biết trước kích thước cuối, đặt trước sức chứa giúp tránh mở rộng lặp lại. Tên và hợp đồng của hàm có thể khác nhau: có hàm sửa danh sách gốc, có hàm trả về một danh sách mới.

Nếu tổng độ dài vượt sức chứa hiện tại, cấu trúc phải mở rộng trước hoặc trong khi nối. Trường hợp nguồn và đích trùng nhau đòi hỏi ghi nhớ độ dài cũ hay dùng bản sao tạm để không tiếp tục đọc các phần tử vừa thêm. Hiểu rõ hàm có sửa tại chỗ hay tạo mới giúp tránh lỗi do nhiều biến cùng tham chiếu một danh sách.

```python
nums = [1, 3, 2]
nums.extend([5, 4])
```

??? pythontutor "Chạy trực quan"

    [Quan sát nối danh sách trong Python Tutor](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%5D%0Anums.extend%28%5B5%2C4%5D%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### Sắp xếp

Sau khi sắp xếp, danh sách có thể hỗ trợ các kỹ thuật như tìm kiếm nhị phân và hai con trỏ.

Hàm sắp xếp của thư viện chuẩn thường đã được kiểm thử và tối ưu kỹ. Ngoài thứ tự tăng mặc định, nhiều ngôn ngữ cho phép truyền hàm so sánh hoặc khóa để sắp đối tượng theo một trường cụ thể. Vì sắp xếp làm thay đổi vị trí phần tử, cần cẩn thận nếu chỉ mục cũ mang ý nghĩa riêng.

Sau khi có thứ tự, tìm kiếm có thể thu hẹp phạm vi một nửa mỗi lượt hoặc dùng hai con trỏ từ hai đầu. Nhưng bản thân sắp xếp cũng tốn chi phí và có thể làm mất thứ tự đầu vào, nên không phải lúc nào sắp trước một truy vấn duy nhất cũng có lợi. Cần cân nhắc số lần truy vấn và công việc tiếp theo.

```python
nums = [1, 3, 2, 5, 4]
nums.sort()
```

??? pythontutor "Chạy trực quan"

    [Quan sát sắp xếp danh sách trong Python Tutor](https://pythontutor.com/render.html#code=nums%20%3D%20%5B1%2C3%2C2%2C5%2C4%5D%0Anums.sort%28%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

## Tự triển khai danh sách động

Các thư viện chuẩn có cách triển khai được tối ưu kỹ. Để hiểu cơ chế cốt lõi, chúng ta xây dựng một phiên bản đơn giản với ba quyết định.

- **Sức chứa ban đầu**: mảng nền bắt đầu với 10 ô.
- **Theo dõi kích thước**: biến `size` lưu số phần tử thực tế, khác với sức chứa.
- **Cơ chế mở rộng**: khi mảng đầy, tạo mảng có sức chứa gấp đôi và sao chép dữ liệu.

Một cài đặt đúng phải giữ các bất biến: kích thước không vượt sức chứa và mọi phần tử hợp lệ nằm liền nhau ở đầu mảng nền. Truy cập và cập nhật kiểm tra chỉ mục theo kích thước; chèn mở rộng nếu cần rồi mới dịch; xóa kéo phần phía sau để không để lại lỗ trống.

Mỗi phương thức phải thay đổi trạng thái theo thứ tự không phá bất biến. Thêm và chèn kiểm tra chỗ trống trước khi tăng kích thước. Xóa lưu giá trị trả về, dịch dữ liệu rồi mới giảm kích thước. Việc kiểm tra chỉ mục trước mọi thay đổi cũng ngăn tình trạng thất bại sau khi chỉ mới di chuyển một phần dữ liệu.

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

`MyList` chỉ lưu số nguyên để minh họa. Thư viện thực tế còn xử lý kiểu tổng quát, bộ lặp, an toàn ngoại lệ và chiến lược cấp phát. Sau khi xóa, cài đặt có thể dọn ô cuối hay giải phóng tham chiếu để đối tượng không bị giữ lại không cần thiết.

Cài đặt sản xuất còn quy định khi nào giảm sức chứa, kích thước mảng tối đa, tràn số nguyên và lỗi cấp phát. Ngôn ngữ cũng xác định bộ lặp hay tham chiếu cũ còn hợp lệ hay không sau khi mở rộng làm đổi địa chỉ lưu trữ. Phiên bản học tập tập trung vào nguyên lý, còn thư viện chuẩn phải giải quyết đồng thời các trường hợp biên và tối ưu hiệu suất.

Danh sách động làm mảng thực tế hơn nhưng không loại bỏ mọi đánh đổi. Nó giữ truy cập `O(1)` và tính cục bộ bộ nhớ tốt, đổi lại có thể để trống một phần sức chứa và đôi lúc phải trả chi phí mở rộng `O(n)`.

Đặc biệt, nên tách riêng tỉ lệ truy cập theo chỉ mục, thêm cuối và chèn giữa trong tải công việc. Danh sách động của thư viện chuẩn là lựa chọn mặc định tốt trong nhiều tình huống; ở đoạn mã nhạy hiệu suất, hãy đo sự thay đổi sức chứa và chi phí dịch phần tử với kích thước đầu vào thật.
