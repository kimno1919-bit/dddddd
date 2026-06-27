# Design Specification: LearnHub

> **문서 버전**: v1.0
> **작성일**: 2026-06-27
> **연관 문서**: `prd.md`
> **타입**: Design Specification (Visual + Interaction)

---

## 1. 디자인 원칙 (Design Principles)

| 원칙 | 설명 |
|---|---|
| **Speed over Decoration** | 장식보다 도달 속도. 클릭 1회로 앱 실행. |
| **Dense but Calm** | 정보 밀도는 높이되, 여백·계층으로 시각적 피로 최소화. |
| **Predictable** | 동일 동작은 동일 결과. 뷰가 바뀌어도 카드·검색은 동일하게 동작. |
| **Static-first** | 애니메이션은 의미를 가질 때만. 화려한 전환 금지. |
| **Keyboard-first** | 모든 기능을 키보드만으로 사용 가능. |

**참조 미감**: Linear · Vercel Dashboard · Raycast · macOS Launchpad
**회피 미감**: 그라데이션·글래스모피즘·네온 글로우·과장된 히어로 카피

---

## 2. 컬러 시스템 (Color Tokens)

### 2.1 Light Theme (Default)

| 토큰 | HEX | 용도 |
|---|---|---|
| `--color-bg` | `#ffffff` | 페이지 배경 |
| `--color-surface` | `#f9fafb` | 카드·사이드바 배경 |
| `--color-surface-hover` | `#f3f4f6` | 카드 호버 |
| `--color-border` | `#e5e7eb` | 1px 구분선 |
| `--color-border-strong` | `#d1d5db` | 강조 구분선 |
| `--color-fg` | `#111827` | 본문 텍스트 |
| `--color-fg-muted` | `#6b7280` | 보조 텍스트 |
| `--color-fg-subtle` | `#9ca3af` | 비활성/플레이스홀더 |
| `--color-primary` | `#2563eb` | 주요 액션·포커스 링 |
| `--color-primary-hover` | `#1d4ed8` | 호버 상태 |

### 2.2 Dark Theme

| 토큰 | HEX |
|---|---|
| `--color-bg` | `#0b0f17` |
| `--color-surface` | `#111827` |
| `--color-surface-hover` | `#1f2937` |
| `--color-border` | `#1f2937` |
| `--color-border-strong` | `#374151` |
| `--color-fg` | `#f3f4f6` |
| `--color-fg-muted` | `#9ca3af` |
| `--color-primary` | `#3b82f6` |

### 2.3 Semantic Colors (Light/Dark 공통 키)

| 토큰 | Light | Dark | 용도 |
|---|---|---|---|
| `--color-success` | `#16a34a` | `#22c55e` | 완료/저장 |
| `--color-warning` | `#d97706` | `#f59e0b` | 주의/필수 누락 |
| `--color-danger` | `#dc2626` | `#ef4444` | 삭제/오류 |

### 2.4 카테고리 액센트 컬러
카드 좌측 4px 컬러 바 또는 아이콘 배경에만 사용. 본문 텍스트 색상에는 사용 금지.

| 카테고리 | HEX |
|---|---|
| 수학 | `#2563eb` (blue) |
| 영어 | `#7c3aed` (violet) |
| 코딩 | `#0891b2` (cyan) |
| 과학 | `#059669` (emerald) |
| 역사 | `#b45309` (amber) |
| 기타 | `#64748b` (slate) |

---

## 3. 타이포그래피 (Typography)

### 3.1 폰트 패밀리
```css
--font-sans: Pretendard, -apple-system, BlinkMacSystemFont,
             "Segoe UI", "Apple SD Gothic Neo", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
```

### 3.2 타입 스케일

| 토큰 | size / line-height | weight | 용도 |
|---|---|---|---|
| `--text-xs` | 11px / 14px | 500 | 뱃지, 메타 |
| `--text-sm` | 12px / 16px | 400 | 카드 설명, 보조 |
| `--text-base` | 14px / 20px | 400 | 본문 기본 |
| `--text-md` | 15px / 22px | 500 | 카드 제목 |
| `--text-lg` | 18px / 26px | 600 | 섹션 헤더 |
| `--text-xl` | 22px / 30px | 600 | 페이지 타이틀 |
| `--text-2xl` | 28px / 36px | 700 | 빈 상태/모달 헤드라인 (최대) |

**원칙**: 한 화면에 `xl` 이상은 1개만. 카드 제목은 항상 `md`.

---

## 4. 간격·레이아웃 (Spacing & Layout)

### 4.1 Spacing Scale
4px 단위 기반.

| 토큰 | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 20 |
| `--space-6` | 24 |
| `--space-8` | 32 |
| `--space-12` | 48 |

### 4.2 Radius

| 토큰 | px | 용도 |
|---|---|---|
| `--radius-sm` | 4 | 뱃지, 작은 칩 |
| `--radius-md` | 8 | 카드, 버튼, 인풋 |
| `--radius-lg` | 12 | 모달, 큰 컨테이너 |
| `--radius-full` | 9999 | 아바타 (제한적 사용) |

> 카드/뱃지에 fully-rounded(pill) 사용 금지. 6px 이하 권장.

### 4.3 컨테이너 폭

| Breakpoint | 폭 |
|---|---|
| 모바일 (< 640px) | 100% - 24px |
| 태블릿 (640–1024px) | 100% - 48px |
| 데스크톱 (≥ 1024px) | max-width 1280px, 중앙 정렬 |

### 4.4 그리드

**전체 앱 뷰 카드 그리드**:
```css
display: grid;
gap: 16px;
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
```

**앱 런처 뷰 격자**:
```css
display: grid;
gap: 24px;
grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
```

---

## 5. 컴포넌트 명세 (Components)

### 5.1 App Card (앱 카드 — 전체 앱 뷰)

**크기**: 최소 180×140px, 가변 폭
**구조**:
```
┌─────────────────────────┐
│ ┌──┐                  ★ │ ← 아이콘(40×40) + 즐겨찾기
│ │  │                    │
│ └──┘                    │
│                         │
│ 분수 계산기              │ ← 제목 (text-md, weight 500)
│ 분수 연산을 시각적으로... │ ← 설명 (text-sm, muted, 1줄 ellipsis)
│                         │
│ [수학]                  │ ← 카테고리 뱃지
└─────────────────────────┘
```

**상태**:
- **기본**: `background: var(--color-surface)`, `border: 1px solid var(--color-border)`
- **호버**: `background: var(--color-surface-hover)`, `border-color: var(--color-border-strong)`, `transform: translateY(-1px)` (단, 100ms 내)
- **포커스**: `outline: 2px solid var(--color-primary)`, `outline-offset: 2px`
- **활성(누름)**: `transform: translateY(0)`

**여백**: `padding: 16px`
**모서리**: `border-radius: 8px`
**그림자 금지**. 구분은 1px border로만.

---

### 5.2 Launcher Tile (앱 런처 타일)

**크기**: 96×112px (아이콘 64 + 이름 영역)
**구조**:
```
┌──────────┐
│  ┌────┐  │
│  │ 64 │  │ ← 큰 아이콘, 라운드 12px
│  └────┘  │
│  앱 이름  │ ← text-xs, 중앙 정렬 (런처 뷰에서만 예외)
└──────────┘
```

**상태**:
- **기본**: 투명 배경
- **호버**: 아이콘 영역에 1px border 추가
- **포커스(키보드)**: 아이콘 둘레 2px primary 링

> 런처 뷰 타일은 라벨이 데이터의 일부이므로 가운데 정렬 허용 (예외).

---

### 5.3 검색 인풋 (Search Input)

**크기**: 높이 36px, 폭은 컨테이너 가변
**구조**:
```
┌────────────────────────────────┐
│ 🔍  앱 이름·태그로 검색...  ⌘K │
└────────────────────────────────┘
```

- 좌측: 아이콘 (16×16, muted)
- 우측: 단축키 힌트 (`text-xs`, muted, border 1px)
- 포커스 시: `border-color: var(--color-primary)`, ring 2px primary at 20% opacity
- 플레이스홀더: `color: var(--color-fg-subtle)`

---

### 5.4 뱃지 (Badge / Chip)

| 변형 | 용도 | 스타일 |
|---|---|---|
| **Category** | 카테고리 표시 | 배경 카테고리 액센트 12% opacity, 텍스트 액센트 100% |
| **Count** | 개수 표시 | 배경 `--color-surface-hover`, 텍스트 muted |
| **Filter Chip** | 선택 가능 필터 | 비활성 outline / 활성 filled |

- 높이: 20px, padding: `2px 8px`, radius: 4px, font: `--text-xs`

---

### 5.5 사이드바 (카테고리 뷰)

- 폭: 220px (데스크톱), 모바일은 상단 가로 스크롤 칩으로 대체
- 항목: 좌측 정렬, 32px 높이, `padding: 0 12px`
- 활성 항목: 좌측 2px primary 바 + 배경 `--color-surface-hover`
- 카테고리명 우측에 개수(muted)

---

### 5.6 탭 (뷰 전환)

```
[ 전체 앱 ]  카테고리   런처
─────────
```

- 활성 탭: 하단 2px primary 언더라인, 텍스트 `--color-fg`
- 비활성: 텍스트 muted
- 호버: 텍스트 `--color-fg`, 언더라인은 없음

---

### 5.7 모달 (앱 런처)

- 풀스크린 오버레이: `background: rgba(11, 15, 23, 0.85)` (Dark는 동일)
- 백드롭 블러 없음 (성능 우선)
- 진입: 80ms fade-in. 그 이상의 모션 금지.
- `Esc` / 외부 클릭 / 우상단 ✕로 닫힘

---

### 5.8 빈 상태 (Empty State)

```
┌─────────────────────────┐
│        (아이콘)         │ ← 단색 SVG, 48×48
│                         │
│   "검색 결과가 없어요"   │ ← text-lg
│   다른 키워드를 시도...  │ ← text-sm, muted
│                         │
│      [필터 초기화]       │ ← 보조 버튼
└─────────────────────────┘
```

---

## 6. 아이콘 (Iconography)

### 6.1 시스템 아이콘
- 라이브러리: **Lucide** (단색, 1.5px stroke)
- 크기: 16px(인라인) / 20px(버튼) / 24px(헤더)
- 색상: 본문 색을 상속 (`currentColor`)

### 6.2 앱 아이콘 (앱별 식별자)
- 형식: SVG 우선, PNG는 fallback
- 권장 크기: 64×64 (런처) / 40×40 (카드)
- **아이콘이 없을 때 폴백**:
  - 카테고리 액센트 컬러 + 앱 이름 첫 글자 1자
  - 예: "분수 계산기" → "분" / 배경 `#2563eb` / 텍스트 `#fff`
- 모서리: `border-radius: 12px` (런처) / `8px` (카드)

---

## 7. 모션 (Motion)

| 동작 | duration | easing |
|---|---|---|
| 카드 호버 | 100ms | `ease-out` |
| 탭 전환 | 120ms | `ease-out` (opacity만) |
| 모달 fade | 80ms | `ease-out` |
| 사이드바 스크롤 점프 | 200ms | `ease-in-out` |

**금지 사항**:
- entrance 애니메이션(카드가 위에서 떨어지는 등)
- 무한 반복 모션 (shimmer 제외 불가)
- 스크롤 패럴랙스

---

## 8. 인터랙션 패턴 (Interaction Patterns)

### 8.1 키보드 단축키

| 키 | 동작 |
|---|---|
| `Cmd/Ctrl + K` | 앱 런처 열기 (검색 자동 포커스) |
| `Esc` | 모달/런처 닫기, 검색 초기화 |
| `↑ ↓ ← →` | 런처/그리드 내 포커스 이동 |
| `Enter` | 포커스된 앱 실행 |
| `1` / `2` / `3` | 전체 / 카테고리 / 런처 뷰 전환 |
| `F` | 포커스된 카드 즐겨찾기 토글 |

### 8.2 포커스 관리
- 모달 열림: 첫 포커스 가능 요소(검색 인풋)로 이동
- 모달 닫힘: 호출 전 포커스 위치 복원
- 포커스 링은 항상 visible (outline 사용)

### 8.3 호버 vs 터치
- 터치 디바이스에서는 호버 효과 제거 (`@media (hover: hover)` 가드)
- 길게 누름(long-press) → 즐겨찾기 토글 (모바일)

---

## 9. 반응형 (Responsive)

| Breakpoint | 폭 | 변화 |
|---|---|---|
| **모바일** | < 640px | 카드 2열, 사이드바 → 상단 가로 칩, 헤더 검색 → 아이콘 토글 |
| **태블릿** | 640–1024px | 카드 3–4열, 사이드바 표시 |
| **데스크톱** | ≥ 1024px | 카드 5–6열, 모든 요소 표시 |

### 9.1 모바일 우선 사항
- 터치 타깃 최소 44×44px
- 카드 padding: 12px (데스크톱 16px 대비 축소)
- 헤더 sticky, 검색은 아이콘 → 풀스크린 검색 시트

---

## 10. 접근성 (Accessibility)

| 항목 | 기준 |
|---|---|
| 대비 (Contrast) | 본문 4.5:1, 큰 텍스트 3:1 이상 |
| 포커스 표시 | 모든 상호작용 요소에 visible focus ring |
| 시맨틱 마크업 | `<nav>`, `<main>`, `<button>`, `<a>` 정확히 사용 |
| ARIA | 카테고리 섹션은 `aria-labelledby`, 모달은 `role="dialog" aria-modal="true"` |
| 키보드 | 모든 기능을 마우스 없이 사용 가능 |
| 모션 줄임 | `prefers-reduced-motion` 존중 — 모든 트랜지션 즉시 적용 |
| 스크린리더 | 아이콘 전용 버튼은 `aria-label` 필수 |

---

## 11. 다크 모드 (Dark Mode)

### 11.1 적용 방식
```css
@media (prefers-color-scheme: dark) {
  :root { /* dark tokens */ }
}
[data-theme="dark"] { /* dark tokens */ }
[data-theme="light"] { /* light tokens */ }
```

### 11.2 토글 우선순위
1. 사용자 명시 선택 (LocalStorage `theme`)
2. OS 설정 (`prefers-color-scheme`)
3. 기본 = light

### 11.3 다크 모드 주의사항
- 카테고리 액센트 컬러는 다크에서 명도를 한 단계 밝게
- 카드 호버는 배경을 살짝 밝히는 방향으로 (어둡게 X)
- 그림자 사용 금지 — border 강화로 계층 표현

---

## 12. 콘텐츠 톤 (Voice & Tone)

| 상황 | 톤 | 예시 |
|---|---|---|
| 빈 상태 | 담백, 행동 유도 | "검색 결과가 없어요. 다른 키워드를 시도해 보세요." |
| 에러 | 사실 기반, 비난 없음 | "앱을 불러올 수 없습니다. URL을 확인해 주세요." |
| 도움말 | 간결, 명령형 | "Cmd+K 로 빠르게 검색하세요." |
| 뱃지/라벨 | 명사 단답 | "수학", "신규", "즐겨찾기" |

**금지어**: "놀라운", "강력한", "혁신적인", "최고의" 등 마케팅 형용사.

---

## 13. 디자인 자산 (Assets Checklist)

- [ ] 로고 SVG (라이트/다크 2종)
- [ ] 파비콘 32×32, 180×180 (Apple touch)
- [ ] OG 이미지 1200×630
- [ ] 앱 아이콘 SVG (앱마다)
- [ ] 빈 상태 일러스트 1종 (단색 SVG)
- [ ] PWA 매니페스트 아이콘 192/512

---

## 14. 디자인 QA 체크리스트

배포 전 확인:

- [ ] 모든 텍스트가 대비 기준 통과
- [ ] 키보드만으로 모든 뷰·기능 사용 가능
- [ ] 320px 폭에서 가로 스크롤 없음
- [ ] 다크/라이트 모두 정상
- [ ] `prefers-reduced-motion` 활성 시 트랜지션 제거
- [ ] 카드 그리드가 1·2·3·4·6·8개 항목에서 모두 자연스럽게 정렬
- [ ] 빈 상태 / 로딩 / 에러 화면이 모두 정의됨
- [ ] 포커스 트랩이 모달에서 정상 동작

---

## 15. 참고 (References)

- Linear — 컴포넌트 밀도와 키보드 인터랙션
- Raycast — 런처 UX 패턴
- macOS Launchpad — 격자형 앱 진열
- Vercel Dashboard — 라이트 톤 카드 시스템
- Refactoring UI (Adam Wathan) — 컬러·간격 원칙
- WCAG 2.1 AA — 접근성 기준

---

**문서 끝.**
