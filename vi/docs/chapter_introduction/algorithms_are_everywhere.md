# Thuật toán ở khắp nơi

Khi nghe từ “thuật toán”, chúng ta thường nghĩ ngay đến toán học. Thực tế, nhiều thuật toán không dựa vào toán học phức tạp mà chủ yếu sử dụng logic cơ bản. Vì vậy, ta có thể bắt gặp chúng ở khắp nơi trong đời sống.

Trước khi tìm hiểu thuật toán một cách chính thức, có một điều thú vị đáng nhắc tới: **bạn đã học nhiều thuật toán mà không nhận ra, và vẫn thường xuyên áp dụng chúng hằng ngày**. Ba ví dụ sau sẽ làm rõ điều đó.

## Ví dụ 1: Tra từ điển

Trong từ điển tiếng Anh, các từ được sắp xếp theo thứ tự bảng chữ cái. Giả sử cần tìm một từ bắt đầu bằng chữ $r$, ta thường làm như sau:

1. Mở từ điển ở khoảng giữa và xem từ đầu tiên trên trang; giả sử từ đó bắt đầu bằng chữ $m$.
2. Vì $r$ đứng sau $m$ trong bảng chữ cái, bỏ qua nửa đầu và thu hẹp phạm vi tìm kiếm xuống nửa sau.
3. Lặp lại hai bước trên cho đến khi tìm thấy trang chứa từ bắt đầu bằng $r$.

![Bước 1 khi tra từ điển](algorithms_are_everywhere.assets/binary_search_dictionary_step1.png)
![Bước 2 khi thu hẹp phạm vi tìm kiếm](algorithms_are_everywhere.assets/binary_search_dictionary_step2.png)
![Bước 3 khi thu hẹp phạm vi tìm kiếm](algorithms_are_everywhere.assets/binary_search_dictionary_step3.png)
![Bước 4 khi thu hẹp phạm vi tìm kiếm](algorithms_are_everywhere.assets/binary_search_dictionary_step4.png)
![Bước 5 khi tìm thấy vùng cần tra](algorithms_are_everywhere.assets/binary_search_dictionary_step5.png)

Tra từ điển—một kỹ năng quen thuộc từ thời tiểu học—thực chất sử dụng thuật toán **tìm kiếm nhị phân**. Nếu nhìn theo cấu trúc dữ liệu, cuốn từ điển giống một “mảng” đã sắp xếp. Nếu nhìn theo thuật toán, chuỗi thao tác liên tục bỏ đi một nửa phạm vi chính là tìm kiếm nhị phân.

## Ví dụ 2: Sắp xếp bài trên tay

Khi chơi bài, chúng ta thường xếp các lá trên tay theo thứ tự tăng dần:

1. Chia các lá thành phần “đã sắp xếp” và “chưa sắp xếp”; ban đầu coi lá ngoài cùng bên trái đã ở đúng thứ tự.
2. Lấy một lá từ phần chưa sắp xếp và chèn nó vào vị trí phù hợp trong phần đã sắp xếp. Lúc này hai lá ngoài cùng bên trái đã có thứ tự.
3. Lặp lại bước 2 cho đến khi mọi lá bài đều đúng vị trí.

![Quá trình sắp xếp các lá bài](algorithms_are_everywhere.assets/playing_cards_sorting.png)

Cách làm trên chính là **sắp xếp chèn**. Thuật toán này hoạt động hiệu quả với tập dữ liệu nhỏ, nên nhiều thư viện sắp xếp tích hợp trong ngôn ngữ lập trình vẫn dùng nó cho những đoạn dữ liệu ngắn.

## Ví dụ 3: Trả lại tiền thừa

Giả sử bạn mua hàng hết 69 đồng và đưa cho thu ngân 100 đồng. Thu ngân cần trả lại 31 đồng. Một cách thực hiện là:

1. Các mệnh giá không lớn hơn 31 gồm 1, 5, 10 và 20.
2. Chọn mệnh giá lớn nhất là 20; số tiền còn lại là $31 - 20 = 11$.
3. Chọn mệnh giá lớn nhất không vượt quá 11 là 10; số tiền còn lại là $11 - 10 = 1$.
4. Chọn mệnh giá 1; số tiền còn lại là $1 - 1 = 0$.
5. Hoàn tất với $20 + 10 + 1 = 31$.

![Quá trình chọn tiền để trả lại](algorithms_are_everywhere.assets/greedy_change.png)

Ở mỗi bước, ta chọn phương án có vẻ tốt nhất tại thời điểm hiện tại—mệnh giá lớn nhất còn có thể dùng. Trong cấu trúc dữ liệu và thuật toán, cách tiếp cận này được gọi là **thuật toán tham lam**.

> Ví dụ trả tiền chỉ minh họa tư tưởng tham lam. Với một số hệ mệnh giá, luôn chọn đồng tiền lớn nhất có thể không tạo ra phương án dùng ít đồng nhất. Một thuật toán tham lam cần được chứng minh đúng cho hệ quy tắc cụ thể.

Từ nấu một bữa ăn đến du hành giữa các vì sao, gần như mọi quá trình giải quyết vấn đề đều có thuật toán. Máy tính cho phép chúng ta lưu cấu trúc dữ liệu trong bộ nhớ và viết mã để CPU hoặc GPU thực hiện thuật toán. Nhờ đó, ta có thể chuyển bài toán thực tế vào máy tính và xử lý những vấn đề phức tạp hiệu quả hơn.

> Nếu các khái niệm như cấu trúc dữ liệu, thuật toán, mảng hay tìm kiếm nhị phân vẫn còn mơ hồ, đừng lo. Cuốn sách sẽ dẫn bạn từng bước vào thế giới này.
