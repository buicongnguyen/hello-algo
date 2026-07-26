# Bài tập

## Ôn tập khái niệm

### Hai lượt đầu của sắp xếp chọn và sắp xếp nổi bọt

Cho mảng `[4, 2, 5, 1, 3]`, hãy sắp tăng dần trong hai phần sau.

<!-- numbered-subquestions -->

1. Mô phỏng hai lượt đầu của sắp xếp chọn. Viết mảng sau mỗi lượt và cho biết vị trí nào đã được cố định.
2. Mô phỏng lượt đầu của sắp xếp nổi bọt. Viết mảng kết quả, số phép đổi chỗ và vị trí đã được cố định.

??? success "Đáp án"

    1. Hai lượt đầu là:

        | Lượt | Mảng | Giải thích |
        | --- | --- | --- |
        | 1 | `[1, 2, 5, 4, 3]` | Chọn số nhỏ nhất 1 và đổi với phần tử đầu |
        | 2 | `[1, 2, 5, 4, 3]` | Số 2 đã ở chỉ số 1 nên không cần đổi |

        Hai vị trí đầu đã cố định. Các lượt sau chỉ cần tìm phần tử nhỏ nhất trong `[5, 4, 3]`.

    2. So sánh lần lượt các cặp kề nhau: đổi 4 với 2; giữ 4 và 5; đổi 5 với 1; rồi đổi 5 với 3.
        Kết quả là `[2, 4, 1, 3, 5]` sau ba phép đổi. Phần tử lớn nhất 5 đã đến cuối nên vị trí cuối được cố định.

### Các phần tử bằng nhau có thể đổi thứ tự tương đối không?

Trong mảng $[2_a, 2_b, 1]$, hai phần tử $2_a$ và $2_b$ có giá trị bằng nhau, còn chỉ số dưới đánh dấu thứ tự ban đầu.

<!-- numbered-subquestions -->

1. Viết mảng sau lượt đầu của sắp xếp chọn. Thứ tự tương đối của $2_a$ và $2_b$ có đổi không?
2. Viết mảng sau lượt đầu của sắp xếp nổi bọt. Thứ tự tương đối của $2_a$ và $2_b$ có đổi không?
3. Từ hai kết quả, giải thích khác biệt của hai thuật toán trong việc giữ thứ tự ban đầu của các phần tử bằng nhau.

??? success "Đáp án"

    1. Sắp xếp chọn lấy phần tử nhỏ nhất 1 rồi đổi với phần tử đầu $2_a$, tạo
        $[1, 2_b, 2_a]$. Thứ tự đã đổi vì $2_a$ chuyển ra sau $2_b$.

    2. Nổi bọt trước hết so sánh $2_a$ và $2_b$. Chúng bằng nhau nên không đổi. Sau đó so sánh $2_b$ với 1 rồi đổi, nhận
        $[2_a, 1, 2_b]$. Vì $2_a$ vẫn đứng trước $2_b$, thứ tự tương đối được giữ.

    3. Sắp xếp chọn có thể đổi một phần tử qua xa nhiều vị trí nên không ổn định. Nổi bọt chỉ đổi cặp kề nhau khi phần tử trái lớn hơn phần tử phải; các phần tử bằng nhau không bị đổi nên thuật toán ổn định.

### So sánh sắp xếp đếm và sắp xếp theo cơ số

Một trường học cần sắp rất nhiều mã sinh viên, mỗi mã có đúng tám chữ số.

<!-- numbered-subquestions -->

1. Radix sort cần bao nhiêu lượt nếu bắt đầu từ chữ số hàng thấp nhất?
2. Nếu xem toàn bộ mã là số nguyên để dùng counting sort, vì sao mảng đếm sẽ có rất nhiều ô không bao giờ được dùng?
3. Nên chọn counting sort hay radix sort cho tập mã tám chữ số cố định? Giải thích.

??? success "Đáp án"

    1. Mỗi mã có tám chữ số nên cần tám lượt, từ hàng đơn vị đến hàng cao nhất. Mỗi lượt chỉ phân nhóm theo các giá trị 0–9.

    2. Counting sort trực tiếp cần một ô cho mọi giá trị tám chữ số có thể có, trong khi chỉ một phần rất nhỏ các giá trị đó được cấp cho sinh viên. Phần lớn bộ đếm sẽ luôn bằng 0.

    3. Radix sort phù hợp hơn: độ dài cố định và mỗi chữ số chỉ có mười khả năng, nên chỉ cần tám lượt phân nhóm ổn định với mảng đếm nhỏ. Counting sort trên toàn mã lãng phí bộ nhớ cho một miền rất thưa.

## Bài tập lập trình

### Sắp xếp một mảng bằng merge sort

Cho mảng số nguyên `nums`. Hãy tự cài đặt merge sort, sắp các phần tử theo thứ tự không giảm và trả về kết quả. Không gọi hàm sắp xếp tích hợp của ngôn ngữ.

??? tip "Gợi ý"

    1. Đoạn dài không quá một phần tử đã có thứ tự.
    2. Chia đoạn tại điểm giữa và đệ quy sắp hai nửa.
    3. Dùng hai con trỏ trộn hai nửa đã sắp xếp vào mảng tạm, rồi ghi kết quả trở lại mảng gốc.

[LeetCode](https://leetcode.com/problems/sort-an-array/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }

### Sắp xếp mảng số nguyên bằng counting sort

Cho mảng số nguyên `nums` và số nguyên không âm $K$. Mọi phần tử nằm trong khoảng từ $0$ đến $K$.

Hãy dùng counting sort để ghi kết quả không giảm trở lại `nums` rồi trả về mảng. Không xác định thứ tự bằng phép so sánh và không gọi hàm sắp xếp tích hợp.

??? tip "Gợi ý"

    1. Vì mọi phần tử nằm trong miền đã biết, dùng trực tiếp giá trị làm chỉ số của mảng đếm.
    2. Duyệt `nums` một lần và tăng bộ đếm tại vị trí tương ứng.
    3. Duyệt mảng đếm từ nhỏ đến lớn; nếu giá trị `x` xuất hiện nhiều lần, ghi `x` liên tiếp đúng số lần đó vào `nums`.
