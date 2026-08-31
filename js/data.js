window.KKUNSUB = {
  lastChecked: "2026-08-31",
  disclaimer:
    "비공식 참고 안내입니다. 각 OTT·통신사·스토어와 제휴·대리 관계가 없으며, 표시 요금·절차는 작성 시점 기준입니다. 가입·해지·환불은 각사·결제처 공식 안내를 우선 확인하세요.",
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
      strengths: ["와우 포함 시 체감 비용", "스포츠·예능 일부", "배송 멤버십 겸용"],
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
      mistakes: [
        "쿠팡플레이 앱만 삭제하고 와우·Pass 자동결제는 그대로 둠",
        "Pass가 있는데 와우만 먼저 해지하려다 순서 오류",
      ],
      intro:
        "쿠팡플레이는 단독 앱 구독보다 로켓와우·쿠팡플레이 패스(Pass)와 묶인 경우가 많아요. 와우 해지와 Pass 해지 순서가 다를 수 있으니, 본인 계정에 어떤 상품이 붙어 있는지 먼저 확인하는 것이 좋습니다.",
      findPayment:
        "카드·계좌 명세에 ‘쿠팡’ ‘로켓와우’가 보이면 쿠팡 쪽 결제예요. 쿠팡플레이만 쓰는데 와우가 없다면 Pass 별도 구독을 의심해 보세요. 페이인포에서 ‘쿠팡’ 자동납부도 함께 확인할 수 있습니다.",
      billingNote:
        "와우·Pass 해지 후에도 이미 결제된 잔여 기간·환불은 쿠팡 공식 FAQ 기준입니다. 무료체험 중 해지는 체험 종료일에 적용되는 경우가 많아요.",
      faqs: [
        {
          q: "와우 해지하면 쿠팡플레이도 같이 끊기나요?",
          a: "와우 멤버십에 포함된 쿠팡플레이 혜택은 와우 해지와 함께 종료되는 구조입니다. Pass 등 별도 유료 상품은 별도 해지가 필요할 수 있어요.",
        },
        {
          q: "쿠팡플레이 앱만 지워도 결제가 멈추나요?",
          a: "앱 삭제만으로는 와우·Pass 자동결제가 중단되지 않습니다. 쿠팡 또는 쿠팡플레이의 멤버십·구독 메뉴에서 해지해 주세요.",
        },
        {
          q: "패스와 와우 중 무엇을 먼저 해지해야 하나요?",
          a: "와우 해지 전 Pass 해지가 필요할 수 있습니다. 마이쿠팡·쿠팡플레이 화면에서 본인에게 Pass가 있는지 먼저 확인하는 편이 안전해요.",
        },
        {
          q: "해지 후에도 영상을 볼 수 있나요?",
          a: "이미 결제한 기간·와우 혜택 잔여일은 쿠팡 정책에 따릅니다. 해지는 ‘다음 갱신 중단’인지 ‘즉시 종료’인지 FAQ에서 확인해 주세요.",
        },
      ],
      relatedGuides: [{ label: "자동이체·페이인포 조회", href: "ott-jadoiche.html" }],
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
          note: "광고형 저렴 구간(참고·시점별 변동)",
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
      strengths: ["광고형 저렴 구간", "국내 화제작", "KBO 등 스포츠(요금제별 상이)"],
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
      mistakes: [
        "티빙 앱에서만 해지를 찾다 포기 → 우주패스·스토어·번들 결제처 미확인",
        "번들 중 한 앱만 해지하고 다른 서비스 구독이 남음",
      ],
      intro:
        "티빙은 웹·앱 직접결제 외에 App Store·Google Play, 통신사 결합(우주패스 등), 디즈니+·웨이브 번들로 가입한 경우가 많아요. 계정에 해지 버튼이 없다면 ‘티빙이 아닌 결제처’에서 취소해야 할 가능성이 큽니다.",
      findPayment:
        "티빙 앱 → MY·이용권 화면에 ‘App Store/Google Play 결제’ 표시가 있으면 스토어 구독입니다. 통신사 명세서에 ‘우주패스’ ‘티빙’ ‘SKT/KT/LGU+ 부가’가 보이면 통신사·제휴 쪽을 확인하세요.",
      billingNote:
        "직접결제 해지는 보통 다음 갱신일부터 자동결제가 멈추고, 이미 납부한 이용 기간까지는 시청 가능한 경우가 많습니다. 스토어·통신사 결제는 해당처 환불·잔여일 정책을 따릅니다.",
      faqs: [
        {
          q: "티빙 앱에서 해지 메뉴가 안 보여요",
          a: "스토어나 통신사·번들로 결제했다면 티빙 앱 안에 해지 버튼이 없을 수 있어요. 결제하신 App Store·Play·통신사 앱에서 구독을 찾아보세요.",
        },
        {
          q: "디즈니+·웨이브 번들은 어디서 해지하나요?",
          a: "번들을 ‘어디서 결제했는지’가 해지 창구입니다. 티빙·디즈니+·통신사 중 본인 결제처를 먼저 확인해 주세요.",
        },
        {
          q: "광고형과 일반 요금제 해지 방법이 다른가요?",
          a: "해지 경로는 결제처 기준이지 요금제 이름 기준이 아닌 경우가 많아요. 본인 이용권·구독 관리 메뉴에서 정기결제 해지를 찾으면 됩니다.",
        },
        {
          q: "해지하면 바로 못 보게 되나요?",
          a: "다음 결제만 막고 잔여 기간은 이용 가능한 경우가 많지만, 스토어·프로모션·약정 상품은 예외가 있을 수 있어요. 해지 확인 화면 문구를 꼭 읽어 주세요.",
        },
      ],
      relatedGuides: [
        { label: "디즈니+·티빙 번들 해지", href: "disney-tving-bundle-haeji.html" },
        { label: "앱스토어·Play 구독 해지", href: "appstore-ott-haeji.html" },
        { label: "통신사 결합 OTT", href: "tongsin-ott-haeji.html" },
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
            "또는 account.apple.com → 구독 관리",
            "Apple TV 앱 삭제만으로는 구독이 취소되지 않음",
          ],
          official: "https://support.apple.com/ko-kr/HT202039",
        },
        {
          path: "통신사·제휴·번들 포함",
          steps: [
            "설정 → Apple ID → 구독에 Apple TV+가 없으면 통신사·OTT 번들 가능성",
            "통신사 앱 부가서비스·구독·제휴 메뉴에서 Apple TV+ 또는 패키지명 확인",
            "해당 결제처에서 해지·해지 예약",
            "번들 전체 해지 후 필요한 서비스만 다시 가입하는 경우가 많음",
          ],
          official: "https://whrudwls08.github.io/ottitti/tongsin-ott-haeji.html",
        },
      ],
      tips: ["다른 서비스 번들에 포함돼 있으면 Apple이 아닌 결제처에서 해지해야 할 수 있습니다."],
      mistakes: [
        "Apple TV 앱만 삭제하고 Apple ID 구독은 유지",
        "가족 공유 멤버 계정에서 해지 시도 → organiser 계정 확인 필요",
      ],
      intro:
        "Apple TV+는 대부분 Apple ID 구독으로 관리됩니다. iPhone 설정·account.apple.com·Apple TV 앱 중 본인이 가입한 경로에서 취소하면 돼요. 통신사·타사 번들에 포함된 경우 Apple 구독 목록에 안 보일 수 있습니다.",
      findPayment:
        "설정 → Apple ID → 구독에 Apple TV+가 있으면 Apple 결제입니다. 없는데 시청이 된다면 통신사·OTT 번들·프로모션 포함을 의심하고, 해당 서비스 구독·부가서비스 메뉴를 확인하세요.",
      billingNote:
        "Apple 구독 취소는 보통 현재 결제 주기 종료까지 이용 가능하고, 다음 주기부터 청구가 멈춥니다. 무료 체험·프로모션은 취소 시점에 따라 즉시 종료될 수 있어요.",
      faqs: [
        {
          q: "Apple TV+ 앱만 삭제하면 되나요?",
          a: "앱 삭제만으로는 Apple ID 구독이 취소되지 않습니다. 설정 또는 account.apple.com의 구독에서 취소해 주세요.",
        },
        {
          q: "가족 공유로 쓰는데 누가 해지하나요?",
          a: "구독을 결제한 Apple ID(가족 органiser) 계정에서 구독을 관리합니다. 본인 계정에 구독이 없으면 organiser에게 확인해 주세요.",
        },
        {
          q: "통신사에 Apple TV+가 포함돼 있어요",
          a: "통신사·제휴 상품이면 Apple 구독이 아니라 통신사 부가서비스에서 해지해야 할 수 있어요.",
        },
        {
          q: "환불은 Apple에서 되나요?",
          a: "환불 가능 여부는 Apple 지원·구매 내역 기준입니다. 해지와 환불은 별개일 수 있어요.",
        },
      ],
      relatedGuides: [
        { label: "App Store 구독 해지", href: "appstore-ott-haeji.html" },
        { label: "통신사 OTT 해지", href: "tongsin-ott-haeji.html" },
      ],
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
      mistakes: [
        "앱 삭제·로그아웃만 하고 멤버십 해지를 하지 않음",
        "계정에 해지가 없는데 netflix.com만 반복 확인 → 결제 파트너(스토어·통신사) 미확인",
      ],
      intro:
        "넷플릭스는 netflix.com 직접결제와 Apple·Google·통신사·네이버 멤버십 등 ‘결제 파트너’ 경로가 섞여 있어요. 계정 → 멤버십에 ‘해지’가 보이면 직접결제, 없으면 파트너 안내 링크를 따라가야 합니다.",
      findPayment:
        "넷플릭스 웹 → 계정 → 멤버십에 결제 수단·파트너 이름이 표시됩니다. 카드 명세서가 ‘Apple’ ‘Google’ ‘SKT’ 등이면 해당처 구독·부가서비스를 확인하세요.",
      billingNote:
        "공식 안내상 해지 후에도 결제 주기 종료일까지 시청 가능한 경우가 많습니다. 일시정지·다운그레이드는 요금제·결제처마다 다르니 멤버십 화면에서 확인해 주세요.",
      faqs: [
        {
          q: "넷플릭스 계정에 해지 버튼이 없어요",
          a: "결제 파트너(스토어·통신사 등)로 가입했다는 뜻일 수 있어요. 멤버십 섹션의 ‘결제 정보’·파트너 안내 링크를 확인하세요.",
        },
        {
          q: "앱 삭제·로그아웃만 하면 해지되나요?",
          a: "넷플릭스 공식 안내상 앱 삭제·로그아웃만으로는 멤버십이 해지되지 않습니다. 결제처에서 구독 취소가 필요해요.",
        },
        {
          q: "광고형 요금제도 해지 방법이 같나요?",
          a: "해지 창구는 결제처 기준입니다. 광고형·스탠다드·프리미엄 모두 본인 멤버십 관리 또는 결제 파트너에서 취소하면 됩니다.",
        },
        {
          q: "가족·공유 계정은 누가 해지하나요?",
          a: "멤버십을 결제·관리하는 계정(계정 소유자)에서 해지합니다. 공유 받은 프로필만 있다면 소유자에게 요청해야 해요.",
        },
        {
          q: "멤버십 일시정지와 해지 차이는?",
          a: "일시정지는 일부 요금제·결제수단에서만 가능합니다. 완전히 끊으려면 해지(취소)를 선택하세요.",
        },
      ],
      relatedGuides: [
        { label: "앱스토어·Play 구독", href: "appstore-ott-haeji.html" },
        { label: "통신사 결합", href: "tongsin-ott-haeji.html" },
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
            "웨이브 고객센터 또는 제휴·통신사 안내에서 해지 경로 확인",
          ],
          official: "https://www.wavve.com/",
        },
      ],
      tips: [
        "메뉴 라벨은 UI에 따라 ‘구독정보/이용권 관리’ 등으로 다를 수 있습니다.",
        "연간·약정 상품은 중도 해지·환불 규정이 다를 수 있어요. 가입 화면·약관을 먼저 확인하세요.",
      ],
      mistakes: [
        "웨이브 앱에 해지가 없는데 포기 → 스토어·통신사 구독을 확인하지 않음",
        "번들로 가입했는데 웨이브 단독 해지 메뉴만 찾음",
      ],
      intro:
        "웨이브는 웹·앱 직접결제, 앱 마켓, SKT 등 통신·제휴 경로가 있습니다. 웨이브 MY·이용권 메뉴에 해지가 없다면 스토어나 통신사 쪽 구독·부가서비스를 먼저 확인해 보세요.",
      findPayment:
        "웨이브 앱 MY → 이용권·결제 정보에 ‘Play/App Store’ 표시가 있는지 봅니다. 통신사 명세에 ‘웨이브’ ‘SKT 구독’ 등이 있으면 통신사 OTT 해지 안내 페이지도 참고하세요.",
      billingNote:
        "웨이브 결제약관상 자동결제 해지 시 다음 정기 결제부터 중단되고, 이미 결제한 잔여 기간은 이용 가능하다고 안내하는 경우가 많습니다. 제휴·스토어는 해당처 정책을 따릅니다.",
      faqs: [
        {
          q: "웨이브 앱에서 해지가 안 보여요",
          a: "Apple·Google·통신사·제휴로 가입했다면 웨이브가 아닌 결제처에서 취소해야 할 수 있어요.",
        },
        {
          q: "티빙·디즈니+ 번들과 웨이브 단독 해지가 다른가요?",
          a: "번들은 결제한 플랫폼(디즈니+·티빙·통신사 등)에서 관리합니다. 웨이브 단독과 번들은 해지 창구가 다를 수 있어요.",
        },
        {
          q: "연간 이용권 중간 해지는?",
          a: "연간·약정 상품은 환불·중도 해지 규정이 다릅니다. MY·고객센터·결제약관에서 본인 상품 유형을 확인하세요.",
        },
        {
          q: "앱만 지우면 자동결제가 멈추나요?",
          a: "앱 삭제만으로는 자동결제가 해지되지 않습니다. 이용권·구독 관리 또는 스토어·통신사에서 취소해 주세요.",
        },
      ],
      relatedGuides: [
        { label: "디즈니+·티빙·웨이브 번들", href: "disney-tving-bundle-haeji.html" },
        { label: "통신사 결합", href: "tongsin-ott-haeji.html" },
        { label: "앱스토어·Play", href: "appstore-ott-haeji.html" },
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
          path: "스토어 결제 (Apple · Google Play)",
          steps: [
            "iPhone·iPad: 설정 → Apple ID(이름) → 구독 → 왓챠 → 구독 취소",
            "Android: Play 스토어 → 프로필 → 결제 및 구독 → 구독 → 왓챠 → 취소",
            "왓챠 앱에 해지 버튼이 없어도 정상(스토어 결제인 경우)",
            "가족·다른 Apple/Google 계정 결제 여부 확인",
          ],
          official: "https://support.google.com/googleplay/answer/7018481?hl=ko",
        },
      ],
      tips: [
        "요금제·상품 구성은 watcha.com에서 최신 상태를 확인하세요.",
        "카드 명세에 Apple·Google이 찍히면 watcha.com이 아니라 스토어 구독에서 해지하세요.",
        "이용권·구독·결제 등 메뉴명은 앱 개편으로 바뀔 수 있어요.",
      ],
      mistakes: [
        "왓챠 앱에서 해지를 찾다 포기 → 실제로는 App Store·Play 구독인 경우",
        "프로필 공유만 받은 계정에서 해지 시도",
      ],
      intro:
        "왓챠는 watcha.com·앱 직접결제와 Apple·Google 스토어 경로가 있습니다. 계정·이용권 메뉴에서 정기결제 해지를 찾고, 없으면 스토어 구독 목록을 확인하세요.",
      findPayment:
        "왓챠 앱/웹 → 계정·이용권·결제에 등록된 수단을 확인합니다. 카드 명세가 ‘Apple’ ‘Google’이면 스토어 구독 관리로 이동하세요.",
      billingNote:
        "직접결제 해지는 보통 다음 갱신부터 자동결제가 멈추고, 잔여 이용 기간은 정책에 따릅니다. 스토어 결제는 Apple·Google 환불·잔여일 규정을 확인하세요.",
      faqs: [
        {
          q: "왓챠 메뉴 이름이 안내와 달라요",
          a: "앱 개편으로 ‘이용권’ ‘구독’ ‘결제’ 등 라벨이 바뀔 수 있어요. 공식 앱·웹의 계정·결제 관련 메뉴를 순서대로 확인해 주세요.",
        },
        {
          q: "스토어에서 가입했는데 왓챠에서 해지할 수 있나요?",
          a: "스토어 결제분은 Apple·Google 구독 관리에서 취소하는 경우가 많습니다. 왓챠 앱에 해지 버튼이 없을 수 있어요.",
        },
        {
          q: "베이직·프리미엄 해지 방법이 다른가요?",
          a: "해지 경로는 결제처 기준입니다. 본인이 가입한 이용권·정기결제 해지 메뉴를 찾으면 됩니다.",
        },
        {
          q: "환불·잔여 기간은?",
          a: "환불 가능 여부·잔여 시청 기간은 왓챠·스토어 약관과 해지 확인 화면에 표시됩니다. 해지 전 문구를 확인해 주세요.",
        },
      ],
      relatedGuides: [
        { label: "앱스토어·Play 구독", href: "appstore-ott-haeji.html" },
        { label: "자동이체·구독 확인", href: "ott-jadoiche.html" },
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
      mistakes: [
        "디즈니+ 웹에 해지가 없는데 포기 → 티빙·통신사·IPTV 결제처 미확인",
        "번들 중 한 서비스만 해지하고 나머지 구독·청구가 남음",
      ],
      intro:
        "디즈니+는 disneyplus.com 직접결제와 티빙·웨이브 번들, 통신사·IPTV 제휴가 많습니다. account/cancel-subscription에 접속해 해지 버튼이 없으면 ‘타사·파트너 결제’로 가입한 경우예요.",
      findPayment:
        "디즈니+ 웹 → 계정 → 구독·결제 정보에서 결제 수단·파트너를 확인하세요. 티빙·통신사 번들이면 번들 해지 안내와 결제처 앱을 함께 봐 주세요.",
      billingNote:
        "디즈니+ 공식 취소·환불 정책상, 달리 안내되지 않으면 자동갱신 중단 후 현재 결제 주기 종료 시 해지가 발효됩니다. 무료체험·프로모션은 즉시 종료될 수 있어요.",
      faqs: [
        {
          q: "디즈니+ 사이트에 해지 버튼이 없어요",
          a: "통신사·티빙·IPTV 등 파트너 결제일 수 있어요. 디즈니+ 고객센터 ‘제3자 구독’ 안내와 본인 결제처를 확인하세요.",
        },
        {
          q: "티빙·웨이브 번들은 어디서 해지하나요?",
          a: "번들을 결제한 곳(디즈니+·티빙·통신사 등)에서 해지합니다. 한쪽만 해지하면 다른 서비스가 남을 수 있어요.",
        },
        {
          q: "스탠다드·프리미엄 해지가 다른가요?",
          a: "해지 창구는 결제처 기준입니다. 요금제 이름과 관계없이 구독·멤버십 취소 메뉴를 이용하세요.",
        },
        {
          q: "환불은 되나요?",
          a: "취소·환불 정책은 디즈니+ 공식 cancellation-and-refund-policy를 확인하세요. 결제처·프로모션에 따라 다릅니다.",
        },
      ],
      relatedGuides: [
        { label: "디즈니+·티빙 번들", href: "disney-tving-bundle-haeji.html" },
        { label: "통신사 결합", href: "tongsin-ott-haeji.html" },
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
      mistakes: [
        "유튜브 앱 삭제만 하고 Google·Apple 구독은 유지",
        "가족요금 관리자가 아닌 멤버 계정에서 해지 시도",
      ],
      intro:
        "유튜브 프리미엄은 Google·YouTube 직접결제, Google Play, Apple 구독, 가족 요금제 등 경로가 다양해요. youtube.com/paid_memberships에서 본인 Google 계정 구독을 확인하고, 없으면 Play·Apple 구독 목록을 봐 주세요.",
      findPayment:
        "paid_memberships 페이지에 Premium이 보이면 Google/YouTube 직접결제입니다. 없으면 Play 스토어 → 구독, 또는 iPhone 설정 → Apple ID → 구독에서 YouTube Premium을 찾으세요.",
      billingNote:
        "Google·Apple 구독 취소는 보통 현재 기간 종료까지 이용 가능하고 다음 주기부터 청구가 멈춥니다. 가족 요금제는 관리자(결제 계정)가 취소합니다.",
      faqs: [
        {
          q: "유튜브 앱만 지우면 Premium이 해지되나요?",
          a: "앱 삭제만으로는 Premium·Play·Apple 구독이 취소되지 않습니다. 구독 관리 메뉴에서 취소해 주세요.",
        },
        {
          q: "가족 요금제는 누가 해지하나요?",
          a: "Premium 가족 요금제를 결제·관리하는 Google 계정(관리자)에서 멤버십을 취소합니다.",
        },
        {
          q: "Play와 YouTube 웹 중 어디서 결제했는지 모르겠어요",
          a: "paid_memberships와 Play 구독 목록을 모두 확인하세요. 둘 다 없으면 Apple 구독도 확인해 보세요.",
        },
        {
          q: "YouTube Music만 따로 해지할 수 있나요?",
          a: "상품 구성( Premium 단독·Music 포함 등)에 따라 다릅니다. 본인 memberships 화면에 표시된 항목을 기준으로 취소하세요.",
        },
      ],
      relatedGuides: [{ label: "앱스토어·Play 구독", href: "appstore-ott-haeji.html" }],
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
