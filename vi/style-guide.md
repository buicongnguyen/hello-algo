# Quy chuẩn văn phong tiếng Việt

Phiên bản: `v0.1-pilot`

## Người đọc mục tiêu

Viết cho người mới học cấu trúc dữ liệu và thuật toán, có thể biết lập trình cơ bản nhưng chưa quen với ký hiệu toán học hoặc cách phân tích thuật toán.

## Nguyên tắc

1. Đúng kỹ thuật trước, tự nhiên sau, nhưng không dùng độ chính xác làm lý do cho một câu khó hiểu.
2. Ưu tiên câu chủ động và ngắn khi không làm mất quan hệ logic.
3. Giữ chính xác các từ chỉ điều kiện như “nếu”, “chỉ khi”, “ít nhất”, “nhiều nhất”, “thường”, “trung bình” và “trường hợp xấu nhất”.
4. Không biến nhận định có điều kiện thành một khẳng định tuyệt đối.
5. Dùng thuật ngữ trong `glossary.md`; từ tiếng Anh có thể xuất hiện trong ngoặc ở lần đầu.
6. Giữ công thức, biến, ký hiệu và code inline nguyên dạng.
7. Chú thích hình phải nói người đọc cần quan sát điều gì.
8. Không dịch tên API, tên hàm, tên lớp, từ khóa hoặc định danh trong mã.

## Cách xưng hô

- Dùng “chúng ta” khi cùng người đọc thực hiện một phép suy luận hoặc quy trình.
- Dùng “bạn” cho lời hướng dẫn trực tiếp, với tần suất vừa phải.
- Tránh “ta” và “các bạn” để giữ giọng văn nhất quán.

## Tiêu đề và dấu câu

- Tiêu đề dùng kiểu câu: chỉ viết hoa từ đầu và danh từ riêng.
- Không thêm dấu chấm cuối tiêu đề.
- Dùng dấu ngoặc kép cong trong văn xuôi tiếng Việt khi phù hợp; giữ dấu ASCII trong mã.
- Dấu câu nằm ngoài code inline trừ khi chính dấu đó thuộc mã.
- Dùng dấu gạch ngang dài để bổ sung ý; không lạm dụng nhiều tầng ngoặc.

## Ví dụ biên tập

| Tránh | Ưu tiên | Lý do |
| --- | --- | --- |
| Thuật toán là các bước mà giải quyết vấn đề. | Thuật toán là một tập hợp các bước dùng để giải quyết một bài toán. | Đúng ngữ pháp và rõ quan hệ |
| Nó chạy nhanh. | Thời gian chạy tăng chậm khi kích thước đầu vào lớn lên. | Nêu đúng ý của độ phức tạp |
| Luôn luôn dùng tìm kiếm nhị phân. | Dùng tìm kiếm nhị phân khi dữ liệu đã được sắp xếp và có thể truy cập phần tử giữa hiệu quả. | Giữ điều kiện áp dụng |
| Array có O(1) access. | Mảng cho phép truy cập theo chỉ mục trong thời gian $O(1)$. | Dùng thuật ngữ Việt và câu hoàn chỉnh |

## Công thức và độ phức tạp

- Giữ `$O(n \log n)$`, `$O(1)$` và các biểu thức LaTeX nguyên dạng.
- Phân biệt “thời gian chạy thực tế” với “độ phức tạp thời gian”.
- Khi nói một thuật toán “nhanh hơn”, phải nêu ngữ cảnh: kích thước đầu vào, loại dữ liệu hoặc mô hình tăng trưởng.
- Không dịch tên biến toán học nếu điều đó làm công thức và phần giải thích lệch nhau.

## Hình và nội dung thay đổi

- Giữ nguyên hình gốc trong đợt thử; dịch `alt` và chú thích đi kèm.
- Ghi rõ bản tiếng Việt là nội dung chuyển ngữ từ Hello Algo.
- Nếu thay đổi ví dụ, hình hoặc lập luận so với nguồn, mô tả thay đổi trong pull request và ghi chú phát hành.
