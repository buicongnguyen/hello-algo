# Bài tập

## Ôn tập khái niệm

### Heap thay đổi thế nào sau khi chèn 10?

Mảng `[9, 7, 8, 3, 5]` biểu diễn một heap cực đại. Bây giờ hãy chèn số 10.

<!-- numbered-subquestions -->

1. Trước tiên nối 10 vào cuối mảng. Giá trị nút cha của nó là bao nhiêu?
2. Từ nút mới, thực hiện heapify từ dưới lên và viết lại mảng sau mỗi lần đổi chỗ.
3. Phần tử đỉnh cuối cùng là gì? Tổng cộng có bao nhiêu lần đổi chỗ?

??? success "Đáp án"

    1. Sau khi nối 10, chỉ số của nó là 5 nên chỉ số nút cha là
        $\lfloor(5-1)/2\rfloor=2$. Giá trị nút cha là 8.

    2. Vì 10 lớn hơn 8, sau lần đổi chỗ đầu tiên mảng là `[9, 7, 10, 3, 5, 8]`.
        Vì 10 cũng lớn hơn nút cha 9, sau lần đổi chỗ thứ hai mảng là `[10, 7, 9, 3, 5, 8]`.
        Lúc này 10 đã đến nút gốc nên heapify hoàn tất.

    3. Phần tử đỉnh cuối cùng là 10 và tổng cộng có 2 lần đổi chỗ.

### Kiểm tra quan hệ cha–con trong heap cực tiểu

Mảng `[1, 4, 3, 7, 6, 2]` biểu diễn một cây nhị phân hoàn chỉnh. Trong heap cực tiểu, mọi nút cha phải không lớn hơn các nút con.
Với chỉ số $i$, chỉ số con trái và con phải lần lượt là $2i+1$ và $2i+2$.

<!-- numbered-subquestions -->

1. Các nút con của chỉ số 2 có chỉ số và giá trị nào?
2. Nút ở chỉ số 2 có giá trị 3. Nó có vi phạm quy tắc heap cực tiểu với nút con không? Nếu có, cần đổi hai phần tử nào?
3. Dựa trên câu 2, viết mảng sau khi đổi chỗ nếu quy tắc bị vi phạm; nếu không, giải thích vì sao không cần đổi. Cuối cùng kiểm tra các quan hệ cha–con còn lại.

??? success "Đáp án"

    1. Con trái của chỉ số 2 ở chỉ số 5 và có giá trị 2. Chỉ số con phải là 6, nhưng mảng dài 6 nên con phải không tồn tại.

    2. Giá trị cha 3 lớn hơn giá trị con 2, vi phạm quy tắc heap cực tiểu. Cần đổi phần tử ở chỉ số 2 với phần tử ở chỉ số 5.

    3. Sau khi đổi, mảng là `[1, 4, 2, 7, 6, 3]`. Kiểm tra từng quan hệ:
        `1 ≤ 4`, `1 ≤ 2`; `4 ≤ 7`, `4 ≤ 6`; và `2 ≤ 3`.
        Mọi nút cha đều không lớn hơn nút con, nên mảng đã thỏa mãn quy tắc heap cực tiểu.

### Giữ ba số lớn nhất bằng heap cực tiểu

Để giữ 3 số lớn nhất từ luồng dữ liệu `[4, 1, 7, 3, 8]`, hãy duy trì một heap cực tiểu chứa không quá 3 phần tử.

Trước tiên lần lượt chèn 3 số đầu vào heap. Khi heap đã đầy, với mỗi số mới: nếu số đó lớn hơn đỉnh heap thì xóa đỉnh và chèn số mới; nếu không thì giữ nguyên heap.

Sau mỗi số được đọc, hãy viết tập các số đang được giữ và phần tử đỉnh. Chỉ cần ghi các số dưới dạng tập hợp, không cần nêu thứ tự của chúng trong mảng heap.

??? success "Đáp án"

    Kết quả sau mỗi lần đọc là:

    | Số vừa đọc | Các số được giữ | Đỉnh |
    | --- | --- | --- |
    | 4 | `{4}` | 4 |
    | 1 | `{1, 4}` | 1 |
    | 7 | `{1, 4, 7}` | 1 |
    | 3 | `{3, 4, 7}` | 3 |
    | 8 | `{4, 7, 8}` | 4 |

    Khi heap đã đầy, đỉnh là số nhỏ nhất trong các số đang giữ. Một số mới chỉ thay đỉnh khi nó lớn hơn đỉnh.
    Tập cuối cùng `{4, 7, 8}` chứa đúng 3 số lớn nhất.

## Bài tập lập trình

### Tìm phần tử lớn thứ k trong mảng

Cho mảng số nguyên `nums` và số nguyên $k$, với $1 \le k \le n$ và $n$ là chiều dài mảng. Hãy trả về phần tử đứng ở vị trí $k$ nếu sắp xếp mảng từ lớn đến nhỏ.

Các phần tử trùng nhau được tính riêng. Ví dụ, phần tử lớn thứ hai của `[5, 5, 2]` vẫn là 5. Hãy dùng heap cực tiểu chứa không quá $k$ phần tử.

??? tip "Gợi ý"

    1. Phần tử lớn thứ k là phần tử nhỏ nhất trong k số lớn nhất.
    2. Chèn từng số vào heap cực tiểu; bất cứ khi nào kích thước heap vượt quá k, hãy xóa giá trị nhỏ nhất.
    3. Sau khi duyệt xong, heap chứa k số lớn nhất và đỉnh heap là đáp án.

[LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
