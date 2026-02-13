document.getElementById('calculate').addEventListener('click', calculateAffordability);

function calculateAffordability() {
    const price = parseFloat(document.getElementById('price').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const savings = parseFloat(document.getElementById('savings').value);
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const emiMonths = parseInt(document.getElementById('emi').value);
    const interestRate = parseFloat(document.getElementById('interest').value) || 0;

    if (isNaN(price) || isNaN(salary) || isNaN(savings)) {
        alert('Please fill in all required fields');
        return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    let monthlyPayment, totalCost;
    
    if (emiMonths > 0) {
        if (interestRate > 0) {
            monthlyPayment = (price * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, emiMonths)) / 
                           (Math.pow(1 + monthlyInterestRate, emiMonths) - 1);
            totalCost = monthlyPayment * emiMonths;
        } else {
            monthlyPayment = price / emiMonths;
            totalCost = price;
        }
    } else {
        monthlyPayment = price;
        totalCost = price;
    }

    const disposableIncome = salary - expenses - monthlyPayment;
    const emergencyFund = salary * 3;
    const savingsAfterPurchase = emiMonths > 0 ? savings : savings - price;
    
    const paymentToIncomeRatio = (monthlyPayment / salary) * 100;
    const savingsRatio = (savingsAfterPurchase / emergencyFund) * 100;
    const expenseRatio = ((expenses + monthlyPayment) / salary) * 100;
    
    let stressLevel = 0;
    let status = '';
    let statusClass = '';
    let recommendation = '';
    
    if (emiMonths === 0 && price > savings) {
        stressLevel = 100;
        status = '🚨 Cannot Afford - Insufficient Funds';
        statusClass = 'stress';
        recommendation = '❌ You don\'t have enough savings. Consider saving $' + (price - savings).toFixed(2) + ' more or choosing an EMI option.';
    } else if (disposableIncome < 0) {
        stressLevel = 95;
        status = '🚨 Financial Stress - Negative Cash Flow';
        statusClass = 'stress';
        recommendation = '⚠️ This purchase will exceed your income. Not recommended.';
    } else if (expenseRatio > 80) {
        stressLevel = 85;
        status = '⚠️ High Risk - Very Tight Budget';
        statusClass = 'risky';
        recommendation = '⚠️ You\'ll have only $' + disposableIncome.toFixed(2) + '/month left. Consider waiting or longer EMI.';
    } else if (paymentToIncomeRatio > 30) {
        stressLevel = 75;
        status = '⚠️ Risky - High Payment Burden';
        statusClass = 'risky';
        recommendation = '💡 Payment is ' + paymentToIncomeRatio.toFixed(1) + '% of income. Try to keep it under 30%.';
    } else if (savingsRatio < 50) {
        stressLevel = 60;
        status = '⚠️ Risky - Low Emergency Fund';
        statusClass = 'risky';
        recommendation = '💡 Build emergency fund to $' + emergencyFund.toFixed(2) + ' (3 months salary) before buying.';
    } else if (paymentToIncomeRatio > 15) {
        stressLevel = 35;
        status = '✅ Affordable - Moderate Impact';
        statusClass = 'safe';
        recommendation = '✅ You can afford this, but it will impact your budget. Save extra this month.';
    } else if (savingsRatio < 100) {
        stressLevel = 20;
        status = '✅ Safe to Buy - Good Position';
        statusClass = 'safe';
        recommendation = '✅ Good financial position. You can proceed with confidence.';
    } else {
        stressLevel = 10;
        status = '✅ Excellent - Strong Financial Health';
        statusClass = 'safe';
        recommendation = '🎉 Excellent financial health! This purchase won\'t strain your budget.';
    }

    const stressColor = stressLevel > 70 ? '#c5221f' : stressLevel > 40 ? '#f9ab00' : '#1e8e3e';
    const stressLabel = stressLevel > 70 ? 'High Risk' : stressLevel > 40 ? 'Moderate Risk' : 'Low Risk';

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('statusBadge').textContent = status;
    document.getElementById('statusBadge').className = `status-badge ${statusClass}`;
    
    document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
    document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(2);
    document.getElementById('disposable').textContent = '$' + disposableIncome.toFixed(2);
    document.getElementById('savingsAfter').textContent = '$' + savingsAfterPurchase.toFixed(2);
    
    const stressFill = document.getElementById('stressFill');
    stressFill.style.width = stressLevel + '%';
    stressFill.style.backgroundColor = stressColor;
    
    document.getElementById('stressText').textContent = `${stressLevel}% - ${stressLabel}`;
    document.getElementById('stressText').style.color = stressColor;

    document.getElementById('recommendation').textContent = recommendation;
    document.getElementById('recommendation').className = `recommendation ${statusClass}`;
    
    const interestCost = totalCost - price;
    const emiText = emiMonths > 0 ? `${emiMonths} months EMI` : `Full payment`;
    
    document.getElementById('details').innerHTML = `
        <strong>Payment Plan:</strong> ${emiText}<br>
        <strong>Interest Cost:</strong> $${interestCost.toFixed(2)}<br>
        <strong>Payment to Income:</strong> ${paymentToIncomeRatio.toFixed(1)}%<br>
        <strong>Total Expenses:</strong> ${expenseRatio.toFixed(1)}% of income<br>
        <strong>Emergency Fund:</strong> ${savingsRatio.toFixed(0)}% of target
    `;
}
