// ScrollTrigger プラグインを登録
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// 背景切り替え & ナビゲーション連動
// ============================================================
const navItems = document.querySelectorAll('.nav_item');

[
    { id: '#sec01', bg: 'bg01', navIndex: 0 },
    { id: '#sec02', bg: 'bg02', navIndex: 1 },
    { id: '#sec03', bg: 'bg03', navIndex: 2 },
    { id: '#sec04', bg: 'bg04', navIndex: 3 },
    { id: '#sec05', bg: 'bg01', navIndex: 4 },
].forEach(({ id, bg, navIndex }) => {
    ScrollTrigger.create({
        trigger: id,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateNav(bg, navIndex),
        onEnterBack: () => updateNav(bg, navIndex),
    });
});

function updateNav(bg, navIndex) {
    document.body.className = bg;
    navItems.forEach(item => item.classList.remove('current'));
    navItems[navIndex].classList.add('current');
}


// ============================================================
// スムーススクロール
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ============================================================
// Topics ボタン（排他制御）
// ============================================================
const topicBtns = document.querySelectorAll('.topic_btn');
topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        topicBtns.forEach(item => item.classList.remove('active'));
        btn.classList.add('active');
    });
});


// ============================================================
// Movie & SNS トグル
// ============================================================
document.querySelectorAll('.movie_item, .sns_item').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        item.classList.toggle('active');
    });
});


// ============================================================
// フッターナビ
// ============================================================
const footerNavItems = document.querySelectorAll('.footer_nav_item');
footerNavItems.forEach(item => {
    item.addEventListener('click', () => {
        footerNavItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    });
});


// ============================================================
// 既存コンテンツ画像のアニメーション
// ============================================================
gsap.fromTo('.sec02_visual', 
    { y: -40, opacity: 0 },
    { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.sec02_visual',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.card1_img', 
    { x: 40, opacity: 0 },
    { 
        x: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.card1_img',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    }
);

gsap.fromTo('.card2_img', 
    { x: -40, opacity: 0 },
    { 
        x: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.card2_img',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    }
);


// ============================================================
// 【新規追加】Topics ボタン左右フェードイン（デザイン＆既存挙動に干渉しません）
// ============================================================
topicBtns.forEach((btn, index) => {
    // 1番目(0)と3番目(2)は右から(x: 100)、2番目(1)と4番目(3)は左から(x: -100)
    const isEven = index % 2 === 0;
    const startX = isEven ? 100 : -100;

    gsap.fromTo(btn,
        { 
            opacity: 0, 
            x: startX 
        },
        { 
            opacity: 1, 
            x: 0, 
            duration: 1.0, 
            ease: 'power2.out',
            scrollTrigger: {
                trigger: btn,
                start: 'top 90%', // ボタンが画面の下方に見えたらアニメーション開始
                toggleActions: 'play none none none'
            }
        }
    );
});


// ============================================================
// コスメ素材専用：じわっと溶け込む極上のスロー浮遊モーション
// ============================================================
// 開始時に少しだけ（10〜20px）ズラし、少しだけ回転をかけておき、
// 2.2秒かけてじっくり元のきれいな角度（0度）に定着させます。
const decorAnimations = [
  { target: '.decor-rip1', startX: 10, startY: 15, startRot: 12 },
  { target: '.decor-burasi1-1', startX: -15, startY: -10, startRot: -15 },
  { target: '.decor-masukara1', startX: 15, startY: 10, startRot: -8 },
  { target: '.decor-hada1', startX: 10, startY: 15, startRot: 10 },
  { target: '.decor-burasi2-1', startX: 15, startY: -10, startRot: 15 },
  { target: '.decor-rip2', startX: -15, startY: 10, startRot: -12 },
  { target: '.decor-burasi1-2', startX: 10, startY: 15, startRot: 8 },
  { target: '.decor-masukara2', startX: 15, startY: -10, startRot: -10 },
  { target: '.decor-hada2', startX: 10, startY: 15, startRot: 6 },
  { target: '.decor-burasi2-2', startX: 15, startY: -15, startRot: -12 }
];

decorAnimations.forEach(cfg => {
  const element = document.querySelector(cfg.target);
  if (element) {
    gsap.fromTo(element,
      { 
        opacity: 0,
        x: cfg.startX,
        y: cfg.startY,
        rotation: cfg.startRot
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,         // アニメーション完了時は傾きをなくして美しく定着
        duration: 2.2,       // 2.2秒に延ばし、ラグジュアリーブランドのような高級感ある遅さに調整
        ease: 'power2.out',  // なめらかに減速する心地よいイージング
        scrollTrigger: {
          trigger: element,
          start: 'top 95%',  // 画面の下端に見え始めたらすぐに、ごくスローに始動
          toggleActions: 'play none none none'
        }
      }
    );
  }
});