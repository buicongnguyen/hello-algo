# Kế hoạch Việt hóa Hello Algo

> Trạng thái: đang triển khai nền tảng song ngữ
>
> Repository: `buicongnguyen/hello-algo`
>
> Website: `https://buicongnguyen.github.io/hello-algo/`
>
> Ngày chốt kế hoạch ban đầu: 2026-07-18

## Trạng thái thực thi

Cập nhật ngày 2026-07-18:

- [x] Giai đoạn 1: đường dẫn `/vi/`, `/en/`, chuyển ngôn ngữ và GitHub Pages song ngữ.
- [x] Atlas `/vi/` có cùng cấu trúc, nội dung trực quan và tương tác như `/en/`, với toàn bộ giao diện được Việt hóa.
- [x] Khóa nguồn đợt thử tại upstream commit `4935d2d3877a6205008d89def8d2ba43f7e06275`.
- [x] Từ điển `v0.3-pilot`, quy chuẩn văn phong và hướng dẫn đóng góp.
- [x] Issue form và mẫu pull request cho công việc tiếng Việt.
- [x] Hai mươi sáu tài liệu thử: toàn bộ Chương 0 đến Chương 4.
- [x] Trình đọc `/vi/learn/`, điều hướng chương, attribution và công bố giấy phép.
- [x] Kiểm tra tự động cho nguồn, trạng thái, trang sinh ra và liên kết cục bộ.
- [ ] Phản biện kỹ thuật độc lập cho đợt thử.
- [ ] Biên tập tiếng Việt độc lập cho đợt thử.
- [ ] Nâng 26 tài liệu từ `pilot` lên `published` sau khi xử lý phản biện.

Vì chưa có hai lượt phản biện độc lập, website gọi nội dung hiện tại là **bản thử đã tự kiểm tra**, không gọi là bản dịch ổn định. Đây là trạng thái minh bạch đúng với các cổng chất lượng trong kế hoạch.

## 1. Mục tiêu

Dự án tạo một bản tiếng Việt của Hello Algo có thể đọc, kiểm tra và duy trì lâu dài. Kết quả không chỉ là các tệp Markdown đã dịch, mà là một trải nghiệm học hoàn chỉnh gồm văn bản, công thức, hình minh họa, chú thích, đoạn mã, điều hướng và website.

Các mục tiêu chính:

1. Đặt tiếng Việt làm ngôn ngữ mặc định trên GitHub Pages của fork này.
2. Giữ Atlas tiếng Anh hiện tại tại một đường dẫn ổn định và cho phép đổi VI/EN trên mọi trang đầu.
3. Dịch nội dung theo thứ tự học và quan hệ phụ thuộc giữa các chương.
4. Dùng một từ điển thuật ngữ có phiên bản để tránh mỗi người dịch một cách khác nhau.
5. Yêu cầu rà soát kỹ thuật và biên tập tiếng Việt trước khi phát hành.
6. Giữ giấy phép và ghi công dự án Hello Algo gốc.
7. Xây dựng quy trình đồng bộ với thay đổi từ upstream mà không làm mất phần Việt hóa.

## 2. Những gì kế hoạch này không hứa hẹn

- Không coi bản dịch máy hoặc AI là bản phát hành cuối.
- Không dịch tất cả tệp trong một pull request lớn.
- Không thay đổi thuật toán hoặc hành vi mã nguồn chỉ để phù hợp với câu dịch.
- Không tuyên bố toàn bộ sách đã có tiếng Việt khi mới hoàn thành trang giới thiệu.
- Không dùng trang Pages của fork để giả mạo website chính thức của tác giả.
- Không bắt buộc phải gửi upstream ngay từ đầu. Fork này là nơi xây dựng và chứng minh chất lượng trước.

## 3. Kiến trúc website song ngữ

### 3.1. Đường dẫn phát hành

| Đường dẫn | Vai trò |
| --- | --- |
| `/hello-algo/` | Điểm vào, chuyển người đọc đến tiếng Việt |
| `/hello-algo/vi/` | Atlas tương tác tiếng Việt đầy đủ, đồng cấp với bản tiếng Anh |
| `/hello-algo/en/` | Atlas tiếng Anh đầy đủ hiện có |
| `/hello-algo/vi/learn/` | Trình đọc thử cho các chương sách đã chuyển ngữ |

Quy tắc:

- Nút `VI` và `EN` luôn hiển thị ở đầu trang.
- Mỗi lựa chọn dùng `lang`, `hreflang` và `aria-current` phù hợp.
- Không tự động đoán ngôn ngữ bằng địa chỉ IP hoặc trình duyệt; người đọc luôn có thể chọn lại.
- Các liên kết đã công bố dưới `/en/` và `/vi/` phải được giữ ổn định.
- Trang gốc chỉ làm nhiệm vụ chuyển hướng nhẹ đến `/vi/`, tránh hai URL có cùng nội dung.

### 3.2. Hai lớp nội dung

Website có hai lớp:

1. **Atlas tương tác song ngữ** tại `/vi/` và `/en/`: hai đường dẫn có cùng cấu trúc và hành vi; bản tiếng Việt dịch cả nội dung tĩnh lẫn thông báo sinh ra trong lúc tương tác.
2. **Trình đọc thử tiếng Việt** tại `/vi/learn/`: phát hành từng tài liệu đã chuyển ngữ, kèm trạng thái, nguồn khóa, ghi công và giấy phép.

Kế hoạch, từ điển, quy chuẩn văn phong và quy trình duyệt vẫn nằm trong repository làm tài liệu quản trị. Atlas `/vi/` dẫn tới trình đọc thử, nhưng không gọi các chương chưa qua phản biện độc lập là bản dịch ổn định.

## 4. Phạm vi tại thời điểm lập kế hoạch

Ảnh chụp repository ngày 2026-07-18:

- `en/` có khoảng 1.820 tệp.
- `en/docs/` có 617 tệp, trong đó có 105 tệp Markdown.
- `en/codes/` có khoảng 1.200 tệp mã và tài nguyên liên quan.
- Nội dung bao gồm công thức, hình tĩnh, video, liên kết chéo, cấu hình MkDocs và ví dụ bằng nhiều ngôn ngữ lập trình.

Các số này là dữ liệu quy hoạch, không phải số phần trăm bản dịch. Tiến độ phải đo theo tài liệu đã qua duyệt, không đo theo số tệp được AI tạo bản nháp.

## 5. Nguồn dịch và nguyên tắc đối chiếu

### 5.1. Nguồn chính

Bản tiếng Anh trong `en/` là nguồn dịch chính vì:

- người đóng góp trong dự án fork này đang làm việc từ nội dung tiếng Anh;
- cấu trúc điều hướng và liên kết đã rõ ràng;
- dễ tạo so sánh VI–EN trong quá trình phản biện.

### 5.2. Nguồn đối chiếu

Khi câu tiếng Anh mơ hồ, người dịch cần:

1. kiểm tra hình, công thức, mã và ngữ cảnh trong cùng chương;
2. so sánh với nội dung gốc của dự án nếu có thể;
3. ghi chú câu hỏi kỹ thuật trong pull request;
4. không tự đoán rồi xóa dấu vết của sự không chắc chắn.

Mỗi pull request phải ghi commit upstream hoặc commit nguồn mà bản dịch dựa vào.

## 6. Cấu trúc thư mục mục tiêu

Khi bắt đầu dịch sách, cấu trúc dự kiến là:

```text
vi/
├── README.md
├── CONTRIBUTING.md
├── mkdocs.yml
├── glossary.md
├── style-guide.md
├── docs/
│   ├── index.md
│   ├── chapter_introduction/
│   ├── chapter_computational_complexity/
│   ├── chapter_array_and_linkedlist/
│   └── ...
└── codes/
    └── ...
```

Trong lần phát hành nền tảng hiện tại, `vi/index.html`, `vi/vi.css` và `vi/vi.js` phục vụ trang tiến độ. Thư mục sách MkDocs chỉ được thêm khi giai đoạn bản thử bắt đầu, để không tạo một cây tệp trống gây hiểu nhầm.

## 7. Quy tắc thuật ngữ

### 7.1. Từ điển ban đầu

| English | Tiếng Việt ưu tiên | Quy tắc sử dụng |
| --- | --- | --- |
| algorithm | thuật toán | Có thể ghi “thuật toán (algorithm)” ở lần đầu nếu cần |
| data structure | cấu trúc dữ liệu | Không rút gọn tùy ý |
| array | mảng | index → chỉ mục |
| linked list | danh sách liên kết | node → nút |
| stack | ngăn xếp | giải thích LIFO ở lần đầu |
| queue | hàng đợi | giải thích FIFO ở lần đầu |
| hash table | bảng băm | hash function → hàm băm |
| collision | xung đột băm | Có thể dùng “va chạm” trong phần giải thích đời thường |
| tree | cây | root → nút gốc; leaf → nút lá |
| binary tree | cây nhị phân | child → nút con |
| heap | đống | phân biệt với vùng nhớ heap theo ngữ cảnh |
| graph | đồ thị | vertex → đỉnh; edge → cạnh |
| traversal | phép duyệt | breadth-first search → tìm kiếm theo chiều rộng |
| recursion | đệ quy | base case → trường hợp cơ sở |
| iteration | lặp | iterator → bộ lặp khi đúng ngữ cảnh |
| time complexity | độ phức tạp thời gian | giữ ký hiệu Big-O |
| space complexity | độ phức tạp không gian | không đổi ký hiệu toán học |
| binary search | tìm kiếm nhị phân | search interval → khoảng tìm kiếm |
| sorting | sắp xếp | stable sort → sắp xếp ổn định |
| divide and conquer | chia để trị | giữ dấu nối theo quy chuẩn văn phong nếu chọn |
| backtracking | quay lui | pruning → cắt tỉa |
| dynamic programming | quy hoạch động | có thể dùng DP sau lần giải thích đầu |
| greedy algorithm | thuật toán tham lam | local optimum → tối ưu cục bộ |

### 7.2. Quản trị thay đổi thuật ngữ

- Từ điển là tài liệu có phiên bản trong repository.
- Một thay đổi từ ưu tiên phải có lý do và ví dụ tác động.
- Pull request thay thuật ngữ phải tìm và cập nhật toàn bộ vị trí liên quan trong phạm vi đã phát hành.
- Không trộn hai cách dịch trong cùng một chương để “cho đa dạng”.
- Từ tiếng Anh có thể được giữ trong ngoặc ở lần đầu, sau đó dùng tiếng Việt.
- Tên API, từ khóa ngôn ngữ, định danh mã, tên lớp và tên hàm không được dịch trong code fence.

## 8. Hướng dẫn văn phong

1. Viết cho người đang học, không viết như bản dịch hợp đồng.
2. Câu ngắn và chủ động được ưu tiên khi không làm mất quan hệ logic.
3. Không bám trật tự từ tiếng Anh nếu câu tiếng Việt trở nên gượng.
4. Giữ chính xác các từ chỉ điều kiện: “nếu”, “chỉ khi”, “ít nhất”, “nhiều nhất”, “trung bình”, “trường hợp xấu nhất”.
5. Không biến “may”, “can” hoặc “typically” thành một khẳng định tuyệt đối.
6. Giữ công thức, biến và ký hiệu toán học nguyên dạng, trừ phần văn bản mô tả.
7. Tiêu đề dùng một quy tắc viết hoa thống nhất cho toàn bộ sách.
8. Dấu câu quanh code inline phải tuân theo câu tiếng Việt nhưng không nằm trong backtick nếu không thuộc mã.
9. Chú thích hình phải mô tả điều người đọc cần quan sát, không chỉ lặp lại tiêu đề.
10. Khi một thuật ngữ tiếng Việt có thể gây hiểu nhầm, thêm tiếng Anh ở lần đầu thay vì tạo một từ mới.

## 9. Quy trình một tài liệu

Mỗi tài liệu đi qua sáu cổng. Người dịch có thể dùng AI ở cổng 2, nhưng AI không được tự xác nhận các cổng còn lại.

### Cổng 1 — Khóa nguồn

- Chọn tệp cụ thể từ đợt đang mở.
- Mở issue hoặc ghi tên người phụ trách trong bảng tiến độ.
- Ghi đường dẫn nguồn và commit nguồn.
- Xác định các hình, đoạn mã và liên kết phụ thuộc.

### Cổng 2 — Dịch bản nháp

- Sao chép đúng cấu trúc Markdown.
- Không thay ID tiêu đề, anchor hoặc đường dẫn nếu chưa hiểu tác động.
- Bảo toàn code fence, công thức, HTML nhúng và khóa tham chiếu.
- Đánh dấu câu chưa chắc chắn bằng comment hoặc ghi chú PR, không đoán âm thầm.

### Cổng 3 — Soát kỹ thuật

Người duyệt kỹ thuật kiểm tra:

- định nghĩa và bất biến;
- từng bước thuật toán;
- điều kiện đầu vào và trường hợp biên;
- độ phức tạp thời gian và không gian;
- sự khớp nhau giữa văn bản, hình và mã;
- thuật ngữ toán học và cấu trúc dữ liệu.

### Cổng 4 — Biên tập tiếng Việt

Người duyệt ngôn ngữ kiểm tra:

- câu tự nhiên và dễ hiểu;
- chủ ngữ, quan hệ nguyên nhân–kết quả và tham chiếu đại từ;
- thuật ngữ theo từ điển;
- chính tả, dấu câu và khoảng trắng;
- tiêu đề, danh sách và chú thích nhất quán.

### Cổng 5 — Kiểm tra hình, mã và bản dựng

- Dựng website cục bộ.
- Mở mọi hình và video được tham chiếu.
- Kiểm tra liên kết tương đối ở đường dẫn `/vi/`.
- Chạy hoặc biên dịch ví dụ thuộc phạm vi PR nếu môi trường hỗ trợ.
- Kiểm tra desktop, mobile và giao diện sáng/tối.
- Kiểm tra nội dung có thể dùng bàn phím và nhãn trợ năng cơ bản.

### Cổng 6 — Duyệt phát hành

- Ít nhất một duyệt kỹ thuật.
- Ít nhất một duyệt tiếng Việt; một người có thể đảm nhiệm cả hai chỉ khi phạm vi rất nhỏ và được ghi rõ.
- CI xanh.
- Không còn câu hỏi chưa giải quyết.
- Bảng tiến độ được cập nhật trong cùng PR hoặc PR tiếp nối đã liên kết.

## 10. Chiến lược nhánh và pull request

Website Pages triển khai từ `main`. Công việc dịch thường ngày không nên đẩy trực tiếp vào `main`.

### 10.1. Tên nhánh

```text
translation/vi-introduction-overview
translation/vi-complexity-big-o
translation/vi-array-basics
review/vi-glossary-v1
infra/vi-mkdocs
```

### 10.2. Phạm vi pull request

- Một PR nên chứa một tài liệu hoàn chỉnh hoặc một nhóm rất nhỏ có chung thuật ngữ.
- Không trộn cập nhật upstream lớn với một bản dịch mới.
- Không trộn thay đổi giao diện không liên quan với biên tập ngôn ngữ.
- Hình mới hoặc hình chỉnh sửa phải nêu nguồn và lý do.
- Nếu PR lớn hơn mức người duyệt có thể đọc kỹ trong một phiên, hãy chia nhỏ.

### 10.3. Quy ước commit

Ví dụ:

```text
Add Vietnamese introduction overview
Translate asymptotic complexity section
Align graph terminology with glossary v1
Fix Vietnamese chapter navigation links
```

Commit nên diễn tả kết quả, không dùng thông điệp chung chung như `update files`.

### 10.4. Mẫu mô tả PR

```markdown
## Phạm vi
- Nguồn: en/docs/...
- Commit nguồn: ...
- Đợt: ...

## Thuật ngữ mới hoặc thay đổi
- ...

## Kiểm tra
- [ ] Đã dựng website
- [ ] Đã kiểm tra liên kết và hình
- [ ] Đã đối chiếu công thức và mã
- [ ] Đã chạy kiểm tra tự động

## Cần người duyệt chú ý
- ...
```

## 11. Sáu giai đoạn phát triển

### Giai đoạn 1 — Nền tảng song ngữ

Mục tiêu: tạo điểm vào Việt/Anh ổn định mà không làm mất Atlas hiện tại.

Sản phẩm bàn giao:

- `/vi/` là trang tiếng Việt;
- `/en/` là Atlas tiếng Anh;
- `/` chuyển đến `/vi/`;
- nút đổi VI/EN trên cả hai trang;
- trang lộ trình tiếng Việt;
- build và static checks hiểu cấu trúc song ngữ;
- GitHub Pages phát hành từ `dist`.

Điều kiện hoàn thành:

- `npm run check` thành công;
- `npm run build` tạo đủ ba điểm vào;
- liên kết VI ↔ EN hoạt động khi host dưới `/hello-algo/`;
- Pages production trả HTTP 200 cho `/vi/` và `/en/`;
- nội dung trang Việt nói rõ trạng thái chưa hoàn tất.

### Giai đoạn 2 — Từ điển, văn phong và bản thử

Mục tiêu: kiểm tra quy trình với nội dung nền tảng trước khi tăng tốc.

Phạm vi đề xuất:

1. trang giới thiệu sách;
2. chương nhập môn;
3. phần ký hiệu và khái niệm độ phức tạp;
4. điều hướng chung, footer và metadata.

Sản phẩm bàn giao:

- `vi/glossary.md` phiên bản 1;
- `vi/style-guide.md`;
- `vi/CONTRIBUTING.md`;
- cấu hình `vi/mkdocs.yml`;
- 26 tài liệu thử thuộc Chương 0–4 đã tự kiểm tra; phản biện kỹ thuật và ngôn ngữ độc lập được theo dõi như điều kiện nâng trạng thái;
- checklist và mẫu PR.

Điều kiện hoàn thành:

- các thuật ngữ cốt lõi không còn tranh luận mở;
- người duyệt có thể hoàn thành một PR bằng checklist;
- bản dựng MkDocs tiếng Việt chạy độc lập;
- phản hồi từ ít nhất vài người đọc thử được xử lý.

### Giai đoạn 3 — Cấu trúc dữ liệu

Thứ tự đề xuất:

1. mảng và danh sách liên kết;
2. ngăn xếp và hàng đợi;
3. bảng băm;
4. cây;
5. đống;
6. đồ thị.

Lý do: thuật ngữ về bộ nhớ, nút, cạnh và phép duyệt được xây dần theo quan hệ phụ thuộc.

Điều kiện hoàn thành mỗi chương:

- toàn bộ Markdown trong chương được duyệt;
- hình và chú thích hiển thị đúng;
- ví dụ chính liên kết đến mã hoạt động;
- bảng độ phức tạp đã đối chiếu;
- không có thuật ngữ ngoài từ điển mà chưa được giải thích.

### Giai đoạn 4 — Thuật toán

Thứ tự đề xuất:

1. tìm kiếm;
2. sắp xếp;
3. chia để trị;
4. quay lui;
5. quy hoạch động;
6. thuật toán tham lam.

Trọng tâm duyệt:

- giả thiết trước khi áp dụng;
- bất biến và điều kiện dừng;
- lập luận đúng;
- trường hợp tốt, trung bình và xấu nhất;
- đánh đổi thời gian–bộ nhớ;
- sự khác nhau giữa ví dụ minh họa và bảo đảm tổng quát.

### Giai đoạn 5 — Mã nguồn và chú thích

Không nên dịch 1.200 tệp mã cùng lúc. Chia theo mức độ sử dụng:

- Nhóm A: mã được liên kết trực tiếp từ các chương đã phát hành.
- Nhóm B: ngôn ngữ được cộng đồng người đọc Việt Nam dùng nhiều và có người bảo trì.
- Nhóm C: các biến thể còn lại, xử lý khi có cộng tác viên phù hợp.

Quy tắc:

- không dịch tên API và từ khóa;
- hạn chế đổi tên biến vì làm khó so sánh với upstream;
- ưu tiên dịch comment và văn bản đầu ra hướng dẫn;
- mỗi thay đổi mã phải chạy kiểm thử hoặc lệnh build tương ứng;
- nếu chỉ có bản dịch văn bản, giữ mã nguồn upstream nguyên trạng.

### Giai đoạn 6 — QA, phát hành và bảo trì

Sản phẩm bàn giao:

- kiểm tra liên kết nội bộ;
- kiểm tra Markdown/MkDocs;
- kiểm tra từ cấm hoặc thuật ngữ cũ;
- kiểm tra tài nguyên thiếu;
- bản ghi phiên bản và thay đổi;
- lịch theo dõi upstream;
- hướng dẫn báo lỗi bản dịch.

Mỗi phát hành nên có:

- danh sách chương mới;
- commit upstream làm mốc;
- thay đổi thuật ngữ;
- lỗi đã biết;
- người phản biện;
- đường dẫn Pages đã kiểm tra.

## 12. Lịch mẫu 16 tuần

Đây là lịch định hướng, không phải cam kết ngày giao. Chất lượng và số người duyệt quyết định tốc độ thực tế.

| Tuần | Trọng tâm | Kết quả mong đợi |
| --- | --- | --- |
| 1 | Hạ tầng Pages | VI mặc định, EN riêng, nút đổi ngôn ngữ |
| 2 | Quản trị | glossary v0, style guide, mẫu PR |
| 3–4 | Bản thử nhập môn | 26 tài liệu Chương 0–4 và vòng phản biện độc lập |
| 5 | Rút kinh nghiệm | sửa quy trình và glossary v1 |
| 6–7 | Mảng, danh sách, stack, queue | đợt cấu trúc tuyến tính |
| 8 | Bảng băm | chương và ví dụ chính |
| 9–10 | Cây và đống | đợt cấu trúc phân cấp |
| 11 | Đồ thị | biểu diễn và phép duyệt |
| 12 | Tìm kiếm và sắp xếp | bảng so sánh đã duyệt |
| 13 | Chia để trị và quay lui | hai chương thuật toán |
| 14 | Quy hoạch động | trạng thái và chuyển trạng thái |
| 15 | Tham lam | ví dụ và phần chứng minh |
| 16 | QA phát hành | sửa liên kết, ghi phiên bản, khảo sát người đọc |

Nếu không có đủ người phản biện, kéo dài một đợt thay vì bỏ cổng duyệt.

## 13. Vai trò

Một người có thể giữ nhiều vai trò, nhưng pull request phải cho biết ai đã làm gì.

| Vai trò | Trách nhiệm |
| --- | --- |
| Điều phối | chia đợt, tránh trùng việc, theo dõi tiến độ |
| Người dịch | tạo bản nháp, tự kiểm tra, nêu điểm chưa chắc chắn |
| Duyệt kỹ thuật | kiểm tra thuật toán, công thức, mã và độ phức tạp |
| Biên tập tiếng Việt | kiểm tra văn phong, thuật ngữ, chính tả |
| Duyệt bản dựng | kiểm tra liên kết, hình, mobile, accessibility |
| Người bảo trì | nhập PR, phát hành Pages, đồng bộ upstream |

## 14. Tự động hóa và kiểm tra

### 14.1. Kiểm tra bắt buộc ngay

- mọi tệp nguồn website tồn tại;
- ID HTML không trùng;
- tài nguyên tương đối không bị thiếu;
- cả trang `lang="vi"` và `lang="en"` tồn tại;
- nút đổi ngôn ngữ có mặt ở cả hai trang;
- build tạo `dist/index.html`, `dist/vi/index.html` và `dist/en/index.html`;
- ba video minh họa vẫn được đóng gói;
- giao diện có breakpoint mobile.

### 14.2. Kiểm tra thêm khi có sách MkDocs tiếng Việt

- build MkDocs với strict mode nếu phù hợp;
- link checker cho liên kết nội bộ;
- kiểm tra anchor;
- lint Markdown;
- kiểm tra thuật ngữ bằng danh sách biến thể không được dùng;
- kiểm tra tệp hình được tham chiếu nhưng không tồn tại;
- smoke test các trang chương trên GitHub Pages.

### 14.3. Kiểm tra nội dung không thể tự động hoàn toàn

- một câu dịch đúng nghĩa nhưng gượng;
- một khẳng định kỹ thuật đã bị tuyệt đối hóa;
- hình vẫn mở nhưng chú thích không còn khớp;
- thuật ngữ đúng từ điển nhưng sai ngữ cảnh;
- ví dụ chạy đúng nhưng không chứng minh điều văn bản nói.

Những mục này luôn cần người duyệt.

## 15. Bảng theo dõi tiến độ

Không dùng một con số phần trăm duy nhất nếu nó trộn bản nháp và bản đã duyệt. Theo dõi mỗi tài liệu bằng trạng thái:

```text
unassigned → assigned → draft → technical-review → language-review → qa → published
```

Trường tối thiểu:

| Trường | Ý nghĩa |
| --- | --- |
| Source path | tệp tiếng Anh gốc |
| Source commit | mốc nguồn |
| Wave | đợt phát hành |
| Owner | người dịch |
| Technical reviewer | người soát kỹ thuật |
| Language reviewer | người biên tập |
| Status | trạng thái hiện tại |
| PR | liên kết pull request |
| Published URL | trang Pages sau phát hành |

Trang `/vi/` chỉ nên hiển thị “hoàn thành” dựa trên số tài liệu `published`.

## 16. Đồng bộ upstream

Repository này có hai remote:

- `origin`: fork `buicongnguyen/hello-algo`;
- `upstream`: `krahets/hello-algo`.

Quy trình định kỳ:

1. fetch upstream;
2. xem thay đổi trong `en/docs`, `en/codes`, cấu hình và tài nguyên;
3. phân loại thay đổi thành nội dung mới, sửa kỹ thuật, sửa câu chữ hoặc tái cấu trúc;
4. tạo issue cập nhật cho tài liệu Việt đã phát hành;
5. nhập upstream vào một nhánh riêng;
6. xử lý xung đột có ý thức, không ghi đè `vi/`;
7. dựng cả VI và EN trước khi nhập `main`.

Nên ghi `last_synced_upstream_commit` trong tài liệu phát hành hoặc một tệp metadata khi quy trình ổn định.

## 17. Rủi ro và cách giảm thiểu

### Bản dịch nhanh nhưng không nhất quán

Giảm thiểu: khóa glossary trước, chia PR nhỏ, bắt buộc duyệt ngôn ngữ.

### Thiếu người duyệt kỹ thuật

Giảm thiểu: ưu tiên ít chương, công khai hàng đợi review, không đẩy bản nháp lên production như bản hoàn tất.

### Upstream thay đổi trong lúc dịch

Giảm thiểu: ghi commit nguồn cho mỗi PR và đồng bộ theo đợt, không liên tục giữa một PR.

### Liên kết hoặc hình hỏng khi đổi đường dẫn ngôn ngữ

Giảm thiểu: build artifact tách `/vi/` và `/en/`, chạy static checks và smoke test production.

### Dịch cả code tạo xung đột lớn

Giảm thiểu: ưu tiên comment của ví dụ được liên kết, tránh đổi định danh, chia theo ngôn ngữ.

### Người đọc tưởng đây là bản chính thức

Giảm thiểu: ghi rõ đây là dự án cộng đồng trên fork, liên kết và ghi công upstream ở footer và README.

### AI tạo câu đúng ngữ pháp nhưng sai kỹ thuật

Giảm thiểu: AI chỉ tạo bản nháp; cổng duyệt kỹ thuật là bắt buộc.

## 18. Chỉ số thành công

Chỉ số ưu tiên chất lượng:

- tỷ lệ tài liệu đã qua đủ hai loại duyệt;
- số lỗi kỹ thuật được phát hiện sau phát hành;
- số liên kết/tài nguyên hỏng;
- thời gian từ draft đến review;
- số thuật ngữ không nhất quán trên mỗi chương;
- số thay đổi upstream chưa được phản ánh;
- phản hồi của người học về độ rõ ràng.

Số tệp nháp do AI tạo không phải chỉ số thành công.

## 19. Checklist phát hành một đợt

### Nội dung

- [ ] Mọi tài liệu trong đợt có commit nguồn.
- [ ] Không còn TODO hoặc câu chưa chắc chắn ngoài danh sách lỗi đã biết.
- [ ] Thuật ngữ mới đã thêm vào glossary.
- [ ] Công thức và bảng độ phức tạp đã đối chiếu.
- [ ] Chú thích hình khớp với hình.
- [ ] Liên kết đến mã đúng.

### Review

- [ ] Hoàn thành duyệt kỹ thuật.
- [ ] Hoàn thành duyệt tiếng Việt.
- [ ] Các phản hồi review đã được giải quyết, không chỉ đánh dấu bỏ qua.

### Kỹ thuật

- [ ] `npm run check` thành công.
- [ ] `npm run build` thành công.
- [ ] Build MkDocs tiếng Việt thành công khi đã có cấu hình.
- [ ] Kiểm tra desktop và mobile.
- [ ] Kiểm tra `/vi/` và `/en/` sau khi deploy.
- [ ] Nút chuyển ngôn ngữ hoạt động.

### Phát hành

- [ ] Cập nhật bảng tiến độ.
- [ ] Ghi chú phiên bản nêu các chương mới.
- [ ] Ghi commit upstream đã đồng bộ.
- [ ] Ghi công người dịch và người duyệt.
- [ ] Mở issue cho lỗi đã biết hoặc việc tiếp theo.

## 20. Công việc ngay sau nền tảng song ngữ

Theo thứ tự:

1. [x] Tạo `vi/glossary.md` từ bảng thuật ngữ ban đầu.
2. [x] Tạo `vi/style-guide.md` với ví dụ câu đúng/sai.
3. [x] Thêm mẫu issue nhận dịch và mẫu pull request.
4. [x] Chọn và dịch 14 tài liệu bản thử thuộc Chương 0–2.
5. [x] Tạo trình dựng tiếng Việt không thêm dependency, phù hợp workflow Pages hiện tại.
6. [x] Tự kiểm tra kỹ thuật, ngôn ngữ, liên kết và bản dựng cho bản thử.
7. [ ] Thu thập phản biện độc lập, đo thời gian review và sửa quy trình.
8. [x] Mở đợt cấu trúc dữ liệu, dịch thêm 12 tài liệu Chương 3–4 và nâng tổng số lên 26.
9. [ ] Thu thập phản biện độc lập và nâng tài liệu đạt yêu cầu lên `published`.

## 21. Quan hệ với dự án Hello Algo gốc

Làm việc trên fork là lựa chọn hợp lý cho giai đoạn đầu vì có thể:

- thử kiến trúc website và quy trình dịch;
- xây một nhóm duyệt tiếng Việt;
- chứng minh chất lượng bằng các chương hoàn chỉnh;
- tránh gửi upstream một cây bản dịch lớn chưa ổn định.

Khi bản thử tốt và có người bảo trì, có thể mở issue hoặc thảo luận với upstream, trình bày:

- phạm vi đã hoàn thành;
- glossary và quy trình duyệt;
- người chịu trách nhiệm bảo trì;
- bản dựng Pages để xem trước;
- kế hoạch đồng bộ lâu dài.

Nếu upstream đồng ý nhận tiếng Việt, công việc trong fork có thể được chia thành các pull request nhỏ theo cấu trúc mà họ yêu cầu. Nếu chưa, fork này vẫn là một bản dịch cộng đồng hợp lệ miễn là tuân thủ giấy phép và ghi công rõ ràng.
