# Bài tập

## Ôn tập khái niệm

### Phần tử nào rời ngăn xếp hoặc hàng đợi trước?

Lần lượt đưa `A`, `B`, `C` vào một ngăn xếp và một hàng đợi. Hãy nêu thứ tự lấy ra.

??? success "Đáp án"

    Ngăn xếp tuân theo vào sau, ra trước nên lấy `C, B, A`. Hàng đợi tuân theo vào trước, ra trước nên lấy `A, B, C`.

### Điều gì xảy ra khi cuối hàng vượt khỏi cuối mảng?

Một hàng đợi dùng mảng độ dài 5. Sau nhiều lần thêm và lấy, phía đầu mảng có ô trống nhưng chỉ mục cuối đã tới cuối mảng. Có cần dịch mọi phần tử không?

??? success "Đáp án"

    Không. Hàng đợi vòng dùng phép lấy dư để đưa chỉ mục cuối trở lại đầu mảng. Cách này tái sử dụng ô trống mà không phải dịch $O(n)$ phần tử.

### Thao tác ở hai đầu deque

Với deque `[B, C]`, hãy lần lượt thêm `A` ở đầu, thêm `D` ở cuối, lấy đầu rồi lấy cuối.

??? success "Đáp án"

    Sau hai lần thêm, deque là `[A, B, C, D]`. Lấy đầu trả về `A`, lấy cuối trả về `D`, phần còn lại là `[B, C]`. Các thao tác ở hai đầu đều có thể đạt $O(1)$.

## Bài tập lập trình

### Kiểm tra dãy dấu ngoặc

Cho chuỗi chỉ gồm `()[]{}`, hãy xác định các dấu ngoặc có đóng mở đúng loại và đúng thứ tự hay không.

??? tip "Gợi ý"

    Đưa dấu mở vào ngăn xếp. Khi gặp dấu đóng, đỉnh ngăn xếp phải là dấu mở tương ứng. Kết thúc hợp lệ khi ngăn xếp rỗng.

[LeetCode](https://leetcode.com/problems/valid-parentheses/)
