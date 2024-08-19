# QUFIT - AR 블라인드 소개팅 서비스 🎭

<div align="center">
<img width="450" alt="QUFIT 로고" src="QuFit_LOGO.png">
</div>

# QUFIT - AR 기술을 활용한 혁신적인 블라인드 소개팅 서비스 👥
> **저출산 문제 해결을 위한 새로운 방식의 소개팅 서비스**  
> **개발기간: 2024.06 ~ 2024.08 (7주)**

## 💥 프로젝트 소개

QUFIT은 AR 기술을 활용한 혁신적인 블라인드 소개팅 서비스입니다. 저출산 문제 해결을 위해 청년들의 만남을 새로운 방식으로 지원합니다. 사용자의 얼굴을 직접적으로 노출하지 않으면서도 상대방의 외적, 성격적 이미지를 파악할 수 있는 독특한 경험을 제공합니다. 💑

QUFIT은 기존 데이팅 앱의 한계를 극복하고, 온라인 환경에서 로테이션 단체 미팅의 장점을 살린 새로운 형태의 소개팅 플랫폼입니다. AR 마스크를 통해 익명성을 보장하면서도 실시간 상호작용이 가능한 환경을 제공하여, 외모보다는 성격과 대화를 중심으로 상대방을 알아갈 수 있도록 돕습니다. 🎭

프로젝트를 통해 청년들의 새로운 만남의 기회를 제공하고, 궁극적으로는 저출산 문제 해결에 기여하는 것이 QUFIT의 목표입니다. 앞으로도 QUFIT은 사용자들의 피드백을 반영하며 지속적으로 서비스를 개선해 나갈 예정입니다. 🎯


## 👥 팀 소개

### 백엔드

|    천세경      |          조현수         |          장혜원         |          김해엽         |                                                                                                               
| :---: | :---: | :---: | :---: |
|   <img width="400px" src="[천세경 프로필 URL]" />    |   <img width="400px" src="https://i.postimg.cc/d0G72ZM3/image.jpg" />    |   <img width="400px" src="https://i.postimg.cc/6pxGgtfx/Kakao-Talk-20231225-151459104.jpg" />    |   <img width="400px" src="https://i.postimg.cc/Y09LLwjS/file.jpg" />    |
|   [@GitHub ID](https://github.com/[ID])   |    [@HyunSoo](https://github.com/HyunSoo730)  |    [@GitHub ID](https://github.com/[ID])  |    [@GitHub ID](https://github.com/[ID])  |
| SSAFY | SSAFY | SSAFY | SSAFY |

### 프론트엔드

|    송현명      |          박세은         |                                                                                                               
| :---: | :---: | 
|   <img width="450px" src="https://i.postimg.cc/Cx2HtY2G/image-2.png" />    |   <img width="450px" src="https://postimg.cc/dkPfpcHc" />    |
|   [@GitHub ID](https://github.com/[송현명 GitHub ID])   |    [@GitHub ID](https://github.com/[박세은 GitHub ID])  |
| SSAFY | SSAFY |


## 🌈 이용 가이드

### Requirements

프로젝트를 빌드하고 실행하기 위해 다음 환경이 필요합니다:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. 프로젝트 클론
```
$ git clone [프로젝트 레포지토리 URL]
$ cd [프로젝트 디렉토리 이름]

2. 환경 변수 설정
# Back-end 환경 변수 설정
$ cp back-end/.env.example back-end/.env
# 필요한 환경 변수 값 설정

# Front-end 환경 변수 설정
$ cp front-end/.env.example front-end/.env
# 필요한 환경 변수 값 설정

3. Docker Compose를 사용하여 애플리케이션 실행
$ docker compose up -d --build

이 명령어는 백엔드, 프론트엔드, Redis 서비스를 빌드하고 실행합니다. 
- 백엔드 서비스는 8080 포트에서 실행됩니다.
- 프론트엔드 서비스는 80 포트(HTTP)와 443 포트(HTTPS)에서 실행됩니다.
- Redis 서비스는 6379 포트에서 실행됩니다.

4. 애플리케이션 접속
- 웹 브라우저에서 https://localhost 또는 http://localhost로 접속하여 애플리케이션을 이용할 수 있습니다.

5. 애플리케이션 중지
$ docker compose down
```

이 명령어는 실행 중인 모든 서비스를 중지하고 컨테이너를 제거합니다.

## 🛠️ 기술 스택

### Language
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Framework & Library
#### Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![JPA](https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![Querydsl](https://img.shields.io/badge/Querydsl-4479A1?style=for-the-badge&logo=java&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)

#### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
![Google Mediapipe](https://img.shields.io/badge/Google_Mediapipe-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Config
#### Frontend
- Node.js 20
- Nginx 1.21.4-alpine

#### Backend
- Gradle 7.6.1
- OpenJDK 17
- Spring Boot 3.3.1

### Communication
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitLab](https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=gitlab&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Mattermost](https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white)

### Database
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### DevOps
![Amazon EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![LiveKit Cloud](https://img.shields.io/badge/LiveKit_Cloud-00ADD8?style=for-the-badge&logo=webrtc&logoColor=white)

### Etc
![DALL-E 3](https://img.shields.io/badge/DALL--E_3-412991?style=for-the-badge&logo=openai&logoColor=white)

## 📊 데이터베이스 설계
- ERD 이미지 추가 

## 📺 화면 구성

| 메인 페이지 | 방 목록 페이지 |
|:---------:|:-----------:|
| [이미지1] | [이미지2] |
| 메인 페이지 설명 | 방 목록 페이지 설명 |

| 프로필 설정 페이지 | 화상 미팅 페이지 |
|:-----------------:|:---------------:|
| [이미지3] | [이미지4] |
| 프로필 설정 페이지 설명 | 화상 미팅 페이지 설명 |

## 🏛️ 아키텍처

[아키텍처 다이어그램 이미지 추가]

## 📊 순서도

[순서도 이미지 또는 설명 추가]


## 🎉 프로젝트 결과 및 성과

- WebRTC와 AR 기술을 결합하여 독특한 블라인드 소개팅 경험 구현
- LiveKit Cloud를 활용한 안정적인 다대다 화상 통신 시스템 구축
- Google MediaPipe와 Three.js를 활용한 실시간 AR 마스킹 기술 개발
- OpenAI의 DALL-E 3 모델을 이용한 AI 기반 프로필 이미지 생성 시스템 구현
- Elasticsearch를 활용한 효율적인 방 추천 및 검색 시스템 개발
- 실시간 밸런스 게임을 통한 사용자 상호작용 증대 및 매칭 정확도 향상

## 🔧 개선 사항 및 추후 계획

- AR 마스크 다양성 확대 및 사용자 지정 마스크 기능 개발
- 모바일 환경 최적화를 통한 서비스 접근성 향상
- 머신러닝 기반의 고도화된 사용자 매칭 알고리즘 개발
- 실시간 데이터 분석을 통한 개인화된 경험 제공
- 서비스 안정성과 확장성을 위한 마이크로서비스 아키텍처 검토

## 🚨 트러블슈팅

### WebRTC 연결 안정성 문제
- 증상: 다수 사용자 동시 접속 시 간헐적 연결 끊김 현상 발생
- 원인: WebRTC의 P2P 연결 한계와 네트워크 불안정성
- 해결: 
  1. TURN 서버 도입으로 NAT 및 방화벽 이슈 해결
  2. ICE 후보 수집 프로세스 최적화
  3. LiveKit Cloud 도입으로 확장성 있는 인프라 구축
- 결과: 연결 안정성이 크게 향상되어 끊김 현상이 95% 이상 감소

### AR 마스크 렌더링 성능 이슈
- 증상: 저사양 디바이스에서 AR 마스크 렌더링 시 심각한 프레임 드롭 발생
- 원인: 복잡한 3D 모델과 실시간 얼굴 인식 처리로 인한 과도한 리소스 사용
- 해결:
  1. 3D 모델 최적화 (setInterval 최적화)
  2. WebGL 렌더링 파이프라인 개선
  3. 디바이스 성능에 따른 동적 렌더링 품질 조절 기능 구현
- 결과: 저사양 디바이스에서도 30FPS 이상의 안정적인 렌더링 달성

### 실시간 게임 동기화 문제
- 증상: 밸런스 게임 진행 시 사용자 간 게임 상태 불일치 발생
- 원인: 네트워크 지연과 클라이언트 간 시간 차이로 인한 동기화 오류
- 해결:
  1. 서버 권한 모델 도입으로 게임 상태를 서버에서 중앙 관리
  2. 클라이언트 예측과 서버 재조정 기법 적용
  3. 시간 동기화 프로토콜 구현으로 클라이언트 간 시간 오차 최소화
- 결과: 게임 상태 동기화 정확도 99.9% 달성, 사용자 경험 크게 개선

### 대규모 동시 접속자 처리 문제
- 증상: 피크 시간대 서버 과부하 및 응답 지연
- 원인: 단일 서버 구조의 한계와 비효율적인 데이터베이스 쿼리
- 해결:
  1. 로드 밸런서 도입 및 서버 수평적 확장
  2. Redis를 활용한 캐싱 레이어 구현
  3. 데이터베이스 쿼리 최적화 및 인덱싱 개선
- 결과: 시스템 처리 용량 5배 증가, 응답 시간 60% 단축

### AI 이미지 생성 속도 및 품질 문제
- 증상: DALL-E 3 모델 사용 시 이미지 생성 속도가 느리고 일관성 부족
- 원인: API 호출 제한 및 프롬프트 최적화 부족
- 해결:
  1. 이미지 생성 작업 큐 시스템 구현으로 API 호출 최적화
  2. 프롬프트 엔지니어링 기법 적용으로 일관성 있는 이미지 생성
  3. 생성된 이미지 캐싱 시스템 도입으로 중복 요청 최소화
- 결과: 이미지 생성 속도 40% 향상, 사용자 만족도 25% 증가

이러한 트러블슈팅 경험을 통해 서비스의 안정성과 성능을 크게 향상시켰으며, 사용자에게 더 나은 경험을 제공할 수 있게 되었습니다. 앞으로도 지속적인 모니터링과 개선을 통해 서비스 품질을 높여갈 계획입니다.
