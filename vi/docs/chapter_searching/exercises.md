# Bài tập

## Ôn tập khái niệm

### Tìm kiếm nhị phân thu hẹp khoảng như thế nào?

Hãy tìm số 16 trong mảng tăng dần `[2, 5, 8, 12, 16, 23, 38]`. Dùng khoảng đóng `[i, j]` và tính chỉ số giữa theo công thức $m=i+(j-i)/2$, lấy phần nguyên dưới.

Ở mỗi vòng, viết bộ `(i, j, m)`, phần tử giữa và cách thu hẹp khoảng tiếp theo cho đến khi tìm thấy mục tiêu.

??? success "Đáp án"

    Quá trình tìm kiếm:

    | Vòng | `(i, j, m)` | Phần tử giữa | Bước tiếp theo |
    | --- | --- | --- | --- |
    | 1 | `(0, 6, 3)` | 12 | `12 < 16`, gán `i = 4` |
    | 2 | `(4, 6, 5)` | 23 | `23 > 16`, gán `j = 4` |
    | 3 | `(4, 4, 4)` | 16 | Tìm thấy mục tiêu, trả về chỉ số 4 |

    Vì mảng đã sắp xếp, nếu giá trị giữa nhỏ hơn mục tiêu thì có thể loại phần tử giữa và toàn bộ phía trái. Nếu giá trị giữa lớn hơn mục tiêu thì có thể loại phần tử giữa và toàn bộ phía phải.

    Mỗi vòng vẫn giữ bất biến rằng nếu mục tiêu tồn tại thì nó nằm trong khoảng đóng hiện tại.

### Biên trái và biên phải của phần tử trùng

Hãy tìm số 2 trong mảng `[1, 2, 2, 2, 4, 6]`. Một học viên dùng tìm kiếm nhị phân, trả về ngay khi gặp mục tiêu ở chỉ số 2 rồi nói: “Chỉ số 2 là biên trái của số 2.”

<!-- numbered-subquestions -->

1. Nhận định đó có đúng không? Biên trái và biên phải của số 2 là gì? Giải thích.
2. Khi tìm biên trái, nếu phần tử giữa bằng mục tiêu thì tiếp tục tìm về phía nào?
3. Khi tìm biên phải, tiếp tục tìm về phía nào? Chỉ cần nêu hướng, không cần viết toàn bộ quá trình.

??? success "Đáp án"

    1. Nhận định không đúng. Trả về ngay chỉ chứng minh đã tìm thấy một lần xuất hiện, không chứng minh đó là ngoài cùng bên trái hoặc bên phải. Trong mảng này, biên trái là chỉ số 1 và biên phải là chỉ số 3.

    2. Khi tìm biên trái, vẫn tiếp tục tìm ở nửa bên trái dù phần tử giữa bằng 2. Với khoảng đóng, có thể gán `j = m - 1` đồng thời ghi nhận vị trí vừa tìm thấy làm ứng viên.

    3. Khi tìm biên phải, tiếp tục tìm ở nửa bên phải sau khi gặp 2, chẳng hạn gán `i = m + 1`.

    Điểm khác biệt giữa tìm một phần tử và tìm biên nằm ở hành động khi gặp giá trị bằng mục tiêu.

### Chọn phương pháp tìm kiếm theo dữ liệu

Với mỗi tình huống, chọn một phương pháp trong “tìm tuyến tính”, “tìm nhị phân”, “bảng băm” và giải thích:

<!-- numbered-subquestions -->

1. Lặp lại nhiều lần việc tìm trong $10^7$ số nguyên đã sắp xếp và không bao giờ thay đổi; không được dựng thêm cấu trúc dữ liệu.
2. Lặp lại việc kiểm tra khóa có tồn tại trong một tập hợp thường xuyên chèn và xóa. Tập hợp không cần giữ thứ tự và không cần truy vấn khoảng.
3. Chỉ tìm một lần trong một mảng chưa sắp xếp.

??? success "Đáp án"

    1. Dùng tìm kiếm nhị phân. Dữ liệu đã sắp xếp và tĩnh nên mỗi truy vấn mất $O(\log n)$ thời gian mà không cần không gian phụ.

    2. Dùng bảng băm. Khi hàm băm phân bố khóa tương đối đều, chèn, xóa và tra cứu theo khóa đều có thời gian trung bình $O(1)$.

    3. Duyệt trực tiếp từ đầu đến cuối. Nếu chỉ tìm một lần, sắp xếp mảng hoặc dựng bảng băm vẫn phải xử lý toàn bộ mảng trước, nên không giảm tổng công việc cho tác vụ này.

    Lựa chọn phụ thuộc vào dữ liệu có thứ tự hay không, có cho phép cấu trúc phụ không, số lần tìm và các phép cập nhật phải hỗ trợ.

## Bài tập lập trình

### Tìm kiếm nhị phân trong mảng tăng dần

Cho mảng số nguyên `nums` tăng nghiêm ngặt và giá trị `target`. Dùng tìm kiếm nhị phân để tìm `target`. Nếu tồn tại, trả về chỉ số trong mảng; nếu không, trả về `-1`.

Thuật toán phải loại bỏ khoảng không thể chứa mục tiêu sau mỗi phép so sánh và không được chuyển sang duyệt tuyến tính.

??? tip "Gợi ý"

    1. Khoảng ban đầu có `left = 0`, `right = n - 1`; khoảng còn không rỗng khi `left <= right`.
    2. Tính giữa bằng `mid = left + (right - left) // 2` để tránh tràn số.
    3. Nếu `nums[mid] < target`, chuyển biên trái đến `mid + 1`; nếu lớn hơn, chuyển biên phải đến `mid - 1`; nếu bằng nhau, trả về ngay.

[LeetCode](https://leetcode.com/problems/binary-search/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }

### Điểm chèn trong mảng tăng dần

Cho mảng số nguyên `nums` tăng nghiêm ngặt và giá trị `target`.

Nếu `target` đã có trong mảng, trả về chỉ số của nó. Nếu chưa có, trả về vị trí có thể chèn `target` mà mảng vẫn tăng nghiêm ngặt. Điểm chèn có thể là đầu mảng hoặc bằng độ dài mảng. Hãy dùng tìm kiếm nhị phân.

Kết quả chính là chỉ số đầu tiên có giá trị lớn hơn hoặc bằng mục tiêu; nếu không có chỉ số như vậy, kết quả nằm ngay sau phần tử cuối.

??? tip "Gợi ý"

    1. Đáp án có thể là 0 hoặc độ dài `n` của mảng.
    2. Với khoảng đóng, nếu `nums[mid] >= target`, gán `right = mid - 1` và tiếp tục xét về trái; nếu không, gán `left = mid + 1`.
    3. Khi vòng lặp kết thúc, `left` là điểm chèn.

[LeetCode](https://leetcode.com/problems/search-insert-position/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
