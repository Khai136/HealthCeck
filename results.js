// Results Page JavaScript
// Display health analysis results

document.addEventListener('DOMContentLoaded', function() {
    // Get results from localStorage
    const resultsData = localStorage.getItem('healthResults');
    
    if (!resultsData) {
        // No data, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    const data = JSON.parse(resultsData);
    
    // Populate results
    populateResults(data);
    
    // Animate elements
    setTimeout(() => {
        setProgressStyles();
        animateScore();
    }, 100);
});

function populateResults(data) {
    // Update header
    document.querySelector('.result-header-compact h1').textContent = `Hasil Analisis: ${data.analysis.name}`;
    document.querySelector('.analysis-date').textContent = 
        `${data.analysis.gender}, ${data.analysis.age} tahun • ${data.analysis.analysis_date}`;
    
    // Update score
    document.querySelector('.score-number-small').textContent = data.analysis.health_score;
    document.querySelector('.circular-progress-small').setAttribute('data-score', data.analysis.health_score);
    
    // Update status badge
    const statusBadge = document.querySelector('.status-badge-inline');
    statusBadge.className = `status-badge-inline ${data.analysis.status_color}`;
    statusBadge.querySelector('span').textContent = data.analysis.status_label;
    
    // Update BMI
    document.querySelector('.bmi-value').textContent = data.analysis.bmi;
    document.querySelector('.bmi-category').textContent = 
        data.analysis.bmi_category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Update metrics
    document.querySelectorAll('.metric-pill')[0].querySelector('.pill-value').textContent = `${data.weight} kg`;
    document.querySelectorAll('.metric-pill')[1].querySelector('.pill-value').textContent = `${data.height} cm`;
    document.querySelectorAll('.metric-pill')[2].querySelector('.pill-value').textContent = `${data.meals}x`;
    document.querySelectorAll('.metric-pill')[3].querySelector('.pill-value').textContent = `${data.water}L`;
    
    // Update health metrics (highlighted pills)
    document.querySelectorAll('.metric-pill-highlight')[0].querySelector('.pill-value').textContent = data.blood_pressure;
    document.querySelectorAll('.metric-pill-highlight')[1].querySelector('.pill-value').textContent = `${data.blood_sugar} mg/dL`;
    
    // Update progress bars
    const progressBars = [
        { selector: '.bp-bar', score: data.analysis.blood_pressure_status.score },
        { selector: '.sugar-bar', score: data.analysis.blood_sugar_status.score },
        { selector: '.hydration-bar', score: data.analysis.hydration.score },
        { selector: '.meal-bar', score: data.analysis.meal_pattern.score }
    ];
    
    progressBars.forEach(bar => {
        const element = document.querySelector(bar.selector);
        if (element) {
            element.setAttribute('data-width', bar.score);
        }
    });
    
    // Update progress values
    const progressValues = document.querySelectorAll('.progress-value');
    progressValues[0].textContent = `${data.analysis.blood_pressure_status.score}/100`;
    progressValues[1].textContent = `${data.analysis.blood_sugar_status.score}/100`;
    progressValues[2].textContent = `${data.analysis.hydration.score}/100`;
    progressValues[3].textContent = `${data.analysis.meal_pattern.score}/100`;
    
    // Update recommendations
    document.querySelector('.recommendations-inline p').textContent = data.analysis.recommendations;
}

function setProgressStyles() {
    // Set circular progress (radius 54)
    const scoreCircle = document.getElementById('scoreCircle');
    const score = parseFloat(document.querySelector('.score-number-small').textContent);
    const circumference = 2 * Math.PI * 54; // 339.29
    const offset = circumference - (circumference * score / 100);
    scoreCircle.style.strokeDashoffset = offset;
    
    // Set progress bars with staggered animation
    const bars = [
        { selector: '.bp-bar', delay: 200 },
        { selector: '.sugar-bar', delay: 400 },
        { selector: '.hydration-bar', delay: 600 },
        { selector: '.meal-bar', delay: 800 }
    ];
    
    bars.forEach(bar => {
        const element = document.querySelector(bar.selector);
        if (element) {
            setTimeout(() => {
                element.style.width = element.getAttribute('data-width') + '%';
            }, bar.delay);
        }
    });
}

function animateScore() {
    const scoreElement = document.querySelector('.score-number-small');
    const targetScore = parseInt(scoreElement.textContent);
    let currentScore = 0;
    const duration = 1500;
    const increment = targetScore / (duration / 16);

    const timer = setInterval(function() {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(currentScore);
    }, 16);
}

// New Check button
function newCheck() {
    localStorage.removeItem('healthResults');
    window.location.href = 'index.html';
}

// Download PDF (using jsPDF)
function downloadPDF() {
    const resultsData = localStorage.getItem('healthResults');
    if (!resultsData) return;
    
    const data = JSON.parse(resultsData);
    
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        alert('PDF library belum dimuat. Silakan coba lagi.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add content
    doc.setFontSize(20);
    doc.text('Laporan Analisis Kesehatan', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Dibuat pada ${data.analysis.analysis_date}`, 20, 30);
    
    // Personal Info
    doc.setFontSize(14);
    doc.text('Data Pribadi', 20, 45);
    doc.setFontSize(10);
    doc.text(`Nama: ${data.name}`, 20, 55);
    doc.text(`Umur: ${data.age} tahun`, 20, 62);
    doc.text(`Jenis Kelamin: ${data.analysis.gender}`, 20, 69);
    
    // Health Score
    doc.setFontSize(14);
    doc.text('Status Kesehatan', 20, 85);
    doc.setFontSize(10);
    doc.text(`Skor Kesehatan: ${data.analysis.health_score}/100`, 20, 95);
    doc.text(`Status: ${data.analysis.status_label}`, 20, 102);
    doc.text(`BMI: ${data.analysis.bmi}`, 20, 109);
    
    // Measurements
    doc.setFontSize(14);
    doc.text('Data Pengukuran', 20, 125);
    doc.setFontSize(10);
    doc.text(`Berat Badan: ${data.weight} kg`, 20, 135);
    doc.text(`Tinggi Badan: ${data.height} cm`, 20, 142);
    doc.text(`Tekanan Darah: ${data.blood_pressure} mmHg`, 20, 149);
    doc.text(`Gula Darah: ${data.blood_sugar} mg/dL`, 20, 156);
    doc.text(`Frekuensi Makan: ${data.meals}x per hari`, 20, 163);
    doc.text(`Konsumsi Air: ${data.water} liter per hari`, 20, 170);
    
    // Analysis
    doc.setFontSize(14);
    doc.text('Analisis Detail', 20, 186);
    doc.setFontSize(10);
    doc.text(`Tekanan Darah: ${data.analysis.blood_pressure_status.status} (Skor: ${data.analysis.blood_pressure_status.score}/100)`, 20, 196);
    doc.text(`Gula Darah: ${data.analysis.blood_sugar_status.status} (Skor: ${data.analysis.blood_sugar_status.score}/100)`, 20, 203);
    doc.text(`Status Hidrasi: ${data.analysis.hydration.status} (Skor: ${data.analysis.hydration.score}/100)`, 20, 210);
    doc.text(`Pola Makan: ${data.analysis.meal_pattern.status} (Skor: ${data.analysis.meal_pattern.score}/100)`, 20, 217);
    
    // Recommendations
    doc.setFontSize(14);
    doc.text('Rekomendasi', 20, 233);
    doc.setFontSize(10);
    const recommendations = doc.splitTextToSize(data.analysis.recommendations, 170);
    doc.text(recommendations, 20, 243);
    
    // Footer
    doc.setFontSize(8);
    doc.text('Disclaimer: Hasil ini bersifat informasi umum. Untuk kondisi medis tertentu,', 20, 280);
    doc.text('konsultasi dengan dokter atau ahli gizi profesional.', 20, 285);
    
    // Save PDF
    const filename = `health_report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
}