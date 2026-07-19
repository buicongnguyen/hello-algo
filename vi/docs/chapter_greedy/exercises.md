# Bài tập

## Ôn tập khái niệm

### Chọn đồng xu lớn nhất có luôn tốt nhất không?

Các mệnh giá đồng xu là `[1, 7, 10]` và số tiền mục tiêu là 14.

<!-- numbered-subquestions -->

1. Làm theo quy tắc “luôn chọn mệnh giá lớn nhất không vượt quá số tiền còn lại” và viết ra các đồng xu được chọn.
2. Có cách dùng ít đồng xu hơn không? Nếu có, hãy nêu một cách; nếu không, hãy giải thích.
3. Ví dụ này có cho thấy chiến lược tham lam đúng với mọi tập mệnh giá hay không?

??? success "Đáp án"

    1. Chiến lược tham lam chọn `10 + 1 + 1 + 1 + 1`, tổng cộng 5 đồng xu.

    2. Có cách dùng ít đồng xu hơn: `7 + 7`, chỉ dùng 2 đồng xu.

    3. Không. Phản ví dụ này cho thấy với mệnh giá tùy ý, việc liên tục chọn mệnh giá lớn nhất hiện có không nhất thiết giảm thiểu số đồng xu.
        Lựa chọn tức thời lớn nhất có thể ngăn cản một tổ hợp tốt hơn về sau.

### Nên đưa vật nào vào ba lô trước?

Một ba lô sức chứa 4 kg có thể chứa các vật sau. Có thể lấy một phần của vật,
và giá trị nhận được tỷ lệ thuận với trọng lượng:

- Vật A: trọng lượng 4 kg, giá trị 20.
- Vật B: trọng lượng 3 kg, giá trị 18.

<!-- numbered-subquestions -->

1. Giá trị trên mỗi kg của từng vật là bao nhiêu? Nên đưa vật nào vào trước?
2. Lấp đầy ba lô bằng chiến lược tham lam cho bài toán ba lô phân số. Giá trị cuối cùng là bao nhiêu?
3. Khi có thể chia nhỏ vật và ba lô giới hạn tổng trọng lượng, nên so sánh vật theo tổng giá trị hay giá trị trên mỗi kg? Vì sao?

??? success "Đáp án"

    1. A có giá trị `20 ÷ 4 = 5` trên mỗi kg, còn B có `18 ÷ 3 = 6` trên mỗi kg,
        nên B có mật độ giá trị cao hơn và được đưa vào trước.

    2. Trước hết lấy toàn bộ B, dùng 3 kg sức chứa và nhận giá trị 18. Với 1 kg còn lại,
        lấy 1 kg của A và nhận thêm giá trị 5. Giá trị cuối cùng là `18 + 5 = 23`.

    3. Ba lô giới hạn tổng trọng lượng và vật có thể chia nhỏ, nên so sánh theo giá trị trên một đơn vị trọng lượng.
        Dù A có tổng giá trị lớn hơn, giá trị trên mỗi kg của nó thấp hơn B. Nếu lấp ba lô bằng A trước, kết quả chỉ đạt giá trị 20.

### Tiếp theo nên di chuyển con trỏ nào?

Các chiều cao vách ngăn là `[1, 8, 6, 2, 5]`. Dùng hai con trỏ ở hai đầu để tìm sức chứa lớn nhất.
Sức chứa bằng “chiều cao của vách thấp hơn × khoảng cách giữa chỉ mục của hai vách”.

<!-- numbered-subquestions -->

1. Ban đầu con trỏ trái ở chỉ mục 0 và con trỏ phải ở chỉ mục 4. Sức chứa hiện tại là bao nhiêu? Nên di chuyển con trỏ nào?
2. Sau bước di chuyển ở câu 1, hai con trỏ ở chỉ mục nào? Sức chứa lúc này là bao nhiêu? Tiếp theo nên di chuyển con trỏ nào?
3. Với cặp vách hiện tại, có thể di chuyển con trỏ ở vách thấp hơn hoặc cao hơn. Cách nào còn có khả năng tạo sức chứa lớn hơn, và vì sao?

??? success "Đáp án"

    1. Sức chứa hiện tại là `min(1, 5) × (4 - 0) = 4`. Vách trái thấp hơn nên di chuyển con trỏ trái.

    2. Sau khi con trỏ trái di chuyển, hai con trỏ ở chỉ mục 1 và 4. Sức chứa hiện tại là
        `min(8, 5) × (4 - 1) = 15`. Vách phải thấp hơn nên tiếp theo di chuyển con trỏ phải.

    3. Chỉ việc di chuyển con trỏ ở vách thấp hơn mới còn khả năng tạo sức chứa lớn hơn. Nếu di chuyển con trỏ ở vách cao hơn,
        khoảng cách chắc chắn giảm trong khi chiều cao vẫn bị giới hạn bởi vách thấp hơn chưa di chuyển, nên sức chứa chỉ có thể giữ nguyên hoặc giảm.
        Chỉ khi di chuyển vách thấp hơn mới có thể gặp một vách cao hơn.

## Bài tập lập trình

### Ba lô phân số

Cho hai mảng cùng độ dài `wgt` và `val`, trong đó `wgt[i] > 0` và `val[i] >= 0`. Ba lô có sức chứa `cap >= 0`.
Mỗi vật chỉ có một, nhưng có thể đặt bất kỳ phần nào của vật vào ba lô.
Giá trị nhận được tỷ lệ với phần trọng lượng được lấy. Hãy dùng thuật toán tham lam
và trả về tổng giá trị thực lớn nhất mà ba lô có thể chứa.

??? tip "Gợi ý"

    1. Trước hết tính giá trị trên một đơn vị trọng lượng của từng vật bằng val[i] / wgt[i], giữ lại phần thập phân
    2. Đưa vật có giá trị trên một đơn vị trọng lượng cao hơn vào trước
    3. Nếu sức chứa còn lại nhỏ hơn trọng lượng vật hiện tại, chỉ lấy đúng phần vừa lấp đầy ba lô rồi dừng
