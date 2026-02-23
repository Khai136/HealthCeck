// HealthCheck - Pure JavaScript Version
// All health analysis logic in client-side JavaScript

class HealthAnalyzer {
    constructor() {
        this.bmiCategories = {
            underweight: { max: 18.5, label: 'Kekurangan Berat Badan', color: 'blue' },
            healthy: { max: 24.9, label: 'Berat Badan Ideal', color: 'green' },
            overweight: { max: 29.9, label: 'Kelebihan Berat Badan', color: 'orange' },
            obese: { max: Infinity, label: 'Obesitas', color: 'red' }
        };
    }

    // Calculate BMI
    calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }

    // Get BMI Category
    getBMICategory(bmi) {
        if (bmi < 18.5) return 'underweight';
        if (bmi < 25) return 'healthy';
        if (bmi < 30) return 'overweight';
        return 'obese';
    }

    // Evaluate Blood Pressure
    evaluateBloodPressure(bpString) {
        const [systolic, diastolic] = bpString.split('/').map(Number);
        
        if (systolic < 120 && diastolic < 80) {
            return { status: 'normal', score: 95, systolic, diastolic };
        } else if (systolic < 130 && diastolic < 80) {
            return { status: 'elevated', score: 80, systolic, diastolic };
        } else if (systolic < 140 || diastolic < 90) {
            return { status: 'stage1_hypertension', score: 60, systolic, diastolic };
        } else if (systolic < 180 || diastolic < 120) {
            return { status: 'stage2_hypertension', score: 40, systolic, diastolic };
        } else {
            return { status: 'crisis', score: 20, systolic, diastolic };
        }
    }

    // Evaluate Blood Sugar
    evaluateBloodSugar(sugarLevel) {
        if (sugarLevel < 70) {
            return { status: 'low', score: 50 };
        } else if (sugarLevel <= 100) {
            return { status: 'normal', score: 95 };
        } else if (sugarLevel <= 125) {
            return { status: 'prediabetes', score: 70 };
        } else {
            return { status: 'diabetes', score: 40 };
        }
    }

    // Evaluate Hydration
    evaluateHydration(waterLiters) {
        if (waterLiters < 1.5) {
            return { status: 'poor', score: 40 };
        } else if (waterLiters < 2) {
            return { status: 'low', score: 70 };
        } else if (waterLiters <= 3) {
            return { status: 'good', score: 90 };
        } else if (waterLiters <= 4) {
            return { status: 'optimal', score: 95 };
        } else {
            return { status: 'excessive', score: 75 };
        }
    }

    // Evaluate Meal Frequency
    evaluateMealFrequency(meals) {
        if (meals < 2) {
            return { status: 'too_low', score: 50 };
        } else if (meals === 2) {
            return { status: 'low', score: 70 };
        } else if (meals <= 4) {
            return { status: 'good', score: 90 };
        } else if (meals <= 5) {
            return { status: 'high', score: 85 };
        } else {
            return { status: 'excessive', score: 70 };
        }
    }

    // Calculate Overall Health Score
    calculateHealthScore(bmiCat, hydration, mealFreq, bpStatus, sugarStatus) {
        const bmiScores = {
            underweight: 65,
            healthy: 95,
            overweight: 70,
            obese: 50
        };

        const weights = {
            bmi: 0.3,
            bp: 0.25,
            sugar: 0.15,
            hydration: 0.15,
            meal: 0.15
        };

        const totalScore = (
            bmiScores[bmiCat] * weights.bmi +
            bpStatus.score * weights.bp +
            sugarStatus.score * weights.sugar +
            hydration.score * weights.hydration +
            mealFreq.score * weights.meal
        );

        return Math.round(totalScore * 10) / 10;
    }

    // Generate Personalized Advice
    generateAdvice(name, age, gender, bmiCat, hydration, mealFreq, bpStatus, sugarStatus) {
        const advice = [];
        const greeting = `${name}, `;

        // BMI advice
        const bmiAdvice = {
            underweight: [
                "tambah porsi makan dengan nutrisi padat seperti kacang-kacangan dan alpukat",
                "coba konsumsi smoothie tinggi kalori sebagai camilan sehat"
            ],
            healthy: [
                "BMI kamu udah ideal! Pertahankan pola hidup sehat ini",
                "tetap jaga pola makan seimbang dan aktivitas fisik rutin"
            ],
            overweight: [
                "mulai kurangi porsi karbo sederhana dan perbanyak sayur",
                "tambah aktivitas fisik jadi 30-45 menit per hari"
            ],
            obese: [
                "konsultasi dengan ahli gizi untuk program diet yang aman",
                "mulai dengan olahraga ringan seperti jalan kaki 20 menit/hari"
            ]
        };

        advice.push(greeting + bmiAdvice[bmiCat][Math.floor(Math.random() * bmiAdvice[bmiCat].length)] + ".");

        // Blood pressure advice
        if (bpStatus.status === 'elevated' || bpStatus.status.includes('hypertension')) {
            advice.push("Tekanan darah kamu perlu perhatian khusus. Kurangi garam, kelola stress, dan olahraga teratur.");
        } else if (bpStatus.status === 'crisis') {
            advice.push("PENTING: Tekanan darah kamu sangat tinggi! Segera konsultasi ke dokter.");
        }

        // Blood sugar advice
        if (sugarStatus.status === 'prediabetes') {
            advice.push("Gula darah kamu mulai tinggi (prediabetes). Kurangi konsumsi gula dan karbo olahan.");
        } else if (sugarStatus.status === 'diabetes') {
            advice.push("Gula darah kamu tinggi. Konsultasi dengan dokter untuk penanganan diabetes.");
        } else if (sugarStatus.status === 'low') {
            advice.push("Gula darah kamu rendah. Pastikan makan teratur dan cukup karbohidrat.");
        }

        // Hydration advice
        if (hydration.status === 'poor') {
            advice.push("Jangan lupa minum air minimal 2 liter per hari.");
        }

        // Meal frequency advice
        if (mealFreq.status === 'too_low') {
            advice.push("Makan minimal 3x sehari buat jaga metabolisme.");
        }

        return advice.join(" ");
    }

    // Main Analysis Function
    analyzeHealth(data) {
        const bmi = this.calculateBMI(data.weight, data.height);
        const bmiCategory = this.getBMICategory(parseFloat(bmi));
        
        const bpStatus = this.evaluateBloodPressure(data.blood_pressure);
        const sugarStatus = this.evaluateBloodSugar(data.blood_sugar);
        const hydration = this.evaluateHydration(data.water);
        const mealPattern = this.evaluateMealFrequency(data.meals);

        const healthScore = this.calculateHealthScore(
            bmiCategory, hydration, mealPattern, bpStatus, sugarStatus
        );

        const recommendations = this.generateAdvice(
            data.name, data.age, data.gender,
            bmiCategory, hydration, mealPattern, bpStatus, sugarStatus
        );

        const categoryInfo = this.bmiCategories[bmiCategory];

        return {
            name: data.name,
            age: data.age,
            gender: data.gender === 'male' ? 'Laki-laki' : 'Perempuan',
            weight: data.weight,
            height: data.height,
            blood_pressure: data.blood_pressure,
            blood_sugar: data.blood_sugar,
            meals: data.meals,
            water: data.water,
            analysis: {
                name: data.name,
                age: data.age,
                gender: data.gender === 'male' ? 'Laki-laki' : 'Perempuan',
                bmi: bmi,
                bmi_category: bmiCategory,
                status_label: categoryInfo.label,
                status_color: categoryInfo.color,
                health_score: healthScore,
                blood_pressure_status: bpStatus,
                blood_sugar_status: sugarStatus,
                hydration: hydration,
                meal_pattern: mealPattern,
                recommendations: recommendations,
                analysis_date: new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                })
            }
        };
    }
}

// Initialize analyzer
const analyzer = new HealthAnalyzer();

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthForm');
    if (!form) return;

    const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
    const genderSelect = document.getElementById('gender');

    // Validation rules
    const validationRules = {
        name: { type: 'text', label: 'Nama' },
        age: { min: 1, max: 150, label: 'Umur' },
        gender: { type: 'select', label: 'Jenis kelamin' },
        weight: { min: 20, max: 300, label: 'Berat badan' },
        height: { min: 100, max: 250, label: 'Tinggi badan' },
        blood_pressure: { type: 'bp', label: 'Tekanan darah' },
        blood_sugar: { min: 50, max: 500, label: 'Gula darah' },
        meals: { min: 0, max: 10, label: 'Frekuensi makan' },
        water: { min: 0, max: 10, label: 'Konsumsi air' }
    };

    // Validate field
    function validateField(field) {
        const rule = validationRules[field.id];
        const errorEl = document.getElementById(`${field.id}-error`);
        
        if (!field.value) return true;
        
        // Text validation
        if (rule.type === 'text') {
            if (field.value.trim().length < 2) {
                errorEl.textContent = `${rule.label} minimal 2 karakter`;
                field.classList.add('invalid');
                return false;
            }
        }
        
        // Blood pressure validation
        if (rule.type === 'bp') {
            const bpPattern = /^\d{2,3}\/\d{2,3}$/;
            if (!bpPattern.test(field.value)) {
                errorEl.textContent = 'Format harus seperti 120/80';
                field.classList.add('invalid');
                return false;
            }
            const [systolic, diastolic] = field.value.split('/').map(Number);
            if (systolic < 70 || systolic > 250 || diastolic < 40 || diastolic > 150) {
                errorEl.textContent = 'Nilai tekanan darah tidak valid';
                field.classList.add('invalid');
                return false;
            }
        }
        
        // Number validation
        if (rule.min !== undefined && rule.max !== undefined) {
            const value = parseFloat(field.value);
            if (isNaN(value) || value < rule.min || value > rule.max) {
                errorEl.textContent = `${rule.label} harus antara ${rule.min}-${rule.max}`;
                field.classList.add('invalid');
                return false;
            }
        }
        
        errorEl.textContent = '';
        field.classList.remove('invalid');
        return true;
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            const errorEl = document.getElementById(`${this.id}-error`);
            if (errorEl) {
                errorEl.textContent = '';
                this.classList.remove('invalid');
            }
        });
    });

    // Gender select validation
    if (genderSelect) {
        genderSelect.addEventListener('change', function() {
            const errorEl = document.getElementById('gender-error');
            if (this.value) {
                errorEl.textContent = '';
                this.classList.remove('invalid');
            }
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!genderSelect.value) {
            const errorEl = document.getElementById('gender-error');
            errorEl.textContent = 'Pilih jenis kelamin';
            genderSelect.classList.add('invalid');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            weight: parseFloat(document.getElementById('weight').value),
            height: parseFloat(document.getElementById('height').value),
            blood_pressure: document.getElementById('blood_pressure').value,
            blood_sugar: parseFloat(document.getElementById('blood_sugar').value),
            meals: parseInt(document.getElementById('meals').value),
            water: parseFloat(document.getElementById('water').value)
        };
        
        // Analyze health
        const results = analyzer.analyzeHealth(formData);
        
        // Save to localStorage
        localStorage.setItem('healthResults', JSON.stringify(results));
        
        // Redirect to results page
        setTimeout(() => {
            window.location.href = 'results.html';
        }, 500);
    });

    // Auto-focus first input
    document.getElementById('name').focus();
});