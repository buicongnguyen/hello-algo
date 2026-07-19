import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { renderMarkdown } from "./build-vi-book.mjs";
import { englishReaderHref, loadTranslationRegistry, readerHref } from "./translation-registry.mjs";

const pages = [
  ["preface", "머리말", "머리말", "0장", "en/docs/chapter_preface/index.md", "ko/docs/chapter_preface/index.md", "자료구조와 알고리즘 학습 여정을 여는 머리말입니다."],
  ["about-the-book", "이 책에 관하여", "0.1 · 이 책에 관하여", "0장", "en/docs/chapter_preface/about_the_book.md", "ko/docs/chapter_preface/about_the_book.md", "Hello Algo의 독자, 구성, 오픈 소스 공동체를 소개합니다."],
  ["how-to-use-the-book", "이 책을 활용하는 방법", "0.2 · 활용 방법", "0장", "en/docs/chapter_preface/suggestions.md", "ko/docs/chapter_preface/suggestions.md", "애니메이션, 코드 실행, 복습을 활용한 학습 방법입니다."],
  ["chapter-0-summary", "0장 요약", "0.3 · 요약", "0장", "en/docs/chapter_preface/summary.md", "ko/docs/chapter_preface/summary.md", "책의 목적과 효과적인 학습 방법을 복습합니다."],
  ["index", "알고리즘과의 만남", "시작", "1장", "en/docs/chapter_introduction/index.md", "ko/docs/chapter_introduction/index.md", "자료구조와 알고리즘의 세계를 한국어로 시작합니다."],
  ["algorithms-are-everywhere", "알고리즘은 어디에나 있습니다", "1.1 · 어디에나 있는 알고리즘", "1장", "en/docs/chapter_introduction/algorithms_are_everywhere.md", "ko/docs/chapter_introduction/algorithms_are_everywhere.md", "일상에서 이진 탐색, 삽입 정렬, 그리디 사고를 발견합니다."],
  ["what-is-dsa", "자료구조와 알고리즘이란?", "1.2 · DSA란?", "1장", "en/docs/chapter_introduction/what_is_dsa.md", "ko/docs/chapter_introduction/what_is_dsa.md", "자료구조와 알고리즘의 정의와 관계를 설명합니다."],
  ["chapter-1-summary", "1장 요약", "1.3 · 요약", "1장", "en/docs/chapter_introduction/summary.md", "ko/docs/chapter_introduction/summary.md", "자료구조와 알고리즘의 핵심 개념을 복습합니다."],
  ["complexity-analysis", "복잡도 분석", "복잡도 분석 시작", "2장", "en/docs/chapter_computational_complexity/index.md", "ko/docs/chapter_computational_complexity/index.md", "입력이 커질 때 필요한 시간과 공간의 증가율을 배웁니다."],
  ["performance-evaluation", "알고리즘 효율성 평가", "2.1 · 효율성 평가", "2장", "en/docs/chapter_computational_complexity/performance_evaluation.md", "ko/docs/chapter_computational_complexity/performance_evaluation.md", "실행 측정의 한계와 복잡도 분석의 목적을 설명합니다."],
  ["iteration-and-recursion", "반복과 재귀", "2.2 · 반복과 재귀", "2장", "en/docs/chapter_computational_complexity/iteration_and_recursion.md", "ko/docs/chapter_computational_complexity/iteration_and_recursion.md", "반복문, 호출 스택, 재귀 트리와 중복 계산을 비교합니다."],
  ["time-complexity", "시간 복잡도", "2.3 · 시간 복잡도", "2장", "en/docs/chapter_computational_complexity/time_complexity.md", "ko/docs/chapter_computational_complexity/time_complexity.md", "빅오 표기법과 대표적인 시간 증가율을 학습합니다."],
  ["space-complexity", "공간 복잡도", "2.4 · 공간 복잡도", "2장", "en/docs/chapter_computational_complexity/space_complexity.md", "ko/docs/chapter_computational_complexity/space_complexity.md", "보조 공간, 호출 스택, 시간–공간 트레이드오프를 분석합니다."],
  ["chapter-2-summary", "2장 요약", "2.5 · 요약", "2장", "en/docs/chapter_computational_complexity/summary.md", "ko/docs/chapter_computational_complexity/summary.md", "시간·공간 복잡도 분석의 핵심을 복습합니다."],
  ["data-structures", "자료구조", "자료구조 시작", "3장", "en/docs/chapter_data_structure/index.md", "ko/docs/chapter_data_structure/index.md", "자료구조의 논리적 관계와 메모리 배치를 소개합니다."],
  ["data-structure-classification", "자료구조의 분류", "3.1 · 자료구조 분류", "3장", "en/docs/chapter_data_structure/classification_of_data_structure.md", "ko/docs/chapter_data_structure/classification_of_data_structure.md", "선형·비선형 구조와 연속·분산 저장을 비교합니다."],
  ["basic-data-types", "기본 데이터형", "3.2 · 기본 데이터형", "3장", "en/docs/chapter_data_structure/basic_data_types.md", "ko/docs/chapter_data_structure/basic_data_types.md", "정수, 실수, 문자, 불리언과 자료구조의 관계를 설명합니다."],
  ["number-encoding", "숫자 인코딩", "3.3 · 숫자 인코딩", "3장", "en/docs/chapter_data_structure/number_encoding.md", "ko/docs/chapter_data_structure/number_encoding.md", "2의 보수와 IEEE 754 부동소수점 표현을 배웁니다."],
  ["character-encoding", "문자 인코딩", "3.4 · 문자 인코딩", "3장", "en/docs/chapter_data_structure/character_encoding.md", "ko/docs/chapter_data_structure/character_encoding.md", "ASCII, Unicode, UTF-8과 문자열 저장 방식을 살펴봅니다."],
  ["chapter-3-summary", "3장 요약", "3.5 · 요약", "3장", "en/docs/chapter_data_structure/summary.md", "ko/docs/chapter_data_structure/summary.md", "자료구조 분류와 데이터 인코딩의 핵심을 복습합니다."],
  ["arrays-and-linked-lists", "배열과 연결 리스트", "배열과 연결 리스트 시작", "4장", "en/docs/chapter_array_and_linkedlist/index.md", "ko/docs/chapter_array_and_linkedlist/index.md", "연속 저장과 분산 저장의 대표 구조를 소개합니다."],
  ["arrays", "배열", "4.1 · 배열", "4장", "en/docs/chapter_array_and_linkedlist/array.md", "ko/docs/chapter_array_and_linkedlist/array.md", "배열의 접근, 삽입, 삭제, 탐색과 확장을 배웁니다."],
  ["linked-lists", "연결 리스트", "4.2 · 연결 리스트", "4장", "en/docs/chapter_array_and_linkedlist/linked_list.md", "ko/docs/chapter_array_and_linkedlist/linked_list.md", "노드 연결, 기본 연산, 종류와 대표 활용을 설명합니다."],
  ["dynamic-lists", "동적 리스트", "4.3 · 동적 리스트", "4장", "en/docs/chapter_array_and_linkedlist/list.md", "ko/docs/chapter_array_and_linkedlist/list.md", "동적 배열의 확장과 분할 상환 비용을 구현으로 이해합니다."],
  ["ram-and-cache", "RAM과 캐시", "4.4 · RAM과 캐시", "4장", "en/docs/chapter_array_and_linkedlist/ram_and_cache.md", "ko/docs/chapter_array_and_linkedlist/ram_and_cache.md", "저장 계층과 자료구조의 캐시 효율을 비교합니다."],
  ["chapter-4-summary", "4장 요약", "4.5 · 요약", "4장", "en/docs/chapter_array_and_linkedlist/summary.md", "ko/docs/chapter_array_and_linkedlist/summary.md", "배열, 연결 리스트, 동적 리스트와 캐시의 핵심을 복습합니다."],
  ["stacks-and-queues", "스택과 큐", "스택과 큐 시작", "5장", "en/docs/chapter_stack_and_queue/index.md", "ko/docs/chapter_stack_and_queue/index.md", "LIFO, FIFO, 양끝 연산을 소개합니다."],
  ["stack", "스택", "5.1 · 스택", "5장", "en/docs/chapter_stack_and_queue/stack.md", "ko/docs/chapter_stack_and_queue/stack.md", "스택의 연산, 구현, 활용을 설명합니다."],
  ["queue", "큐", "5.2 · 큐", "5장", "en/docs/chapter_stack_and_queue/queue.md", "ko/docs/chapter_stack_and_queue/queue.md", "FIFO, 원형 배열, 대기열 활용을 배웁니다."],
  ["deque", "덱", "5.3 · 덱", "5장", "en/docs/chapter_stack_and_queue/deque.md", "ko/docs/chapter_stack_and_queue/deque.md", "배열과 연결 리스트 기반 양끝 연산을 설명합니다."],
  ["chapter-5-summary", "5장 요약", "5.4 · 요약", "5장", "en/docs/chapter_stack_and_queue/summary.md", "ko/docs/chapter_stack_and_queue/summary.md", "스택, 큐, 덱의 핵심을 복습합니다."],
  ["hashing", "해싱", "해싱 시작", "6장", "en/docs/chapter_hashing/index.md", "ko/docs/chapter_hashing/index.md", "키, 버킷, 충돌의 관계를 소개합니다."],
  ["hash-table", "해시 테이블", "6.1 · 해시 테이블", "6장", "en/docs/chapter_hashing/hash_map.md", "ko/docs/chapter_hashing/hash_map.md", "해시 테이블 구현, 적재율, 확장을 배웁니다."],
  ["hash-collision", "해시 충돌", "6.2 · 해시 충돌", "6장", "en/docs/chapter_hashing/hash_collision.md", "ko/docs/chapter_hashing/hash_collision.md", "분리 연결법과 여러 개방 주소법을 비교합니다."],
  ["hash-algorithm", "해시 알고리즘", "6.3 · 해시 알고리즘", "6장", "en/docs/chapter_hashing/hash_algorithm.md", "ko/docs/chapter_hashing/hash_algorithm.md", "해시 함수의 설계, 성질, 선택을 설명합니다."],
  ["chapter-6-summary", "6장 요약", "6.4 · 요약", "6장", "en/docs/chapter_hashing/summary.md", "ko/docs/chapter_hashing/summary.md", "해시 테이블, 충돌, 해시 함수의 핵심을 복습합니다."],
  ["trees", "트리", "트리 시작", "7장", "en/docs/chapter_tree/index.md", "ko/docs/chapter_tree/index.md", "계층 관계를 표현하는 트리 자료구조를 소개합니다."],
  ["binary-tree", "이진 트리", "7.1 · 이진 트리", "7장", "en/docs/chapter_tree/binary_tree.md", "ko/docs/chapter_tree/binary_tree.md", "이진 트리의 노드, 용어, 종류와 연산을 설명합니다."],
  ["binary-tree-traversal", "이진 트리 순회", "7.2 · 트리 순회", "7장", "en/docs/chapter_tree/binary_tree_traversal.md", "ko/docs/chapter_tree/binary_tree_traversal.md", "레벨 순회와 깊이 우선 순회를 비교합니다."],
  ["array-representation-of-binary-trees", "이진 트리의 배열 표현", "7.3 · 배열 표현", "7장", "en/docs/chapter_tree/array_representation_of_tree.md", "ko/docs/chapter_tree/array_representation_of_tree.md", "완전 이진 트리의 부모와 자식 관계를 배열 인덱스로 표현합니다."],
  ["binary-search-tree", "이진 탐색 트리", "7.4 · 이진 탐색 트리", "7장", "en/docs/chapter_tree/binary_search_tree.md", "ko/docs/chapter_tree/binary_search_tree.md", "BST의 탐색, 삽입, 삭제와 성능을 설명합니다."],
  ["avl-tree", "AVL 트리", "7.5 · AVL 트리 *", "7장", "en/docs/chapter_tree/avl_tree.md", "ko/docs/chapter_tree/avl_tree.md", "네 가지 회전으로 BST의 균형을 유지합니다."],
  ["chapter-7-summary", "7장 요약", "7.6 · 요약", "7장", "en/docs/chapter_tree/summary.md", "ko/docs/chapter_tree/summary.md", "이진 트리, BST, AVL의 핵심을 복습합니다."],
  ["heaps", "힙", "힙 시작", "8장", "en/docs/chapter_heap/index.md", "ko/docs/chapter_heap/index.md", "완전 이진 트리 기반 우선순위 구조를 소개합니다."],
  ["heap", "힙", "8.1 · 힙", "8장", "en/docs/chapter_heap/heap.md", "ko/docs/chapter_heap/heap.md", "힙의 배열 표현과 상향·하향 이동을 설명합니다."],
  ["build-heap", "힙 구성", "8.2 · 힙 구성", "8장", "en/docs/chapter_heap/build_heap.md", "ko/docs/chapter_heap/build_heap.md", "아래에서 위로 선형 시간에 힙을 구성합니다."],
  ["top-k", "Top-k 문제", "8.3 · Top-k", "8장", "en/docs/chapter_heap/top_k.md", "ko/docs/chapter_heap/top_k.md", "크기 k인 힙으로 대규모 또는 스트리밍 데이터를 처리합니다."],
  ["chapter-8-summary", "8장 요약", "8.4 · 요약", "8장", "en/docs/chapter_heap/summary.md", "ko/docs/chapter_heap/summary.md", "힙, 힙 구성, top-k의 핵심을 복습합니다."],
  ["graphs", "그래프", "그래프 시작", "9장", "en/docs/chapter_graph/index.md", "ko/docs/chapter_graph/index.md", "정점과 간선으로 네트워크 관계를 표현합니다."],
  ["graph", "그래프", "9.1 · 그래프", "9장", "en/docs/chapter_graph/graph.md", "ko/docs/chapter_graph/graph.md", "그래프 종류, 용어, 인접 행렬과 인접 리스트를 설명합니다."],
  ["graph-operations", "그래프의 기본 연산", "9.2 · 그래프 연산", "9장", "en/docs/chapter_graph/graph_operations.md", "ko/docs/chapter_graph/graph_operations.md", "두 표현에서 정점과 간선을 추가하고 삭제합니다."],
  ["graph-traversal", "그래프 순회", "9.3 · 그래프 순회", "9장", "en/docs/chapter_graph/graph_traversal.md", "ko/docs/chapter_graph/graph_traversal.md", "BFS와 DFS로 그래프를 순회합니다."],
  ["chapter-9-summary", "9장 요약", "9.4 · 요약", "9장", "en/docs/chapter_graph/summary.md", "ko/docs/chapter_graph/summary.md", "그래프 표현, 연산, 순회의 핵심을 복습합니다."],
  ["searching", "탐색", "탐색 시작", "10장", "en/docs/chapter_searching/index.md", "ko/docs/chapter_searching/index.md", "탐색 문제와 대표 전략을 소개합니다."],
  ["binary-search", "이진 탐색", "10.1 · 이진 탐색", "10장", "en/docs/chapter_searching/binary_search.md", "ko/docs/chapter_searching/binary_search.md", "비교할 때마다 탐색 범위를 절반으로 줄입니다."],
  ["binary-search-insertion", "이진 탐색 삽입 위치", "10.2 · 삽입 위치", "10장", "en/docs/chapter_searching/binary_search_insertion.md", "ko/docs/chapter_searching/binary_search_insertion.md", "중복 값의 앞이나 뒤에 삽입할 위치를 찾습니다."],
  ["binary-search-edge", "이진 탐색 경계", "10.3 · 탐색 경계", "10장", "en/docs/chapter_searching/binary_search_edge.md", "ko/docs/chapter_searching/binary_search_edge.md", "중복 목표의 왼쪽과 오른쪽 경계를 찾습니다."],
  ["replace-linear-by-hashing", "해싱으로 선형 탐색 최적화", "10.4 · 해시 최적화", "10장", "en/docs/chapter_searching/replace_linear_by_hashing.md", "ko/docs/chapter_searching/replace_linear_by_hashing.md", "해시 테이블로 공간과 탐색 시간을 교환합니다."],
  ["searching-algorithms-revisited", "탐색 알고리즘 다시 보기", "10.5 · 탐색 선택", "10장", "en/docs/chapter_searching/searching_algorithm_revisited.md", "ko/docs/chapter_searching/searching_algorithm_revisited.md", "선형, 이진, 해시, 트리 탐색을 비교합니다."],
  ["chapter-10-summary", "10장 요약", "10.6 · 요약", "10장", "en/docs/chapter_searching/summary.md", "ko/docs/chapter_searching/summary.md", "이진 탐색, 경계, 탐색 전략을 복습합니다."],
  ["sorting", "정렬", "정렬 시작", "11장", "en/docs/chapter_sorting/index.md", "ko/docs/chapter_sorting/index.md", "정렬 문제와 알고리즘 계열을 소개합니다."],
  ["sorting-algorithm", "정렬 알고리즘", "11.1 · 정렬 알고리즘", "11장", "en/docs/chapter_sorting/sorting_algorithm.md", "ko/docs/chapter_sorting/sorting_algorithm.md", "복잡도, 안정성, 제자리 수행, 적응성을 평가합니다."],
  ["selection-sort", "선택 정렬", "11.2 · 선택 정렬", "11장", "en/docs/chapter_sorting/selection_sort.md", "ko/docs/chapter_sorting/selection_sort.md", "각 라운드에서 최솟값을 선택합니다."],
  ["bubble-sort", "버블 정렬", "11.3 · 버블 정렬", "11장", "en/docs/chapter_sorting/bubble_sort.md", "ko/docs/chapter_sorting/bubble_sort.md", "인접 원소를 교환해 정렬합니다."],
  ["insertion-sort", "삽입 정렬", "11.4 · 삽입 정렬", "11장", "en/docs/chapter_sorting/insertion_sort.md", "ko/docs/chapter_sorting/insertion_sort.md", "새 원소를 정렬된 앞 구간에 삽입합니다."],
  ["quick-sort", "퀵 정렬", "11.5 · 퀵 정렬", "11장", "en/docs/chapter_sorting/quick_sort.md", "ko/docs/chapter_sorting/quick_sort.md", "피벗으로 분할하고 두 부분을 재귀 정렬합니다."],
  ["merge-sort", "병합 정렬", "11.6 · 병합 정렬", "11장", "en/docs/chapter_sorting/merge_sort.md", "ko/docs/chapter_sorting/merge_sort.md", "두 절반을 정렬한 뒤 병합합니다."],
  ["heap-sort", "힙 정렬", "11.7 · 힙 정렬", "11장", "en/docs/chapter_sorting/heap_sort.md", "ko/docs/chapter_sorting/heap_sort.md", "최대 힙에서 원소를 반복 추출합니다."],
  ["bucket-sort", "버킷 정렬", "11.8 · 버킷 정렬", "11장", "en/docs/chapter_sorting/bucket_sort.md", "ko/docs/chapter_sorting/bucket_sort.md", "값 구간에 따라 원소를 버킷으로 분배합니다."],
  ["counting-sort", "계수 정렬", "11.9 · 계수 정렬", "11장", "en/docs/chapter_sorting/counting_sort.md", "ko/docs/chapter_sorting/counting_sort.md", "유한 키 범위의 출현 횟수를 셉니다."],
  ["radix-sort", "기수 정렬", "11.10 · 기수 정렬", "11장", "en/docs/chapter_sorting/radix_sort.md", "ko/docs/chapter_sorting/radix_sort.md", "각 자릿수를 안정적으로 정렬합니다."],
  ["chapter-11-summary", "11장 요약", "11.11 · 요약", "11장", "en/docs/chapter_sorting/summary.md", "ko/docs/chapter_sorting/summary.md", "정렬 알고리즘 계열과 선택 기준을 복습합니다."],
  ["divide-and-conquer", "분할 정복", "분할 정복 시작", "12장", "en/docs/chapter_divide_and_conquer/index.md", "ko/docs/chapter_divide_and_conquer/index.md", "나누고 해결하고 결합하는 사고법을 소개합니다."],
  ["divide-and-conquer-algorithms", "분할 정복 알고리즘", "12.1 · 분할 정복", "12장", "en/docs/chapter_divide_and_conquer/divide_and_conquer.md", "ko/docs/chapter_divide_and_conquer/divide_and_conquer.md", "하위 문제 설계와 결과 결합을 설명합니다."],
  ["binary-search-recursive", "분할 정복 탐색 전략", "12.2 · 재귀 탐색", "12장", "en/docs/chapter_divide_and_conquer/binary_search_recur.md", "ko/docs/chapter_divide_and_conquer/binary_search_recur.md", "이진 탐색을 재귀로 표현합니다."],
  ["build-binary-tree", "이진 트리 구성 문제", "12.3 · 트리 구성", "12장", "en/docs/chapter_divide_and_conquer/build_binary_tree_problem.md", "ko/docs/chapter_divide_and_conquer/build_binary_tree_problem.md", "전위와 중위 순회로 트리를 복원합니다."],
  ["hanota", "하노이 탑 문제", "12.4 · 하노이 탑", "12장", "en/docs/chapter_divide_and_conquer/hanota_problem.md", "ko/docs/chapter_divide_and_conquer/hanota_problem.md", "중앙 이동 주위의 두 하위 문제를 해결합니다."],
  ["chapter-12-summary", "12장 요약", "12.5 · 요약", "12장", "en/docs/chapter_divide_and_conquer/summary.md", "ko/docs/chapter_divide_and_conquer/summary.md", "분할 정복, 트리 구성, 하노이 탑을 복습합니다."],
  ["backtracking", "백트래킹", "백트래킹 시작", "13장", "en/docs/chapter_backtracking/index.md", "ko/docs/chapter_backtracking/index.md", "선택, 가지치기, 되돌리기로 해 공간을 탐색합니다."],
  ["backtracking-algorithm", "백트래킹 알고리즘", "13.1 · 백트래킹 알고리즘", "13장", "en/docs/chapter_backtracking/backtracking_algorithm.md", "ko/docs/chapter_backtracking/backtracking_algorithm.md", "시도, 가지치기, 되돌리기 틀을 만듭니다."],
  ["n-queens", "N-퀸 문제", "13.2 · N-퀸", "13장", "en/docs/chapter_backtracking/n_queens_problem.md", "ko/docs/chapter_backtracking/n_queens_problem.md", "열과 대각선 가지치기로 퀸을 배치합니다."],
  ["permutations", "순열 문제", "13.3 · 순열", "13장", "en/docs/chapter_backtracking/permutations_problem.md", "ko/docs/chapter_backtracking/permutations_problem.md", "서로 다른 순열과 중복 원소 순열을 생성합니다."],
  ["subset-sum", "부분집합 합 문제", "13.4 · 부분집합 합", "13장", "en/docs/chapter_backtracking/subset_sum_problem.md", "ko/docs/chapter_backtracking/subset_sum_problem.md", "중복되거나 불가능한 가지를 자르며 조합을 찾습니다."],
  ["chapter-13-summary", "13장 요약", "13.5 · 요약", "13장", "en/docs/chapter_backtracking/summary.md", "ko/docs/chapter_backtracking/summary.md", "백트래킹 상태, 제약, 가지치기와 대표 문제를 복습합니다."],
  ["dynamic-programming", "동적 계획법", "동적 계획법 시작", "14장", "en/docs/chapter_dynamic_programming/index.md", "ko/docs/chapter_dynamic_programming/index.md", "겹치는 하위 문제의 결과를 재사용해 큰 해를 구성합니다."],
  ["intro-to-dynamic-programming", "동적 계획법 소개", "14.1 · 소개", "14장", "en/docs/chapter_dynamic_programming/intro_to_dynamic_programming.md", "ko/docs/chapter_dynamic_programming/intro_to_dynamic_programming.md", "완전 탐색 재귀에서 메모이제이션과 표 채우기로 발전합니다."],
  ["dynamic-programming-characteristics", "동적 계획법 문제의 특징", "14.2 · 문제 특징", "14장", "en/docs/chapter_dynamic_programming/dp_problem_features.md", "ko/docs/chapter_dynamic_programming/dp_problem_features.md", "겹치는 하위 문제, 최적 부분 구조, 무후효성을 식별합니다."],
  ["dynamic-programming-approach", "동적 계획법 문제 해결 절차", "14.3 · 해결 절차", "14장", "en/docs/chapter_dynamic_programming/dp_solution_pipeline.md", "ko/docs/chapter_dynamic_programming/dp_solution_pipeline.md", "상태, 전이, 경계와 계산 순서를 정의합니다."],
  ["zero-one-knapsack", "0-1 배낭 문제", "14.4 · 0-1 배낭", "14장", "en/docs/chapter_dynamic_programming/knapsack_problem.md", "ko/docs/chapter_dynamic_programming/knapsack_problem.md", "용량 안에서 각 물건을 최대 한 번 선택합니다."],
  ["unbounded-knapsack", "무한 배낭 문제", "14.5 · 무한 배낭", "14장", "en/docs/chapter_dynamic_programming/unbounded_knapsack_problem.md", "ko/docs/chapter_dynamic_programming/unbounded_knapsack_problem.md", "물건 종류를 재사용하고 동전 교환 변형을 풉니다."],
  ["edit-distance", "편집 거리 문제", "14.6 · 편집 거리", "14장", "en/docs/chapter_dynamic_programming/edit_distance_problem.md", "ko/docs/chapter_dynamic_programming/edit_distance_problem.md", "삽입, 삭제, 치환으로 문자열 유사도를 측정합니다."],
  ["chapter-14-summary", "14장 요약", "14.7 · 요약", "14장", "en/docs/chapter_dynamic_programming/summary.md", "ko/docs/chapter_dynamic_programming/summary.md", "동적 계획법 설계와 고전 응용을 복습합니다."],
  ["dynamic-programming-exercises", "동적 계획법 연습문제", "14.8 · 연습문제", "14장", "en/docs/chapter_dynamic_programming/exercises.md", "ko/docs/chapter_dynamic_programming/exercises.md", "동적 계획법 개념을 확인하고 고전 구현을 연습합니다."],
  ["greedy", "그리디", "그리디 시작", "15장", "en/docs/chapter_greedy/index.md", "ko/docs/chapter_greedy/index.md", "증명 가능한 조건에서 지역 최적 선택을 합니다."],
  ["greedy-algorithm", "그리디 알고리즘", "15.1 · 그리디 알고리즘", "15장", "en/docs/chapter_greedy/greedy_algorithm.md", "ko/docs/chapter_greedy/greedy_algorithm.md", "그리디 선택 속성, 최적 부분 구조와 한계를 이해합니다."],
  ["fractional-knapsack", "분할 배낭 문제", "15.2 · 분할 배낭", "15장", "en/docs/chapter_greedy/fractional_knapsack_problem.md", "ko/docs/chapter_greedy/fractional_knapsack_problem.md", "가치 밀도가 높은 순서로 물건을 선택합니다."],
  ["max-capacity", "최대 용량 문제", "15.3 · 최대 용량", "15장", "en/docs/chapter_greedy/max_capacity_problem.md", "ko/docs/chapter_greedy/max_capacity_problem.md", "두 포인터로 제한된 면적을 최대화합니다."],
  ["max-product-cutting", "최대 곱 분할 문제", "15.4 · 최대 곱 분할", "15장", "en/docs/chapter_greedy/max_product_cutting_problem.md", "ko/docs/chapter_greedy/max_product_cutting_problem.md", "정수를 곱이 최대가 되는 인수로 나눕니다."],
  ["chapter-15-summary", "15장 요약", "15.5 · 요약", "15장", "en/docs/chapter_greedy/summary.md", "ko/docs/chapter_greedy/summary.md", "그리디 설계, 증명과 대표 응용을 복습합니다."],
  ["greedy-exercises", "그리디 연습문제", "15.6 · 연습문제", "15장", "en/docs/chapter_greedy/exercises.md", "ko/docs/chapter_greedy/exercises.md", "그리디 반례, 두 포인터와 분할 배낭을 연습합니다."],
  ["appendix", "부록", "부록 시작", "16장", "en/docs/chapter_appendix/index.md", "ko/docs/chapter_appendix/index.md", "설치, 기여와 용어에 관한 실용 자료를 제공합니다."],
  ["programming-environment", "프로그래밍 환경 설치", "16.1 · 환경 설치", "16장", "en/docs/chapter_appendix/installation.md", "ko/docs/chapter_appendix/installation.md", "예제 실행을 위한 편집기와 언어 도구를 설치합니다."],
  ["contributing", "함께 기여하기", "16.2 · 기여하기", "16장", "en/docs/chapter_appendix/contribution.md", "ko/docs/chapter_appendix/contribution.md", "집중된 GitHub 기여 절차로 콘텐츠를 개선합니다."],
  ["glossary", "용어집", "16.3 · 용어집", "16장", "en/docs/chapter_appendix/terminology.md", "ko/docs/chapter_appendix/terminology.md", "핵심 자료 구조와 알고리즘 용어를 참조합니다."]
].map(([slug, title, shortTitle, chapter, source, target, description]) => ({ slug, title, shortTitle, chapter, source, target, description }));

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const chapters = [...new Set(pages.map((page) => page.chapter))];

function navigation(currentSlug) {
  return chapters.map((chapter) => `<div class="book-nav-group"><span>${chapter}</span>${pages.filter((page) => page.chapter === chapter).map((page) => `<a${page.slug === currentSlug ? ' class="active" aria-current="page"' : ""} href="${page.slug === "index" ? "./" : `${page.slug}.html`}">${page.shortTitle}</a>`).join("\n")}</div>`).join("\n");
}

function pageTemplate(page, body, index, sourceCommit, koreanDocument, vietnameseDocument) {
  const previous = pages[index - 1];
  const next = pages[index + 1];
  const outputName = page.slug === "index" ? "" : `${page.slug}.html`;
  const sourceUrl = `https://github.com/krahets/hello-algo/blob/${sourceCommit}/${page.source}`;
  const viUrl = readerHref(vietnameseDocument);
  const statusCopy = {
    draft: {
      label: "초안",
      sidebar: "내용 확장 및 검토 중",
      title: "상태: 검토 중인 한국어 초안",
      description: "경로, 링크, 렌더링은 검사했지만 일부 문서는 아직 영어 원문보다 간략합니다. 구조와 예제를 보완하고 기술·한국어 검토를 마치기 전까지 파일럿 번역으로 간주하지 않습니다."
    },
    pilot: {
      label: "파일럿",
      sidebar: "독립 검토 대기",
      title: "상태: 자체 검토를 마친 파일럿",
      description: "영어 원문의 구조와 예제를 보존하고 기술·언어·링크·빌드 자체 검토를 마쳤습니다. 안정 번역으로 승격하기 전에 독립적인 한국어 기술 검토가 필요합니다."
    },
    published: {
      label: "정식",
      sidebar: "검토 완료",
      title: "상태: 검토를 마친 안정 번역",
      description: "영어 원문과의 구조·내용 대조 및 독립적인 기술·한국어 검토를 완료했습니다."
    }
  }[koreanDocument.status];
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="https://buicongnguyen.github.io/hello-algo/ko/learn/${outputName}">
  <meta name="theme-color" content="#07111f"><title>${escapeHtml(page.title)} · Hello Algo 한국어</title>
  <link rel="stylesheet" href="book.css?v=20260718g"><script src="book.js?v=20260718g" defer></script>
</head>
<body data-translation-status="${koreanDocument.status}">
  <a class="skip-link" href="#article">본문으로 건너뛰기</a>
  <header class="reader-header">
    <button class="reader-menu" id="reader-menu" type="button" aria-label="목차 열기" aria-expanded="false">☰</button>
    <a class="reader-brand" href="../"><span>A→G</span><strong>Hello Algo <b>KO</b></strong></a>
    <div class="reader-progress"><span>${statusCopy.label}</span><strong>${pages.length} / 119 문서</strong></div>
    <nav aria-label="언어와 테마"><a class="active" href="${outputName || "./"}" lang="ko" hreflang="ko" aria-current="page">KO</a><a href="${viUrl}" lang="vi" hreflang="vi" aria-label="같은 문서를 베트남어로 읽기">VI</a><a href="${englishReaderHref(page.source)}" lang="en" hreflang="en" aria-label="같은 문서를 영어로 읽기">EN</a><button id="reader-theme" type="button" aria-label="밝은 테마와 어두운 테마 전환">◐</button></nav>
  </header>
  <div class="reader-shell">
    <aside class="reader-sidebar" id="reader-sidebar" aria-label="한국어판 목차"><div class="sidebar-top"><strong>한국어 읽기</strong><small>0–16장 · ${statusCopy.sidebar}</small></div>${navigation(page.slug)}<div class="sidebar-links"><a href="../#roadmap">학습 지도</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/KOREAN_TRANSLATION_PLAN.md">번역 계획</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/ko/glossary.md">용어집</a><a href="https://github.com/buicongnguyen/hello-algo/blob/main/ko/CONTRIBUTING.md">기여하기</a></div></aside>
    <main class="reader-main"><article id="article"><div class="article-meta"><span>${page.chapter}</span><span>${statusCopy.label} · 원문 ${sourceCommit.slice(0, 7)}</span></div><div class="pilot-notice"><strong>${statusCopy.title}</strong><p>${statusCopy.description} VI와 EN 버튼은 같은 원문에 대응하는 문서를 엽니다.</p></div>${body}<footer class="article-attribution"><strong>출처와 라이선스</strong><p><a href="${sourceUrl}" target="_blank" rel="noreferrer">krahets와 기여 공동체의 Hello Algo 영어판</a>을 바탕으로 번역하고 예제를 선별하며 일부 내용을 편집했습니다. 파생 콘텐츠는 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>에 따라 제공합니다. 이 프로젝트는 비영리 커뮤니티 작업이며 원본 프로젝트의 공식 후원을 의미하지 않습니다.</p></footer></article>
      <nav class="page-nav" aria-label="이전 글과 다음 글">${previous ? `<a href="${previous.slug === "index" ? "./" : `${previous.slug}.html`}"><span>← 이전 글</span><strong>${previous.title}</strong></a>` : "<i></i>"}${next ? `<a class="next" href="${next.slug === "index" ? "./" : `${next.slug}.html`}"><span>다음 글 →</span><strong>${next.title}</strong></a>` : "<i></i>"}</nav>
    </main>
  </div>
</body></html>`;
}

export async function buildKoreanBook({ projectRoot, outputRoot }) {
  const registry = await loadTranslationRegistry(projectRoot);
  const bookOutput = path.join(outputRoot, "ko", "learn");
  await mkdir(bookOutput, { recursive: true });
  await cp(path.join(projectRoot, "vi", "book.css"), path.join(bookOutput, "book.css"));
  await cp(path.join(projectRoot, "vi", "book.js"), path.join(bookOutput, "book.js"));
  const coverOutput = path.join(bookOutput, "assets", "covers");
  await mkdir(coverOutput, { recursive: true });
  for (const cover of ["chapter_preface.jpg", "chapter_introduction.jpg", "chapter_complexity_analysis.jpg", "chapter_data_structure.jpg", "chapter_array_and_linkedlist.jpg", "chapter_stack_and_queue.jpg", "chapter_hashing.jpg", "chapter_tree.jpg", "chapter_heap.jpg", "chapter_graph.jpg", "chapter_searching.jpg", "chapter_sorting.jpg", "chapter_divide_and_conquer.jpg", "chapter_backtracking.jpg", "chapter_dynamic_programming.jpg", "chapter_greedy.jpg", "chapter_appendix.jpg"]) await cp(path.join(projectRoot, "en", "docs", "assets", "covers", cover), path.join(coverOutput, cover));
  for (const [chapter, directory] of [
    ["chapter_preface", "about_the_book.assets"], ["chapter_introduction", "algorithms_are_everywhere.assets"],
    ["chapter_data_structure", "classification_of_data_structure.assets"], ["chapter_data_structure", "number_encoding.assets"], ["chapter_data_structure", "character_encoding.assets"],
    ["chapter_array_and_linkedlist", "array.assets"], ["chapter_array_and_linkedlist", "linked_list.assets"], ["chapter_array_and_linkedlist", "ram_and_cache.assets"],
    ["chapter_stack_and_queue", "stack.assets"], ["chapter_stack_and_queue", "queue.assets"], ["chapter_stack_and_queue", "deque.assets"],
    ["chapter_hashing", "hash_map.assets"], ["chapter_hashing", "hash_collision.assets"], ["chapter_hashing", "hash_algorithm.assets"],
    ["chapter_tree", "binary_tree.assets"], ["chapter_tree", "binary_tree_traversal.assets"], ["chapter_tree", "array_representation_of_tree.assets"], ["chapter_tree", "binary_search_tree.assets"], ["chapter_tree", "avl_tree.assets"],
    ["chapter_heap", "heap.assets"], ["chapter_heap", "build_heap.assets"], ["chapter_heap", "top_k.assets"],
    ["chapter_graph", "graph.assets"], ["chapter_graph", "graph_operations.assets"], ["chapter_graph", "graph_traversal.assets"],
    ["chapter_searching", "binary_search.assets"], ["chapter_searching", "binary_search_insertion.assets"], ["chapter_searching", "binary_search_edge.assets"], ["chapter_searching", "replace_linear_by_hashing.assets"], ["chapter_searching", "searching_algorithm_revisited.assets"],
    ["chapter_sorting", "sorting_algorithm.assets"], ["chapter_sorting", "selection_sort.assets"], ["chapter_sorting", "bubble_sort.assets"], ["chapter_sorting", "insertion_sort.assets"], ["chapter_sorting", "quick_sort.assets"], ["chapter_sorting", "merge_sort.assets"], ["chapter_sorting", "heap_sort.assets"], ["chapter_sorting", "bucket_sort.assets"], ["chapter_sorting", "counting_sort.assets"], ["chapter_sorting", "radix_sort.assets"], ["chapter_sorting", "summary.assets"],
    ["chapter_divide_and_conquer", "divide_and_conquer.assets"], ["chapter_divide_and_conquer", "binary_search_recur.assets"], ["chapter_divide_and_conquer", "build_binary_tree_problem.assets"], ["chapter_divide_and_conquer", "hanota_problem.assets"],
    ["chapter_backtracking", "backtracking_algorithm.assets"], ["chapter_backtracking", "n_queens_problem.assets"], ["chapter_backtracking", "permutations_problem.assets"], ["chapter_backtracking", "subset_sum_problem.assets"],
    ["chapter_dynamic_programming", "intro_to_dynamic_programming.assets"], ["chapter_dynamic_programming", "dp_problem_features.assets"], ["chapter_dynamic_programming", "dp_solution_pipeline.assets"], ["chapter_dynamic_programming", "knapsack_problem.assets"], ["chapter_dynamic_programming", "unbounded_knapsack_problem.assets"], ["chapter_dynamic_programming", "edit_distance_problem.assets"],
    ["chapter_greedy", "greedy_algorithm.assets"], ["chapter_greedy", "fractional_knapsack_problem.assets"], ["chapter_greedy", "max_capacity_problem.assets"], ["chapter_greedy", "max_product_cutting_problem.assets"],
    ["chapter_appendix", "installation.assets"], ["chapter_appendix", "contribution.assets"]
  ]) {
    const destination = path.join(bookOutput, "assets", chapter, directory);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(projectRoot, "en", "docs", chapter, directory), destination, { recursive: true });
  }
  const motionOutput = path.join(bookOutput, "assets", "index.assets");
  await mkdir(motionOutput, { recursive: true });
  await cp(path.join(projectRoot, "en", "docs", "index.assets", "animation.gif"), path.join(motionOutput, "animation.gif"));
  for (const [index, page] of pages.entries()) {
    const koreanDocument = registry.byLanguage.ko.get(page.source);
    const vietnameseDocument = registry.byLanguage.vi.get(page.source);
    if (!koreanDocument || !vietnameseDocument) throw new Error(`Korean reader page has no shared translation identity: ${page.source}`);
    const markdown = await readFile(path.join(projectRoot, page.target), "utf8");
    const outputName = page.slug === "index" ? "index.html" : `${page.slug}.html`;
    const expectedRoute = `ko/learn/${outputName === "index.html" ? "" : outputName}`;
    if (koreanDocument.target !== page.target || koreanDocument.route !== expectedRoute) throw new Error(`Korean registry identity does not match reader page ${page.source}`);
    await writeFile(path.join(bookOutput, outputName), pageTemplate(page, renderMarkdown(markdown, page.target), index, registry.sourceCommit, koreanDocument, vietnameseDocument));
    await access(path.join(bookOutput, outputName), constants.R_OK);
  }
  return { pageCount: pages.length, sourceCommit: registry.sourceCommit, status: "draft" };
}
