# Tóm tắt

### Ôn tập trọng tâm

- Thuật toán tham lam thường giải bài toán tối ưu bằng cách đưa ra lựa chọn tối ưu cục bộ ở mỗi giai đoạn với hy vọng thu được tối ưu toàn cục.
- Thuật toán liên tục thực hiện từng lựa chọn tham lam, mỗi lượt biến bài toán thành một bài toán con nhỏ hơn cho đến khi giải xong.
- Tham lam không chỉ dễ triển khai mà còn có hiệu suất cao; so với quy hoạch động, nó thường có độ phức tạp thời gian thấp hơn.
- Trong đổi tiền xu, tham lam bảo đảm tối ưu với một số hệ mệnh giá nhưng có thể cho lời giải rất kém với những hệ khác.
- Bài toán phù hợp với tham lam có hai tính chất lớn: tính lựa chọn tham lam và cấu trúc con tối ưu. Tính lựa chọn tham lam biểu thị hiệu lực của chiến lược.
- Với một số bài toán phức tạp, chứng minh tính lựa chọn tham lam không đơn giản. Bác bỏ thường dễ hơn, như các phản ví dụ đổi tiền xu.
- Giải bài toán tham lam chủ yếu gồm phân tích, xác định chiến lược và chứng minh tính đúng. Xác định chiến lược là bước cốt lõi, còn chứng minh thường là khó khăn chính.
- Ba lô phân số cho phép chọn một phần vật phẩm nên có thể dùng tham lam dựa trên giá trị đơn vị. Có thể chứng minh chiến lược bằng phản chứng.
- Bài toán sức chứa lớn nhất có thể liệt kê vét cạn trong $O(n^2)$. Chiến lược mỗi lượt di chuyển vách thấp hơn vào trong tối ưu thời gian xuống $O(n)$.
- Trong tích cắt lớn nhất, hai chiến lược được suy ra: mọi số nguyên $\geq 4$ nên tiếp tục được tách và thừa số tách tối ưu là $3$. Mã có phép lũy thừa, nên thời gian phụ thuộc cách triển khai, thường là $O(1)$ hoặc $O(\log n)$.
