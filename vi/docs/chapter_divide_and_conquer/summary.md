# Tóm tắt

### Ôn tập trọng tâm

- Chia để trị là một chiến lược thiết kế thuật toán phổ biến, gồm hai giai đoạn là chia (phân rã) và trị (hợp nhất), thường được triển khai bằng đệ quy.
- Các tiêu chí để nhận biết bài toán chia để trị gồm: bài toán có thể phân rã hay không, các bài toán con có độc lập hay không, và có thể hợp nhất lời giải của chúng hay không.
- Sắp xếp trộn là một ứng dụng điển hình. Nó đệ quy chia mảng thành hai mảng con có độ dài gần bằng nhau cho đến khi mỗi mảng chỉ còn một phần tử, rồi hợp nhất từng tầng để hoàn tất sắp xếp.
- Đưa chia để trị vào thường nâng cao hiệu suất thuật toán. Một mặt, nó giảm số phép toán; mặt khác, nó tạo điều kiện để hệ thống tối ưu song song.
- Chia để trị vừa giải được nhiều bài toán thuật toán, vừa được sử dụng rộng rãi trong thiết kế cấu trúc dữ liệu và thuật toán; vì vậy tư tưởng này hiện diện ở khắp nơi.
- So với tìm kiếm vét cạn, tìm kiếm thích nghi hiệu quả hơn. Những thuật toán tìm kiếm có độ phức tạp thời gian $O(\log n)$ thường được triển khai dựa trên chia để trị.
- Tìm kiếm nhị phân là một ứng dụng điển hình khác. Nó không có bước hợp nhất lời giải bài toán con và có thể được triển khai bằng chia để trị đệ quy.
- Trong bài toán dựng cây nhị phân, việc dựng toàn cây (bài toán gốc) có thể chia thành dựng cây con trái và phải (các bài toán con), thông qua cách phân chia khoảng chỉ số của thứ tự duyệt tiền tự và trung tự.
- Trong bài toán Tháp Hà Nội, một bài toán kích thước $n$ có thể chia thành hai bài toán con kích thước $n-1$ và một bài toán con kích thước $1$. Giải lần lượt ba bài toán con này sẽ giải được bài toán ban đầu.
