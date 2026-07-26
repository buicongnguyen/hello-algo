# Cài đặt môi trường lập trình

## Cài đặt IDE

Chúng tôi khuyên dùng VS Code mã nguồn mở và gọn nhẹ làm môi trường phát triển tích hợp (IDE) trên máy cá nhân. Hãy truy cập [trang chính thức của VS Code](https://code.visualstudio.com/), rồi tải và cài đặt phiên bản phù hợp với hệ điều hành của bạn.

![Tải VS Code từ trang chính thức](installation.assets/vscode_installation.png)

VS Code có hệ sinh thái tiện ích mở rộng mạnh mẽ, hỗ trợ chạy và gỡ lỗi hầu hết các ngôn ngữ lập trình. Chẳng hạn, sau khi cài tiện ích “Python Extension Pack”, bạn có thể gỡ lỗi mã Python. Các bước cài đặt được minh họa trong hình sau.

![Cài tiện ích mở rộng cho VS Code](installation.assets/vscode_extension_installation.png)

## Cài đặt môi trường ngôn ngữ

### Môi trường Python

1. Tải và cài [Miniconda3](https://docs.conda.io/en/latest/miniconda.html) đi kèm Python 3.10 trở lên.
2. Tìm `python` trong kho tiện ích của VS Code và cài Python Extension Pack.
3. (Không bắt buộc) Nhập `pip install black` trên dòng lệnh để cài trình định dạng mã.

### Môi trường C/C++

1. Trên Windows, bạn cần cài [MinGW](https://sourceforge.net/projects/mingw-w64/files/) ([hướng dẫn cấu hình](https://blog.csdn.net/qq_33698226/article/details/129031241)); macOS đã tích hợp sẵn Clang nên không cần cài thêm.
2. Tìm `c++` trong kho tiện ích của VS Code và cài C/C++ Extension Pack.
3. (Không bắt buộc) Mở trang Settings, tìm tùy chọn định dạng mã `Clang_format_fallback Style`, rồi đặt thành `{ BasedOnStyle: Microsoft, BreakBeforeBraces: Attach }`.

### Môi trường Java

1. Tải và cài [OpenJDK](https://jdk.java.net/18/) phiên bản 10 trở lên.
2. Tìm `java` trong kho tiện ích của VS Code và cài Extension Pack for Java.

### Môi trường C#

1. Tải và cài [.NET 8.0](https://dotnet.microsoft.com/en-us/download).
2. Tìm `C# Dev Kit` trong kho tiện ích của VS Code và cài C# Dev Kit ([hướng dẫn cấu hình](https://code.visualstudio.com/docs/csharp/get-started)).
3. Bạn cũng có thể dùng Visual Studio ([hướng dẫn cài đặt](https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio?view=vs-2022)).

### Môi trường Go

1. Tải và cài [Go](https://go.dev/dl/).
2. Tìm `go` trong kho tiện ích của VS Code và cài Go.
3. Nhấn `Ctrl + Shift + P` để mở bảng lệnh, nhập `go`, chọn `Go: Install/Update Tools`, đánh dấu tất cả tùy chọn rồi cài đặt.

### Môi trường Swift

1. Tải và cài [Swift](https://www.swift.org/download/).
2. Tìm `swift` trong kho tiện ích của VS Code và cài [Swift for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=sswg.swift-lang).

### Môi trường JavaScript

1. Tải và cài [Node.js](https://nodejs.org/en/).
2. (Không bắt buộc) Tìm `Prettier` trong kho tiện ích của VS Code và cài trình định dạng mã.

### Môi trường TypeScript

1. Thực hiện các bước cài đặt giống môi trường JavaScript.
2. Cài [TypeScript Execute (tsx)](https://github.com/privatenumber/tsx?tab=readme-ov-file#global-installation).
3. Tìm `typescript` trong kho tiện ích của VS Code và cài [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors).

### Môi trường Dart

1. Tải và cài [Dart](https://dart.dev/get-dart).
2. Tìm `dart` trong kho tiện ích của VS Code và cài [Dart](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code).

### Môi trường Rust

1. Tải và cài [Rust](https://www.rust-lang.org/tools/install).
2. Tìm `rust` trong kho tiện ích của VS Code và cài [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
