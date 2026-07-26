# Đánh giá hiệu quả thuật toán

Khi thiết kế thuật toán, chúng ta lần lượt theo đuổi hai tầng mục tiêu.

1. **Tìm được lời giải cho bài toán**: thuật toán phải cho kết quả đúng và đáng tin cậy trong toàn bộ phạm vi đầu vào đã quy định.
2. **Tìm lời giải tối ưu**: một bài toán có thể có nhiều cách giải, và chúng ta muốn chọn thuật toán hiệu quả nhất có thể.

Nói cách khác, sau khi bảo đảm tính đúng đắn, hiệu quả trở thành tiêu chí quan trọng để đánh giá chất lượng thuật toán. Hiệu quả gồm hai chiều chính.

- **Hiệu quả thời gian**: thuật toán chạy trong bao lâu.
- **Hiệu quả không gian**: thuật toán chiếm bao nhiêu bộ nhớ.

Tóm lại, **mục tiêu là thiết kế cấu trúc dữ liệu và thuật toán vừa nhanh vừa tiết kiệm bộ nhớ**. Đánh giá đúng hiệu quả giúp chúng ta so sánh các phương án, nhận ra nút thắt và định hướng quá trình thiết kế cũng như tối ưu.

Hai nhóm phương pháp đánh giá chủ yếu là kiểm thử thực tế và ước lượng lý thuyết.

## Kiểm thử thực tế

Giả sử thuật toán `A` và `B` cùng giải một bài toán. Cách trực tiếp nhất là chạy cả hai trên máy tính rồi đo thời gian và lượng bộ nhớ sử dụng. Phương pháp này phản ánh hành vi thật, nhưng có những giới hạn đáng kể.

Một mặt, **rất khó loại bỏ ảnh hưởng của môi trường thử nghiệm**. Cấu hình phần cứng có thể thay đổi kết quả: thuật toán có mức song song cao phù hợp hơn với CPU nhiều lõi, còn thuật toán truy cập bộ nhớ dày đặc hưởng lợi nhiều hơn từ bộ nhớ nhanh. Vì vậy, cùng một thuật toán có thể cho kết quả khác nhau trên các máy khác nhau. Muốn kết luận tổng quát, chúng ta phải thử trên nhiều nền tảng rồi tổng hợp kết quả, điều này thường không thực tế.

Mặt khác, **kiểm thử đầy đủ tiêu tốn rất nhiều tài nguyên**. Hiệu quả có thể đổi theo quy mô đầu vào. Khi dữ liệu nhỏ, `A` có thể nhanh hơn `B`; khi dữ liệu lớn, thứ tự ấy có thể đảo ngược. Một đánh giá thuyết phục do đó cần nhiều tập dữ liệu ở nhiều quy mô và phân bố khác nhau, kéo theo chi phí tính toán, thời gian và năng lượng lớn.

Kiểm thử thực tế vẫn hữu ích để đo hằng số, hành vi bộ nhớ đệm và chi phí của môi trường cụ thể. Tuy nhiên, chỉ dựa vào một máy và vài bộ dữ liệu không đủ để mô tả khả năng mở rộng của thuật toán.

## Ước lượng lý thuyết

Để khắc phục các giới hạn trên, chúng ta có thể đánh giá hiệu quả bằng tính toán lý thuyết. Phương pháp này gọi là <u>phân tích độ phức tạp tiệm cận</u>, thường được gọi ngắn gọn là <u>phân tích độ phức tạp</u>.

Phân tích độ phức tạp mô tả quan hệ giữa lượng tài nguyên thời gian, không gian mà thuật toán cần và quy mô dữ liệu đầu vào. Cụ thể, **nó tập trung vào xu hướng tăng của thời gian và không gian khi quy mô đầu vào tăng lên**. Có thể tách định nghĩa này thành ba ý.

- “Tài nguyên thời gian và không gian” tương ứng với <u>độ phức tạp thời gian</u> và <u>độ phức tạp không gian</u>.
- “Khi quy mô dữ liệu tăng” cho biết độ phức tạp gắn hiệu quả chạy với kích thước đầu vào.
- “Xu hướng tăng” nghĩa là chúng ta không chỉ hỏi số giây hay số byte cụ thể, mà hỏi chúng tăng nhanh đến mức nào.

**Phân tích độ phức tạp khắc phục nhiều nhược điểm của kiểm thử thực tế.**

- Không cần chạy mã để suy ra bậc tăng trưởng, nên giảm chi phí thử nghiệm ban đầu.
- Kết quả không phụ thuộc vào một cấu hình máy hay một ngôn ngữ cụ thể.
- Có thể mô tả hiệu quả ở nhiều quy mô dữ liệu, đặc biệt là khi dữ liệu trở nên rất lớn.

!!! tip

    Nếu khái niệm độ phức tạp vẫn còn trừu tượng, đừng lo. Các phần tiếp theo sẽ xây dựng nó từng bước bằng mã, hình vẽ và ví dụ cụ thể.

Phân tích độ phức tạp cung cấp một “thước đo” chung để ước lượng tài nguyên mà thuật toán cần và so sánh các phương án ở cùng quy mô đầu vào. Thước đo này không thay thế hoàn toàn phép đo thực tế; nó cho biết bậc tăng trưởng, còn benchmark cho biết hằng số và hành vi trên một nền tảng cụ thể.

Độ phức tạp là một khái niệm toán học nên có thể khó với người mới. Tuy vậy, khi trình bày đặc điểm của cấu trúc dữ liệu hoặc thuật toán, chúng ta hầu như không thể tránh câu hỏi “chạy nhanh đến đâu?” và “dùng bao nhiêu bộ nhớ?”.

Vì thế, trước khi đi sâu vào cấu trúc dữ liệu và thuật toán, **hãy xây dựng hiểu biết ban đầu về phân tích độ phức tạp và tập phân tích những chương trình đơn giản**. Các chương sau sẽ liên tục củng cố kỹ năng này.
