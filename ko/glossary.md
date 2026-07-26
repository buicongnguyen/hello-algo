# Hello Algo 한국어 용어집

버전: `v0.2-draft`

기준 원문: upstream 커밋 `a3166c201853739213d5a3a31b1e4a237aaf1076`의 영어판

이 용어집은 한국어 번역에서 우선하여 사용할 표현을 정합니다. 한 장에서 용어가 처음 나올 때 검색에 도움이 된다면 영어를 괄호 안에 병기하고, 이후에는 합의한 한국어 표현을 사용합니다.

## 핵심 개념

| English | 한국어 우선 표현 | 참고 |
| --- | --- | --- |
| algorithm | 알고리즘 | 문서 안에서 “알고리듬”과 혼용하지 않음 |
| data structure | 자료구조 | DSA → 자료구조와 알고리즘 |
| input / output | 입력 / 출력 | 코드의 변수명은 유지 |
| correctness | 정확성 | efficiency와 구분 |
| efficiency | 효율성 | 시간과 공간을 구체적으로 밝힘 |
| trade-off | 절충 관계 | 얻는 점과 잃는 점을 함께 설명 |

## 자료구조

| English | 한국어 우선 표현 | 참고 |
| --- | --- | --- |
| array / index | 배열 / 인덱스 | offset → 오프셋 |
| linked list / node | 연결 리스트 / 노드 | head / tail → 머리 / 꼬리 노드 |
| stack / queue | 스택 / 큐 | LIFO / FIFO는 처음에 풀어 설명 |
| deque | 덱 | 양방향 큐를 처음에 병기 가능 |
| hash table | 해시 테이블 | hash function → 해시 함수 |
| collision | 해시 충돌 | 충돌 해결 방식과 구분 |
| tree / graph | 트리 / 그래프 | vertex / edge → 정점 / 간선 |
| binary tree | 이진 트리 | root / leaf → 루트 / 리프 노드 |
| binary search tree | 이진 탐색 트리 | BST는 처음에 병기 |
| heap | 힙 | 힙 메모리와 문맥상 구분 |
| adjacency list | 인접 리스트 | adjacency matrix → 인접 행렬 |
| traversal | 순회 | visit → 방문 |
| dynamic array | 동적 배열 | size / capacity → 크기 / 용량 |
| contiguous storage | 연속 저장 | dispersed storage → 분산 저장 |

## 데이터 표현과 메모리

| English | 한국어 우선 표현 | 참고 |
| --- | --- | --- |
| sign-magnitude | 부호-크기 표현 | sign bit → 부호 비트 |
| one's / two's complement | 1의 보수 / 2의 보수 | 표기를 일관되게 유지 |
| floating-point number | 부동소수점 수 | exponent / fraction → 지수 / 가수 |
| character set | 문자 집합 | code point → 코드 포인트 |
| character encoding | 문자 인코딩 | UTF 이름은 원문 유지 |
| surrogate pair | 서로게이트 쌍 | UTF-16 설명에서 사용 |
| random-access memory | 임의 접근 메모리 | 처음 설명 뒤 RAM 사용 가능 |
| cache | 캐시 | cache line → 캐시 라인 |
| cache hit / miss | 캐시 적중 / 실패 | hit rate → 적중률 |
| spatial / temporal locality | 공간 / 시간 지역성 | locality의 종류를 생략하지 않음 |
| memory fragmentation | 메모리 단편화 | 빈 공간과 구분 |

## 알고리즘 기법

| English | 한국어 우선 표현 | 참고 |
| --- | --- | --- |
| iteration / recursion | 반복 / 재귀 | base case → 기저 조건 |
| call stack | 호출 스택 | stack frame → 스택 프레임 |
| tail recursion | 꼬리 재귀 | 자동 최적화를 단정하지 않음 |
| binary search | 이진 탐색 | search space → 탐색 범위 |
| insertion sort | 삽입 정렬 | 정렬된 구간을 명시 |
| divide and conquer | 분할 정복 | 표기를 통일 |
| backtracking / pruning | 백트래킹 / 가지치기 | 상태 복원을 함께 설명 |
| dynamic programming | 동적 계획법 | 처음 설명 뒤 DP 사용 가능 |
| greedy algorithm | 그리디 알고리즘 | local optimum → 지역 최적해 |
| sorting stability | 정렬 안정성 | stable sort → 안정 정렬 |

## 복잡도 분석

| English | 한국어 우선 표현 | 참고 |
| --- | --- | --- |
| complexity analysis | 복잡도 분석 | asymptotic → 점근적 |
| time / space complexity | 시간 / 공간 복잡도 | 실제 실행 시간과 구분 |
| input size | 입력 크기 | 데이터 규모도 문맥상 가능 |
| growth trend | 증가 추세 | 특정 실행 시간으로 바꾸지 않음 |
| asymptotic upper bound | 점근적 상한 | Big-O notation → 빅오 표기법 |
| constant / logarithmic | 상수 / 로그 | 복잡도 차수를 뒤에 붙임 |
| linear / quadratic | 선형 / 이차 | $O(n)$ / $O(n^2)$ 유지 |
| exponential / factorial | 지수 / 팩토리얼 | 입력 증가의 영향을 설명 |
| best / worst case | 최선 / 최악의 경우 | 조건을 생략하지 않음 |
| average case | 평균적인 경우 | 확률적 기댓값과 자동으로 동일시하지 않음 |

## 변경 규칙

1. 용어를 바꾸는 풀 리퀘스트에는 이유, 예문, 영향 범위를 적습니다.
2. 승인된 변경은 관련된 모든 번역 문서에 일관되게 반영합니다.
3. API, 키워드, 식별자, 클래스명, 함수명은 번역하지 않습니다.
4. 합의되지 않은 표현은 여러 변형으로 배포하지 말고 검토 질문으로 남깁니다.
