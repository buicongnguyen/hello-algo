# Bài tập

## Ôn tập khái niệm

### Tìm kiếm nhị phân thu hẹp khoảng như thế nào?

Trong mảng `[1, 3, 5, 7, 9, 11, 13]`, hãy lần theo tìm kiếm nhị phân để tìm `11`.

??? success "Đáp án"

    Xét giữa là `7`, vì `11 > 7` nên bỏ nửa trái. Giữa của đoạn `[9,11,13]` là `11`, tìm thấy sau hai lần so sánh. Mỗi bước loại ít nhất một nửa phạm vi nên mất $O(\log n)$.

### Biên trái và phải của các phần tử trùng nhau

Trong `[1, 2, 2, 2, 4]`, hãy xác định chỉ mục đầu và cuối của giá trị `2`.

??? success "Đáp án"

    Biên trái là 1 và biên phải là 3. Khi tìm biên trái, gặp `2` vẫn tiếp tục sang nửa trái; khi tìm biên phải, gặp `2` tiếp tục sang nửa phải.

### Chọn phương pháp tìm kiếm cho dữ liệu khác nhau

Hãy chọn giữa quét tuyến tính, tìm kiếm nhị phân và bảng băm cho: một danh sách nhỏ chưa sắp xếp; mảng lớn đã sắp xếp; tập khóa cần tra cứu lặp lại nhưng không cần thứ tự.

??? success "Đáp án"

    Danh sách nhỏ chưa sắp xếp phù hợp với quét tuyến tính vì không cần chuẩn bị. Mảng lớn đã sắp xếp phù hợp với tìm kiếm nhị phân. Tra cứu khóa lặp lại phù hợp với bảng băm, thường đạt $O(1)$ trung bình nhưng cần thêm bộ nhớ.

## Bài tập lập trình

### Tìm kiếm nhị phân trong mảng đã sắp xếp

Trả về chỉ mục của `target` trong mảng tăng dần, hoặc `-1` nếu không tồn tại.

??? tip "Gợi ý"

    Duy trì khoảng tìm kiếm đóng hoặc nửa mở một cách nhất quán. Tính giữa bằng `left + (right-left)//2`.

[LeetCode](https://leetcode.com/problems/binary-search/)

### Vị trí chèn trong mảng đã sắp xếp

Trả về chỉ mục của `target` nếu tồn tại, nếu không trả về vị trí cần chèn để giữ thứ tự.

??? tip "Gợi ý"

    Tìm vị trí đầu tiên có giá trị không nhỏ hơn `target`. Khoảng tìm kiếm rỗng tại lúc kết thúc sẽ chỉ đúng vị trí chèn.

[LeetCode](https://leetcode.com/problems/search-insert-position/)
