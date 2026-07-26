# Bài tập

## Ôn tập khái niệm

### Quan hệ dữ liệu trong đời sống

Dựa trên quan hệ giữa dữ liệu, hãy chọn “cấu trúc tuyến tính”, “cấu trúc cây” hoặc “cấu trúc mạng” cho từng tình huống và giải thích.

Hãy xét một phần tử liên hệ trực tiếp với bao nhiêu phần tử khác, có phân cấp hay chu trình hay không, thay vì chỉ nhìn tên sự vật.

<!-- numbered-subquestions -->

1. Học sinh đứng thành một hàng; chỉ xét người ngay trước và ngay sau mỗi học sinh.
2. Một trường được tổ chức theo các cấp “trường → khối → lớp”.
3. Đường thành phố nối nhiều giao lộ. Từ một giao lộ có thể đi đến nhiều giao lộ khác và các đường có thể tạo thành chu trình.

??? success "Đáp án"

    1. Đây là cấu trúc tuyến tính. Trừ người đầu và cuối, mỗi học sinh kề một người phía trước và một người phía sau, nên quan hệ nối dọc theo một hàng.

    2. Đây là cấu trúc cây. Mỗi lớp thuộc một khối và mỗi khối thuộc trường, nên quan hệ phân cấp từ trên xuống.

    3. Đây là cấu trúc mạng. Một giao lộ có thể nối với nhiều giao lộ và các đường có thể tạo chu trình, nên không thể xếp thành một thứ tự tuyến tính hay một phân cấp nghiêm ngặt.

        Khi xác định cấu trúc, trước hết hãy xét quan hệ giữa các phần tử chứ không phải lượng bộ nhớ chúng chiếm.

### Lưu thứ tự logic trong bộ nhớ

Xét hai cách bố trí bộ nhớ đơn giản để lưu thứ tự logic `A → B → C`:

- Bố trí A: `A`, `B`, `C` lần lượt nằm trong các ô nhớ số `20`, `21`, `22`.
- Bố trí B: `A`, `B`, `C` lần lượt nằm trong các ô nhớ số `20`, `7`, `31`. `A` ghi vị trí của `B`, còn `B` ghi vị trí của `C`.

<!-- numbered-subquestions -->

1. Bố trí nào là lưu trữ liên tiếp và bố trí nào là lưu trữ phân tán?
2. Bố trí nào giống mảng và bố trí nào giống danh sách liên kết?
3. Số ô nhớ của bố trí B không tăng dần. Vì sao nó vẫn biểu diễn được thứ tự `A → B → C`?

??? success "Đáp án"

    1. Bố trí A dùng các ô nhớ liên tiếp nên là lưu trữ liên tiếp. Các nút của bố trí B nằm ở vị trí rời nhau nên là lưu trữ phân tán.

    2. Bố trí A giống mảng; bố trí B giống danh sách liên kết.

    3. Thứ tự logic do các liên kết ghi trong nút quyết định, không phải do thứ tự số của ô nhớ.
        Lần theo vị trí mà `A` lưu sẽ tới `B`, rồi lần theo vị trí mà `B` lưu sẽ tới `C`; vì vậy vẫn có thể thăm `A`, `B`, `C` đúng thứ tự.

        Điều này cho thấy cấu trúc logic và cấu trúc vật lý là hai góc nhìn khác nhau về cùng dữ liệu.

### Kiểu dữ liệu và cấu trúc của bản ghi bài tập

Một nhóm học tập ghi trạng thái nộp bài của bốn học sinh theo thứ tự chỗ ngồi:

`[true, false, true, true]`

<!-- numbered-subquestions -->

1. Kiểu dữ liệu cơ bản nào phù hợp với mỗi phần tử?
2. Bốn phần tử nằm theo một hàng dựa trên thứ tự chỗ ngồi. Đây là cấu trúc logic nào?
3. Nếu sau đó ghi điểm thành `[90, 0, 85, 100]`, “loại nội dung” hay “cách tổ chức” thay đổi? Hãy giải thích.

??? success "Đáp án"

    1. Mỗi phần tử chỉ biểu diễn “đã nộp” hoặc “chưa nộp”, nên kiểu Boolean `bool` phù hợp.

    2. Các phần tử xếp theo thứ tự chỗ ngồi và tạo cấu trúc tuyến tính, có thể lưu trong mảng.

    3. Loại nội dung thay đổi. Phần tử đổi từ Boolean sang số nguyên nhưng phương thức tổ chức không đổi.
        Dữ liệu vẫn nằm theo thứ tự chỗ ngồi trong một mảng tuyến tính.

        Kiểu dữ liệu cơ bản mô tả “lưu gì”, còn cấu trúc dữ liệu mô tả “tổ chức dữ liệu ra sao”.

## Bài tập lập trình

### Đếm số bit 1 trong biểu diễn nhị phân

Cho số nguyên không âm `n`, hãy đếm số bit 1 trong biểu diễn nhị phân của nó.

Phải dùng phép toán bit. Không được chuyển biểu diễn nhị phân thành chuỗi hoặc dùng hàm dựng sẵn đếm trực tiếp số bit 1.

Hãy so sánh số vòng lặp của hai lời giải bit: một lời giải tỷ lệ với số bit của đầu vào, lời giải kia tỷ lệ với số bit 1.

??? tip "Gợi ý"

    1. `n & 1` lấy bit ngoài cùng bên phải của `n` và cho biết bit đó có phải 1 không.
    2. Dịch phải một vị trí sẽ bỏ bit ngoài cùng bên phải hiện tại. Phần lớn ngôn ngữ dùng toán tử `>>`.
    3. Sau khi hiện thực cách kiểm tra rồi dịch từng bit, hãy quan sát rằng `n & (n - 1)` biến bit 1 ngoài cùng bên phải của `n` thành 0.

[LeetCode](https://leetcode.com/problems/number-of-1-bits/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
