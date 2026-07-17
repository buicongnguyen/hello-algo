const root = document.documentElement;
const themeButton = document.querySelector("#vi-theme-toggle");
const savedTheme = localStorage.getItem("hello-algo-theme");

if (savedTheme) root.dataset.theme = savedTheme;

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("hello-algo-theme", nextTheme);
});

const phases = {
  1: {
    state: "Đang thực hiện",
    title: "Nền tảng song ngữ",
    summary: "Đặt tiếng Việt làm trang mặc định, giữ toàn bộ Atlas tiếng Anh tại đường dẫn riêng và thiết lập một bộ quy tắc xuất bản không làm gián đoạn GitHub Pages.",
    deliverable: "/vi/, /en/, nút đổi ngôn ngữ và tài liệu lộ trình.",
    exit: "Cả hai ngôn ngữ dựng thành công, liên kết qua lại đúng và Pages triển khai ổn định."
  },
  2: {
    state: "Tiếp theo",
    title: "Thuật ngữ và bản dịch thử",
    summary: "Thiết lập từ điển có phiên bản, quy tắc văn phong và một đợt thử đủ nhỏ để sửa quy trình trước khi dịch hàng loạt.",
    deliverable: "Từ điển VI–EN, hướng dẫn văn phong và ba chương nền tảng đã duyệt.",
    exit: "Không còn thuật ngữ quan trọng chưa thống nhất và bản thử vượt qua duyệt kỹ thuật lẫn ngôn ngữ."
  },
  3: {
    state: "Đã lên kế hoạch",
    title: "Các cấu trúc dữ liệu",
    summary: "Dịch từ cấu trúc tuyến tính đến phi tuyến theo thứ tự phụ thuộc để từ vựng về bộ nhớ, nút và phép duyệt được tái sử dụng ổn định.",
    deliverable: "Mảng, danh sách liên kết, ngăn xếp, hàng đợi, bảng băm, cây, đống và đồ thị.",
    exit: "Tất cả hình, bảng thao tác và ví dụ cấu trúc dữ liệu hiển thị đúng trong bản dựng tiếng Việt."
  },
  4: {
    state: "Đã lên kế hoạch",
    title: "Các họ thuật toán",
    summary: "Dịch các chương tìm kiếm, sắp xếp và giải bài toán, tập trung vào điều kiện áp dụng, lập luận đúng và độ phức tạp.",
    deliverable: "Tìm kiếm, sắp xếp, chia để trị, quay lui, quy hoạch động và tham lam.",
    exit: "Giả mã, công thức, bảng độ phức tạp và thuật ngữ thống nhất giữa toàn bộ các chương."
  },
  5: {
    state: "Đã lên kế hoạch",
    title: "Mã nguồn và chú thích",
    summary: "Đồng bộ chú thích trong các ngôn ngữ lập trình được ưu tiên, nhưng không thay đổi hành vi của mã nguồn gốc.",
    deliverable: "Quy tắc chú thích, danh sách ngôn ngữ ưu tiên và các bộ ví dụ đã chạy kiểm thử.",
    exit: "Mã chạy như upstream, chú thích khớp với văn bản và không còn liên kết ví dụ bị hỏng."
  },
  6: {
    state: "Đích phát hành",
    title: "QA, phát hành và bảo trì",
    summary: "Tự động kiểm tra liên kết và bản dựng, ghi phiên bản phát hành, rồi theo dõi thay đổi ở upstream để bản dịch không lỗi thời.",
    deliverable: "Bảng điều khiển tiến độ, checklist phát hành, lịch đồng bộ upstream và ghi chú phiên bản.",
    exit: "Bản tiếng Việt có thể triển khai lặp lại, người đọc báo lỗi dễ dàng và mỗi thay đổi nguồn đều có người phụ trách."
  }
};

const phaseButtons = [...document.querySelectorAll(".phase-card")];
const phaseNumber = document.querySelector("#phase-number");
const phaseState = document.querySelector("#phase-state");
const phaseTitle = document.querySelector("#phase-title");
const phaseSummary = document.querySelector("#phase-summary");
const phaseDeliverable = document.querySelector("#phase-deliverable");
const phaseExit = document.querySelector("#phase-exit");

phaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.phase;
    const phase = phases[key];
    phaseButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    phaseNumber.textContent = `Giai đoạn ${String(key).padStart(2, "0")}`;
    phaseState.textContent = phase.state;
    phaseTitle.textContent = phase.title;
    phaseSummary.textContent = phase.summary;
    phaseDeliverable.textContent = phase.deliverable;
    phaseExit.textContent = phase.exit;
  });
});

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) document.querySelector(".vi-motion-media video")?.pause();
