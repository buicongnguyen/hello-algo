# Bài tập

## Ôn tập khái niệm

### Tìm kiếm sau xung đột băm

Một bảng băm có 5 bucket và dùng hàm $h(x)=x \bmod 5$. Khi xung đột xảy ra, các phần tử được đặt liên tiếp trong một danh sách tại bucket đó. Hãy chèn `[1, 6, 11, 7]` theo thứ tự.

<!-- numbered-subquestions -->

1. Viết nội dung của các bucket từ 0 đến 4.
2. Khi tìm số 6, bucket nào được kiểm tra trước và các phần tử được so sánh theo thứ tự nào?
3. Dựa trên nội dung ở câu 1, phần tử thêm sau có ghi đè phần tử trước không? Hãy giải thích theo cơ chế xử lý xung đột này.

??? success "Đáp án"

    1. Vì $1\bmod5=6\bmod5=11\bmod5=1$, còn $7\bmod5=2$, các bucket là:

        ```text
        0: []
        1: [1, 6, 11]
        2: [7]
        3: []
        4: []
        ```

    2. Tìm số 6 trước tiên đi tới bucket 1, sau đó lần lượt so sánh 1 và 6. Phần tử đích được tìm thấy ở lần so sánh thứ hai.

    3. Giá trị băm bằng nhau chỉ có nghĩa các phần tử đi vào cùng bucket, không có nghĩa chúng giống nhau. Tạo chuỗi riêng giữ mọi phần tử xung đột và so sánh từng phần tử khi tìm, nên 1, 6 và 11 không ghi đè nhau.

### Phần tử đi đâu sau khi bảng băm mở rộng?

Một bảng băm tạo chuỗi riêng ban đầu có 5 bucket và dùng $h(x)=x\bmod5$. Các khóa `[1, 6, 11]` đều nằm trong bucket 1.

Bảng được mở rộng thành 7 bucket và hàm băm trở thành $h(x)=x\bmod7$.

<!-- numbered-subquestions -->

1. Tính bucket mới của 1, 6 và 11.
2. Sau khi mở rộng, những bucket nào chứa phần tử?
3. Có thể sao chép nguyên danh sách ở bucket 1 cũ sang bucket 1 mới không? Hãy giải thích bằng kết quả hai câu trước.

??? success "Đáp án"

    1. Các bucket mới là:

        - $1\bmod7=1$;
        - $6\bmod7=6$;
        - $11\bmod7=4$.

    2. Bucket 1 lưu 1, bucket 4 lưu 11 và bucket 6 lưu 6. Ba khóa không còn nằm chung một bucket.

    3. Không thể sao chép nguyên danh sách. Chỉ số bucket được tính bằng khóa chia dư cho số bucket. Khi số bucket đổi từ 5 thành 7, chỉ số của khóa có thể thay đổi nên vị trí của từng khóa phải được tính lại. Nếu sao chép nguyên bucket 1, lần tìm sau sẽ đi tới bucket 6 để tìm 6 và bucket 4 để tìm 11 nhưng không thấy chúng.

### Sau khi xóa 6, còn tìm được 11 không?

Một bảng băm có 5 vị trí, chỉ số `0–4`, và dùng hàm $h(x)=x\bmod5$. Khi xung đột, bảng tìm sang phải từ chỉ số do hàm băm tạo ra cho đến vị trí trống đầu tiên.

Hãy chèn `[1, 6, 11]` theo thứ tự.

<!-- numbered-subquestions -->

1. Cuối cùng mỗi số được lưu ở chỉ số nào?
2. Khi tìm 11, các chỉ số được kiểm tra theo thứ tự nào?
3. Giả sử xóa 6 bằng cách biến vị trí của nó thành “ô trống chưa từng sử dụng”, và tìm kiếm dừng khi gặp ô trống. Sau đó điều gì xảy ra khi tìm 11? Kết quả có đúng không và phải tránh vấn đề bằng cách nào?

??? success "Đáp án"

    1. Số 1 nằm ở chỉ số 1. Số 6 cũng ánh xạ tới 1 nên sau xung đột được lưu ở chỉ số 2. Số 11 bắt đầu ở 1, bỏ qua hai vị trí đã dùng và cuối cùng nằm ở chỉ số 3.

    2. Tìm 11 lần lượt kiểm tra các chỉ số `1, 2, 3` và thấy phần tử ở chỉ số 3.

    3. Nếu chỉ số 2 trở thành “chưa từng sử dụng”, quá trình tìm 11 kiểm tra chỉ số 1 rồi dừng ở 2, kết luận sai rằng 11 không tồn tại. Thao tác xóa phải để lại một dấu “đã xóa”. Tìm kiếm gặp dấu này tiếp tục sang vị trí kế tiếp, có thể vòng từ 4 về 0, còn lần chèn sau vẫn được phép tái sử dụng vị trí.

## Bài tập lập trình

### So sánh số lần xuất hiện của ký tự trong hai chuỗi

Cho hai chuỗi `s` và `t` chỉ gồm chữ cái tiếng Anh viết thường. Có thể sắp xếp lại các ký tự trong `s` theo thứ tự bất kỳ nhưng không được thêm, xóa hoặc thay thế ký tự.

Hãy xác định chuỗi sau khi sắp xếp có thể tạo thành `t` hay không. Trả về `true` nếu có và `false` nếu không. Dùng bảng băm để ghi số lần mỗi chữ xuất hiện và không sắp xếp trực tiếp các ký tự.

??? tip "Gợi ý"

    1. Nếu hai chuỗi có độ dài khác nhau, số lần xuất hiện của từng ký tự không thể hoàn toàn giống nhau.
    2. Dùng bảng băm lưu số đếm của từng chữ và tăng số đếm khi duyệt `s`.
    3. Giảm số đếm tương ứng khi duyệt `t`; hai chuỗi có cùng tập số đếm chỉ khi mọi giá trị cuối cùng đều bằng 0.

[LeetCode](https://leetcode.com/problems/valid-anagram/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
