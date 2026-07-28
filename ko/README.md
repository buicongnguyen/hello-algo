# Hello Algo 한국어판

자료구조와 알고리즘을 그림, 수식, 대화형 실습, 바로 실행할 수 있는 다중 언어 코드로 배우는 커뮤니티 번역판입니다. 이 작업은 [krahets와 기여자들이 만든 Hello Algo](https://github.com/krahets/hello-algo)를 기반으로 하며, 현재 독립적인 기술·한국어 검토를 기다리는 **비공식 초안**입니다.

- [한국어 Atlas](https://buicongnguyen.github.io/hello-algo/ko/) — 학습 순서, 자료구조 선택, BFS/DFS, 복잡도, 이진 탐색, 정렬, 문제 해결 패턴을 대화형으로 살펴봅니다.
- [한국어 전체 읽기](https://buicongnguyen.github.io/hello-algo/ko/learn/) — 책의 119/119개 문서를 장별로 읽습니다.
- [영어 Atlas](https://buicongnguyen.github.io/hello-algo/en/) · [영어 전체 읽기](https://buicongnguyen.github.io/hello-algo/en/learn/) — 번역과 원문을 나란히 확인합니다.
- [베트남어 Atlas](https://buicongnguyen.github.io/hello-algo/vi/) · [베트남어 전체 읽기](https://buicongnguyen.github.io/hello-algo/vi/learn/) — 같은 구조의 다른 번역판을 엽니다.
- [모던 C++20 한국어 가이드](https://buicongnguyen.github.io/Modern_c_20/ko/) — 예제를 현대 C++로 더 깊이 학습합니다.

## 이 한국어판에서 제공하는 것

한국어 읽기에는 책 홈, *시작하기 전에*, 서문, 0–16장, 모든 연습문제, 부록과 참고문헌까지 공식 영어 목차에 대응하는 119/119개 문서 경로가 있습니다. 각 페이지에서 다음 기능을 사용할 수 있습니다.

- 현재 글에 정확히 대응하는 한국어·베트남어·영어 페이지 이동
- 제목과 절 검색, 글 안의 목차, 제목 고정 링크
- 원문의 그림, 표, 수식, 안내 상자와 시각화
- Python, Java, C++, C, C#, JavaScript, Go, Swift, Rust, Ruby, Kotlin, TypeScript, Dart 코드 탭
- 데스크톱과 모바일에서 읽을 수 있는 반응형 레이아웃

한국어 Atlas도 영어·베트남어 Atlas와 동일한 12개 화면 섹션과 대화형 실습을 제공합니다. Atlas에서 개념과 연결 관계를 먼저 익힌 뒤, 전체 읽기에서 자세한 설명과 코드를 확인하는 순서가 좋습니다.

## 번역 상태와 품질 기준

영어 원문은 upstream commit `a3166c201853739213d5a3a31b1e4a237aaf1076`에 고정되어 있습니다. 현재 모든 문서는 `draft` 상태입니다. 문서 경로와 구조가 모두 갖춰졌다는 사실이 번역 검토가 끝났다는 뜻은 아닙니다.

- [번역 현황](translation-status.json) — 119개 문서의 원문, 번역 파일, 공개 경로와 검토 상태
- [전체 번역 계획](../KOREAN_TRANSLATION_PLAN.md) — 범위, 릴리스 단계, 품질 기준과 upstream 동기화 정책
- 빌드에서 생성되는 `translation-parity.json` — 제목, 그림, 표, 수식, 코드 그룹과 본문 분량의 구조적 대응 보고서

문서는 구조 검사를 통과하고 기술·한국어 자체 검토를 마쳐야 `pilot`이 됩니다. 독립적인 기술 검토와 한국어 문장 검토까지 끝나야 `published`로 표시합니다. 오류나 어색한 표현을 발견하면 [fork의 Issues](https://github.com/buicongnguyen/hello-algo/issues)에 알려 주세요.

## 참여 방법

번역, 기술 검토, 한국어 문장 다듬기, 링크·그림·코드 오류 보고를 환영합니다.

1. [기여 안내](CONTRIBUTING.md)를 읽습니다.
2. [용어집](glossary.md)에서 핵심 용어를 확인합니다.
3. [문체 지침](style-guide.md)에 맞춰 자연스럽고 일관된 한국어를 사용합니다.
4. 변경 후 `npm run check`와 `npm run build`를 실행합니다.
5. 작은 범위의 Pull Request를 만들고 원문 위치와 검토한 항목을 설명합니다.

## 라이선스와 출처

Hello Algo 원본은 [krahets와 오픈 소스 기여 공동체](https://github.com/krahets/hello-algo)가 개발했습니다. 이 저장소의 번역·편집 콘텐츠는 [CC BY-NC-SA 4.0](../LICENSE)에 따라 공유되는 파생 작업입니다. 비영리 커뮤니티 프로젝트이며 원본 프로젝트의 공식 번역이나 후원을 의미하지 않습니다.
