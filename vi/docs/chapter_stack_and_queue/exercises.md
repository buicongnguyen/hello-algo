# Bài tập

## Ôn tập khái niệm

### Phần tử nào rời ngăn xếp hoặc hàng đợi trước?

Chuẩn bị một ngăn xếp rỗng `S` và một hàng đợi rỗng `Q`. Thực hiện cùng chuỗi thao tác sau trên mỗi cấu trúc:

Bước 1: Thêm `A`.
Bước 2: Thêm `B`.
Bước 3: Loại bỏ và ghi lại một phần tử.
Bước 4: Thêm `C`.
Bước 5: Tiếp tục loại bỏ và ghi lại các phần tử cho đến khi cấu trúc rỗng.

Hãy viết thứ tự các phần tử được lấy khỏi `S` và `Q`. Giải thích sự khác nhau bằng nguyên tắc “vào sau, ra trước” hoặc “vào trước, ra trước”.

??? success "Đáp án"

    Thứ tự lấy khỏi ngăn xếp `S` là `B, C, A`. Sau khi thêm `A, B`, phần tử được thêm gần nhất là `B` được lấy trước. Sau khi thêm `C`, lần lượt lấy `C, A`. Đây là nguyên tắc “vào sau, ra trước”.

    Thứ tự lấy khỏi hàng đợi `Q` là `A, B, C`. Sau khi thêm `A, B`, phần tử vào sớm nhất là `A` được lấy trước. Sau khi thêm `C`, lần lượt lấy `B, C`. Đây là nguyên tắc “vào trước, ra trước”.

### Điều gì xảy ra khi cuối hàng vượt khỏi cuối mảng?

Một hàng đợi được cài đặt bằng mảng vòng độ dài 5, có các chỉ số `0–4`. Hiện tại `front = 3`, `size = 2`; hai phần tử `A, B` lần lượt nằm ở chỉ số 3 và 4.

<!-- numbered-subquestions -->

1. Khi đưa `C` vào hàng, cần lưu `C` ở chỉ số nào? Sau đó `size` bằng bao nhiêu?
2. Tiếp theo thực hiện một lần ra hàng. Phần tử nào bị loại bỏ? Giá trị mới của `front` và `size` là gì?
3. Thứ tự logic từ đầu đến cuối lúc này là gì? Thao tác ra hàng có phải dịch các phần tử khác trong mảng không? Vì sao?

??? success "Đáp án"

    1. Vị trí của phần tử mới là `(front + size) % 5 = (3 + 2) % 5 = 0`, nên `C` được lưu ở chỉ số 0. Sau thao tác vào hàng, `size = 3`.

    2. Thao tác ra hàng loại bỏ phần tử đầu hiện tại là `A`. Chỉ số đầu mới là `(3 + 1) % 5 = 4`, nên `front = 4` và `size = 2`.

    3. Thứ tự logic của các phần tử hợp lệ là `B, C`, trong đó `B` ở chỉ số 4 và `C` ở chỉ số 0. Ra hàng chỉ cần thay đổi `front` và `size`. Mảng vòng dùng phép lấy dư để đưa chỉ số quay lại đầu, vì vậy không phải dịch các phần tử còn lại.

### Thao tác ở hai đầu deque

Ở đây, `push_first` thêm phần tử vào đầu, `push_last` thêm vào cuối, `pop_first` loại bỏ ở đầu và `pop_last` loại bỏ ở cuối.

Thực hiện các thao tác sau trên deque rỗng `deq`:

1. `push_last(A)`
2. `push_last(B)`
3. `push_first(C)`
4. `pop_last()`
5. `push_last(D)`
6. `pop_first()`

<!-- numbered-subquestions -->

1. Hai thao tác lấy ra trả về những phần tử nào?
2. Sau khi hoàn tất, những phần tử nào còn lại theo thứ tự từ đầu đến cuối?
3. Một hàng đợi chỉ cho phép thêm ở cuối và loại bỏ ở đầu có thực hiện được cả sáu thao tác không? Nếu không, hãy chỉ ra thao tác không được hỗ trợ. Sau đó giải thích vì sao deque thực hiện được tất cả.

??? success "Đáp án"

    Sau ba bước đầu, deque theo thứ tự từ đầu đến cuối là `[C, A, B]`.

    <!-- numbered-subquestions -->

    1. `pop_last()` loại bỏ `B`. Sau khi thêm `D`, deque là `[C, A, D]`; tiếp đó `pop_first()` loại bỏ `C`.

    2. Hai phần tử còn lại là `[A, D]`.

    3. Hàng đợi chỉ thêm ở cuối và loại bỏ ở đầu không thể thực hiện tất cả thao tác. Bước 3, `push_first(C)`, đòi hỏi thêm ở đầu; bước 4, `pop_last()`, đòi hỏi loại bỏ ở cuối. Deque cho phép thêm và loại bỏ ở cả hai phía nên thực hiện được cả sáu bước.

## Bài tập lập trình

### Kiểm tra dãy dấu ngoặc

Cho chuỗi `s` chỉ chứa ba loại dấu ngoặc `()`, `[]` và `{}`. Hãy dùng ngăn xếp để xác định chuỗi có hợp lệ hay không.

Một dãy hợp lệ phải thỏa cả hai điều kiện: mỗi dấu đóng khớp đúng loại với dấu mở chưa được ghép gần nhất, và sau khi duyệt xong không còn dấu mở nào chưa được ghép. Trả về một giá trị Boolean.

??? tip "Các gợi ý"

    1. Có thể tạo ánh xạ từ mỗi dấu đóng tới dấu mở tương ứng.
    2. Khi gặp dấu đóng, trước tiên kiểm tra ngăn xếp có rỗng không, sau đó kiểm tra phần tử đỉnh có khớp không.
    3. Sau khi duyệt hết chuỗi, ngăn xếp cũng phải rỗng.

[LeetCode](https://leetcode.com/problems/valid-parentheses/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
