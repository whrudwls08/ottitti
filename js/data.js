window.KKUNSUB = {
  lastChecked: "2026-07-24",
  disclaimer:
    "표시 요금은 웹 직접결제 기준 참고값입니다. 인앱·통신사·번들·프로모션에 따라 달라지며, 가입·해지 전 각사 공식 안내를 확인하세요. 해지 메뉴명은 앱/웹 UI 개편으로 달라질 수 있습니다.",
  otts: [
    {
      id: "coupangplay",
      name: "쿠팡플레이",
      short: "쿠플",
      color: "#c2410c",
      logo: "img/otts/coupangplay.svg",
      tagline: "와우 멤버십에 붙는 가성비 스트리밍",
      site: "https://www.coupangplay.com/",
      plans: [
        {
          name: "광고형(비회원)",
          price: 0,
          note: "광고 시청 조건 무료(정책 변동 가능 — 공식 확인)",
          screens: 1,
          quality: "HD~",
          ads: true,
        },
        {
          name: "로켓와우 포함",
          price: 7890,
          note: "와우 멤버십 월요금 참고값(배송 등 혜택 포함·시점별 변동)",
          screens: 2,
          quality: "HD~",
          ads: false,
        },
      ],
      strengths: ["최저 체감 비용", "스포츠·예능 일부", "배송 멤버십 겸용"],
      cancelPaths: [
        {
          path: "로켓와우 멤버십",
          steps: [
            "쿠팡 앱/웹 로그인",
            "마이쿠팡 → 와우 멤버십",
            "해지하기 진행",
            "와우에 포함된 쿠팡플레이 혜택도 함께 종료되는 구조입니다(쿠팡 공식 FAQ)",
          ],
          official: "https://news.coupang.com/archives/64216/",
        },
        {
          path: "쿠팡플레이 패스(Pass)가 있는 경우",
          steps: [
            "와우를 해지하려면 먼저 패스(Pass) 구독을 해지해야 할 수 있습니다(쿠팡 공식 FAQ)",
            "패스 해지: 쿠팡에서 와우 해지 시 함께, 또는 쿠팡플레이 앱에서 별도 해지",
            "본인 계정에 패스가 있는지는 쿠팡플레이/와우 화면에서 확인",
          ],
          official: "https://news.coupang.com/archives/64216/",
        },
      ],
      tips: [
        "일반 와우 혜택의 쿠팡플레이와, 별도 ‘패스’ 구독은 해지 순서가 다를 수 있습니다.",
        "무료체험 중에는 즉시 해지가 안 되고 체험 종료일에 해지되는 경우가 있습니다(쿠팡 FAQ).",
      ],
    },
    {
      id: "tving",
      name: "티빙",
      short: "티빙",
      color: "#ff2d55",
      logo: "img/otts/tving.svg",
      tagline: "국내 예능·드라마·스포츠 중심",
      site: "https://www.tving.com/",
      plans: [
        {
          name: "광고형 스탠다드",
          price: 5500,
          note: "유료 OTT 중 최저가 구간(참고)",
          screens: 2,
          quality: "FHD",
          ads: true,
        },
        {
          name: "베이직",
          price: 9500,
          screens: 1,
          quality: "FHD",
          ads: false,
        },
        {
          name: "스탠다드",
          price: 13500,
          screens: 2,
          quality: "FHD",
          ads: false,
        },
        {
          name: "프리미엄",
          price: 17000,
          screens: 4,
          quality: "4K",
          ads: false,
        },
      ],
      strengths: ["광고형 최저가", "국내 화제작", "KBO 등 스포츠(요금제별 상이)"],
      cancelPaths: [
        {
          path: "티빙 직접결제",
          steps: [
            "tving.com 또는 앱 로그인",
            "MY(또는 내 정보) → 이용권/구독 관리",
            "정기결제·자동결제 해지",
            "해지는 보통 다음 갱신을 막는 것이며, 이미 결제한 이용 기간까지는 시청 가능한 경우가 많습니다(환불과는 별개)",
          ],
          official: "https://www.tving.com/",
        },
        {
          path: "App Store / Google Play",
          steps: [
            "결제했던 스토어 구독 관리로 이동",
            "티빙 구독 선택 → 구독 취소",
            "스토어 결제분은 티빙 앱 안에서 해지가 안 되는 경우가 많습니다",
          ],
          official: "https://support.google.com/googleplay/answer/7018481?hl=ko",
        },
        {
          path: "통신사·제휴(예: 우주패스 등)",
          steps: [
            "티빙이 아니라 결제한 통신사/제휴 상품 쪽에서 해지",
            "티빙 계정에 해지 버튼이 없으면 결제처를 먼저 확인",
          ],
          official: "https://www.tving.com/",
        },
      ],
      tips: [
        "디즈니+/웨이브 번들은 ‘결제한 쪽’(티빙 또는 디즈니+ 등)에서 관리합니다.",
        "앱 삭제만으로는 결제가 멈추지 않습니다.",
      ],
    },
    {
      id: "appletv",
      name: "Apple TV+",
      short: "애플TV+",
      color: "#8b8b8b",
      logo: "img/otts/appletv.svg",
      tagline: "단일 요금·오리지널 중심",
      site: "https://tv.apple.com/kr",
      plans: [
        {
          name: "월간",
          price: 6500,
          note: "요금·혜택은 Apple 계정 지역/프로모션에 따라 다름",
          screens: 6,
          quality: "4K",
          ads: false,
        },
      ],
      strengths: ["단일 요금", "가족 공유(Apple 가족)", "광고 없음"],
      cancelPaths: [
        {
          path: "Apple 구독",
          steps: [
            "iPhone 설정 → Apple ID(이름) → 구독",
            "Apple TV+ 선택 → 구독 취소",
            "또는 account.apple.com 구독 관리",
          ],
          official: "https://support.apple.com/ko-kr/HT202039",
        },
      ],
      tips: ["다른 서비스 번들에 포함돼 있으면 Apple이 아닌 결제처에서 해지해야 할 수 있습니다."],
    },
    {
      id: "netflix",
      name: "넷플릭스",
      short: "넷플",
      color: "#e50914",
      logo: "img/otts/netflix.svg",
      tagline: "글로벌·K-오리지널 카탈로그",
      site: "https://www.netflix.com/kr/",
      plans: [
        {
          name: "광고형 스탠다드",
          price: 7000,
          screens: 2,
          quality: "FHD",
          ads: true,
        },
        {
          name: "스탠다드",
          price: 13500,
          screens: 2,
          quality: "FHD",
          ads: false,
        },
        {
          name: "프리미엄",
          price: 17000,
          screens: 4,
          quality: "4K",
          ads: false,
        },
      ],
      strengths: ["콘텐츠 규모", "기기 호환", "광고형 진입"],
      cancelPaths: [
        {
          path: "넷플릭스 직접결제",
          steps: [
            "netflix.com 로그인",
            "멤버십 관리(계정) 페이지로 이동",
            "해지 → 해지 완료",
            "앱 삭제·로그아웃만으로는 해지되지 않습니다(넷플릭스 공식)",
          ],
          official: "https://help.netflix.com/ko/node/407",
        },
        {
          path: "결제 파트너(통신사·스토어·네이버 등)",
          steps: [
            "계정에 해지 옵션이 없으면 결제 파트너를 통해 해지해야 합니다(넷플릭스 공식)",
            "계정 멤버십 섹션의 안내 링크를 따름",
            "Apple/Google·통신사·네이버 멤버십 등은 각 결제처에서 취소",
          ],
          official: "https://help.netflix.com/ko/node/407",
        },
      ],
      tips: [
        "결제 주기가 남아 있을 때 해지하면, 주기 종료까지 시청 가능한 것이 공식 안내입니다.",
        "멤버십 일시정지는 일부 요금제·결제수단에서만 제공됩니다(넷플릭스 공식).",
      ],
    },
    {
      id: "wavve",
      name: "웨이브",
      short: "웨이브",
      color: "#1a6dff",
      logo: "img/otts/wavve.svg",
      tagline: "지상파·국내 콘텐츠",
      site: "https://www.wavve.com/",
      plans: [
        {
          name: "베이직",
          price: 7900,
          screens: 1,
          quality: "FHD",
          ads: false,
        },
        {
          name: "스탠다드",
          price: 10900,
          screens: 2,
          quality: "FHD",
          ads: false,
        },
        {
          name: "프리미엄",
          price: 13900,
          screens: 4,
          quality: "4K",
          ads: false,
        },
      ],
      strengths: ["지상파 계열", "연간 결제 할인(상품별)", "4K 프리미엄"],
      cancelPaths: [
        {
          path: "웨이브 직접결제",
          steps: [
            "앱/웹 로그인",
            "MY → 이용권/구독(결제) 관련 메뉴",
            "자동결제 해지",
            "웨이브 약관상 자동결제 해지 시 다음 정기 결제부터 중단되며, 이미 결제한 잔여 기간은 이용 가능합니다",
          ],
          official: "https://member.wavve.com/signup/terms?category=payment",
        },
        {
          path: "앱 마켓(Apple/Google)",
          steps: [
            "앱 마켓 약관이 우선 적용됩니다(웨이브 결제약관)",
            "Apple/Google 구독 관리에서 웨이브 취소",
          ],
          official: "https://support.google.com/googleplay/answer/7018481?hl=ko",
        },
        {
          path: "통신사·제휴(예: SKT 구독)",
          steps: [
            "제휴로 가입한 경우 웨이브가 아니라 해당 통신사/제휴처에서 해지",
            "웨이브 고객센터(1599-3709 등) 또는 제휴 안내에 문의",
          ],
          official: "https://www.wavve.com/",
        },
      ],
      tips: [
        "메뉴 라벨은 UI에 따라 ‘구독정보/이용권 관리’ 등으로 다를 수 있습니다.",
        "티빙 합병·요금 관련 보도가 있었으니 장기 약정 전 공식 공지를 확인하세요.",
      ],
    },
    {
      id: "watcha",
      name: "왓챠",
      short: "왓챠",
      color: "#ff0558",
      logo: "img/otts/watcha.svg",
      tagline: "취향·독립·예술 영화",
      site: "https://watcha.com/",
      plans: [
        {
          name: "베이직",
          price: 7900,
          screens: 1,
          quality: "HD~",
          ads: false,
        },
        {
          name: "프리미엄",
          price: 12900,
          screens: 4,
          quality: "HD~",
          ads: false,
          note: "상품 운영 상태는 공식에서 재확인",
        },
      ],
      strengths: ["큐레이션", "취향 추천", "시네마 계열"],
      cancelPaths: [
        {
          path: "왓챠 직접결제",
          steps: [
            "watcha.com 또는 앱 로그인",
            "계정/이용권·결제 메뉴에서 정기결제 해지",
            "메뉴명·경로는 UI 변경 가능성이 있어 공식 화면 기준을 따름",
          ],
          official: "https://watcha.com/",
        },
        {
          path: "스토어 결제",
          steps: ["Apple/Google 구독에서 왓챠 취소"],
          official: "https://support.google.com/googleplay/answer/7018481?hl=ko",
        },
      ],
      tips: [
        "운영·요금제 변동 이슈가 보도된 적 있습니다. 해지·약정 전 공식 상태를 확인하세요.",
      ],
    },
    {
      id: "disney",
      name: "디즈니+",
      short: "디즈니+",
      color: "#113ccf",
      logo: "img/otts/disney.svg",
      tagline: "디즈니·마블·픽사·스타워즈",
      site: "https://www.disneyplus.com/ko-kr",
      plans: [
        {
          name: "스탠다드",
          price: 9900,
          screens: 2,
          quality: "FHD",
          ads: false,
        },
        {
          name: "프리미엄",
          price: 13900,
          screens: 4,
          quality: "4K",
          ads: false,
        },
      ],
      strengths: ["프랜차이즈 IP", "가족 시청", "번들(티빙·웨이브)"],
      cancelPaths: [
        {
          path: "디즈니+ 직접결제",
          steps: [
            "www.disneyplus.com/account/cancel-subscription 접속(로그인)",
            "멤버십 취소 클릭 후 절차 완료",
            "달리 공지되지 않는 한, 자동갱신 중단 후 현재 결제 주기 종료 시 발효(디즈니+ 공식 취소·환불 정책)",
          ],
          official: "https://www.disneyplus.com/ko-kr/welcome/cancellation-and-refund-policy",
        },
        {
          path: "타사·통신·번들",
          steps: [
            "통신사·IPTV·티빙 등 파트너 결제이면 파트너에서 해지",
            "디즈니+ 계정에 해지 버튼이 없으면 결제처를 먼저 확인",
          ],
          official: "https://help.disneyplus.com/article/disneyplus-en-kr-third-party-subscription",
        },
      ],
      tips: [
        "번들은 ‘어디서 결제했는지’가 해지 창구입니다.",
        "무료체험/프로모션으로 구독한 경우 취소가 즉시 발효될 수 있습니다(공식 정책).",
      ],
    },
    {
      id: "youtube",
      name: "유튜브 프리미엄",
      short: "유프",
      color: "#ff0033",
      logo: "img/otts/youtube.svg",
      tagline: "광고 제거·백그라운드·뮤직",
      site: "https://www.youtube.com/premium",
      plans: [
        {
          name: "개인(참고)",
          price: 14900,
          note: "요금·플랜명(라이트 등)은 시점·결제처별 상이 — 공식 확인",
          screens: 1,
          quality: "—",
          ads: false,
        },
      ],
      strengths: ["유튜브 광고 제거", "뮤직 포함 상품", "가족요금"],
      cancelPaths: [
        {
          path: "YouTube/Google 직접 결제",
          steps: [
            "youtube.com/paid_memberships 접속(해당 Google 계정 로그인)",
            "YouTube Premium → 멤버십 관리",
            "구독 취소/비활성화 확인",
          ],
          official: "https://www.youtube.com/paid_memberships",
        },
        {
          path: "Google Play 결제",
          steps: [
            "Play 스토어 → 결제 및 구독 → 구독",
            "YouTube Premium 취소",
            "앱 삭제만으로는 구독이 취소되지 않습니다(Google Play 공식)",
          ],
          official: "https://support.google.com/googleplay/answer/7018481?hl=ko",
        },
        {
          path: "Apple로 결제한 경우",
          steps: [
            "설정 → Apple ID → 구독에서 YouTube Premium 취소",
          ],
          official: "https://support.apple.com/ko-kr/HT202039",
        },
      ],
      tips: ["OTT와 성격이 다르지만 월 고정비에서 자주 겹칩니다. 결제 경로별로 해지 창구가 갈립니다."],
    },
  ],
  storeGuides: [
    {
      id: "apple",
      name: "App Store",
      steps: [
        "설정 → Apple ID(이름) → 구독",
        "해당 서비스 선택 → 구독 취소",
      ],
      url: "https://support.apple.com/ko-kr/HT202039",
    },
    {
      id: "google",
      name: "Google Play",
      steps: [
        "Play 스토어 → 프로필 → 결제 및 구독 → 구독",
        "서비스 선택 → 구독 취소",
        "앱 삭제 ≠ 구독 취소(Google 공식)",
      ],
      url: "https://support.google.com/googleplay/answer/7018481?hl=ko",
    },
    {
      id: "payinfo",
      name: "페이인포(자동이체·카드자동납부)",
      steps: [
        "payinfo.or.kr에서 본인인증",
        "계좌 자동이체 / 카드 자동납부 조회",
        "해당 건 해지(가능 항목만 — OTT 전부가 뜨진 않음)",
      ],
      url: "https://www.payinfo.or.kr/",
    },
  ],
};
