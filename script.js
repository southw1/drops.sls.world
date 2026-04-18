const track = document.getElementById("track");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const tierButtons = document.querySelectorAll(".tier-btn");

// 🎯 Guns per tier
const guns = {
    t0: ["Hi Point", "Glock 26", "Glock 22"],
    t1: ["G17", "G19", "G21", "PD 509", "FN"],
    t2: ["Banshee ARP", "G40 Switch", "G19 Switch", "G40 Vintage"],
    t3: ["7 Inch ARP", "Micro Draco", "G17 Switch", "G23 Switch"],
    t4: ["Remington 870", "WhiteOut ARP", "300 Blackout", "Glock 18"]
};

// Toggle tiers
tierButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
    });
});

// Get active pool
function getPool() {
    let pool = [];
    tierButtons.forEach(btn => {
        if (btn.classList.contains("active")) {
            pool = pool.concat(
                guns[btn.dataset.tier].map(g => ({
                    name: g,
                    tier: btn.dataset.tier
                }))
            );
        }
    });
    return pool;
}

// Build track
function buildTrack(pool) {
    track.innerHTML = "";

    for (let i = 0; i < 60; i++) {
        let item = pool[Math.floor(Math.random() * pool.length)];

        let div = document.createElement("div");
        div.className = `card ${item.tier}`;
        div.innerText = item.name;

        track.appendChild(div);
    }
}

// Spin
spinBtn.addEventListener("click", () => {
    let pool = getPool();

    if (pool.length === 0) {
        resultDiv.innerHTML = "Select at least one tier!";
        return;
    }

    buildTrack(pool);

    let spinDistance = Math.floor(Math.random() * 3000) + 3000;

    track.style.transition = "transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)";
    track.style.transform = `translateX(-${spinDistance}px)`;

    setTimeout(() => {
        let result = pool[Math.floor(Math.random() * pool.length)];
        resultDiv.innerHTML = `🎉 You got: <b>${result.name}</b>`;
    }, 4000);
});
