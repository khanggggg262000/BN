const texts = [
    "I Love You",
    "Chúc bé 1 tháng 6 vui vẻ",
    "Anh yêu em",
    "Anh thương em",
    "Em là số 1",
    "An Khang thương Bé Nên nhiều",
        "I Love You",
    "Chúc bé 1 tháng 6 vui vẻ",
    "Anh yêu em",
    "Anh thương em",
    "Em là số 1",
    "An Khang thương Bé Nên nhiều",
];


const scene = document.getElementById("scene");
let rotateX = 0, rotateY = 0;
let targetRotateX = 0, targetRotateY = 0;
const maxRotate = 30;

document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    targetRotateY = ((e.clientX - centerX) / centerX) * maxRotate;
    targetRotateX = ((e.clientY - centerY) / centerY) * maxRotate;
});

let touchStartX = 0, touchStartY = 0;
document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    targetRotateY = ((touchX - centerX) / centerX) * maxRotate;
    targetRotateX = ((touchY - centerY) / centerY) * maxRotate;
});

function updateRotation() {
    rotateX += (targetRotateX - rotateX) * 0.1;
    rotateY += (targetRotateY - rotateY) * 0.1;
    scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    requestAnimationFrame(updateRotation);
}
updateRotation();


// Kiểm tra nếu là mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

function createFallingText(initial = false) {
    if (scene.childElementCount > 300) return; // Giới hạn tối đa 300 phần tử
    const text = document.createElement("div");
    text.className = `falling-text text-${Math.floor(Math.random() * 3) + 1}`;
    text.innerText = texts[Math.floor(Math.random() * texts.length)];

    const padding = 40; // khoảng cách từ mép màn hình
const startX = Math.random() * (window.innerWidth - 2 * padding) + padding;
    const zLayer = Math.random() * 400 - 200;
    text.style.left = startX + "px";
    text.style.fontSize = `${Math.random() * 20 + 18}px`;
    text.style.transform = `translateZ(${zLayer}px)`;

    // Xuất hiện ở vị trí ngẫu nhiên hoặc ở trên cùng
    const randomStart = Math.random() < 0.8; // 80% bắt đầu từ vị trí ngẫu nhiên
    const startY = randomStart
        ? Math.random() * window.innerHeight // Ngẫu nhiên trong màn hình
        : -50; // Từ trên rơi xuống

    text.style.top = startY + "px";
    scene.appendChild(text);

    setTimeout(() => {
        text.remove();
    }, (isMobile ? 3000 : 5000));

    let posY = startY;

    const speed = Math.random() * 2 + (isMobile ? 2.00 : 0.5);

    function animate() {
        posY += speed;
        text.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            text.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }

    animate();
}


function createHeart(initial = false, initialY = -50) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    heart.style.left = startX + "px";
    heart.style.top = initial ? (Math.random() * window.innerHeight) + "px" : "-50px";
    heart.style.transform = `translateZ(${zLayer}px)`;

    scene.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, (isMobile ? 3000 : 4000));

    let posY = initial ? parseFloat(heart.style.top) : -50;
    const speed = Math.random() * 1.5 + (isMobile ? 2.00 : 1);

    function animateHeart() {
        posY += speed;
        heart.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            heart.remove();
        } else {
            requestAnimationFrame(animateHeart);
        }
    }
    animateHeart();
}


// Điều chỉnh số lượng tùy theo thiết bị
const initialTextCount = isMobile ? 10 : 30;
const initialHeartCount = isMobile ? 3 : 10;
const initialRoseCount = isMobile ? 2 : 5;

const textInterval = isMobile ? 200 : 80;
const heartInterval = isMobile ? 800 : 500;
const roseInterval = isMobile ? 1000 : 600;

// Khởi tạo ban đầu với mật độ phù hợp
for (let i = 0; i < initialTextCount; i++) {
    createFallingText(true);
}
for (let i = 0; i < initialHeartCount; i++) {
    createHeart(true);
}
for (let i = 0; i < initialRoseCount; i++) {
    createRose(true);
}

// Sinh thêm phần tử theo chu kỳ
setInterval(createFallingText, textInterval);
setInterval(createHeart, heartInterval);
setInterval(createRose, roseInterval);
