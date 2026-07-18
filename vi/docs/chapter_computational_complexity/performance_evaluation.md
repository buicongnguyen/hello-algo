# Đánh giá hiệu quả thuật toán

Khi thiết kế thuật toán, chúng ta lần lượt hướng tới hai tầng mục tiêu:

1. **Tìm được lời giải:** thuật toán phải cho kết quả đúng một cách đáng tin cậy trong phạm vi đầu vào đã quy định.
2. **Tìm lời giải tốt hơn:** một bài toán có thể có nhiều cách giải; sau khi bảo đảm tính đúng đắn, chúng ta muốn chọn thuật toán hiệu quả nhất có thể.

Nói cách khác, khi thuật toán đã giải được bài toán, hiệu quả trở thành tiêu chí quan trọng để so sánh chất lượng của các lời giải. Hiệu quả có hai chiều chính:

- **Hiệu quả thời gian:** thuật toán cần bao lâu để chạy.
- **Hiệu quả không gian:** thuật toán chiếm bao nhiêu bộ nhớ.

Mục tiêu ngắn gọn là thiết kế cấu trúc dữ liệu và thuật toán **vừa nhanh, vừa tiết kiệm bộ nhớ**. Muốn so sánh và tối ưu một cách có cơ sở, trước hết chúng ta cần phương pháp đánh giá hiệu quả.

Hai nhóm phương pháp chính là đo thực tế và ước lượng lý thuyết.

## Đo thực tế

Giả sử thuật toán `A` và `B` cùng giải một bài toán. Cách trực tiếp nhất là chạy cả hai trên máy tính, đo thời gian và lượng bộ nhớ sử dụng. Phương pháp này phản ánh hành vi thật, nhưng có hai hạn chế lớn.

### Môi trường thử nghiệm tạo ra nhiễu

Cấu hình phần cứng ảnh hưởng đến hiệu năng. Một thuật toán có khả năng song song hóa cao phù hợp hơn với CPU nhiều lõi; một thuật toán liên tục truy cập bộ nhớ có thể hưởng lợi từ hệ thống bộ nhớ nhanh. Vì vậy, cùng một thuật toán có thể cho kết quả khác nhau trên các máy khác nhau.

Muốn có kết luận tổng quát, chúng ta phải thử trên nhiều cấu hình và tổng hợp kết quả. Cách làm này tốn kém và đôi khi không thực tế.

### Thử nghiệm đầy đủ tốn nhiều tài nguyên

Hiệu quả của thuật toán thay đổi theo kích thước đầu vào. Với dữ liệu nhỏ, `A` có thể chạy nhanh hơn `B`; khi dữ liệu lớn, kết quả có thể đảo ngược. Một đánh giá thuyết phục vì thế cần nhiều kích thước và kiểu đầu vào, kéo theo thời gian và tài nguyên tính toán đáng kể.

Đo thực tế vẫn rất quan trọng trong kỹ thuật, nhưng một con số đơn lẻ không đủ để mô tả cách thuật toán mở rộng.

## Ước lượng lý thuyết

Để giảm những hạn chế trên, chúng ta có thể đánh giá bằng tính toán lý thuyết. Phương pháp này gọi là **phân tích độ phức tạp tiệm cận**, thường rút gọn thành **phân tích độ phức tạp**.

Phân tích độ phức tạp mô tả quan hệ giữa tài nguyên cần cho thuật toán và kích thước đầu vào. Cụ thể, nó tập trung vào **xu hướng tăng trưởng của thời gian và bộ nhớ khi đầu vào lớn lên**. Có ba ý chính:

- “Tài nguyên thời gian và không gian” tương ứng với **độ phức tạp thời gian** và **độ phức tạp không gian**.
- “Khi kích thước đầu vào tăng” nghĩa là chúng ta xem hiệu quả thay đổi cùng quy mô dữ liệu.
- “Xu hướng tăng trưởng” nghĩa là chúng ta không quá quan tâm một con số mili giây hay megabyte cụ thể, mà quan tâm thời gian hoặc bộ nhớ tăng nhanh đến mức nào.

Phân tích độ phức tạp khắc phục nhiều nhược điểm của phép đo đơn lẻ:

- Không cần chạy mã cho mọi trường hợp, nhờ đó giảm tài nguyên thử nghiệm.
- Kết quả không bị gắn chặt với một máy hoặc nền tảng cụ thể.
- Có thể mô tả hiệu quả ở nhiều kích thước dữ liệu, đặc biệt khi đầu vào rất lớn.

> Phân tích lý thuyết không thay thế hoàn toàn phép đo. Nó cho biết xu hướng mở rộng; phép đo hiệu năng thực tế (benchmark) cho biết hằng số, tác động phần cứng và hành vi của một triển khai cụ thể. Trong thực hành kỹ thuật tốt, hai phương pháp bổ sung cho nhau.

Phân tích độ phức tạp cung cấp một “chiếc thước” để ước lượng tài nguyên và so sánh các thuật toán trên cùng bài toán.

Đây là khái niệm toán học nên có thể trừu tượng với người mới. Tuy nhiên, rất khó mô tả đặc điểm của một cấu trúc dữ liệu hoặc thuật toán mà không nói đến tốc độ và bộ nhớ. Vì vậy, trước khi đi sâu hơn, bạn nên xây dựng hiểu biết ban đầu đủ để phân tích các thuật toán đơn giản.
