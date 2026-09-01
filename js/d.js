function calculateD(){

updateWorkhourWeek();

updateWorkhourWeek();

console.log('hw2:'+hw2);
console.log('hw3:'+hw3);
console.log('hw4:'+hw4);
console.log('hw5:'+hw5);
console.log('hw6:'+hw6);
console.log('hw7:'+hw7);
console.log('work1:'+work1);
console.log('work2:'+work2);
console.log('work3:'+work3);
console.log('work4:'+work4);
console.log('work5:'+work5);
console.log('work6:'+work6);
console.log('work7:'+work7);
console.log('workhourWeek(p1B22):'+workhourWeek);



//5인이상여부 // 연장야간휴일근로수당 할증 미적용
const person5Up = document.getElementById("person5Up").checked;
const person5Down = document.getElementById("person5Down").checked;

//특수업종직종 // 주휴+연장휴일수당 할증 미적용/ 야간할증은 적용
const specialJobN = document.getElementById("specialJobN").checked;
const specialJobY = document.getElementById("specialJobY").checked;

//최저임금 비교연도 선택
const y2026 = document.getElementById("y2026").checked;
const y2025 = document.getElementById("y2025").checked;



//휴일근로시간 중 8시간초과 시간
let hot2 = hw2>8 ? hw2-8 : 0;
let hot3 = hw3>8 ? hw3-8 : 0;
let hot4 = hw4>8 ? hw4-8 : 0;
let hot5 = hw5>8 ? hw5-8 : 0;
let hot6 = hw6>8 ? hw6-8 : 0;
let hot7 = hw7>8 ? hw7-8 : 0;

// p1D23 휴일실근로시간(전체휴일근로시간=8시간이내+8시간초과)
let p1D23 = hw2+hw3+hw4+hw5+hw6+hw7;
console.log('1주 휴일실근로시간(전체휴일근로시간):'+p1D23);
console.log(typeof p1D23);

//1주의 1일 8시간 초과 휴일연장근로(p1F23)
let p1F23 = hot2+hot3+hot4+hot5+hot6+hot7;
console.log('1주 휴일연장근로시간(8시간초과):'+p1F23);

//1주의 1일 8시간이내 휴일근로(H21)
let H21 = p1D23-p1F23;
console.log('1주 휴일근로시간(8시간이내):'+H21);

//1주의 1일 8시간초과 연장근로시간(p1D22)
let ot8hour = ot1+ot2+ot3+ot4+ot5+ot6+ot7-p1F23;
console.log('1일 8시간을 초과한 연장근로시간 수:'+ot8hour);

//1주의 40시간초과 연장근로시간(ot40hour=p1F22)
let ot40hour = (workhourWeek-ot8hour-p1D23) > 40 ? (workhourWeek-ot8hour-p1D23)-40 : 0;
console.log('1주 40시간을 초과한 연장근로시간 수:'+ot40hour);

//1주기본근로시간
let p1H23 = (workhourWeek-ot8hour-p1D23)>40 ? 40 : workhourWeek-ot8hour-p1D23 ;

console.log('1주기본근로시간:'+p1H23);
console.log('1주기본근로시간:'+typeof p1H23);

console.log('workhourWeek:'+typeof workhourWeek);
console.log('ot8hour:'+typeof ot8hour);
console.log('1주 휴일실근로시간(전체휴일근로시간):'+typeof p1D23);


//일일소정근로시간(p1H22)
let p1H22 = (workhourWeek-ot8hour-ot40hour-p1F23) < 40
  ? parseFloat(((workhourWeek-ot8hour-ot40hour-p1F23) / 5).toFixed(1))
  : 8;

console.log('1일 소정근로시간:'+p1H22);
console.log('1일 소정근로시간:'+typeof p1H22);

let p2H17 = p1H23
//월환산 1주 기본근로시간
let R17 = Math.round(p2H17*4.345)


////연장,야간,휴일근로시
//월단위 연장근로시간
//let otM = workhourWeek>40 ? Math.round((ot8hour+ot40hour)*1.5*4.345) : 0 ;

//연장근로 할증율
let otPremiumRate = (person5Down || specialJobY) ? 1.0 : 1.5;
//야간근로 할증율
let ntPremiumRate = person5Down ? 0.0 : 0.5;
//휴일근로(8시간이내) 할증율
let hw1PremiumRate = (person5Down || specialJobY) ? 1.0 : 1.5;
//휴일근로(8시간초과) 할증율
let hw2PremiumRate = (person5Down || specialJobY) ? 1.0 : 2.0;

//연장근로시간(주,월)
let otW = ot8hour+ot40hour;
let otM = Math.round(otW*otPremiumRate*4.345);
console.log('월 연장근로시간(할증):'+otM);

//야간근로시간(p1B23)
let nightworkW = commaInt(nightwork.value);
let nightworkM = Math.round(nightworkW*ntPremiumRate*4.345);

//휴일근로(8시간 이내)
let holy1W = H21;
console.log('1주 중 8시간 이내 휴일근로시간:'+holy1W);
let holy1M = Math.round(holy1W*hw1PremiumRate*4.345);

//휴일근로(8시간 초과)
let holy2W = p1F23;
console.log('1주 중 8시간 초과 휴일근로시간:'+holy2W);
let holy2M = Math.round(holy2W*hw2PremiumRate*4.345);

//15시간미만 여부 // 주휴 미적용((p1F24, p2H18에 영향) + 휴일할증 미적용 // 야간근로할증은 적용
const hour15U = (workhourWeek<15) ? 'Y' : 'N';

//최저임금 적용시간(15시간미만자, 적용제외자에 대해서는 주휴일 미적용)
let p1F24 = (hour15U==='Y' || specialJobY) ? p1H23+0 : p1H23+p1H22;
console.log('최저임금 적용시간:'+p1F24);
console.log('최저임금 적용시간:'+typeof p1F24);

//통상임금 산정시 추가 유급처리되는 시간
let p1W23 = 0;
//통상임금 적용시간(최저임금 적용시간+(유급휴일+유급휴무일-1)*1일소정근로시간+기타유급처리시간)
let p1H24 = p1F24+(yuhuil+yuhumu-1)*p1H22+p1W23;
console.log('통상임금 적용시간:'+p1H24);
console.log('통상임금 적용시간:'+typeof p1H24);

//1일 소정근로시간=주휴일시간 (주휴수당)
let p2H18 = (hour15U==='Y' || specialJobY) ? 0 : p1H22;
let R18 = Math.round(p2H18*4.345);

let totalHour = R17+R18+otM+nightworkM+holy1M+holy2M
console.log('월 환산 / 1주 기본근로시간 R17:'+R17);
console.log('월 환산 / 1일 소정근로시간(주휴) R18:'+R18);
console.log('월 환산 / 연장근로시간:'+otM);
console.log('월 환산 / 야간근로시간:'+nightworkM);
console.log('월 환산 / 휴일근로기본시간:'+holy1M);
console.log('월 환산 / 휴일근로연장시간:'+holy2M);
console.log('월 환산 / 전체 유급처리시간:'+totalHour);

//월소정근로시간(R23)
let R23 = R17+R18;

/*

  if (D19 === "" || D19 === 0) {    //주고정급이 없으면
    let part1 = S40 - sumFtoM19 - sumNtoS19 / 4.345; // 1주지급금액(S40)에서 1주고정급여(sumFtoM19)와 1월고정급여의 1주분(sumNtoS19 / 4.345)을 뺀 금액을 기준으로
    if (part1 > P34) { //그 금액이  시급통상임금보다 크면 그 금액을 , 그 금액이 시급통상임금보다 같거나 작으면 0이다.
      result = part1;
    } else {
      result = 0;
    }
  } else {  // 주고정급(D19)가 있으면
    let part2 = S40 - D19; // 1주지급금액(S40)에서 1주고정급여(D19)을 뺀 금액을 기준으로
    if (part2 > P34) { //그 금액이  시급통상임금보다 크면 그 금액을 , 그 금액이 시급통상임금보다 같거나 작으면 0이다.
      result = part2;
    } else {
      result = 0;
    }
  }
*/




////////////////////////////////////////////////////// 임금정의
// 계산용 값 추출시, 콤마 제거후 숫자 반환
  function getMoneyValue(id) {
      const val = document.getElementById(id).value.replace(/,/g, '');
      return parseInt(val, 10) || 0;
    }

// 입력된 월급여값을 계산 함수에서 사용
  const dPaya = getMoneyValue('dPaya'); //월고정급제 단독월급여액
  const overBonus_a = getMoneyValue('overBonus_a');//월초과지급상여금
/*
  const dPay_b = getMoneyValue('dPay_b'); //월고정급제 기본급 항목
  const dPay_ju = getMoneyValue('dPay_ju'); //월고정급제 주휴수당 항목
  const dPay_go = getMoneyValue('dPay_go'); //월고정급제 고정수당 항목
  const dPay_sik = getMoneyValue('dPay_sik'); //월고정급제 식대교통비 항목
  const dPay_msang = getMoneyValue('dPay_msang'); //월고정급제 매월상여금 항목
  const dPay_goot = getMoneyValue('dPay_goot'); //월고정급제 고정OT수당 항목

  const overBonus_b = getMoneyValue('overBonus_b');//월초과지급상여금
*/
  // 일단 숨김 처리
  /*
  const anotherTpay = getMoneyValue('anotherTpay');//따로 정한 시간급
  */
console.log('월고정급제 단독월급여액 dPaya:'+dPaya)
console.log('월초과지급상여금_고정급:'+overBonus_a)
/*
console.log('기본급 dPay_b:'+dPay_b);
console.log('주휴수당 dPay_ju:'+dPay_ju);
console.log('고정수당 dPay_go:'+dPay_go);
console.log('식대교통비 dPay_sik:'+dPay_sik);
console.log('매월상여금 dPay_msang:'+dPay_msang);
console.log('고정OT수당 dPay_goot:'+dPay_goot);
console.log('월초과지급상여금_항목배분:'+overBonus_b)
*/
//console.log('따로 정한 시간급:'+anotherTpay)



/*
//기본급
let G11 = dPay_b;
//주휴수당
let I11 = dPay_ju;
//고정수당
let K11 = dPay_go; 
//복리비(식대,교통비)
let B11 = dPay_sik; 
//매월상여
let C11 = dPay_msang; 
//고정OT
let Q11 = dPay_goot; 
*/


let G11 = Number(0);
let I11 = Number(0);
let K11 = Number(0); 
let B11 = Number(0); 
let C11 = Number(0); 
let Q11 = Number(0); 



//월초과지급 상여금(월)
//let S11 = overBonus;
let S11a = Math.round(overBonus_a/12); //고정급인 경우
//let S11b = Math.round(overBonus_b/12); //항목배분 고정하는 경우 
let S11b = Number(0);; //항목배분 고정하는 경우  
let S11 = S11a+S11b;
console.log('S11a:'+S11a);
console.log(typeof S11a);
console.log('S11b:'+S11b);
console.log(typeof S11b);
console.log('S11:'+S11);
//월초과지급 상여가 통상임금에 산입됨에 따라 추가되는 월 고정O/T수당 /2024년 12월 대법원 전원합의체의 통상임금 판결에 따라, 정기상여금·명절휴가비 등을 통상임금에 산입하여 O/T수당 등 법정수당을 산정해야 함
let R29 = (S11/R23)*(otM+nightworkM+holy1M+holy2M);

console.log('월초과지급 상여가 통상임금에 산입됨에 따라 추가되는 월 고정O/T수당 R29:'+R29);

console.log('R29:'+R29+', S11:'+S11+', R23:'+R23+', otM:'+otM+', nightworkM:'+nightworkM+', holy1M:'+holy1M+', holy2M:'+holy2M);



//////////잠정최저
//1)월고정급인 경우
//최저월급
let B28 = Math.round(((dPaya-R29)*4.345/totalHour)*R23);
console.log('dPaya:'+dPaya);
console.log('dPaya*4.345:'+(dPaya*4.345));
console.log('totalHour:'+totalHour);
console.log('R23:'+R23);
console.log('최저월급:'+B28);
//최저시급
let C28 = B28/R23;
console.log('최저시급:'+C28);
//2)항목배분 고정지급하는 경우
//최저월급
let B29 = G11+I11+K11+B11+C11;

//최저시급
let C29 = B29/R23;

////////최저임금 미달 여부

//비교대상 최저임금 시급(F29)
let F29 = y2025 ? 10030 : 10320;
let F29c = y2025 ? '2025년' : '2026년';

//잠정 최저시급(H29) (mPaya=mPaya=월고정급제 단독월급여액이 있으면 잠정 최저시급은 C28을 적용하고 그외(항목배분 고정지급)에는 C29를 적용)
//let H29 = C28;
//let H29 = (mPaya==='' || mPaya==='0') ? C29 : C28;
let H29 = (!dPaya || dPaya === 0 || dPaya === '0') ? C29 : C28;

//월 최저차액
let L29 = H29<F29 ? (F29-H29)*R23 : 0;

//미달 여부
let J29 = L29>0 ? '최저임금 미달임' : '최저임금 미달 아님';

////////잠정 통상
//1) 월고정급인 경우
//통상월급 (잠정 최저임금 월급여+월최저차액)
let B36 = B28+L29

//통상시급 (B36을 통상임금시간p1H24로 나눈 값)
let C36 = B36/Math.round(p1H24*4.345);

//2)항목배분 고정지급하는 경우
// 통상월급
let B37 = B29+L29;

// 통상시급(B37을 통상임금시간p1H24로 나눈 값)
let C37 = B37/Math.round(p1H24*4.345)



//////법정수당 기초자료
//잠정통상 / 월통상임금 해당금액을 월 통상임금시간수로 나눈 금액 / 기본급 등 월 통상임금의 산정기초가 됨
//mPaya=mPaya=월고정급제 단독월급여액이 있으면 잠정 잠정통상은 C36을 적용하고 그외(항목배분 고정지급)에는 C37를 적용)
let N29 = (!dPaya || dPaya === 0 || dPaya === '0') ? C37 : C36;

//시급통상 / 잠정통상시급(N29)에 월초과 상여금(S11)의 시간당 금액을 더한 금액/ 따로 정한 시급(S6)이 해당금액보다 많으면 따로 정한 시급으로 함 / OT수당 등 법정수당의 산정 기초가 됨
//anotherTpay는 일단 숨김처리하고 0으로 대체처리함.
//let S6 = anotherTpay.value;
let S6 = 0;
let P29  = N29+(S11/R23)<S6 ? S6 : N29+(S11/R23)

//////////적법 월급여 내역 계산
//현행항목 (고정수당,식대교통비,매월상여)
let I35 = (!dPaya || dPaya === 0 || dPaya === '0') ? K11+B11+C11 : 0;
//기본급(주휴수당포함)
//let G35 = H29<F29 ? Math.round(F29*R23-I35) : Math.round(H29*R23-I35);
let G35 = Math.round(N29*R23-I35);
//월초과지급
let K35 = S11;
//지급해야하는 연장수당
let M35 = Math.round(P29*otM);
//지급해야 하는 야간수당
let O35 = Math.round(P29*nightworkM);
//지급해야 하는 휴일수당
let Q35 = Math.round(P29*(holy1M+holy2M));
//제대로 지급해야할 임금 총액
//let S35 = H29<F29 ? G35+M35+O35+Q35 : mPaya;
let S35 = G35+I35+M35+O35+Q35;
//제대로 지급해야할 임금 총액-현행지급액
//현재 지급 금액
let currentWage = (!dPaya || dPaya === 0 || dPaya === '0') ? G11+I11+K11+B11+C11+Q11 : dPaya;
let currentWageW = currentWage*4.345;
let S37 =
    (!dPaya || dPaya === 0 || dPaya === '0') ? S35 - (G11+I11+K11+B11+C11+Q11) > P29  ? S35 - (G11+I11+K11+B11+C11+Q11) : 0 //월급여가 항목배분인 경우
    : S35-(dPaya*4.345) > P29 ? S35-(dPaya*4.345) : 0;  //월급여가 고정급인 경우

/*
mPaya이 없거나, 0이거나, 문자열 '0'이면(월급여가 항목배분인 경우)
→ S35 - (G11 + I11 + K11 + B11 + C11 + Q11) 값을 계산해서
→ 그 결과가 P29보다 크면 그 값을 S37로, 작으면 0.

mPaya이 위 조건을 만족하지 않으면(월급여가 고정급인 경우)
→ S35 - mPaya 값을 계산해서
→ 그 결과가 P29보다 크면 그 값을 S37로, 작으면 0.

let S37;
if (!mPaya || mPaya === 0 || mPaya === '0') {
  const temp = S35 - (G11 + I11 + K11 + B11 + C11 + Q11);
  if (temp > P29) {
    S37 = temp;
  } else {
    S37 = 0;
  }
} else {
  const temp = S35 - mPaya;
  if (temp > P29) {
    S37 = temp;
  } else {
    S37 = 0;
  }
}
*/

//계속지급해야할 월초과 상여금 지급해야할
let ovb = S11*12
let ovbc = S11 > 0 ? `<li>계속 지급해야 할 월 초과 상여금 연 ${ovb.toLocaleString()}원 별도</li>` : ``;




let resultText = `

<hr />
<h2>일급제 계산결과</h2>
<h2>근로시간 분석</h2>
<table class="itemTb">
  <tbody>
    <tr>
      <th>기본근로</th>
      <td>${p2H17}</td>
      <td>${R17}</td>
    </tr>
    <tr>
      <th>주휴일</th>
      <td>${p2H18}</td>
      <td>${R18}</td>
    </tr>
    <tr>
      <th>연장근로</th>
      <td>${otW}</td>
      <td>${otM}</td>
    </tr>
    <tr>
      <th>야간근로</th>
      <td>${nightworkW}</td>
      <td>${nightworkM}</td>
    </tr>
    <tr>
      <th>휴일근로</th>
      <td>${holy1W}</td>
      <td>${holy1M}</td>
    </tr>
    <tr>
      <th>휴일연장</th>
      <td>${holy2W}</td>
      <td>${holy2M}</td>
    </tr>
    <tr>
      <th>소정근로</th>
      <td>1주 실근로시간: ${workhourWeek}시간 / 1일 소정근로시간: ${p1H22}시간 </td>
      <td>월 소정근로시간: ${R23}시간</td>
    </tr>
    </tbody>
</table>

<h3>일급제 계산 결과는 추후 업그레이드 됩니다.</h3>


<hr />
<h2>법적판단</h2>
<h3>잠정최저(hidden)</h3>
<table class="itemTb">
  <tbody>
    <tr>
      <th>월고정급인 경우</th>
      <td>최저월급 : ${B28.toLocaleString()}</td>
      <td>최저시급 : ${Math.round(C28).toLocaleString()}</td>
    </tr>
    <tr>
      <th>항목구분이 있는 경우</th>
      <td>최저월급 : ${B29.toLocaleString()}</td>
      <td>최저시급 : ${Math.round(C29).toLocaleString()}</td>
    </tr>
    </tbody>
</table>

<h3>최저임금 미달 여부</h3>
<ul>
  <li>${F29c} 최저임금: ${F29.toLocaleString()}</li>
  <li>잠정 최저 : ${Math.round(H29).toLocaleString()}</li>
  <li>미달 여부 : ${J29}</li>
  <li>월최저 차액 : <b>${L29.toLocaleString()}</b>원</li>
</ul>  

 
<h3>법정수당 기초자료</h3>
<ul>
  <li>잠정통상 : ${Math.round(N29).toLocaleString()}</li>
  <li>시급통상 : ${Math.round(P29).toLocaleString()}</li>
  <li>ot추가액 : ${Math.round(R29).toLocaleString()}</li>
</ul>  

 

<hr />
<h2>적법 월급여 내역</h2>
<h3>잠정통상(hidden)</h3>
<table class="itemTb">
  <tbody>
    <tr>
      <th>월고정급인 경우</th>
      <td>통상월급 : ${B36.toLocaleString()}</td>
      <td>통상시급 : ${Math.round(C36).toLocaleString()}</td>
    </tr>
    <tr>
      <th>항목구분이 있는 경우</th>
      <td>통상월급 : ${B37.toLocaleString()}</td>
      <td>통상시급 : ${Math.round(C37).toLocaleString()}</td>
    </tr>
    </tbody>
</table>

<h3>적법 월급 내역</h3>

<h4>통상월급</h4>
<ul>
  <li>기본급(주휴수당포함) : ${G35.toLocaleString()}원</li>
  <li>현행항목 : ${I35.toLocaleString()}원</li>
  <li>월초과지급 : ${K35.toLocaleString()}원 </li>
</ul>

<h4>초과근무수당</h4>
<ul>
  <li>지급해야 하는 연장수당 : ${M35.toLocaleString()}원</li>
  <li>지급해야 하는 야간수당 : ${O35.toLocaleString()}원</li>
  <li>지급해야 하는 휴일수당 : ${Q35.toLocaleString()}원</li>
</ul>
<h4>월지급금액</h4>
<ul>
  <li><span style="color">본래 제대로 지급해야 할 임금 총액(b)</span> : ${S35.toLocaleString()}원</li>${ovbc}
</ul>
<h4>현재 지급하는 금액(a)</h4>
<ul>
  <li><span style="color">현재 지급하는 금액(a)</span> : ${currentWageW.toLocaleString()}원</li>${ovbc}
</ul>
<h4>차액(월)</h4>
<ul>
  <li><span style="color">현재지급액과 차액(b-a)(월)</span> : <b>${S37.toLocaleString()}</b>원</li>${ovbc}
</ul>


`;
$("#result").html(resultText);
}