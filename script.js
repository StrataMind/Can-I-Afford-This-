document.getElementById('calculate').addEventListener('click', calculateAffordability);

function calculateAffordability() {
    const price = parseFloat(document.getElementById('price').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const savings = parseFloat(document.getElementById('savings').value);
    const emiMonths = parseInt(document.getElementById('emi').value);

    if (isNaN(price) || isNaN(salary) || isNaN(savings)) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    const monthlyPayment = emiMonths > 0 ? price / emiMonths : price;
    const disposableIncome = salary * 0.7;
    const emergencyFund = salary * 3;
    const savingsAfterPurchase = emiMonths > 0 ? savings : savings - price;
    
    const paymentToIncomeRatio = (monthlyPayment / salary) * 100;
    const savingsRatio = (savingsAfterPurchase / emergencyFund) * 100;
    
    let stressLevel = 0;
    let status = '';
    let statusClass = '';
    
    if (emiMonths === 0 && price > savings) {
        stressLevel = 100;
        status = '🚨 Financial Stress - Insufficient Funds';
        statusClass = 'stress';
    } else if (paymentToIncomeRatio > 30) {
        stressLevel = 85;
        status = '⚠️ Risky - High Payment Burden';
        statusClass = 'risky';
    } else if (savingsRatio < 50) {
        stressLevel = 70;
        status = '⚠️ Risky - Low Emergency Fund';
        statusClass = 'risky';
    } else if (paymentToIncomeRatio > 15) {
        stressLevel = 40;
        status = '⚠️ Risky - Moderate Impact';
        statusClass = 'risky';
    } else if (savingsRatio < 100) {
        stressLevel = 25;
        status = '✅ Safe to Buy - Monitor Savings';
        statusClass = 'safe';
    } else {
        stressLevel = 10;
        status = '✅ Safe to Buy - Excellent Position';
        statusClass = 'safe';
    }

    const stressColor = stressLevel > 70 ? '#dc3545' : stressLevel > 40 ? '#ffc107' : '#28a745';
    const stressLabel = stressLevel > 70 ? 'High Stress' : stressLevel > 40 ? 'Moderate Stress' : 'Low Stress';

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('statusBadge').textContent = status;
    document.getElementById('statusBadge').className = `status-badge ${statusClass}`;
    
    const stressFill = document.getElementById('stressFill');
    stressFill.style.width = stressLevel + '%';
    stressFill.style.backgroundColor = stressColor;
    
    document.getElementById('stressText').textContent = `${stressLevel}% - ${stressLabel}`;
    document.getElementById('stressText').style.color = stressColor;

    const emiText = emiMonths > 0 ? `$${monthlyPayment.toFixed(2)}/month for ${emiMonths} months` : `$${price.toFixed(2)} (Full Payment)`;
    
    document.getElementById('details').innerHTML = `
        <strong>Payment:</strong> ${emiText}<br>
        <strong>Payment to Income:</strong> ${paymentToIncomeRatio.toFixed(1)}%<br>
        <strong>Savings After:</strong> $${savingsAfterPurchase.toFixed(2)}<br>
        <strong>Emergency Fund Status:</strong> ${savingsRatio.toFixed(0)}%
    `;
}
