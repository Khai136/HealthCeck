class HealthAnalyzer {
    bmi(weight, height) {
        return +(weight / ((height / 100) ** 2)).toFixed(1);
    }

    bmiCategory(bmi) {
        if (bmi < 18.5) return "underweight";
        if (bmi < 25) return "healthy";
        if (bmi < 30) return "overweight";
        return "obese";
    }

    scoreFromRange(value, goodMin, goodMax) {
        if (value >= goodMin && value <= goodMax) return 95;
        if (value < goodMin) return 60;
        return 40;
    }

    analyze(data) {
        const bmi = this.bmi(data.weight, data.height);
        const bmiCat = this.bmiCategory(bmi);

        const hydrationScore = this.scoreFromRange(data.water, 2, 3);
        const mealScore = this.scoreFromRange(data.meals, 3, 4);
        const sugarScore = this.scoreFromRange(data.blood_sugar, 70, 100);

        const score =
            (bmiCat === "healthy" ? 95 : bmiCat === "overweight" ? 70 : 50) * 0.3 +
            hydrationScore * 0.2 +
            mealScore * 0.2 +
            sugarScore * 0.3;

        return {
            ...data,
            bmi,
            bmiCat,
            score: Math.round(score),
            date: new Date().toLocaleDateString("id-ID")
        };
    }
}

document.getElementById("healthForm").addEventListener("submit", e => {
    e.preventDefault();

    const data = {
        name: name.value,
        age: +age.value,
        gender: gender.value,
        weight: +weight.value,
        height: +height.value,
        blood_pressure: blood_pressure.value,
        blood_sugar: +blood_sugar.value,
        meals: +meals.value,
        water: +water.value
    };

    const analyzer = new HealthAnalyzer();
    const result = analyzer.analyze(data);

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ date: result.date, score: result.score });
    localStorage.setItem("history", JSON.stringify(history));

    localStorage.setItem("result", JSON.stringify(result));
    location.href = "results.html";
});
