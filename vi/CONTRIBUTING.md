# Đóng góp cho bản dịch tiếng Việt

Cảm ơn bạn muốn giúp Hello Algo dễ tiếp cận hơn với người đọc tiếng Việt. Hãy giữ pull request nhỏ và có thể phản biện kỹ.

## Trước khi bắt đầu

1. Đọc [`glossary.md`](glossary.md) và [`style-guide.md`](style-guide.md).
2. Kiểm tra [`translation-status.json`](translation-status.json) để xem tài liệu đã có người nhận chưa.
3. Mở issue ghi rõ đường dẫn tệp nguồn và phạm vi muốn dịch.
4. Chờ xác nhận để tránh hai người dịch cùng một tài liệu.

## Tạo nhánh

```text
translation/vi-introduction-overview
translation/vi-complexity-performance
review/vi-glossary-v1
```

Mỗi nhánh nên chứa một tài liệu hoàn chỉnh hoặc một nhóm nhỏ có chung ngữ cảnh.

## Sáu cổng kiểm tra

### 1. Khóa nguồn

Ghi commit upstream và đường dẫn tiếng Anh trong mô tả pull request.

### 2. Tạo bản nháp

Giữ cấu trúc, liên kết, hình, công thức và code fence. AI có thể hỗ trợ bản nháp nhưng không được coi là người duyệt.

### 3. Duyệt kỹ thuật

Kiểm tra định nghĩa, điều kiện áp dụng, độ phức tạp, công thức, mã và sự khớp với hình.

### 4. Biên tập tiếng Việt

Kiểm tra văn phong, thuật ngữ, chính tả, dấu câu và tính dễ hiểu.

### 5. Kiểm tra bản dựng

Chạy kiểm tra và build, sau đó mở trang đã tạo để xác nhận liên kết và tài nguyên.

### 6. Phát hành

Chỉ chuyển trạng thái thành `published` khi các duyệt bắt buộc hoàn tất. Bản thử tự kiểm tra phải dùng trạng thái `pilot` cho đến khi có phản biện độc lập.

## Checklist pull request

- [ ] Có đường dẫn và commit nguồn.
- [ ] Không còn TODO hoặc câu chưa chắc chắn mà không có ghi chú.
- [ ] Thuật ngữ khớp với glossary.
- [ ] Công thức và ký hiệu không bị thay đổi ngoài ý muốn.
- [ ] Alt text và chú thích hình đã dịch.
- [ ] Liên kết tương đối hoạt động.
- [ ] `npm run check` thành công.
- [ ] `npm run build` thành công.
- [ ] Đã có duyệt kỹ thuật.
- [ ] Đã có duyệt tiếng Việt.

## Mẫu mô tả pull request

```markdown
## Phạm vi
- Nguồn: en/docs/...
- Commit nguồn: ...
- Đợt: ...

## Thuật ngữ mới hoặc thay đổi
- ...

## Kiểm tra
- [ ] Đã kiểm tra liên kết và hình
- [ ] Đã đối chiếu công thức và mã
- [ ] Đã chạy check và build

## Cần người duyệt chú ý
- ...
```

## Giấy phép

Khi đóng góp, bạn đồng ý chia sẻ nội dung chuyển ngữ theo CC BY-NC-SA 4.0 giống dự án gốc. Không thêm nội dung mà bạn không có quyền cấp phép theo điều kiện tương thích.
