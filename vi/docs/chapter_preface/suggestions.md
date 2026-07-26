# Cách sử dụng cuốn sách

!!! tip

    Để có trải nghiệm đọc tốt nhất, bạn nên đọc hết phần hướng dẫn này trước khi bắt đầu.

## Quy ước trình bày

- Các mục có dấu `*` sau tiêu đề là nội dung tùy chọn và khó hơn đôi chút. Nếu thời gian hạn chế, bạn có thể bỏ qua ở lượt đọc đầu tiên.
- Thuật ngữ kỹ thuật được in đậm hoặc gạch chân. Đây là những từ đáng ghi nhớ vì chúng thường xuất hiện trong tài liệu chuyên môn.
- Nội dung trọng tâm và câu kết luận được **in đậm**.
- Những từ hoặc cụm từ mang nghĩa riêng trong ngữ cảnh sẽ được đặt trong “dấu ngoặc kép”.
- Khi thuật ngữ khác nhau giữa các ngôn ngữ lập trình, sách ưu tiên quy ước của Python; chẳng hạn dùng `None` để biểu diễn giá trị rỗng.
- Phần chú thích mã được trình bày gọn, thường gồm chú thích tiêu đề, chú thích nội dung và chú thích nhiều dòng.

Ví dụ bằng Python:

```python
"""Chú thích tiêu đề cho hàm, lớp hoặc ca kiểm thử."""

# Chú thích nội dung để giải thích chi tiết mã.

"""
Chú thích
nhiều dòng.
"""
```

Trên trang web, ví dụ này được trình bày bằng thẻ chọn ngôn ngữ. Bạn có thể chuyển giữa Python, C++, Java, C#, Go, Swift, JavaScript, TypeScript, Dart, Rust, C, Kotlin và Ruby mà không phải cuộn qua mười ba khối mã liên tiếp. Lựa chọn ngôn ngữ cũng được đồng bộ giữa các nhóm mã trong cùng trình đọc.

## Học hiệu quả với hình minh họa động

So với văn bản thuần túy, hình ảnh và video có mật độ thông tin cao hơn và cấu trúc trực quan hơn. Trong cuốn sách này, **khái niệm trọng tâm và nội dung khó chủ yếu được trình bày bằng hình động**, còn văn bản đóng vai trò giải thích và bổ sung.

Khi gặp hình minh họa động, hãy xem hình là nội dung chính, đọc phần chữ đi kèm và kết hợp cả hai để hiểu vấn đề. Dừng ở từng trạng thái, xác định phần dữ liệu vừa thay đổi, rồi đối chiếu với câu giải thích trước khi chuyển sang bước kế tiếp. Cách đọc chủ động này hiệu quả hơn việc chỉ xem hoạt ảnh chạy hết một lượt.

![Ví dụ về hình minh họa động](../index.assets/animation.gif)

## Hiểu sâu hơn qua thực hành mã

Mã nguồn đi kèm được lưu trong [kho mã nguồn Hello Algo](https://github.com/krahets/hello-algo). Các tệp có ca kiểm thử và được tổ chức theo chương cùng ngôn ngữ, nhờ đó người đọc có thể chạy trực tiếp và so sánh cùng một thuật toán giữa nhiều cách triển khai.

Nếu có thời gian, **bạn nên tự gõ lại mã**. Nếu thời gian học hạn chế, ít nhất hãy đọc và chạy toàn bộ ví dụ. Việc tự tay thực hành thường mang lại nhiều hiểu biết hơn so với chỉ đọc mã.

![Ví dụ chạy mã](../index.assets/running_code.gif)

Để chạy mã cục bộ, hãy thực hiện ba bước.

1. **Cài môi trường lập trình** theo [hướng dẫn trong phụ lục](https://www.hello-algo.com/en/chapter_appendix/installation/). Nếu đã cài, bạn có thể bỏ qua bước này.
2. **Sao chép (clone) hoặc tải kho mã nguồn**. Nếu đã cài [Git](https://git-scm.com/downloads), chạy:

```shell
git clone https://github.com/krahets/hello-algo.git
```

Bạn cũng có thể chọn “Download ZIP” trên GitHub rồi giải nén.

![Sao chép kho mã nguồn hoặc tải mã dưới dạng ZIP](suggestions.assets/download_code.png)

3. **Chạy tệp mã nguồn tương ứng** trong thư mục `codes`. Tên tệp trên khối mã giúp bạn tìm đúng bản triển khai và tập trung vào kiến thức thay vì mất thời gian cấu hình lại ví dụ.

![Khối mã và tệp nguồn tương ứng](suggestions.assets/code_md_to_repo.png)

Phiên bản web chính thức còn hỗ trợ chạy trực quan mã Python dựa trên [Python Tutor](https://pythontutor.com/). Nút chạy trực quan bên dưới khối mã cho phép quan sát từng bước thực thi; chế độ toàn màn hình giúp theo dõi ngăn xếp, biến và cấu trúc dữ liệu rõ hơn.

![Chạy trực quan mã Python](suggestions.assets/pythontutor_example.png)

## Cùng trưởng thành qua câu hỏi và thảo luận

Đừng bỏ qua những điểm bạn chưa hiểu rõ. Hãy nêu câu hỏi ở khu vực thảo luận của phiên bản web chính thức; tác giả và cộng đồng thường cố gắng phản hồi sớm. Đọc câu hỏi của người khác cũng giúp phát hiện những lỗ hổng trong cách hiểu của chính mình và gợi mở các hướng suy nghĩ sâu hơn.

Khi đã hiểu một vấn đề, hãy chia sẻ cách giải thích hoặc trả lời độc giả khác. Việc diễn đạt lại bằng lời của mình là một phép kiểm tra rất tốt: nếu chưa thể giải thích rõ ràng, có thể một mắt xích trong lập luận vẫn còn thiếu. Trao đổi hai chiều vì vậy vừa giúp người hỏi vừa củng cố kiến thức của người trả lời.

![Ví dụ về khu vực thảo luận](../index.assets/comment.gif)

## Lộ trình học thuật toán

Quá trình học cấu trúc dữ liệu và thuật toán có thể chia thành ba giai đoạn.

1. **Nhập môn thuật toán**: Làm quen với đặc điểm và cách dùng các cấu trúc dữ liệu; học nguyên lý, quy trình, ứng dụng và hiệu quả của những thuật toán phổ biến.
2. **Luyện bài thuật toán**: Bắt đầu từ các bài phổ biến và giải ít nhất khoảng 100 bài để làm quen dạng đề. Việc quên kiến thức lúc đầu là bình thường; ôn lại theo nhiều vòng sẽ giúp ghi nhớ bền hơn. Có thể tham khảo [danh sách và kế hoạch luyện bài](https://github.com/krahets/LeetCode-Book).
3. **Xây dựng hệ thống kiến thức**: Đọc chuyên đề, khung giải bài và giáo trình; đồng thời luyện các cách tiếp cận nâng cao như phân loại theo chủ đề, một bài nhiều lời giải và một lời giải cho nhiều bài.

Cuốn sách chủ yếu bao phủ giai đoạn 1, tạo nền tảng để bạn bước vào giai đoạn 2 và 3 hiệu quả hơn.

![Lộ trình học thuật toán](suggestions.assets/learning_route.png)
