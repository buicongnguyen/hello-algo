import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { englishReaderHref, loadTranslationRegistry, readerHref } from "./translation-registry.mjs";

const pages = [
  {
    slug: "loi-noi-dau",
    title: "Lời nói đầu",
    shortTitle: "Lời nói đầu",
    chapter: "Chương 0",
    source: "en/docs/chapter_preface/index.md",
    target: "vi/docs/chapter_preface/index.md",
    description: "Lời mở đầu cho hành trình học cấu trúc dữ liệu và thuật toán."
  },
  {
    slug: "ve-cuon-sach",
    title: "Về cuốn sách",
    shortTitle: "0.1 · Về cuốn sách",
    chapter: "Chương 0",
    source: "en/docs/chapter_preface/about_the_book.md",
    target: "vi/docs/chapter_preface/about_the_book.md",
    description: "Tìm hiểu đối tượng độc giả, cấu trúc nội dung và cộng đồng tạo nên Hello Algo."
  },
  {
    slug: "cach-su-dung-cuon-sach",
    title: "Cách sử dụng cuốn sách",
    shortTitle: "0.2 · Cách sử dụng",
    chapter: "Chương 0",
    source: "en/docs/chapter_preface/suggestions.md",
    target: "vi/docs/chapter_preface/suggestions.md",
    description: "Học hiệu quả với hình động, mã nguồn, thảo luận và lộ trình luyện tập."
  },
  {
    slug: "tom-tat-chuong-0",
    title: "Tóm tắt Chương 0",
    shortTitle: "0.3 · Tóm tắt",
    chapter: "Chương 0",
    source: "en/docs/chapter_preface/summary.md",
    target: "vi/docs/chapter_preface/summary.md",
    description: "Ôn lại cách sử dụng Hello Algo và phương pháp học bằng thực hành."
  },
  {
    slug: "index",
    title: "Gặp gỡ thuật toán",
    shortTitle: "Mở đầu",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/index.md",
    target: "vi/docs/chapter_introduction/index.md",
    description: "Bắt đầu hành trình học cấu trúc dữ liệu và thuật toán bằng tiếng Việt."
  },
  {
    slug: "thuat-toan-o-khap-noi",
    title: "Thuật toán ở khắp nơi",
    shortTitle: "1.1 · Thuật toán ở khắp nơi",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/algorithms_are_everywhere.md",
    target: "vi/docs/chapter_introduction/algorithms_are_everywhere.md",
    description: "Nhận ra tìm kiếm nhị phân, sắp xếp chèn và tư tưởng tham lam trong đời sống."
  },
  {
    slug: "thuat-toan-la-gi",
    title: "Thuật toán là gì?",
    shortTitle: "1.2 · Thuật toán là gì?",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/what_is_dsa.md",
    target: "vi/docs/chapter_introduction/what_is_dsa.md",
    description: "Định nghĩa thuật toán, cấu trúc dữ liệu và mối quan hệ giữa hai khái niệm."
  },
  {
    slug: "tom-tat-chuong-1",
    title: "Tóm tắt Chương 1",
    shortTitle: "1.3 · Tóm tắt",
    chapter: "Chương 1",
    source: "en/docs/chapter_introduction/summary.md",
    target: "vi/docs/chapter_introduction/summary.md",
    description: "Ôn lại các ý chính và lý do kiến thức thuật toán có giá trị trong công việc."
  },
  {
    slug: "phan-tich-do-phuc-tap",
    title: "Phân tích độ phức tạp",
    shortTitle: "Mở đầu độ phức tạp",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/index.md",
    target: "vi/docs/chapter_computational_complexity/index.md",
    description: "Xây dựng trực giác về thời gian, bộ nhớ và khả năng mở rộng của thuật toán."
  },
  {
    slug: "danh-gia-hieu-qua",
    title: "Đánh giá hiệu quả thuật toán",
    shortTitle: "2.1 · Đánh giá hiệu quả",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/performance_evaluation.md",
    target: "vi/docs/chapter_computational_complexity/performance_evaluation.md",
    description: "So sánh phép đo thực tế với phân tích độ phức tạp tiệm cận."
  },
  {
    slug: "vong-lap-va-de-quy",
    title: "Phép lặp và đệ quy",
    shortTitle: "2.2 · Phép lặp và đệ quy",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/iteration_and_recursion.md",
    target: "vi/docs/chapter_computational_complexity/iteration_and_recursion.md",
    description: "So sánh phép lặp, đệ quy, ngăn xếp lời gọi và cây đệ quy."
  },
  {
    slug: "do-phuc-tap-thoi-gian",
    title: "Độ phức tạp thời gian",
    shortTitle: "2.3 · Độ phức tạp thời gian",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/time_complexity.md",
    target: "vi/docs/chapter_computational_complexity/time_complexity.md",
    description: "Đo xu hướng tăng của thời gian chạy bằng ký hiệu tiệm cận."
  },
  {
    slug: "do-phuc-tap-khong-gian",
    title: "Độ phức tạp không gian",
    shortTitle: "2.4 · Độ phức tạp không gian",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/space_complexity.md",
    target: "vi/docs/chapter_computational_complexity/space_complexity.md",
    description: "Phân tích bộ nhớ tạm, đầu ra, khung ngăn xếp và các dạng tăng trưởng."
  },
  {
    slug: "tom-tat-chuong-2",
    title: "Tóm tắt Chương 2",
    shortTitle: "2.5 · Tóm tắt",
    chapter: "Chương 2",
    source: "en/docs/chapter_computational_complexity/summary.md",
    target: "vi/docs/chapter_computational_complexity/summary.md",
    description: "Ôn tập đánh giá hiệu quả, độ phức tạp thời gian và độ phức tạp không gian."
  },
  {
    slug: "cau-truc-du-lieu",
    title: "Cấu trúc dữ liệu",
    shortTitle: "Mở đầu cấu trúc dữ liệu",
    chapter: "Chương 3",
    source: "en/docs/chapter_data_structure/index.md",
    target: "vi/docs/chapter_data_structure/index.md",
    description: "Giới thiệu cách tổ chức dữ liệu làm nền tảng cho thuật toán."
  },
  {
    slug: "phan-loai-cau-truc-du-lieu",
    title: "Phân loại cấu trúc dữ liệu",
    shortTitle: "3.1 · Phân loại",
    chapter: "Chương 3",
    source: "en/docs/chapter_data_structure/classification_of_data_structure.md",
    target: "vi/docs/chapter_data_structure/classification_of_data_structure.md",
    description: "Phân biệt cấu trúc logic tuyến tính, phi tuyến và cách lưu trữ vật lý."
  },
  {
    slug: "kieu-du-lieu-co-ban",
    title: "Kiểu dữ liệu cơ bản",
    shortTitle: "3.2 · Kiểu dữ liệu cơ bản",
    chapter: "Chương 3",
    source: "en/docs/chapter_data_structure/basic_data_types.md",
    target: "vi/docs/chapter_data_structure/basic_data_types.md",
    description: "Tìm hiểu số nguyên, số thực, ký tự, Boolean và quan hệ với cấu trúc dữ liệu."
  },
  {
    slug: "ma-hoa-so",
    title: "Mã hóa số",
    shortTitle: "3.3 · Mã hóa số *",
    chapter: "Chương 3",
    source: "en/docs/chapter_data_structure/number_encoding.md",
    target: "vi/docs/chapter_data_structure/number_encoding.md",
    description: "Giải thích bù hai và biểu diễn số thực IEEE 754."
  },
  {
    slug: "ma-hoa-ky-tu",
    title: "Mã hóa ký tự",
    shortTitle: "3.4 · Mã hóa ký tự *",
    chapter: "Chương 3",
    source: "en/docs/chapter_data_structure/character_encoding.md",
    target: "vi/docs/chapter_data_structure/character_encoding.md",
    description: "So sánh ASCII, Unicode, UTF-8, UTF-16 và cách ngôn ngữ lưu chuỗi."
  },
  {
    slug: "tom-tat-chuong-3",
    title: "Tóm tắt Chương 3",
    shortTitle: "3.5 · Tóm tắt",
    chapter: "Chương 3",
    source: "en/docs/chapter_data_structure/summary.md",
    target: "vi/docs/chapter_data_structure/summary.md",
    description: "Ôn tập phân loại cấu trúc dữ liệu, kiểu cơ bản và mã hóa dữ liệu."
  },
  {
    slug: "mang-va-danh-sach-lien-ket",
    title: "Mảng và danh sách liên kết",
    shortTitle: "Mở đầu mảng và liên kết",
    chapter: "Chương 4",
    source: "en/docs/chapter_array_and_linkedlist/index.md",
    target: "vi/docs/chapter_array_and_linkedlist/index.md",
    description: "Giới thiệu hai cách lưu trữ liên tục và phân tán trong bộ nhớ."
  },
  {
    slug: "mang",
    title: "Mảng",
    shortTitle: "4.1 · Mảng",
    chapter: "Chương 4",
    source: "en/docs/chapter_array_and_linkedlist/array.md",
    target: "vi/docs/chapter_array_and_linkedlist/array.md",
    description: "Khám phá truy cập, chèn, xóa, duyệt, tìm kiếm và mở rộng mảng."
  },
  {
    slug: "danh-sach-lien-ket",
    title: "Danh sách liên kết",
    shortTitle: "4.2 · Danh sách liên kết",
    chapter: "Chương 4",
    source: "en/docs/chapter_array_and_linkedlist/linked_list.md",
    target: "vi/docs/chapter_array_and_linkedlist/linked_list.md",
    description: "Tìm hiểu nút, liên kết, các thao tác và ứng dụng của danh sách liên kết."
  },
  {
    slug: "danh-sach-dong",
    title: "Danh sách động",
    shortTitle: "4.3 · Danh sách động",
    chapter: "Chương 4",
    source: "en/docs/chapter_array_and_linkedlist/list.md",
    target: "vi/docs/chapter_array_and_linkedlist/list.md",
    description: "Xây dựng danh sách động từ mảng với cơ chế theo dõi và mở rộng sức chứa."
  },
  {
    slug: "ram-va-bo-nho-dem",
    title: "Bộ nhớ truy cập ngẫu nhiên và bộ nhớ đệm",
    shortTitle: "4.4 · RAM và bộ nhớ đệm *",
    chapter: "Chương 4",
    source: "en/docs/chapter_array_and_linkedlist/ram_and_cache.md",
    target: "vi/docs/chapter_array_and_linkedlist/ram_and_cache.md",
    description: "Liên hệ bố cục dữ liệu với RAM, bộ nhớ đệm và hiệu năng thực tế."
  },
  {
    slug: "tom-tat-chuong-4",
    title: "Tóm tắt Chương 4",
    shortTitle: "4.5 · Tóm tắt",
    chapter: "Chương 4",
    source: "en/docs/chapter_array_and_linkedlist/summary.md",
    target: "vi/docs/chapter_array_and_linkedlist/summary.md",
    description: "Ôn tập mảng, danh sách liên kết, danh sách động và hiệu quả bộ nhớ đệm."
  },
  { slug: "ngan-xep-va-hang-doi", title: "Ngăn xếp và hàng đợi", shortTitle: "Mở đầu ngăn xếp và hàng đợi", chapter: "Chương 5", source: "en/docs/chapter_stack_and_queue/index.md", target: "vi/docs/chapter_stack_and_queue/index.md", description: "Giới thiệu LIFO, FIFO và thao tác ở hai đầu." },
  { slug: "ngan-xep", title: "Ngăn xếp", shortTitle: "5.1 · Ngăn xếp", chapter: "Chương 5", source: "en/docs/chapter_stack_and_queue/stack.md", target: "vi/docs/chapter_stack_and_queue/stack.md", description: "Tìm hiểu thao tác, cách triển khai và ứng dụng của ngăn xếp." },
  { slug: "hang-doi", title: "Hàng đợi", shortTitle: "5.2 · Hàng đợi", chapter: "Chương 5", source: "en/docs/chapter_stack_and_queue/queue.md", target: "vi/docs/chapter_stack_and_queue/queue.md", description: "Tìm hiểu FIFO, mảng vòng và các ứng dụng hàng chờ." },
  { slug: "hang-doi-hai-dau", title: "Hàng đợi hai đầu", shortTitle: "5.3 · Hàng đợi hai đầu", chapter: "Chương 5", source: "en/docs/chapter_stack_and_queue/deque.md", target: "vi/docs/chapter_stack_and_queue/deque.md", description: "Thao tác hai đầu bằng mảng vòng hoặc danh sách liên kết đôi." },
  { slug: "tom-tat-chuong-5", title: "Tóm tắt Chương 5", shortTitle: "5.4 · Tóm tắt", chapter: "Chương 5", source: "en/docs/chapter_stack_and_queue/summary.md", target: "vi/docs/chapter_stack_and_queue/summary.md", description: "Ôn tập ngăn xếp, hàng đợi, deque và ứng dụng." },
  { slug: "bam", title: "Băm", shortTitle: "Mở đầu băm", chapter: "Chương 6", source: "en/docs/chapter_hashing/index.md", target: "vi/docs/chapter_hashing/index.md", description: "Giới thiệu ánh xạ khóa, bucket và xung đột." },
  { slug: "bang-bam", title: "Bảng băm", shortTitle: "6.1 · Bảng băm", chapter: "Chương 6", source: "en/docs/chapter_hashing/hash_map.md", target: "vi/docs/chapter_hashing/hash_map.md", description: "Cài đặt bảng băm, hệ số tải và cơ chế mở rộng." },
  { slug: "xung-dot-bam", title: "Xung đột băm", shortTitle: "6.2 · Xung đột băm", chapter: "Chương 6", source: "en/docs/chapter_hashing/hash_collision.md", target: "vi/docs/chapter_hashing/hash_collision.md", description: "So sánh nối chuỗi, dò tuyến tính, dò bậc hai và băm nhiều lần." },
  { slug: "thuat-toan-bam", title: "Thuật toán băm", shortTitle: "6.3 · Thuật toán băm", chapter: "Chương 6", source: "en/docs/chapter_hashing/hash_algorithm.md", target: "vi/docs/chapter_hashing/hash_algorithm.md", description: "Thiết kế, thuộc tính và lựa chọn thuật toán băm." },
  { slug: "tom-tat-chuong-6", title: "Tóm tắt Chương 6", shortTitle: "6.4 · Tóm tắt", chapter: "Chương 6", source: "en/docs/chapter_hashing/summary.md", target: "vi/docs/chapter_hashing/summary.md", description: "Ôn tập bảng băm, xung đột và hàm băm." },
  { slug: "cay", title: "Cây", shortTitle: "Mở đầu cây", chapter: "Chương 7", source: "en/docs/chapter_tree/index.md", target: "vi/docs/chapter_tree/index.md", description: "Giới thiệu cấu trúc cây và quan hệ phân cấp." },
  { slug: "cay-nhi-phan", title: "Cây nhị phân", shortTitle: "7.1 · Cây nhị phân", chapter: "Chương 7", source: "en/docs/chapter_tree/binary_tree.md", target: "vi/docs/chapter_tree/binary_tree.md", description: "Nút, thuật ngữ, loại cây và thao tác trên cây nhị phân." },
  { slug: "duyet-cay-nhi-phan", title: "Duyệt cây nhị phân", shortTitle: "7.2 · Duyệt cây", chapter: "Chương 7", source: "en/docs/chapter_tree/binary_tree_traversal.md", target: "vi/docs/chapter_tree/binary_tree_traversal.md", description: "So sánh duyệt theo mức và duyệt theo chiều sâu." },
  { slug: "bieu-dien-cay-bang-mang", title: "Biểu diễn cây nhị phân bằng mảng", shortTitle: "7.3 · Biểu diễn bằng mảng", chapter: "Chương 7", source: "en/docs/chapter_tree/array_representation_of_tree.md", target: "vi/docs/chapter_tree/array_representation_of_tree.md", description: "Ánh xạ quan hệ cha con của cây hoàn chỉnh vào chỉ số mảng." },
  { slug: "cay-tim-kiem-nhi-phan", title: "Cây tìm kiếm nhị phân", shortTitle: "7.4 · Cây tìm kiếm", chapter: "Chương 7", source: "en/docs/chapter_tree/binary_search_tree.md", target: "vi/docs/chapter_tree/binary_search_tree.md", description: "Tìm kiếm, chèn và xóa trong cây tìm kiếm nhị phân." },
  { slug: "cay-avl", title: "Cây AVL", shortTitle: "7.5 · Cây AVL *", chapter: "Chương 7", source: "en/docs/chapter_tree/avl_tree.md", target: "vi/docs/chapter_tree/avl_tree.md", description: "Giữ BST cân bằng bằng bốn trường hợp xoay." },
  { slug: "tom-tat-chuong-7", title: "Tóm tắt Chương 7", shortTitle: "7.6 · Tóm tắt", chapter: "Chương 7", source: "en/docs/chapter_tree/summary.md", target: "vi/docs/chapter_tree/summary.md", description: "Ôn tập cây nhị phân, BST và AVL." },
  { slug: "heap", title: "Heap", shortTitle: "Mở đầu heap", chapter: "Chương 8", source: "en/docs/chapter_heap/index.md", target: "vi/docs/chapter_heap/index.md", description: "Giới thiệu cây ưu tiên hoàn chỉnh và các ứng dụng." },
  { slug: "cau-truc-heap", title: "Heap", shortTitle: "8.1 · Heap", chapter: "Chương 8", source: "en/docs/chapter_heap/heap.md", target: "vi/docs/chapter_heap/heap.md", description: "Biểu diễn, dịch lên, dịch xuống và thao tác heap." },
  { slug: "xay-dung-heap", title: "Xây dựng heap", shortTitle: "8.2 · Xây dựng heap", chapter: "Chương 8", source: "en/docs/chapter_heap/build_heap.md", target: "vi/docs/chapter_heap/build_heap.md", description: "Xây heap tại chỗ từ dưới lên trong thời gian tuyến tính." },
  { slug: "top-k", title: "Bài toán top-k", shortTitle: "8.3 · Top-k", chapter: "Chương 8", source: "en/docs/chapter_heap/top_k.md", target: "vi/docs/chapter_heap/top_k.md", description: "Duy trì heap kích thước k để xử lý dữ liệu lớn hoặc dạng luồng." },
  { slug: "tom-tat-chuong-8", title: "Tóm tắt Chương 8", shortTitle: "8.4 · Tóm tắt", chapter: "Chương 8", source: "en/docs/chapter_heap/summary.md", target: "vi/docs/chapter_heap/summary.md", description: "Ôn tập heap, xây heap và top-k." },
  { slug: "do-thi", title: "Đồ thị", shortTitle: "Mở đầu đồ thị", chapter: "Chương 9", source: "en/docs/chapter_graph/index.md", target: "vi/docs/chapter_graph/index.md", description: "Giới thiệu quan hệ mạng bằng đỉnh và cạnh." },
  { slug: "cau-truc-do-thi", title: "Đồ thị", shortTitle: "9.1 · Đồ thị", chapter: "Chương 9", source: "en/docs/chapter_graph/graph.md", target: "vi/docs/chapter_graph/graph.md", description: "Loại đồ thị, thuật ngữ, ma trận kề và danh sách kề." },
  { slug: "thao-tac-do-thi", title: "Thao tác cơ bản trên đồ thị", shortTitle: "9.2 · Thao tác đồ thị", chapter: "Chương 9", source: "en/docs/chapter_graph/graph_operations.md", target: "vi/docs/chapter_graph/graph_operations.md", description: "Thêm, xóa đỉnh và cạnh trong hai cách biểu diễn." },
  { slug: "duyet-do-thi", title: "Duyệt đồ thị", shortTitle: "9.3 · Duyệt đồ thị", chapter: "Chương 9", source: "en/docs/chapter_graph/graph_traversal.md", target: "vi/docs/chapter_graph/graph_traversal.md", description: "Duyệt đồ thị bằng BFS và DFS." },
  { slug: "tom-tat-chuong-9", title: "Tóm tắt Chương 9", shortTitle: "9.4 · Tóm tắt", chapter: "Chương 9", source: "en/docs/chapter_graph/summary.md", target: "vi/docs/chapter_graph/summary.md", description: "Ôn tập biểu diễn, thao tác và duyệt đồ thị." },
  { slug: "tim-kiem", title: "Tìm kiếm", shortTitle: "Mở đầu tìm kiếm", chapter: "Chương 10", source: "en/docs/chapter_searching/index.md", target: "vi/docs/chapter_searching/index.md", description: "Giới thiệu các bài toán và chiến lược tìm kiếm." },
  { slug: "tim-kiem-nhi-phan", title: "Tìm kiếm nhị phân", shortTitle: "10.1 · Tìm kiếm nhị phân", chapter: "Chương 10", source: "en/docs/chapter_searching/binary_search.md", target: "vi/docs/chapter_searching/binary_search.md", description: "Loại bỏ một nửa khoảng tìm kiếm sau mỗi phép so sánh." },
  { slug: "diem-chen-tim-kiem-nhi-phan", title: "Điểm chèn bằng tìm kiếm nhị phân", shortTitle: "10.2 · Điểm chèn", chapter: "Chương 10", source: "en/docs/chapter_searching/binary_search_insertion.md", target: "vi/docs/chapter_searching/binary_search_insertion.md", description: "Tìm vị trí chèn trước hoặc sau các giá trị trùng." },
  { slug: "bien-tim-kiem-nhi-phan", title: "Biên của tìm kiếm nhị phân", shortTitle: "10.3 · Biên tìm kiếm", chapter: "Chương 10", source: "en/docs/chapter_searching/binary_search_edge.md", target: "vi/docs/chapter_searching/binary_search_edge.md", description: "Tìm biên trái và phải của mục tiêu trùng lặp." },
  { slug: "toi-uu-tim-kiem-bang-bam", title: "Tối ưu tìm kiếm tuyến tính bằng băm", shortTitle: "10.4 · Tối ưu bằng băm", chapter: "Chương 10", source: "en/docs/chapter_searching/replace_linear_by_hashing.md", target: "vi/docs/chapter_searching/replace_linear_by_hashing.md", description: "Dùng bảng băm để đánh đổi không gian lấy thời gian." },
  { slug: "nhin-lai-thuat-toan-tim-kiem", title: "Nhìn lại các thuật toán tìm kiếm", shortTitle: "10.5 · Chọn cách tìm kiếm", chapter: "Chương 10", source: "en/docs/chapter_searching/searching_algorithm_revisited.md", target: "vi/docs/chapter_searching/searching_algorithm_revisited.md", description: "So sánh tuyến tính, nhị phân, băm và cây tìm kiếm." },
  { slug: "tom-tat-chuong-10", title: "Tóm tắt Chương 10", shortTitle: "10.6 · Tóm tắt", chapter: "Chương 10", source: "en/docs/chapter_searching/summary.md", target: "vi/docs/chapter_searching/summary.md", description: "Ôn tập tìm kiếm nhị phân, biên và chiến lược tìm kiếm." },
  { slug: "sap-xep", title: "Sắp xếp", shortTitle: "Mở đầu sắp xếp", chapter: "Chương 11", source: "en/docs/chapter_sorting/index.md", target: "vi/docs/chapter_sorting/index.md", description: "Giới thiệu bài toán và các họ thuật toán sắp xếp." },
  { slug: "thuat-toan-sap-xep", title: "Thuật toán sắp xếp", shortTitle: "11.1 · Thuật toán sắp xếp", chapter: "Chương 11", source: "en/docs/chapter_sorting/sorting_algorithm.md", target: "vi/docs/chapter_sorting/sorting_algorithm.md", description: "Đánh giá độ phức tạp, ổn định, tại chỗ và thích nghi." },
  { slug: "sap-xep-chon", title: "Sắp xếp chọn", shortTitle: "11.2 · Sắp xếp chọn", chapter: "Chương 11", source: "en/docs/chapter_sorting/selection_sort.md", target: "vi/docs/chapter_sorting/selection_sort.md", description: "Chọn phần tử nhỏ nhất sau mỗi vòng." },
  { slug: "sap-xep-noi-bot", title: "Sắp xếp nổi bọt", shortTitle: "11.3 · Nổi bọt", chapter: "Chương 11", source: "en/docs/chapter_sorting/bubble_sort.md", target: "vi/docs/chapter_sorting/bubble_sort.md", description: "Đổi các cặp kề nhau cho tới khi có thứ tự." },
  { slug: "sap-xep-chen", title: "Sắp xếp chèn", shortTitle: "11.4 · Sắp xếp chèn", chapter: "Chương 11", source: "en/docs/chapter_sorting/insertion_sort.md", target: "vi/docs/chapter_sorting/insertion_sort.md", description: "Chèn từng phần tử vào đoạn đầu đã sắp xếp." },
  { slug: "sap-xep-nhanh", title: "Sắp xếp nhanh", shortTitle: "11.5 · Quicksort", chapter: "Chương 11", source: "en/docs/chapter_sorting/quick_sort.md", target: "vi/docs/chapter_sorting/quick_sort.md", description: "Phân hoạch theo chốt và đệ quy hai nửa." },
  { slug: "sap-xep-tron", title: "Sắp xếp trộn", shortTitle: "11.6 · Merge sort", chapter: "Chương 11", source: "en/docs/chapter_sorting/merge_sort.md", target: "vi/docs/chapter_sorting/merge_sort.md", description: "Chia đôi rồi trộn các dãy đã có thứ tự." },
  { slug: "sap-xep-vun-dong", title: "Sắp xếp vun đống", shortTitle: "11.7 · Heap sort", chapter: "Chương 11", source: "en/docs/chapter_sorting/heap_sort.md", target: "vi/docs/chapter_sorting/heap_sort.md", description: "Trích phần tử lớn nhất từ heap cực đại." },
  { slug: "sap-xep-thung", title: "Sắp xếp thùng", shortTitle: "11.8 · Bucket sort", chapter: "Chương 11", source: "en/docs/chapter_sorting/bucket_sort.md", target: "vi/docs/chapter_sorting/bucket_sort.md", description: "Phân phối dữ liệu vào các khoảng giá trị." },
  { slug: "sap-xep-dem", title: "Sắp xếp đếm", shortTitle: "11.9 · Counting sort", chapter: "Chương 11", source: "en/docs/chapter_sorting/counting_sort.md", target: "vi/docs/chapter_sorting/counting_sort.md", description: "Đếm tần suất khóa trong miền hữu hạn." },
  { slug: "sap-xep-co-so", title: "Sắp xếp cơ số", shortTitle: "11.10 · Radix sort", chapter: "Chương 11", source: "en/docs/chapter_sorting/radix_sort.md", target: "vi/docs/chapter_sorting/radix_sort.md", description: "Sắp xếp ổn định theo từng chữ số." },
  { slug: "tom-tat-chuong-11", title: "Tóm tắt Chương 11", shortTitle: "11.11 · Tóm tắt", chapter: "Chương 11", source: "en/docs/chapter_sorting/summary.md", target: "vi/docs/chapter_sorting/summary.md", description: "So sánh các họ thuật toán sắp xếp." },
  { slug: "chia-de-tri", title: "Chia để trị", shortTitle: "Mở đầu chia để trị", chapter: "Chương 12", source: "en/docs/chapter_divide_and_conquer/index.md", target: "vi/docs/chapter_divide_and_conquer/index.md", description: "Giới thiệu tư tưởng chia, giải và kết hợp." },
  { slug: "thuat-toan-chia-de-tri", title: "Thuật toán chia để trị", shortTitle: "12.1 · Chia để trị", chapter: "Chương 12", source: "en/docs/chapter_divide_and_conquer/divide_and_conquer.md", target: "vi/docs/chapter_divide_and_conquer/divide_and_conquer.md", description: "Thiết kế bài toán con và kết hợp kết quả." },
  { slug: "tim-kiem-nhi-phan-de-quy", title: "Chiến lược tìm kiếm chia để trị", shortTitle: "12.2 · Tìm kiếm đệ quy", chapter: "Chương 12", source: "en/docs/chapter_divide_and_conquer/binary_search_recur.md", target: "vi/docs/chapter_divide_and_conquer/binary_search_recur.md", description: "Tìm kiếm nhị phân dưới dạng đệ quy." },
  { slug: "dung-cay-nhi-phan", title: "Bài toán dựng cây nhị phân", shortTitle: "12.3 · Dựng cây", chapter: "Chương 12", source: "en/docs/chapter_divide_and_conquer/build_binary_tree_problem.md", target: "vi/docs/chapter_divide_and_conquer/build_binary_tree_problem.md", description: "Dựng cây từ thứ tự tiền thứ tự và trung thứ tự." },
  { slug: "thap-ha-noi", title: "Bài toán Tháp Hà Nội", shortTitle: "12.4 · Tháp Hà Nội", chapter: "Chương 12", source: "en/docs/chapter_divide_and_conquer/hanota_problem.md", target: "vi/docs/chapter_divide_and_conquer/hanota_problem.md", description: "Mô hình hóa hai bài toán con quanh một bước trung tâm." },
  { slug: "tom-tat-chuong-12", title: "Tóm tắt Chương 12", shortTitle: "12.5 · Tóm tắt", chapter: "Chương 12", source: "en/docs/chapter_divide_and_conquer/summary.md", target: "vi/docs/chapter_divide_and_conquer/summary.md", description: "Ôn tập chia để trị, dựng cây và Tháp Hà Nội." },
  { slug: "quay-lui", title: "Quay lui", shortTitle: "Mở đầu quay lui", chapter: "Chương 13", source: "en/docs/chapter_backtracking/index.md", target: "vi/docs/chapter_backtracking/index.md", description: "Giới thiệu thử, cắt tỉa và hoàn tác trong không gian nghiệm." },
  { slug: "thuat-toan-quay-lui", title: "Thuật toán quay lui", shortTitle: "13.1 · Thuật toán quay lui", chapter: "Chương 13", source: "en/docs/chapter_backtracking/backtracking_algorithm.md", target: "vi/docs/chapter_backtracking/backtracking_algorithm.md", description: "Xây dựng khuôn mẫu thử, cắt tỉa và quay lui." },
  { slug: "bai-toan-n-hau", title: "Bài toán N quân hậu", shortTitle: "13.2 · N quân hậu", chapter: "Chương 13", source: "en/docs/chapter_backtracking/n_queens_problem.md", target: "vi/docs/chapter_backtracking/n_queens_problem.md", description: "Đặt quân hậu bằng cắt tỉa cột và đường chéo." },
  { slug: "bai-toan-hoan-vi", title: "Bài toán hoán vị", shortTitle: "13.3 · Hoán vị", chapter: "Chương 13", source: "en/docs/chapter_backtracking/permutations_problem.md", target: "vi/docs/chapter_backtracking/permutations_problem.md", description: "Sinh hoán vị phân biệt và xử lý phần tử trùng." },
  { slug: "bai-toan-tong-tap-con", title: "Bài toán tổng tập con", shortTitle: "13.4 · Tổng tập con", chapter: "Chương 13", source: "en/docs/chapter_backtracking/subset_sum_problem.md", target: "vi/docs/chapter_backtracking/subset_sum_problem.md", description: "Tìm tổ hợp và cắt các nhánh trùng hoặc không thể đạt đích." },
  { slug: "tom-tat-chuong-13", title: "Tóm tắt Chương 13", shortTitle: "13.5 · Tóm tắt", chapter: "Chương 13", source: "en/docs/chapter_backtracking/summary.md", target: "vi/docs/chapter_backtracking/summary.md", description: "Ôn tập trạng thái, ràng buộc và cắt tỉa trong quay lui." },
  { slug: "quy-hoach-dong", title: "Quy hoạch động", shortTitle: "Mở đầu quy hoạch động", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/index.md", target: "vi/docs/chapter_dynamic_programming/index.md", description: "Tái sử dụng kết quả bài toán con để xây dựng nghiệm lớn." },
  { slug: "gioi-thieu-quy-hoach-dong", title: "Giới thiệu quy hoạch động", shortTitle: "14.1 · Giới thiệu", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/intro_to_dynamic_programming.md", target: "vi/docs/chapter_dynamic_programming/intro_to_dynamic_programming.md", description: "Đi từ đệ quy vét cạn đến ghi nhớ và lập bảng." },
  { slug: "dac-trung-bai-toan-quy-hoach-dong", title: "Đặc trưng của bài toán quy hoạch động", shortTitle: "14.2 · Đặc trưng", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/dp_problem_features.md", target: "vi/docs/chapter_dynamic_programming/dp_problem_features.md", description: "Nhận diện bài toán con chồng lặp, cấu trúc con tối ưu và không hậu hiệu." },
  { slug: "quy-trinh-giai-quy-hoach-dong", title: "Quy trình giải bài toán quy hoạch động", shortTitle: "14.3 · Quy trình giải", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/dp_solution_pipeline.md", target: "vi/docs/chapter_dynamic_programming/dp_solution_pipeline.md", description: "Định nghĩa trạng thái, chuyển trạng thái, biên và thứ tự tính." },
  { slug: "ba-lo-khong-mot", title: "Bài toán ba lô 0-1", shortTitle: "14.4 · Ba lô 0-1", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/knapsack_problem.md", target: "vi/docs/chapter_dynamic_programming/knapsack_problem.md", description: "Chọn mỗi vật tối đa một lần trong giới hạn sức chứa." },
  { slug: "ba-lo-vo-han", title: "Bài toán ba lô vô hạn", shortTitle: "14.5 · Ba lô vô hạn", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/unbounded_knapsack_problem.md", target: "vi/docs/chapter_dynamic_programming/unbounded_knapsack_problem.md", description: "Tái sử dụng loại vật và giải các biến thể đổi tiền." },
  { slug: "khoang-cach-chinh-sua", title: "Bài toán khoảng cách chỉnh sửa", shortTitle: "14.6 · Khoảng cách chỉnh sửa", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/edit_distance_problem.md", target: "vi/docs/chapter_dynamic_programming/edit_distance_problem.md", description: "Đo độ giống chuỗi bằng chèn, xóa và thay thế." },
  { slug: "tom-tat-chuong-14", title: "Tóm tắt Chương 14", shortTitle: "14.7 · Tóm tắt", chapter: "Chương 14", source: "en/docs/chapter_dynamic_programming/summary.md", target: "vi/docs/chapter_dynamic_programming/summary.md", description: "Ôn tập thiết kế quy hoạch động và các ứng dụng kinh điển." }
];

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const formatMath = (value) => value
  .replaceAll("\\log", "log")
  .replaceAll("\\Omega", "Ω")
  .replaceAll("\\Theta", "Θ")
  .replaceAll("\\times", "×")
  .replaceAll("\\cdot", "·")
  .replaceAll("\\dots", "…")
  .replaceAll("\\le", "≤")
  .replaceAll("\\ge", "≥")
  .replaceAll("\\lfloor", "⌊")
  .replaceAll("\\rfloor", "⌋");

function renderInline(value) {
  const tokens = [];
  const protect = (html) => {
    const token = `@@TOKEN${tokens.length}@@`;
    tokens.push(html);
    return token;
  };
  const safeUrl = /^(https?:|mailto:|#|\.{0,2}\/|[a-zA-Z0-9_./-]+(?:#[a-zA-Z0-9_-]+)?)$/;
  const protectedValue = value
    .replace(/`([^`]+)`/g, (_, code) => protect(`<code>${escapeHtml(code)}</code>`))
    .replace(/\$([^$]+)\$/g, (_, expression) => {
      return protect(`<span class="math">${escapeHtml(formatMath(expression))}</span>`);
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      if (!safeUrl.test(url)) return escapeHtml(label);
      return protect(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`);
    });
  let rendered = escapeHtml(protectedValue).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  tokens.forEach((tokenContent, index) => {
    rendered = rendered.replace(`@@TOKEN${index}@@`, tokenContent);
  });
  return rendered;
}

function assetUrl(sourcePath, reference) {
  if (reference.startsWith("../assets/covers/")) {
    return `assets/covers/${path.basename(reference)}`;
  }
  const sourceDirectory = path.dirname(sourcePath.replaceAll("\\", "/"));
  const relativeDirectory = sourceDirectory.replace(/^(?:vi|ko)\/docs\//, "");
  return `assets/${relativeDirectory}/${reference}`;
}

function isTableDivider(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function tableCells(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

export function renderMarkdown(markdown, sourcePath) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trimEnd();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const codeFence = line.match(/^```([^\s`]*)/);
    if (codeFence) {
      const language = codeFence[1].replace(/[^a-zA-Z0-9_-]/g, "");
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trimStart().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (index >= lines.length) throw new Error(`Unclosed code fence in ${sourcePath}`);
      index += 1;
      output.push(`<pre><code${language ? ` class="language-${language}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (line.trim() === "$$") {
      const expression = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== "$$") {
        expression.push(lines[index].trim());
        index += 1;
      }
      if (index >= lines.length) throw new Error(`Unclosed display math in ${sourcePath}`);
      index += 1;
      output.push(`<div class="math-block" role="math">${escapeHtml(formatMath(expression.join(" ")))}</div>`);
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      output.push(`<figure><img src="${escapeHtml(assetUrl(sourcePath, image[2]))}" alt="${escapeHtml(image[1])}" loading="lazy"><figcaption>${renderInline(image[1])}</figcaption></figure>`);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].trimStart().startsWith(">")) {
        quote.push(lines[index].trimStart().replace(/^>\s?/, ""));
        index += 1;
      }
      output.push(`<blockquote>${quote.filter(Boolean).map((part) => `<p>${renderInline(part)}</p>`).join("")}</blockquote>`);
      continue;
    }

    const listMatch = line.match(/^\s*(\d+\.|[-*])\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (index < lines.length) {
        const match = lines[index].match(/^\s*(\d+\.|[-*])\s+(.+)$/);
        if (!match || /\d+\./.test(match[1]) !== ordered) break;
        items.push(`<li>${renderInline(match[2])}</li>`);
        index += 1;
      }
      output.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      output.push(`<div class="table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trimEnd();
      if (!next.trim() || /^(#{1,4})\s+/.test(next) || /^!\[/.test(next) || next.startsWith(">") || next.startsWith("```") || next.trim() === "$$" || /^\s*(\d+\.|[-*])\s+/.test(next)) break;
      if (next.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) break;
      paragraph.push(next.trim());
      index += 1;
    }
    output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return output.join("\n");
}

function navigation(currentSlug) {
  const chapters = [...new Set(pages.map((page) => page.chapter))];
  return chapters.map((chapter) => `
    <div class="book-nav-group">
      <span>${chapter}</span>
      ${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug}.html">${page.shortTitle}</a>`).join("\n")}
    </div>`).join("\n");
}

function pageTemplate(page, body, pageIndex, sourceCommit, vietnameseDocument, koreanDocument) {
  const previous = pages[pageIndex - 1];
  const next = pages[pageIndex + 1];
  const canonicalName = page.slug === "index" ? "" : `${page.slug}.html`;
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  const englishUrl = englishReaderHref(page.source);
  const koreanOption = koreanDocument
    ? `<a href="${readerHref(koreanDocument)}" lang="ko" hreflang="ko" aria-label="Đọc trang tương ứng bằng tiếng Hàn">KO</a>`
    : '<a href="../../ko/learn/" lang="ko" data-language-home="ko" aria-label="Mở trang chủ bản tiếng Hàn; tài liệu tương ứng chưa có">KO</a>';
  const statusCopy = {
    draft: { label: "Bản nháp", sidebar: "đang mở rộng và biên tập", title: "Trạng thái: bản nháp đang được rà soát", description: "Liên kết, tài nguyên và bản dựng đã được kiểm tra, nhưng nội dung vẫn cần đối chiếu đầy đủ với nguồn tiếng Anh và phản biện ngôn ngữ trước khi nâng thành bản thử." },
    pilot: { label: "Bản thử", sidebar: "chờ phản biện độc lập", title: "Trạng thái: bản thử đã tự kiểm tra", description: "Nội dung đã qua kiểm tra kỹ thuật, ngôn ngữ, liên kết và bản dựng trong fork này. Bản dịch vẫn cần phản biện độc lập trước khi nâng lên bản ổn định." },
    published: { label: "Ổn định", sidebar: "đã hoàn tất phản biện", title: "Trạng thái: bản dịch ổn định", description: "Nội dung đã hoàn tất đối chiếu nguồn, kiểm tra kỹ thuật và phản biện ngôn ngữ độc lập." }
  }[vietnameseDocument.status];
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/vi/learn/${canonicalName}">
  <meta name="theme-color" content="#07111f">
  <title>${escapeHtml(page.title)} · Hello Algo tiếng Việt</title>
  <link rel="stylesheet" href="book.css?v=20260718g">
  <script src="book.js?v=20260718g" defer></script>
</head>
<body data-translation-status="${vietnameseDocument.status}">
  <a class="skip-link" href="#article">Bỏ qua để đến bài đọc</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="Mở mục lục" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>VI</b></strong></a>
    <div class="reader-progress"><span>${statusCopy.label}</span><strong>${pages.length} / 105 tài liệu</strong></div>
    <nav aria-label="Ngôn ngữ và giao diện">
      ${koreanOption}
      <a class="active" href="${canonicalName || "./"}" lang="vi" hreflang="vi" aria-current="page">VI</a>
      <a href="${englishUrl}" lang="en" hreflang="en" aria-label="Đọc trang tương ứng bằng tiếng Anh">EN</a>
      <button id="reader-theme" type="button" aria-label="Đổi giao diện sáng hoặc tối">◐</button>
    </nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="Mục lục bản tiếng Việt">
      <div class="sidebar-top"><strong>Bản đọc tiếng Việt</strong><small>Chương 0–14 · ${statusCopy.sidebar}</small></div>
      ${navigation(page.slug)}
      <div class="sidebar-links"><a href="../#roadmap">Bản đồ học tập</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/VIETNAMESE_TRANSLATION_PLAN.md">Kế hoạch dịch</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/vi/glossary.md">Thuật ngữ</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/vi/CONTRIBUTING.md">Đóng góp</a></div>
    </aside>
    <main class="reader-main">
      <article id="article">
        <div class="article-meta"><span>${page.chapter}</span><span>${statusCopy.label} · nguồn khóa tại ${sourceCommit.slice(0, 7)}</span></div>
        <div class="pilot-notice"><strong>${statusCopy.title}</strong><p>${statusCopy.description} Nút EN mở đúng tài liệu nguồn tương ứng.</p></div>
        ${body}
        <footer class="article-attribution">
          <strong>Nguồn và giấy phép</strong>
          <p>Chuyển ngữ, chọn lọc ví dụ và biên tập bổ sung từ <a href="${sourceUrl}" target="_blank" rel="noreferrer">Hello Algo của krahets và cộng đồng đóng góp</a>. Nội dung phái sinh được chia sẻ theo <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.vi" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>; đây là dự án cộng đồng phi thương mại, không ngụ ý được upstream bảo trợ chính thức.</p>
        </footer>
      </article>
      <nav class="page-nav" aria-label="Bài trước và bài sau">
        ${previous ? `<a href="${previous.slug}.html"><span>← Bài trước</span><strong>${previous.title}</strong></a>` : "<i></i>"}
        ${next ? `<a class="next" href="${next.slug}.html"><span>Bài sau →</span><strong>${next.title}</strong></a>` : "<i></i>"}
      </nav>
    </main>
  </div>
</body>
</html>`;
}

export async function buildVietnameseBook({ projectRoot, outputRoot }) {
  const registry = await loadTranslationRegistry(projectRoot);
  const bookOutput = path.join(outputRoot, "vi", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));

  const coverOutput = path.join(bookOutput, "assets", "covers");
  await mkdir(coverOutput, { recursive: true });
  for (const cover of [
    "chapter_preface.jpg",
    "chapter_introduction.jpg",
    "chapter_complexity_analysis.jpg",
    "chapter_data_structure.jpg",
    "chapter_array_and_linkedlist.jpg",
    "chapter_stack_and_queue.jpg",
    "chapter_hashing.jpg",
    "chapter_tree.jpg",
    "chapter_heap.jpg",
    "chapter_graph.jpg",
    "chapter_searching.jpg",
    "chapter_sorting.jpg",
    "chapter_divide_and_conquer.jpg",
    "chapter_backtracking.jpg",
    "chapter_dynamic_programming.jpg"
  ]) {
    await cp(path.join(projectRoot, "en", "docs", "assets", "covers", cover), path.join(coverOutput, cover));
  }

  const assetDirectories = [
    ["chapter_preface", "about_the_book.assets"],
    ["chapter_preface", "suggestions.assets"],
    ["chapter_introduction", "algorithms_are_everywhere.assets"],
    ["chapter_introduction", "what_is_dsa.assets"],
    ["chapter_computational_complexity", "iteration_and_recursion.assets"],
    ["chapter_computational_complexity", "time_complexity.assets"],
    ["chapter_computational_complexity", "space_complexity.assets"],
    ["chapter_data_structure", "classification_of_data_structure.assets"],
    ["chapter_data_structure", "number_encoding.assets"],
    ["chapter_data_structure", "character_encoding.assets"],
    ["chapter_array_and_linkedlist", "array.assets"],
    ["chapter_array_and_linkedlist", "linked_list.assets"],
    ["chapter_array_and_linkedlist", "ram_and_cache.assets"],
    ["chapter_stack_and_queue", "stack.assets"],
    ["chapter_stack_and_queue", "queue.assets"],
    ["chapter_stack_and_queue", "deque.assets"],
    ["chapter_hashing", "hash_map.assets"],
    ["chapter_hashing", "hash_collision.assets"],
    ["chapter_hashing", "hash_algorithm.assets"],
    ["chapter_tree", "binary_tree.assets"],
    ["chapter_tree", "binary_tree_traversal.assets"],
    ["chapter_tree", "array_representation_of_tree.assets"],
    ["chapter_tree", "binary_search_tree.assets"],
    ["chapter_tree", "avl_tree.assets"],
    ["chapter_heap", "heap.assets"],
    ["chapter_heap", "build_heap.assets"],
    ["chapter_heap", "top_k.assets"],
    ["chapter_graph", "graph.assets"],
    ["chapter_graph", "graph_operations.assets"],
    ["chapter_graph", "graph_traversal.assets"],
    ["chapter_searching", "binary_search.assets"],
    ["chapter_searching", "binary_search_insertion.assets"],
    ["chapter_searching", "binary_search_edge.assets"],
    ["chapter_searching", "replace_linear_by_hashing.assets"],
    ["chapter_searching", "searching_algorithm_revisited.assets"],
    ["chapter_sorting", "sorting_algorithm.assets"],
    ["chapter_sorting", "selection_sort.assets"],
    ["chapter_sorting", "bubble_sort.assets"],
    ["chapter_sorting", "insertion_sort.assets"],
    ["chapter_sorting", "quick_sort.assets"],
    ["chapter_sorting", "merge_sort.assets"],
    ["chapter_sorting", "heap_sort.assets"],
    ["chapter_sorting", "bucket_sort.assets"],
    ["chapter_sorting", "counting_sort.assets"],
    ["chapter_sorting", "radix_sort.assets"],
    ["chapter_sorting", "summary.assets"],
    ["chapter_divide_and_conquer", "divide_and_conquer.assets"],
    ["chapter_divide_and_conquer", "binary_search_recur.assets"],
    ["chapter_divide_and_conquer", "build_binary_tree_problem.assets"],
    ["chapter_divide_and_conquer", "hanota_problem.assets"],
    ["chapter_backtracking", "backtracking_algorithm.assets"],
    ["chapter_backtracking", "n_queens_problem.assets"],
    ["chapter_backtracking", "permutations_problem.assets"],
    ["chapter_backtracking", "subset_sum_problem.assets"],
    ["chapter_dynamic_programming", "intro_to_dynamic_programming.assets"],
    ["chapter_dynamic_programming", "dp_problem_features.assets"],
    ["chapter_dynamic_programming", "dp_solution_pipeline.assets"],
    ["chapter_dynamic_programming", "knapsack_problem.assets"],
    ["chapter_dynamic_programming", "unbounded_knapsack_problem.assets"],
    ["chapter_dynamic_programming", "edit_distance_problem.assets"]
  ];
  for (const [chapter, directory] of assetDirectories) {
    const destination = path.join(bookOutput, "assets", chapter, directory);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(projectRoot, "en", "docs", chapter, directory), destination, { recursive: true });
  }

  const sharedAssetOutput = path.join(bookOutput, "assets", "index.assets");
  await mkdir(sharedAssetOutput, { recursive: true });
  for (const asset of ["animation.gif", "running_code.gif", "comment.gif"]) {
    await cp(path.join(projectRoot, "en", "docs", "index.assets", asset), path.join(sharedAssetOutput, asset));
  }

  for (const [pageIndex, page] of pages.entries()) {
    const vietnameseDocument = registry.byLanguage.vi.get(page.source);
    if (!vietnameseDocument) throw new Error(`Vietnamese reader page is missing from the translation registry: ${page.source}`);
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    const expectedRoute = `vi/learn/${outputName === "index.html" ? "" : outputName}`;
    if (vietnameseDocument.target !== page.target || vietnameseDocument.route !== expectedRoute) {
      throw new Error(`Vietnamese registry identity does not match reader page ${page.source}`);
    }
    const markdown = await readFile(path.join(projectRoot, page.target), "utf8");
    const html = pageTemplate(page, renderMarkdown(markdown, page.target), pageIndex, registry.sourceCommit, vietnameseDocument, registry.byLanguage.ko.get(page.source));
    await writeFile(path.join(bookOutput, outputName), html);
  }

  for (const page of pages) {
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    await access(path.join(bookOutput, outputName), constants.R_OK);
  }

  return { pageCount: pages.length, sourceCommit: registry.sourceCommit };
}
