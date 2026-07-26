# 프로그래밍 환경 설치

## IDE 설치

로컬 통합 개발 환경(IDE)으로는 오픈 소스이면서 가벼운 VS Code를 권장합니다. [VS Code 공식 웹사이트](https://code.visualstudio.com/)를 방문해 사용 중인 운영 체제에 맞는 버전을 내려받고 설치하세요.

![공식 웹사이트에서 VS Code 내려받기](installation.assets/vscode_installation.png)

VS Code는 대부분의 프로그래밍 언어를 실행하고 디버깅할 수 있게 해 주는 강력한 확장 기능 생태계를 갖추고 있습니다. 예를 들어 “Python Extension Pack” 확장 기능을 설치하면 Python 코드를 디버깅할 수 있습니다. 설치 과정은 다음 그림과 같습니다.

![VS Code 확장 기능 설치](installation.assets/vscode_extension_installation.png)

## 언어 환경 설치

### Python 환경

1. Python 3.10 이상이 포함된 [Miniconda3](https://docs.conda.io/en/latest/miniconda.html)를 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `python`을 검색하고 Python Extension Pack을 설치합니다.
3. (선택 사항) 명령줄에서 `pip install black`을 입력해 코드 포매터를 설치합니다.

### C/C++ 환경

1. Windows에서는 [MinGW](https://sourceforge.net/projects/mingw-w64/files/)를 설치해야 합니다([설정 안내](https://blog.csdn.net/qq_33698226/article/details/129031241)). macOS에는 Clang이 기본으로 포함되어 있어 별도로 설치할 필요가 없습니다.
2. VS Code 확장 기능 마켓플레이스에서 `c++`를 검색하고 C/C++ Extension Pack을 설치합니다.
3. (선택 사항) Settings 페이지를 열고 코드 서식 옵션 `Clang_format_fallback Style`을 검색한 뒤 `{ BasedOnStyle: Microsoft, BreakBeforeBraces: Attach }`로 설정합니다.

### Java 환경

1. [OpenJDK](https://jdk.java.net/18/) 10 이상 버전을 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `java`를 검색하고 Extension Pack for Java를 설치합니다.

### C# 환경

1. [.NET 8.0](https://dotnet.microsoft.com/en-us/download)을 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `C# Dev Kit`을 검색하고 C# Dev Kit을 설치합니다([설정 안내](https://code.visualstudio.com/docs/csharp/get-started)).
3. Visual Studio를 사용해도 됩니다([설치 안내](https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio?view=vs-2022)).

### Go 환경

1. [Go](https://go.dev/dl/)를 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `go`를 검색하고 Go를 설치합니다.
3. `Ctrl + Shift + P`를 눌러 명령 팔레트를 열고 `go`를 입력합니다. `Go: Install/Update Tools`를 선택한 뒤 모든 항목을 표시하고 설치합니다.

### Swift 환경

1. [Swift](https://www.swift.org/download/)를 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `swift`를 검색하고 [Swift for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=sswg.swift-lang)를 설치합니다.

### JavaScript 환경

1. [Node.js](https://nodejs.org/en/)를 내려받아 설치합니다.
2. (선택 사항) VS Code 확장 기능 마켓플레이스에서 `Prettier`를 검색하고 코드 포매터를 설치합니다.

### TypeScript 환경

1. JavaScript 환경과 같은 설치 단계를 수행합니다.
2. [TypeScript Execute (tsx)](https://github.com/privatenumber/tsx?tab=readme-ov-file#global-installation)를 설치합니다.
3. VS Code 확장 기능 마켓플레이스에서 `typescript`를 검색하고 [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)를 설치합니다.

### Dart 환경

1. [Dart](https://dart.dev/get-dart)를 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `dart`를 검색하고 [Dart](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code)를 설치합니다.

### Rust 환경

1. [Rust](https://www.rust-lang.org/tools/install)를 내려받아 설치합니다.
2. VS Code 확장 기능 마켓플레이스에서 `rust`를 검색하고 [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)를 설치합니다.
