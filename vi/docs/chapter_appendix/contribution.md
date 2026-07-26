# Cùng đóng góp

Do nguồn lực có hạn, cuốn sách khó tránh khỏi thiếu sót và sai sót. Chúng tôi mong bạn thông cảm và rất biết ơn nếu bạn giúp sửa chúng. Khi phát hiện lỗi chính tả, liên kết hỏng, nội dung còn thiếu, cách diễn đạt mơ hồ, phần giải thích chưa rõ hoặc vấn đề về cấu trúc, hãy cùng chúng tôi chỉnh sửa để mang đến cho người đọc tài liệu học tập chất lượng cao hơn.

Tên tài khoản GitHub của tất cả [người đóng góp](https://github.com/krahets/hello-algo/graphs/contributors) sẽ xuất hiện trên trang chủ kho sách, bản web và bản PDF để ghi nhận những đóng góp vô tư của họ cho cộng đồng mã nguồn mở.

!!! success "Sức hấp dẫn của mã nguồn mở"

    Khoảng thời gian giữa hai lần tái bản một cuốn sách giấy thường khá dài, khiến việc cập nhật nội dung rất bất tiện.

    Với cuốn sách mã nguồn mở này, thời gian cập nhật nội dung được rút ngắn xuống chỉ còn vài ngày, thậm chí vài giờ.

### Chỉnh sửa nội dung nhỏ

Như hình dưới đây, góc trên bên phải của mỗi trang có một “biểu tượng chỉnh sửa”. Bạn có thể sửa văn bản hoặc mã theo các bước sau.

1. Nhấp vào “biểu tượng chỉnh sửa”. Nếu xuất hiện yêu cầu “Fork this repository”, hãy chấp thuận thao tác.
2. Sửa nội dung của tệp nguồn Markdown, kiểm tra tính chính xác và cố gắng giữ định dạng nhất quán.
3. Điền mô tả thay đổi ở cuối trang, rồi nhấp nút “Propose file change”. Khi trang mới tải xong, nhấp nút “Create pull request” để gửi pull request.

![Nút chỉnh sửa trang](contribution.assets/edit_markdown.png)

Không thể sửa ảnh trực tiếp. Hãy mô tả vấn đề bằng cách tạo [Issue](https://github.com/krahets/hello-algo/issues) mới hoặc để lại bình luận. Chúng tôi sẽ sớm vẽ lại và thay thế ảnh.

### Soạn nội dung

Nếu muốn đóng góp cho dự án mã nguồn mở này, chẳng hạn chuyển mã sang ngôn ngữ lập trình khác hoặc mở rộng nội dung bài viết, bạn cần thực hiện quy trình Pull Request dưới đây.

1. Đăng nhập GitHub và Fork [kho mã nguồn](https://github.com/krahets/hello-algo) của cuốn sách vào tài khoản cá nhân.
2. Mở trang kho đã fork và dùng lệnh `git clone` để sao chép kho về máy.
3. Soạn nội dung trên máy và kiểm thử đầy đủ để xác nhận mã chạy đúng.
4. Commit thay đổi cục bộ rồi đẩy lên kho từ xa.
5. Làm mới trang kho trên GitHub và nhấp nút “Create pull request” để gửi pull request.

### Triển khai bằng Docker

Từ thư mục gốc của `hello-algo`, chạy lệnh Docker sau để truy cập dự án tại `http://localhost:8000`:

```shell
docker-compose up -d
```

Dùng lệnh sau để gỡ bản triển khai:

```shell
docker-compose down
```
