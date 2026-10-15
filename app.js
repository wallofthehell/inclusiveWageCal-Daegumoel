document.addEventListener('DOMContentLoaded', () => {
    // ---- View Navigation ----
    const views = {
        'view-home': document.getElementById('view-home'),
        'view-self-check': document.getElementById('view-self-check'),
        'view-calculator': document.getElementById('view-calculator'),
        'view-guidelines': document.getElementById('view-guidelines')
    };
    const btnBack = document.getElementById('btn-back');
    const headerTitle = document.getElementById('header-title');

    const viewTitles = {
        'view-home': '포괄임금 도우미',
        'view-self-check': '1분 예방 진단',
        'view-calculator': '스마트 계산기',
        'view-guidelines': '법령 및 판례 안내'
    };

    function navigateTo(viewId) {
        Object.values(views).forEach(view => {
            view.classList.remove('active');
            view.classList.add('hidden');
        });
        views[viewId].classList.remove('hidden');
        // trigger reflow for animation
        void views[viewId].offsetWidth;
        views[viewId].classList.add('active');

        headerTitle.textContent = viewTitles[viewId];
        window.scrollTo({ top: 0, behavior: 'auto' });
        
        if (viewId === 'view-home') {
            btnBack.classList.add('hidden');
        } else {
            btnBack.classList.remove('hidden');
        }
    }

    document.querySelectorAll('.menu-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            navigateTo(target);
        });
    });

    btnBack.addEventListener('click', () => navigateTo('view-home'));

    // 하단 '돌아가기' 버튼 (1분 진단 / 스마트 계산기 / 법령·판례)
    document.querySelectorAll('.btn-go-home').forEach(btn => {
        btn.addEventListener('click', () => navigateTo('view-home'));
    });

    // ---- Self Check Logic ----
    const questions = [
        {
            id: 'q1',
            title: '[수당 쪼개기]',
            desc: '계약서에 "다 합쳐서 얼마"라고 쓰지 않고, \'기본급\'과 \'각종 수당\' 금액을 각각 따로따로 적으셨나요?',
            why: '기본급과 연장수당 등의 금액을 명확히 나누어 적지 않으면, 법적으로 포괄임금 계약 자체를 인정받지 못해 나중에 수당을 이중으로 지급해야 할 위험이 큽니다.',
            prescription: '당장 \'기본급\'과 \'수당(연장/야간 등)\'을 명확히 구분하여 근로계약서를 다시 작성하셔야 합니다.'
        },
        {
            id: 'q2',
            title: '[퇴직금·연차]',
            desc: '매월 주는 월급 안에 \'퇴직금\'이나 \'연차수당\'을 억지로 포함하지 않고 별도로 주고 계신가요?',
            why: '매월 월급에 퇴직금과 연차수당을 미리 쪼개서 지급하는 꼼수는 대법원 판례상 \'무효\' 처리될 확률이 매우 높습니다.',
            prescription: '퇴직금과 연차수당은 월급(포괄임금)에서 반드시 빼고, 법정 기준에 맞춰 별도로 정산하도록 임금 대장을 수정해야 합니다.'
        },
        {
            id: 'q3',
            title: '[서명 동의]',
            desc: '직원에게 포괄임금 계산 방식을 설명하고, 근로계약서에 자필 서명(동의)을 받으셨나요?',
            why: '"말로 다 합의했다"는 것은 통하지 않습니다. 근로자의 명시적인 서명 동의가 없는 포괄임금 계약은 효력을 인정받기 어렵습니다.',
            prescription: '구두 합의는 무효입니다. 반드시 임금 산정 방식이 명시된 서면 계약서를 출력하여 직원의 자필 서명을 받아 보관하십시오.'
        },
        {
            id: 'q4',
            title: '[출퇴근 기록]',
            desc: '연장수당을 월급에 포괄하여 지급하더라도, 직원의 실제 출퇴근 시간은 매일 기록하고 계신가요?',
            why: '포괄임금제를 하더라도 직원이 계약된 시간보다 더 일했는지 확인하려면 객관적인 근태 기록이 반드시 있어야 합니다.',
            prescription: '당장 내일부터라도 출퇴근 기록기, 지문 인식, 또는 모바일 근태 앱을 도입하여 직원들의 출퇴근 시간을 객관적으로 남기셔야 합니다.'
        },
        {
            id: 'q5',
            title: '[추가 지급]',
            desc: '만약 직원이 계약된 연장근로 시간보다 더 많이 일한 달에는 초과 수당을 더 챙겨주시나요?',
            why: '포괄임금제는 \'무제한 야근 프리패스\'가 아닙니다. 약정된 시간을 초과해서 일한 부분은 무조건 1.5배의 수당을 추가로 지급해야 합니다.',
            prescription: '지난달 실제 근로시간을 확인하시고, 계약서상 고정 연장시간을 초과한 시간에 대해서는 즉시 추가 수당을 정산해 지급하셔야 임금체불을 막을 수 있습니다.'
        },
        {
            id: 'q6',
            title: '[최저임금]',
            desc: '각종 수당을 다 빼고 남은 \'순수 기본급\'만 계산해도 올해 최저임금 이상인가요?',
            why: '월급 총액이 아무리 많아도, 각종 고정 수당을 제외한 \'순수 기본급\'을 소정근로시간으로 나눈 시급이 올해 최저임금에 미달하면 형사처벌 대상입니다.',
            prescription: '연장수당 비중을 무리하게 높이지 마시고, \'기본급\' 자체가 최저임금 기준을 넉넉히 넘기도록 임금 테이블을 전면 개편해야 합니다.'
        },
        {
            id: 'q7',
            title: '[적용 대상]',
            desc: '해당 직원은 외근/출장이 잦아 \'근로시간을 정확히 계산하기 어려운\' 업무를 하고 있나요?',
            why: '출퇴근 시간이 정해진 일반 사무직이나 생산직은 원칙적으로 포괄임금제 적용 대상이 아니며, 노동청 점검 시 1순위 적발 대상이 됩니다.',
            prescription: '출퇴근이 명확한 직원은 리스크가 큰 포괄임금제를 폐지하고, 일한 만큼 연장수당을 지급하는 \'원칙적인 임금제\'로의 전환을 강력히 권장합니다.'
        }
    ];

    const qContainer = document.getElementById('self-check-questions');
    const answers = {};

    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.className = 'question-card';
        div.innerHTML = `
            <div class="q-title"><span class="q-badge">Q${idx+1}</span> ${q.title}</div>
            <div class="q-desc">${q.desc}</div>
            <div class="q-actions">
                <button class="ox-btn" data-id="${q.id}" data-val="O">O</button>
                <button class="ox-btn" data-id="${q.id}" data-val="X">X</button>
            </div>
            <div class="q-why hidden" id="why-${q.id}">
                <i class="fa-solid fa-lightbulb"></i>
                <span><strong>왜 묻나요?</strong> ${q.why}</span>
            </div>
        `;
        qContainer.appendChild(div);
    });

    qContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('ox-btn')) {
            const btn = e.target;
            const qId = btn.getAttribute('data-id');
            const val = btn.getAttribute('data-val');
            
            // UI update
            const siblings = btn.parentElement.querySelectorAll('.ox-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            btn.classList.add('selected');
            
            // State
            answers[qId] = val;

            // Show why
            document.getElementById(`why-${qId}`).classList.remove('hidden');
        }
    });

    document.getElementById('btn-submit-self-check').addEventListener('click', () => {
        const answeredCount = Object.keys(answers).length;
        if(answeredCount < questions.length) {
            alert('모든 질문에 답해주세요.');
            return;
        }

        const xAnswers = questions.filter(q => answers[q.id] === 'X');
        const resContainer = document.getElementById('self-check-result');
        
        if(xAnswers.length === 0) {
            resContainer.innerHTML = `
                <div class="result-summary safe">
                    <h3><i class="fa-solid fa-check-circle"></i> 아주 좋습니다!</h3>
                    <p>현재 사업장의 포괄임금제 운영 방식은 대체로 양호합니다.</p>
                </div>
            `;
        } else {
            let prescriptionsHtml = xAnswers.map(q => `
                <li class="prescription-item">
                    <strong>${q.title}</strong>
                    ${q.prescription}
                </li>
            `).join('');

            resContainer.innerHTML = `
                <div class="action-plan">
                    <h3><i class="fa-solid fa-triangle-exclamation"></i> 주의! 핵심 행동 처방전</h3>
                    <p style="margin-bottom: 12px; color: #7F1D1D; font-size: 0.95rem;">발견된 취약점에 대해 다음 조치를 취하시길 권장합니다.</p>
                    <ul class="prescription-list">
                        ${prescriptionsHtml}
                    </ul>
                </div>
            `;
        }

        resContainer.classList.remove('hidden');
        document.getElementById('btn-submit-self-check').classList.add('hidden');
        document.getElementById('btn-retry-self-check').classList.remove('hidden');
        qContainer.classList.add('hidden');
    });

    document.getElementById('btn-retry-self-check').addEventListener('click', () => {
        // Reset
        for(let key in answers) delete answers[key];
        document.querySelectorAll('.ox-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelectorAll('.q-why').forEach(div => div.classList.add('hidden'));
        
        document.getElementById('self-check-result').classList.add('hidden');
        document.getElementById('btn-submit-self-check').classList.remove('hidden');
        document.getElementById('btn-retry-self-check').classList.add('hidden');
        qContainer.classList.remove('hidden');
    });


    // ---- Calculator Logic ----
    // Formatting numbers with commas
    document.querySelectorAll('.input-money').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '');
            if(value !== '') {
                e.target.value = parseInt(value, 10).toLocaleString('ko-KR');
            } else {
                e.target.value = '';
            }
        });
    });

    const calcForm = document.getElementById('calculator-form');
    const accHeader = document.getElementById('btn-toggle-details');
    const accContainer = document.querySelector('.accordion');
    const calcDetails = document.getElementById('calc-details');
    const resContainer = document.getElementById('calculator-result');

    accHeader.addEventListener('click', () => {
        accContainer.classList.toggle('open');
        calcDetails.classList.toggle('hidden');
    });

    calcForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const empSize = document.querySelector('input[name="empSize"]:checked').value; // '5+' or '5-'
        const minWageYear = document.querySelector('input[name="minWageYear"]:checked').value;
        const MIN_WAGE = minWageYear === '2026' ? 10320 : 10030;

        const parseMoney = (id) => parseInt(document.getElementById(id).value.replace(/,/g, '') || 0, 10);
        const parseHours = (id) => parseFloat(document.getElementById(id).value || 0);

        const basicPay = parseMoney('basicPay');
        const fixedOTPay = parseMoney('fixedOvertimePay');
        const otherFixedPay = parseMoney('otherFixedPay');
        const annualBonus = parseMoney('annualBonus');
        
        const contractHours = parseHours('contractRegularHours'); // typically 209
        const contractOTHours = parseHours('contractOvertimeHours');

        const actualOT = parseHours('actualOvertimeHours');
        const actualHolidayUnder8 = parseHours('actualHolidayHours8Under');
        const actualHolidayOver8 = parseHours('actualHolidayHours8Over');
        const actualNight = parseHours('actualNightHours');

        // Logic - 1. Calculate Ordinary Wage (통상임금)
        // Bonus adds to Ordinary wage if fixed. Usually Annual / 12 is added to monthly.
        const monthlyBonus = annualBonus > 0 ? (annualBonus / 12) : 0;
        const totalOrdinaryWage = basicPay + otherFixedPay + monthlyBonus;
        
        // Base Hourly Wage (통상시급)
        const hourlyWage = totalOrdinaryWage / contractHours;

        // Logic - 2. Check Minimum Wage
        // According to recent laws, regular bonuses are included in minimum wage calculations.
        const minWageDiff = MIN_WAGE - hourlyWage;
        const isMinWageViolated = hourlyWage < MIN_WAGE;

        // Logic - 3. Calculate Required Overtime/Holiday/Night Pay based on Actual Hours
        let premiumOT = 1.0, premiumHolUnder = 1.0, premiumHolOver = 1.0, premiumNight = 0;
        if (empSize === '5+') {
            premiumOT = 1.5;
            premiumHolUnder = 1.5;
            premiumHolOver = 2.0;
            premiumNight = 0.5;
        }

        const requiredOTPay = actualOT * hourlyWage * premiumOT;
        const requiredHolUnderPay = actualHolidayUnder8 * hourlyWage * premiumHolUnder;
        const requiredHolOverPay = actualHolidayOver8 * hourlyWage * premiumHolOver;
        const requiredNightPay = actualNight * hourlyWage * premiumNight;

        const totalRequiredExtraPay = requiredOTPay + requiredHolUnderPay + requiredHolOverPay + requiredNightPay;
        
        // Logic - 4. Compare with Contracted Fixed Overtime Pay
        // If fixed OT pay covers the required extra pay, we are good (excluding min wage violation).
        const diffOTPay = totalRequiredExtraPay - fixedOTPay;
        const additionalPayNeeded = diffOTPay > 0 ? diffOTPay : 0;
        
        // Final Assessment
        const sumBox = document.getElementById('result-summary-box');
        
        if (isMinWageViolated || additionalPayNeeded > 0) {
            sumBox.className = 'result-summary danger';
            let html = `<h3><i class="fa-solid fa-triangle-exclamation"></i> 임금체불 위험 (주의)</h3>`;
            
            if (isMinWageViolated) {
                html += `<div class="amount">최저임금 위반 상태입니다</div>`;
            } else {
                html += `<div class="amount">추가 지급 필요 차액: ${Math.floor(additionalPayNeeded).toLocaleString()}원</div>`;
            }

            html += `<div class="prescription">
                <strong>처방:</strong><br>
                ${isMinWageViolated ? '1. 기본급 및 고정수당을 인상하여 최저임금 기준을 충족해야 합니다.<br>' : ''}
                ${additionalPayNeeded > 0 ? '2. 월 연장/휴일/야간 근로시간을 재산정하여 위 차액을 즉시 추가 지급하십시오.<br>' : ''}
                3. 출퇴근 기록 시스템을 도입하여 근태 관리를 객관화하세요.
            </div>`;
            sumBox.innerHTML = html;
        } else {
            sumBox.className = 'result-summary safe';
            sumBox.innerHTML = `
                <h3><i class="fa-solid fa-circle-check"></i> 적정 수준입니다</h3>
                <div style="font-size: 1rem; color: var(--text-muted); margin-top: 8px;">
                    입력하신 실제 근로시간 기준으로는 계약된 고정 연장근로수당 범위 내에 있으며, 최저임금 기준도 충족합니다.
                </div>
            `;
        }

        // Generate Details Table
        let detailsHtml = `
            <table class="calc-table">
                <tbody>
                    <tr><th>계약 소정근로시간</th><td>${contractHours}시간</td></tr>
                    <tr><th>사업장 규모</th><td>${empSize === '5+' ? '5인 이상 (할증 적용)' : '5인 미만 (할증 미적용)'}</td></tr>
                    <tr><th>통상임금(기본급+기타고정+상여)</th><td>${Math.floor(totalOrdinaryWage).toLocaleString()}원</td></tr>
                    <tr><th>환산 시급</th><td>${Math.floor(hourlyWage).toLocaleString()}원</td></tr>
                    <tr><th>해당 연도 최저시급</th><td>${MIN_WAGE.toLocaleString()}원</td></tr>
                </tbody>
            </table>
            
            <h4 style="margin: 16px 0 8px; color: var(--primary); font-size: 0.95rem;">수당 산출 내역</h4>
            <table class="calc-table">
                <tbody>
                    <tr><th>실제 연장수당 (${premiumOT}배)</th><td>${Math.floor(requiredOTPay).toLocaleString()}원</td></tr>
                    <tr><th>실제 휴일수당(8h↓) (${premiumHolUnder}배)</th><td>${Math.floor(requiredHolUnderPay).toLocaleString()}원</td></tr>
                    <tr><th>실제 휴일수당(8h↑) (${premiumHolOver}배)</th><td>${Math.floor(requiredHolOverPay).toLocaleString()}원</td></tr>
                    <tr><th>실제 야간가산 (${premiumNight}배)</th><td>${Math.floor(requiredNightPay).toLocaleString()}원</td></tr>
                    <tr style="border-top: 2px solid var(--border-color);">
                        <th>필요한 총 수당 합계</th><td style="color:var(--danger);">${Math.floor(totalRequiredExtraPay).toLocaleString()}원</td>
                    </tr>
                    <tr>
                        <th>지급중인 고정수당</th><td>${fixedOTPay.toLocaleString()}원</td>
                    </tr>
                </tbody>
            </table>
        `;
        calcDetails.innerHTML = detailsHtml;

        // Show result
        resContainer.classList.remove('hidden');
        accContainer.classList.remove('open');
        calcDetails.classList.add('hidden');
        
        // Scroll to result
        setTimeout(() => {
            resContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });

});
