# Bài toán Tháp Hà Nội

Trong sắp xếp trộn và bài toán dựng cây nhị phân, chúng ta phân rã bài toán ban đầu thành hai bài toán con, mỗi bài có kích thước bằng một nửa. Tuy nhiên, với bài toán Tháp Hà Nội, chúng ta dùng một chiến lược phân rã khác.

!!! question

    Cho ba cọc ký hiệu là `A`, `B` và `C`. Ban đầu, cọc `A` có $n$ đĩa xếp chồng, kích thước tăng dần từ trên xuống. Nhiệm vụ là chuyển toàn bộ $n$ đĩa sang cọc `C` mà vẫn giữ nguyên thứ tự, như hình dưới đây. Mỗi lần di chuyển phải tuân theo các quy tắc sau.

    1. Chỉ được lấy đĩa ở trên cùng của một cọc và đặt lên trên cùng của cọc khác.
    2. Mỗi lần chỉ được di chuyển một đĩa.
    3. Đĩa nhỏ hơn luôn phải nằm trên đĩa lớn hơn.

![Ví dụ bài toán Tháp Hà Nội](hanota_problem.assets/hanota_example.png)

**Chúng ta ký hiệu bài toán Tháp Hà Nội kích thước $i$ là $f(i)$**. Chẳng hạn, $f(3)$ nghĩa là chuyển $3$ đĩa từ `A` sang `C`.

### Xét các trường hợp cơ sở

Như hình dưới, với bài toán $f(1)$ chỉ có một đĩa, chúng ta có thể chuyển trực tiếp từ `A` sang `C`.

**Bước 1**

![Lời giải bài toán kích thước 1, bước 1](hanota_problem.assets/hanota_f1_step1.png)

**Bước 2**

![Lời giải bài toán kích thước 1, bước 2](hanota_problem.assets/hanota_f1_step2.png)

Với bài toán $f(2)$ có hai đĩa, **do luôn phải giữ đĩa nhỏ hơn ở trên đĩa lớn hơn, chúng ta cần dùng `B` làm cọc hỗ trợ**, như hình dưới.

1. Trước hết, chuyển đĩa nhỏ từ `A` sang `B`.
2. Tiếp theo, chuyển đĩa lớn từ `A` sang `C`.
3. Cuối cùng, chuyển đĩa nhỏ từ `B` sang `C`.

**Bước 1**

![Lời giải bài toán kích thước 2, bước 1](hanota_problem.assets/hanota_f2_step1.png)

**Bước 2**

![Lời giải bài toán kích thước 2, bước 2](hanota_problem.assets/hanota_f2_step2.png)

**Bước 3**

![Lời giải bài toán kích thước 2, bước 3](hanota_problem.assets/hanota_f2_step3.png)

**Bước 4**

![Lời giải bài toán kích thước 2, bước 4](hanota_problem.assets/hanota_f2_step4.png)

Quá trình giải $f(2)$ có thể tóm tắt là: **chuyển hai đĩa từ `A` sang `C` với sự hỗ trợ của `B`**. Ở đây, `C` được gọi là cọc đích và `B` là cọc đệm.

### Phân rã bài toán con

Với bài toán $f(3)$ gồm ba đĩa, tình huống phức tạp hơn một chút.

Vì đã biết lời giải của $f(1)$ và $f(2)$, chúng ta có thể tư duy theo chia để trị, **xem hai đĩa trên cùng của `A` như một khối**, rồi thực hiện các bước ở hình dưới để chuyển thành công ba đĩa từ `A` sang `C`.

1. Chọn `B` làm cọc đích và `C` làm cọc đệm, chuyển hai đĩa từ `A` sang `B`.
2. Chuyển trực tiếp đĩa còn lại từ `A` sang `C`.
3. Chọn `C` làm cọc đích và `A` làm cọc đệm, chuyển hai đĩa từ `B` sang `C`.

**Bước 1**

![Lời giải bài toán kích thước 3, bước 1](hanota_problem.assets/hanota_f3_step1.png)

**Bước 2**

![Lời giải bài toán kích thước 3, bước 2](hanota_problem.assets/hanota_f3_step2.png)

**Bước 3**

![Lời giải bài toán kích thước 3, bước 3](hanota_problem.assets/hanota_f3_step3.png)

**Bước 4**

![Lời giải bài toán kích thước 3, bước 4](hanota_problem.assets/hanota_f3_step4.png)

Về bản chất, **chúng ta chia bài toán $f(3)$ thành hai bài toán con $f(2)$ và một bài toán con $f(1)$**. Giải lần lượt ba bài toán con này cũng giải xong bài toán ban đầu. Điều đó cho thấy các bài toán con độc lập và có thể hợp nhất lời giải.

Từ đây, chúng ta tổng quát chiến lược chia để trị trong hình dưới: chia bài toán ban đầu $f(n)$ thành hai bài toán con $f(n-1)$ và một bài toán con $f(1)$, rồi giải chúng theo thứ tự sau.

1. Chuyển $n-1$ đĩa từ `A` sang `B` với sự hỗ trợ của `C`.
2. Chuyển trực tiếp $1$ đĩa còn lại từ `A` sang `C`.
3. Chuyển $n-1$ đĩa từ `B` sang `C` với sự hỗ trợ của `A`.

Với hai bài toán con $f(n-1)$, **chúng ta có thể tiếp tục phân rã đệ quy theo cùng một cách** cho đến bài toán nhỏ nhất $f(1)$. Lời giải của $f(1)$ đã biết và chỉ cần một thao tác di chuyển.

![Chiến lược chia để trị giải bài toán Tháp Hà Nội](hanota_problem.assets/hanota_divide_and_conquer.png)

### Triển khai mã

Trong mã, chúng ta khai báo hàm đệ quy `dfs(i, src, buf, tar)` để chuyển $i$ đĩa trên cùng từ cọc `src` sang cọc đích `tar` với sự hỗ trợ của cọc đệm `buf`:

```python
# Mã giải Tháp Hà Nội chính thức được chèn từ nguồn đã khóa.
```

Như hình dưới, bài toán Tháp Hà Nội tạo thành một cây đệ quy cao $n$; mỗi nút biểu diễn một bài toán con tương ứng với một lần gọi `dfs()`. **Do đó, độ phức tạp thời gian là $O(2^n)$ và độ phức tạp không gian là $O(n)$**.

![Cây đệ quy của bài toán Tháp Hà Nội](hanota_problem.assets/hanota_recursive_tree.png)

!!! quote

    Bài toán Tháp Hà Nội bắt nguồn từ một truyền thuyết cổ. Trong một ngôi đền ở Ấn Độ cổ đại, các nhà sư có ba cọc kim cương cao và $64$ đĩa vàng với kích thước khác nhau. Họ liên tục di chuyển các đĩa và tin rằng khi đĩa cuối cùng được đặt đúng vị trí, thế giới sẽ kết thúc.

    Tuy nhiên, ngay cả khi mỗi giây chuyển được một đĩa, quá trình vẫn cần khoảng $2^{64} \approx 1.84×10^{19}$ giây, tương đương khoảng $585$ tỷ năm, vượt xa ước tính hiện nay về tuổi của vũ trụ. Vì vậy, nếu truyền thuyết là thật, chúng ta cũng chưa cần lo về ngày tận thế.
