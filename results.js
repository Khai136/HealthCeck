const data = JSON.parse(localStorage.getItem("result"));
const history = JSON.parse(localStorage.getItem("history")) || [];

username.textContent = `Halo, ${data.name}`;
score.textContent = `${data.score}/100`;

function scoreMessage(score) {
    if (score >= 80) return "🔥 Kondisi kamu cakep. Tinggal jaga konsistensi.";
    if (score >= 60) return "⚠️ Lumayan, tapi masih bisa dibenerin.";
    return "🚨 Perlu perhatian serius, jangan santai.";
}

scoreMessageEl = document.getElementById("scoreMessage");
scoreMessageEl.textContent = scoreMessage(data.score);

const bar = document.getElementById("bar");
bar.style.width = data.score + "%";
bar.style.background =
    data.score >= 80 ? "#10b981" :
    data.score >= 60 ? "#f59e0b" : "#ef4444";

function addWater() {
    data.water += 1;
    data.score = Math.min(100, data.score + 5);
    score.textContent = `${data.score}/100`;
    bar.style.width = data.score + "%";
}

history.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.date} → ${h.score}`;
    document.getElementById("history").appendChild(li);
});

function reset() {
    localStorage.removeItem("result");
    location.href = "index.html";
}
