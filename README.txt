# Self-Development RPG (v5 Hardcore) — PWA Kit

이 폴더를 그대로 GitHub Pages(또는 아무 정적 호스팅)에 올리면 홈 화면에 추가 가능한 PWA가 됩니다.

## 파일 구성
- `index.html` — 앱 본문 (v5 하드코어)
- `manifest.webmanifest` — 앱 이름/아이콘/PWA 메타
- `service-worker.js` — 오프라인 캐시
- `icons/` — PWA 아이콘

## 배포 (GitHub Pages)
1. 새 저장소 생성 → 이 폴더의 파일 전부 업로드(최상위).
2. **Settings → Pages → Build and deployment**: 
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
3. Pages 주소가 생기면 iPhone Safari로 접속 → 공유 버튼 → **홈 화면에 추가**.

## 개발 참고
- 오프라인 캐시는 `service-worker.js`에서 관리합니다.
- 캐시를 갱신하고 싶다면 `CACHE_NAME` 문자열을 바꿔 주세요.

즐거운 자기계발 보스레이드!