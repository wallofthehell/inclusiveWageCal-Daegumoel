function calculateM(){

updateWorkhourWeek();

/*
  let w1 = commaInt(document.getElementById("work1").value);
  let w2 = commaInt(document.getElementById("work2").value);
  let w3 = commaInt(document.getElementById("work3").value);
  let w4 = commaInt(document.getElementById("work4").value);
  let w5 = commaInt(document.getElementById("work5").value);
  let w6 = commaInt(document.getElementById("work6").value);
  let w7 = commaInt(document.getElementById("work7").value);

  work1 = w1; work2 = w2; work3 = w3; work4 = w4; work5 = w5; work6 = w6; work7 = w7;

*/

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
console.log(typeof yuhuil);
console.log('근 무 일'+workday);
console.log('유급휴일'+yuhuil);
console.log('유급휴무'+yuhumu);
console.log('무급휴일'+muhuil);
console.log('무급휴무'+muhumu);

//5인이상여부 // 연장야간휴일근로수당 할증 미적용
const person5Up = document.getElementById("person5Up").checked;
const person5Down = document.getElementById("person5Down").checked;

//특수업종직종 // 주휴일+연장휴일수당 할증 미적용/ 야간할증은 적용
const specialJobN = document.getElementById("specialJobN").checked;
const specialJobY = document.getElementById("specialJobY").checked;

//최저임금 비교연도 선택
const y2027 = document.getElementById("y2027").checked;
const y2026 = document.getElementById("y2026").checked;
const y2025 = document.getElementById("y2025").checked;

//근로시간 입력 유형 선택(월단위입력, 주단위입력)
const timeType1 = document.getElementById("timeType1").checked;
const timeType2 = document.getElementById("timeType2").checked;

//월단위입력시(timeType1) 풀타임근로자, 파트타임근로자
const fpType1 = document.getElementById("fpType1").checked;
const fpType2 = document.getElementById("fpType2").checked;

//월급제 임금입력 유형 선택(월고정급, 항목배분)
const wageMonthType1 = document.getElementById("wageMonthType1").checked;
const wageMonthType2 = document.getElementById("wageMonthType2").checked;

//파트타이머 1주 소정근로시간 입력 체크
	if(timeType1 && fpType2 && soTime.value === ""){
		alert("파트타이머의 1주 소정근로시간이 입력되지 않았습니다");
    soTime.focus();
		return false;
	}


console.log('현재 timeType1 ?:'+timeType1);

//근로시간 입력 유형 = 월단위입력인 경우, 1주 소정근로시간 설정(풀타임머,파트타임머)
let soTimeWeek = timeType1 && fpType1 ? 40 : Number(soTime.value) ;

console.log('최종 soTimes:'+soTimeWeek);
//월 연장근로시간
let otMd = timeType1 ? commaInt(otMdirect.value) : 0 ;
console.log('otMd(timeType1이면? otMdirect.value이고 timeType2이면 0) :'+otMd);
//월 야간근로시간
let ntMd = timeType1 ? commaInt(ntMdirect.value) : 0 ;
//주 야간근로시간
let nightW = timeType2 ? commaInt(night.value) : 0 ;
//월 휴일근로시간(8시간 이내)
let hwMd1 = timeType1 ? commaInt(hwMdirect1.value) : 0 ;
//월 휴일근로시간(8시간 초과)
let hwMd2 = timeType1 ? commaInt(hwMdirect2.value) : 0 ;

//전체근로시간(full_workhourWeek) 설정 : timeType1인 경우에는 soTimeWeek 기준, timeType2인 경우에는workhourWeek 기준.
let full_workhourWeek = timeType1? soTimeWeek+parseFloat(((otMd+hwMd1+hwMd2)/4.345).toFixed(1)) : workhourWeek ;
console.log('실근로시간 :'+full_workhourWeek);

//월 휴일근로시간 유효성(8시간미만, 8시간초과) 체크
	if(hwMd1 < 8 && hwMd2 > 0 ){
		alert("전체의 휴일근로가 8시간 미만인 경우에는 8시간을 초과하는 휴일근로가 불가능합니다. 바르게 입력해 주십시오.");
    hwMdirect2.focus();
		return false;
	}

//휴일근로시간 중 8시간초과 시간
let hot2 = hw2>8 ? hw2-8 : 0;
let hot3 = hw3>8 ? hw3-8 : 0;
let hot4 = hw4>8 ? hw4-8 : 0;
let hot5 = hw5>8 ? hw5-8 : 0;
let hot6 = hw6>8 ? hw6-8 : 0;
let hot7 = hw7>8 ? hw7-8 : 0;

// holyworkFull(p1D23) 휴일실근로시간(전체휴일근로시간=8시간이내+8시간초과)
let holyworkFull = timeType1? hwMd1+hwMd2 : hw2+hw3+hw4+hw5+hw6+hw7;

console.log('휴일실근로시간(holyworkFull) : ' +holyworkFull);

console.log('휴일근로시간 중 8시간 초과 시간(ot1~ot7) : ' + (ot1+ot2+ot3+ot4+ot5+ot6+ot7));

//1주의 1일 8시간 초과 휴일연장근로(p1F23)
let holy2W = hot2+hot3+hot4+hot5+hot6+hot7;

console.log('1주 8시간 초과 휴일연장근로(holy2W) : ' +holy2W);

//1주의 1일 8시간이내 휴일근로(H21)
let holy1W = holyworkFull-holy2W;

//1주의 1일 8시간초과 연장근로시간(p1D22)
let ot8hour = timeType2 ? ot1+ot2+ot3+ot4+ot5+ot6+ot7-holy2W : 0 ;

console.log('1주 8시간 초과 연장근로시간(ot8hour) : ' +ot8hour);

//1주의 40시간초과 연장근로시간(ot40hour=p1F22)
let ot40hour = timeType2 && (full_workhourWeek-ot8hour-holyworkFull) > 40 ? (full_workhourWeek-ot8hour-holyworkFull)-40 : 0;

console.log('1주 40시간 초과 연장근로시간(ot40hour) : ' +ot40hour); 

//1주 기본근로시간(40시간이내 소정근로시간) (월단위입력과 주단위입력 구분)
let p1H23 = timeType1 ? soTimeWeek :
  timeType2 && (full_workhourWeek-ot8hour-holyworkFull) > 40 ? 40 :
  full_workhourWeek-ot8hour-holyworkFull ;

//1일 소정근로시간의 기준점(1주실근로시간-8시간ot-40시간ot-휴일근로중8시간초과시간)
let soTimeDay_st = timeType1 ? soTimeWeek : full_workhourWeek - ot8hour - ot40hour - holy2W;

console.log('1일 소정근로시간의 기준점 soTimeDay_st :'+soTimeDay_st);

//1일소정근로시간(p1H22) // 5일미만 근무 && 40시간 미만 단시간근로자 => 5일, 5일이상 근무 && 40시간 미만 단시간근로자 => workday, 그외 정상근로자 => 8시간(대법원 판례 2025. 8. 14. 선고 2022다291153 판결)

let p1H22 = (soTimeDay_st < 40) && (workday < 5 ) ? Math.min(8, parseFloat((soTimeDay_st / 5).toFixed(1)))
  : (soTimeDay_st < 40) && (workday >= 5 ) ? Math.min(8, parseFloat((soTimeDay_st / workday).toFixed(1)))
  : 8 ;

//1일소정근로시간 설명문
let p1H22_txt = (soTimeDay_st < 40) && (workday < 5 ) ? `(${p1H22} 시간 = ${soTimeDay_st}시간÷5일)`
  : (soTimeDay_st < 40) && (workday >= 5 ) ? `(${p1H22} 시간 = ${soTimeDay_st}시간÷${workday}일)`
  : `(1일 소정근로시간은 8시간 이내입니다)` ;

console.log('40시간 미만 근무하는 단시간인데, 근무일수는 5일 미만이다 :' +(soTimeDay_st < 40) && (workday < 5 ));
console.log('1일 소정근로시간 : '+p1H22);
console.log('40시간 미만 근무하는 단시간인데, 근무일수는 5일 이상이다 :' +(soTimeDay_st < 40) && (workday >= 5 ));
console.log('1일 소정근로시간 : '+p1H22);

//월환산 1주 기본근로시간
let R17 = Math.round(p1H23*4.345)

////연장,야간,휴일근로시
//월단위 연장근로시간
//let otM = full_workhourWeek>40 ? Math.round((ot8hour+ot40hour)*1.5*4.345) : 0 ;

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
console.log('1주 연장근로시간 : ' +otW)
document.getElementById("otWeek").innerText = otW;




let otM = timeType1 ? otMd*otPremiumRate : Math.round(otW*otPremiumRate*4.345);
console.log('1월 연장근로시간 = 1주 연장근로시간 * 1.5 * 4.345 : ' +otM)
//야간근로시간(p1B23)
let nightM = timeType1 ? ntMd*ntPremiumRate : Math.round(nightW*ntPremiumRate*4.345);

//휴일근로(8시간 이내)
let holy1M = timeType1 ? hwMd1*hw1PremiumRate : Math.round(holy1W*hw1PremiumRate*4.345);

//휴일근로(8시간 초과)
let holy2M = timeType1 ? hwMd2*hw2PremiumRate : Math.round(holy2W*hw2PremiumRate*4.345);

//15시간미만 여부 // 주휴일 미적용((p1F24, p2H18에 영향) + 휴일할증 미적용 // 야간근로할증은 적용
const hour15U = (full_workhourWeek<15) ? 'Y' : 'N';

//1주 최저임금 적용시간(p1F24)(15시간미만자, 특수업종종사자는 주휴일 미적용 : 0시간)
//let p1F24 = (hour15U==='Y' || specialJobY) ? p1H23+0 : p1H23+p1H22;
let minTimeW = (hour15U==='Y' || specialJobY) ? p1H23+0 : p1H23+p1H22;
//1월 최저임금 적용시간(minTimeM) : 1주 최저임금 적용시간(p1F24)에 4.345를 곱한 값 (Math.ceil로 올림 처리 //테스트)
//let minTimeM = Math.round(minTimeW*4.345);
let minTimeM = Math.ceil(minTimeW*4.345);
console.log('최저임금 적용 기준시간(주) :'+minTimeW);
console.log('최저임금 적용 기준시간(월) :'+minTimeM);
//통상임금 산정시 추가 유급처리되는 시간
let p1W23 = 0;

//1주 통상임금 기준시간(p1H24)(최저임금 적용시간+(유급휴일+유급휴무일-1)*1일소정근로시간+기타유급처리시간)//15시간미만자, 특수업종종사자는 이미 최저임금 적용시간에 반영됨.
let tongTimeW = minTimeW+(yuhuil+yuhumu-1)*p1H22+p1W23;
//1월 통상임금 기준시간(tongTimeM) : 1주 통상임금 기준시간(p1H24)에 4.345를 곱한 값 (Math.ceil로 올림 처리 //테스트)
//let tongTimeM = Math.round(tongTimeW*4.345);
let tongTimeM = Math.ceil(tongTimeW*4.345);
console.log('통상임금 산정 기준시간(주) :'+tongTimeW);
console.log('통상임금 산정 기준시간(월) :'+tongTimeM);
//주휴일 적용시간(주휴수당)( =  1일소정근로시간 p1H22*1일)
let p2H18 = (hour15U==='Y' || specialJobY) ? 0 : p1H22;

let tongTimeM_txt = `(1주 기본근로 ${p1H23}시간+1주 유급주휴일 ${p2H18}시간+주휴일외 유급처리 ${(yuhuil+yuhumu-1)*p1H22}시간)×(365일÷7일÷12월)`;
let R18 = Math.round(p2H18*4.345);

console.log('1주 주휴처리시간 p2H18 :'+p2H18);
console.log('1월 주휴처리시간 R18(p2H18*4.345) :'+R18);
console.log('1주 기본근로시간 p1H23 :'+p1H23);
console.log('1월 기본근로시간 R17(p1H23*4.345) :'+R17);
console.log('1월 R17+R18 :'+(R17+R18));
// 연장,야간,휴일근로 할증시간의 총합계
let overPremiumRatedHour = otM+nightM+holy1M+holy2M;
// 초과근로 여부
let otv = overPremiumRatedHour > 0;

//월소정근로시간(R23)
let R23 = R17+R18;

let R1718 = R17+R18;

// 전체유급처리되는 시간(월소정근로시간+오버할증시간)
let totalHour = R17+R18+overPremiumRatedHour
console.log('1월 전체유급처리시간(totalHour) :'+totalHour);

//15시간미만, 스페샬잡인 경우 유급주휴일 0시간
let nonYujuhuil_txt = (hour15U === 'Y') ? `<li>1주 15시간 미만 단시간근로자는 1주 1일의 유급주휴일이 적용되지 않습니다.</li>` 
    : specialJobY ? `<li>특수 업종·직종 종사자는 1주 1일의 유급주휴일이 적용되지 않습니다.</li>` 
      : ``;
//월 통상임금 기준시간(tongTimeM),최저임금 적용 기준시간(minTimeM) 설명
let timeMonth_txt = `
    <li>최저임금 적용 기준시간(월) : <b>${minTimeM}</b> 시간
      <ul>
        <li><span>(1주 기본근로 ${p1H23}시간+1주 유급주휴일 ${p2H18}시간)×(365일÷7일÷12월)</span></li>
        ${nonYujuhuil_txt}
      </ul>
    </li>
    <li>통상임금 산정 기준시간(월) : <b>${tongTimeM}</b> 시간
      <ul>
        <li><span>(1주 기본근로 ${p1H23}시간+1주 유급주휴일 ${p2H18}시간+주휴일외 유급처리 ${(yuhuil+yuhumu-1)*p1H22}시간)×(365일÷7일÷12월)</span></li>
        ${nonYujuhuil_txt}
      </ul>
    </li>  
    `;

////////////////////////////////////////////////////// 임금정의
// 계산용 값 추출시, 콤마 제거후 숫자 반환
  function getMoneyValue(id) {
      const val = document.getElementById(id).value.replace(/,/g, '');
      return parseInt(val, 10) || 0;
    }

// 입력된 월급여값을 계산 함수에서 사용
const mPaya = wageMonthType1 ? getMoneyValue('mPaya') : 0 ; //월고정급제 단독월급여액
const overBonus_a = wageMonthType1 ? getMoneyValue('overBonus_a') : 0 ;//월초과지급상여금
const mPayaTotal = mPaya+overBonus_a;

const mPay_basic = wageMonthType2 ? getMoneyValue('mPay_basic') : 0; //월고정급제 기본급 항목
const mPay_jik = wageMonthType2 ? getMoneyValue('mPay_jik') : 0; //월고정급제 직무수당등 항목
const mPay_sik = wageMonthType2 ? getMoneyValue('mPay_sik') : 0; //월고정급제 복리후생비 항목
const mPay_msang = wageMonthType2 ? getMoneyValue('mPay_msang') : 0; //월고정급제 매월상여금 항목
const mPay_ot = wageMonthType2 ? getMoneyValue('mPay_ot') : 0; //월고정급제 고정OT수당 항목
const overBonus_b = wageMonthType2 ? getMoneyValue('overBonus_b') : 0;//월초과지급상여금
const mPaybTotal = mPay_basic+mPay_jik+mPay_sik+mPay_msang+mPay_ot+overBonus_b;

// 경고(입력된 임금값이 없는 경우) 
let blankWage1 = !mPaya || mPaya === 0 || mPaya === '0' || mPayaTotal === '0';
let blankWage2 = mPaybTotal === '0';
let blankWage3 = !mPay_basic || mPay_basic === 0 || mPay_basic === '0';
let blankWage4 = !mPay_ot || mPay_ot === 0 || mPay_ot === '0';


/*
  if (wageMonthType1 & blankWage1 || wageMonthType2 & blankWage2){
    alert("입력된 임금이 없어 계산할 수 없습니다.");
    return false;
  } 

  if (wageMonthType2 & blankWage3){
    alert("기본급이 입력되지 않아 계산할 수 없습니다.");
    return false;
  } 

  if (wageMonthType2 && blankWage4){
    alert("고정OT수당을 입력하지 않아 '0원'으로 처리하고 계산합니다.");
    //mPay_ot.focus();
    mPay_ot === 0;
    //return false;
  } 
*/

//기본급
let G11 = mPay_basic;
//직무수당등
let K11 = mPay_jik; 
//복리비(식대,교통비)
let M11 = mPay_sik; 
//매월상여
let O11 = mPay_msang; 
//고정OT
let Q11 = mPay_ot; 
//월초과지급 상여금(월)
let S11 = wageMonthType1 ? overBonus_a : overBonus_b ;
let S11m =Math.round(S11/12); //월초과지급 상여금(월환산);

console.log('S11m :'+S11m);

//월초과지급 상여가 통상임금에 산입됨에 따라 추가되는 월 고정O/T수당 /2024년 12월 대법원 전원합의체의 통상임금 판결에 따라, 정기상여금·명절휴가비 등을 통상임금에 산입하여 O/T수당 등 법정수당을 산정해야 함
//상여금이 있는 경우 && OT시간이 있는 경우

//월초과지급 상여금이 통상임금에 산입(2024대법원판례)됨에 따라 시급통상임금(P29)에 추가되는 시간당 통상임금 계산
let T29 = S11m/tongTimeM;
console.log('T29 :'+T29);

console.log('월초과보너스의 통상시급 반영 금액(T29)'+T29);
let T29_txt = S11 > 0 ? `<ul><li>${Math.round(T29).toLocaleString()}원 = 연간단위 지급 상여금 ${Math.round(S11m).toLocaleString()}원 ÷ 통상임금 산정 기준시간 ${tongTimeM} 시간</li></ul>` : `` ;

const overBonusCond = S11 > 0 && otv ? 'Y' : 'N';
console.log('월초과보너스 조건'+overBonusCond);


//월초과지급상여금은 최저임금 계산시 반영하지 않고(0원처리), nownowOtSudang에 R29를 추가함
let R29 = (S11m/tongTimeM)*overPremiumRatedHour;

//////////잠정최저

//비교대상 최저임금 시급(F29)
let F29 = y2027 ? 10700 : y2026 ? 10320 : 10030;
let F29_txt = y2027 ? '2027년' : y2026 ? '2026년' : '2025년';



//1)월고정급인 경우
//최저월급 (R29를 0원으로 처리하고 대신 nowOtSudang에 R29를 추가함)
let B28 = ((mPaya-R29)/totalHour)*minTimeM ;
console.log('최저월급 B28: '+B28);

//최저시급
let C28 = B28/minTimeM;
console.log('최저시급: '+C28);

//2)항목배분 고정지급하는 경우
//최저월급(최저임금에 포함되는 급여의 합계)
let B29 = G11+K11+M11+O11;

console.log('최저월급B29: '+B29);

//최저시급
let C29 = B29/minTimeM;
console.log('최저시급'+C29);

////////최저임금 미달 여부

//잠정 최저시급(H29) (mPaya=mPaya=월고정급제 단독월급여액이 있으면 잠정 최저시급은 C28을 적용하고 그외(항목배분 고정지급)에는 C29를 적용)
let H29 = wageMonthType1 ? C28 : C29;

console.log('최저시급 H29'+H29);
//월 최저차액(보전금품) 기본급 차액(gaptotalA) (최소한 제대로 지급해야할 기본급보다 현재 지급하는 기본급이 적은 경우를 체크, 음수인 경우를 확인)
let gaptotalA = F29 - H29 > 0 ? (F29 - H29)*minTimeM : 0 ;
console.log('월 최저차액 gaptotalA'+gaptotalA);

//미달 여부
let J29_txt = H29 < F29 ? `<i class="fa fa-info-circle fa-lg" style="color:#FF0000; margin-right:10px" aria-hidden="true"></i>계산된 시간급(<b>${Math.round(H29).toLocaleString()}원</b>)이 <span class="money-dn">최저임금에 미달</span> 합니다.`
  : `<i class="fa fa-info-circle fa-lg" style="color:#0000FF; margin-right:10px" aria-hidden="true"></i>계산된 시간급(<b>${Math.round(H29).toLocaleString()}원</b>)은 <span class="money-up">최저임금 미달이 아닙니다</span>.`;
//귀하의 시간급 비교
let yourMinWage_txt =
  (H29 < F29) ? ` <p class="rst-inbox-p">${F29_txt} 최저임금(${F29.toLocaleString()}원) <span style="color:red"><i class="fa fa-chevron-right fa-lg" aria-hidden="true"></i></span> 계산된 시간급 (${Math.round(H29).toLocaleString()}원)</p>`
  : (H29 == F29) ? ` <p class="rst-inbox-p">${F29_txt} 최저임금(${F29.toLocaleString()}원) <span class="minequal">=</span> 계산된 시간급 (${Math.round(H29).toLocaleString()}원)</p>`
  : ` <p class="rst-inbox-p">${F29_txt} 최저임금(${F29.toLocaleString()}원) <span style="color:blue"><i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i></span> 계산된 시간급 (${Math.round(H29).toLocaleString()}원)</p>` ;


////////잠정 통상
//1) 월고정급인 경우
//통상월급 (잠정 최저임금 월급여+월최저차액)
let B36 = B28+gaptotalA

//통상시급 (B36을 통상임금시간 tongTimeM으로 나눈 값)
let C36 = B36/tongTimeM;
let C36_txt = gaptotalA > 0 ? `(통상임금 계산에 사용되는 임금 ${Math.round(B28).toLocaleString()}원+월 최저임금과의 차액(보전금품) ${Math.round(gaptotalA).toLocaleString()}원)÷월 통상임금 기준시간 ${tongTimeM}시간)`
  : `통상임금 계산에 사용되는 임금  ${Math.round(B28).toLocaleString()}원÷월 통상임금 기준시간 ${tongTimeM}시간`;

console.log('C36 :'+C36);

//2)항목배분 고정지급하는 경우
// 통상월급(통상임금에 포함되는 급여의 합계)
let B37 = B29+gaptotalA;

// 통상시급(B37을 통상임금시간 tongTimeM으로 나눈 값)
let C37 = B37/tongTimeM;
let C37_txt = gaptotalA > 0 ? `(통상임금 계산에 사용되는 임금 ${Math.round(B29).toLocaleString()}원+월 최저임금과의 차액(보전금품) ${Math.round(gaptotalA).toLocaleString()}원)÷월 통상임금 기준시간 ${tongTimeM}시간)` : `통상임금 계산에 사용되는 임금 ${Math.round(B29).toLocaleString()}원÷월 통상임금 기준시간 ${tongTimeM}시간`;

//////법정수당 기초자료
//잠정통상 / 월통상임금 해당금액을 월 통상임금시간수로 나눈 금액 / 기본급 등 월 통상임금의 산정기초가 됨
//mPaya=mPaya=월고정급제 단독월급여액이 있으면 잠정 잠정통상은 C36을 적용하고 그외(항목배분 고정지급)에는 C37를 적용)
let N29 = wageMonthType1 ? C36 : C37;

let N29_txt = wageMonthType1 ? `${C36_txt}` : `${C37_txt}`;
console.log('N29 :'+N29);




//시급통상 / 잠정통상시급(N29)에 월초과 상여금(S11m)의 시간당 금액(S11m/tongTimeM)을 더한 금액 / OT수당 등 법정수당의 산정 기초가 됨
//let P29  = Math.floor(N29 * 100000) / 100000 + T29;
let P29  = N29 + T29;
console.log('시급통상임금 P29:'+P29);

//wageMonthType2의 경우, 수당 명칭
let payNamelabels = [];

  if (K11 > 0) payNamelabels.push('직무수당등');
  if (M11 > 0) payNamelabels.push('복리후생비');
  if (O11 > 0) payNamelabels.push('매월상여금');

let payNameText  = payNamelabels.join('·');

//////////적법 월급여 내역 계산
//현행항목 (직무수당등,복리후생비,매월상여)
let I35 = (wageMonthType2 && (K11+M11+O11) > 0) ? K11+M11+O11 : 0;
let I35_txt = (wageMonthType2 && (K11+M11+O11) > 0) ? `<li>${payNameText} : ${Math.round(I35).toLocaleString()}원</li>` : ``;
let exceptI35_txt = I35 == 0 ? '' : `- 현재의 ${payNameText}(${Math.round(I35).toLocaleString()}원)`

//기본급(주휴수당포함)
//let G35 = H29<F29 ? Math.round(F29*R23-I35) : Math.round(H29*R23-I35);
let G35 = Math.round(N29*tongTimeM-I35) ;
//let G35_txt = wageMonthType1 ? `<ul style="margin-bottom:0"><li>${Math.round(N29).toLocaleString()}원×${tongTimeM}시간</li></ul>` : `<ul style="margin-bottom:0;"><li>(${Math.round(N29).toLocaleString()}원×${tongTimeM}시간)-${payNameText}(${Math.round(I35).toLocaleString()}원)</li></ul>` ;
let G35_txt = wageMonthType1 ? `
  <ul style="margin-bottom:0;"><li>${Math.round(N29).toLocaleString()}원×${tongTimeM}시간</li></ul>`:`
  <ul style="margin-bottom:0;"><li>(${Math.round(N29).toLocaleString()}원×${tongTimeM}시간)${exceptI35_txt}</li></ul>` ;

let G35_txt_f = `<li>기본급 : ${Math.round(G35).toLocaleString()}원</li>`;

//지급해야하는 연장근로수당
let M35 = P29*otM;
let M35_txt = M35 > 0 ? `<li>연장근로수당 : ${Math.round(M35).toLocaleString()}원 (${Math.round(P29).toLocaleString()}원×${otM}시간)</li>` :`` ;
let M35_txt_1 = M35 > 0 ? `<li>연장근로 : 월 ${Math.round(otW*4.345)}시간)</li>` :`` ;
//let M35_txt_f = M35 > 0 ? `+ 연장근로수당 ${M35.toLocaleString()}원` :`` ;
let M35_txt_f = M35 > 0 ? `<li>연장근로수당 : ${Math.round(M35).toLocaleString()}원 (${Math.round(P29).toLocaleString()}원×${otM}시간)</li>` :`` ;

console.log('M35 오리지날: '+M35);

//지급해야 하는 야간수당
let O35 = P29*nightM;
let O35_txt = O35 > 0 ? `<li>야간근로수당 : ${Math.round(O35).toLocaleString()}원 (${Math.round(P29).toLocaleString()}원×${nightM}시간)</li>` :`` ;
let O35_txt_1 = O35 > 0 ? `<li>야간근로 : 1주 ${nightW}시간(<span style="font-size:0.8em">또는</span> ${Math.round(nightW*4.345)}시간)</li>` :`` ;
//let O35_txt_f = O35 > 0 ? `+ 야간근로수당 ${O35.toLocaleString()}원` :`` ;
let O35_txt_f = O35 > 0 ? `<li>야간근로수당 : ${Math.round(O35).toLocaleString()}원 (${Math.round(P29).toLocaleString()}원×${nightM}시간)</li>` :`` ;

console.log('O35 오리지날: '+O35);

//지급해야 하는 휴일근로수당

let Q35 = P29*(holy1M+holy2M);
let Q35_txt = Q35 > 0 ? `<li>휴일근로수당 : ${Math.round(Q35).toLocaleString()}원 (${Math.round(P29).toLocaleString()}원×${holy1M+holy2M}시간)</li>` :`` ;
let Q35_txt_1 = Q35 > 0 ? `<li>휴일근로
                                      <ul>
                                        <li>(1주) 1일 8시간 이내 ${holy1W}시간, 1일 8시간 초과 ${holy2W}시간</li>
                                        <li><span style="font-size:0.8em">또는</span> (1월) 1일 8시간 이내 ${Math.round(holy1W*4.345)}시간, 1일 8시간 초과 ${Math.round(holy2W*4.345)}시간</li>
                                      </ul>
                                    </li>` :`` ;
//let Q35_txt_f = Q35 > 0 ? `+ 휴일근로수당 ${Q35.toLocaleString()}원` :`` ;
let Q35_txt_f = Q35 > 0 ? `<li>휴일근로수당 : ${Math.round(Q35).toLocaleString()}원 (${Math.round(P29).toLocaleString()}원×${holy1M+holy2M}시간)</li>` :`` ;

console.log('Q35 오리지날: '+Q35);

//연장,야간,휴일근로 명칭
let workNamelabels = [];

  if (!otv) workNamelabels.push('초과근로');
  if (M35 > 0) workNamelabels.push('연장근로');
  if (O35 > 0) workNamelabels.push('야간근로');
  if (Q35 > 0) workNamelabels.push('휴일근로');

let workNameText  = workNamelabels.join('·');
let workNameText_after = '연장(또는 야간·휴일)근로'
let workNameText_final = !otv ? workNameText_after : workNameText;




//let R29_txt = (wageMonthType1 && overBonusCond == 'Y') ? `<ul><li>${Math.round(R29).toLocaleString()}원 = (월초과지급 상여금 ${Math.round(S11m).toLocaleString()}원÷${tongTimeM}시간)×연장·야간·휴일근로 유급처리 ${overPremiumRatedHour}시간</li></ul>` : `` ;
let R29_txt = (overBonusCond == 'Y') ? `<ul><li>${Math.round(R29).toLocaleString()}원 = (연간 단위로 지급되는 상여금 월평균액 ${Math.round(S11m).toLocaleString()}원÷${tongTimeM}시간)×${workNameText} 유급처리 ${overPremiumRatedHour}시간</li></ul>` : `` ;
console.log('R29'+R29);

console.log('월초과지급 상여가 통상임금에 산입됨에 따라 추가되는 월 고정O/T수당 R29:  '+Math.round(R29).toLocaleString());







//연장,야간,휴일근로수당 명칭
let suNamelabels = [];
  if (wageMonthType1 && !otv) suNamelabels.push('초과근로에 대한 수당');
  if (wageMonthType2 && !otv) suNamelabels.push('고정OT수당');
//  if (wageMonthType2 && !otv&& !Q11) suNamelabels.push('연장(또는 야간·휴일)근로수당)');
  if (M35 > 0) suNamelabels.push('연장근로수당');
  if (O35 > 0) suNamelabels.push('야간근로수당');
  if (Q35 > 0) suNamelabels.push('휴일근로수당');

let suNameText  = suNamelabels.join('·');

//연장,야간,휴일근로 시간이 없는 경우 명칭
let suNameText_after = '연장(또는 야간·휴일)근로수당'
let suNameText_final = !otv ? suNameText_after : suNameText;

//최소한 제대로 지급해야할 임금 총액
let totalA = G35+I35;
let totalB = M35+O35+Q35;
let S35 = totalA + totalB ;

console.log('G35 : '+G35);
console.log('I35 : '+I35);
console.log('M35 : '+M35);
console.log('O35 : '+O35);
console.log('Q35 : '+Q35);

console.log('제대로 지급해야 할 임금'+S35.toLocaleString());
console.log('제대로 지급해야 할 임금'+Math.round(S35).toLocaleString());

//최소한 제대로 지급해야할 임금 총액-현행지급액
//현재 지급 금액
let currentWage = wageMonthType1 ? mPaya :  G11+K11+M11+O11+Q11;
//let currentWage = (!mPaya || mPaya === 0 || mPaya === '0') ? G11+K11+M11+O11+Q11 : mPaya;



//초과근무수당 차액 (근로계약으로 설정된 초과근무수당이 최소한 제대로 지급해야할 초과근무수당보다 많은 경우를 체크, 음수인 경우를 확인. wageMonthType2 타입을 확인학 위함)
let nowOtSudang = (wageMonthType1 && overBonusCond == 'Y') ? ((mPaya-R29)/totalHour) * overPremiumRatedHour + R29:
    (wageMonthType1 && overBonusCond == 'N') ? (mPaya/totalHour) * overPremiumRatedHour :
    mPay_ot ;

console.log('가상의 OT수당  : '+nowOtSudang.toLocaleString());    

let gaptotalB = Math.round((totalB - nowOtSudang));

console.log('gaptotalB'+gaptotalB.toLocaleString());   

// wageMonthType1 && overBonusCond 인 경우 결과값에서 공제하는 방법
/*
let st = F29*totalHour; 
let en = Math.round(st+R291);
let delN = st>=mPaya ? 0 : st<mPaya<=en ?  Math.min(Math.round(mPaya-st),Math.round(R291)) : Math.round(R291);
let gaptotalC = Math.max((gaptotalB-delN),0);
console.log('시작값 : ' + st);
console.log('종료값 : ' + en);
console.log('빼는값 : ' + delN);
console.log('결과 : ' + gaptotalC);
*/


console.log('OT차액 :'+ gaptotalB);
console.log('OT차액 :'+ Math.round(gaptotalB));

let gapTotal = gaptotalA + Math.max(gaptotalB,0);

console.log('gaptotalA+gaptotalB (gaptotalB가 음수인 경우에도 음수로 처리) :'+ (gaptotalA + gaptotalB)) ;
console.log('gaptotalA+gaptotalB (단, gaptotalB가 음수인 경우 0으로 처리) :'+ gapTotal);
console.log('차액'+ Math.round(gapTotal));


let sudangcomment = gaptotalB > 0 ? `<span style="margin-left:10px;"><i class="fa fa-arrow-left" aria-hidden="true"></i></span><span style="margin-left:5px; font-size:0.85em; font-weight:normal">법정 최저수준의 초과근무수당에 미달하는 금액 (<span class="rst_pr">${Math.round(gaptotalB).toLocaleString()}</span>)원이 <span class="rst_pr">포함</span></span>` :`` ;
//지급해야 하는 연장,야간,휴일근로수당 있는 경우, ul 태그 추가
let overWork_ul_s = otv ? `<li>법정수당 합계 : ${Math.round(totalB).toLocaleString()}원  ${sudangcomment}<ul>` : `` ;
let overWork_ul_e = otv ? `${gaptotalB > 0 ? `<li>미달 차액 ${Math.round(gaptotalB).toLocaleString()}원 = ${Math.round(totalB).toLocaleString()}원 - 현재의 ${workNameText}에 대한 임금 ${Math.round(nowOtSudang).toLocaleString()}원</li>`: ``}</ul></li>` : `` ;

//gaptotalA는 양수이고, gaptotalB는 음수이면서, 그 합이 양수인 경우 특별처리
let specialGap = gaptotalA > 0 && gaptotalB < 0 && gaptotalA+gaptotalB > 0 ;
console.log('gaptotalA+gaptotalB :'+(gaptotalA+gaptotalB));
console.log('specialGap :'+specialGap);

let S37 = (S35 - currentWage > 0 && !specialGap) ? S35 - currentWage : (S35 - currentWage > 0 && specialGap) ? 0 : 0 ;
//    (!mPaya || mPaya === 0 || mPaya === '0') ? S35 - (G11+K11+M11+O11+Q11) > 0  ? S35 - (G11+K11+M11+O11+Q11) : 0 //월급여가 항목배분인 경우
//    : S35-mPaya > 0 ? S35-mPaya : 0;  //월급여가 고정급인 경우
//wageMonthType1 ? (S35-mPaya > 0) ? S35-mPaya : 0
//    : S35 - (G11+K11+M11+O11+Q11) > 0  ? S35 - (G11+K11+M11+O11+Q11) : 0 ;



console.log(wageMonthType1 && overBonusCond == 'Y')
//최저임금 계산에 포함하는 임금(B2829), 제외하는 임금() 설명
//let B28_txt = R29 > 0 ? `{(${mPaya.toLocaleString()}원-${Math.round(R29).toLocaleString()}원)÷${totalHour}시간}×${R23}시간)` :`(${mPaya.toLocaleString()}원÷${totalHour}시간)×${R23}시간`;

let G11_txt = G11 > 0 ? `기본급 ${G11.toLocaleString()}원` : `` ;

let KMO11_txt = K11+M11+O11 > 0 ? ` + ${payNameText} ${(K11+M11+O11).toLocaleString()}원` : `` ;

let Q11_txt = mPay_ot >= 0 ? ` + 고정OT수당 ${mPay_ot.toLocaleString()}원` : `` ;

// 최저임금(월) 계산에 사용되는 임금
let minWageMUsed_txt = wageMonthType1 ? `${Math.round(B28).toLocaleString()}원` : `${Math.round(B29).toLocaleString()}원` ;

let minimunWage_txt = wageMonthType1 && S11 > 0 && otv ? `
<!--1타입/상여금이 있고/OT 있는 경우-->
  <li>최저임금 계산의 대상이 되는 월 임금 : <b>${Math.round(mPaya-R29).toLocaleString()}원</b>
    <ul style="margin:0">
      <li>${Math.round(mPaya-R29).toLocaleString()}원 = ${Math.round(mPaya).toLocaleString()}원 - ${Math.round(R29).toLocaleString()}원
        <ul>
          <li>연간 ${S11.toLocaleString()}원 상여금이 통상임금에 반영(<i class="fa fa-arrow-right" aria-hidden="true"></i> 대법원 판례 (대법원 2020다247190))됨에 따라 ${workNameText}에 대한 유급처리 임금 ${Math.round(R29).toLocaleString()}원이 최저임금 계산의 대상이 되는 임금에서 제외됩니다.</li>
          <li>${Math.round(R29).toLocaleString()}원 = (연간 단위로 지급되는 상여금 월평균액 ${Math.round(S11m).toLocaleString()}원÷${minTimeM}시간)×${workNameText} 유급처리 ${overPremiumRatedHour}시간</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>최저임금 계산에 사용되는 임금(월) : <b>${Math.round(B28).toLocaleString()}원</b>
    <ul style="margin:0">
      <li>최저임금 적용 기준시간에 대한 임금 ${Math.round(B28).toLocaleString()}원 = (${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간)×${minTimeM}시간</li>
      <li>최저임금 적용 기준시간 이외의 임금 ${Math.round((mPaya-R29)/totalHour*overPremiumRatedHour).toLocaleString()}원{(${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간)×${overPremiumRatedHour}시간}은 최저임금 계산에 사용되지 않습니다. <i class="fa fa-arrow-right" aria-hidden="true"></i> 대법원 판례 (대법원 2020다300299)</li>
    </ul>
  </li>`
  : wageMonthType1 && S11 <= 0 && otv ? `
<!--1타입/상여금이 없고/OT 있는 경우-->
  <li>최저임금 계산에 사용되는 임금(월) : <b>${Math.round(B28).toLocaleString()}원</b>
    <ul style="margin:0">
      <li>최저임금 적용 기준시간에 대한 임금 ${Math.round(B28).toLocaleString()}원 = (${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간)×${minTimeM}시간</li>
      <li>최저임금 적용 기준시간 이외의 임금 ${Math.round((mPaya-R29)/totalHour*overPremiumRatedHour).toLocaleString()}원{(${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간)×${overPremiumRatedHour}시간}은 최저임금 계산에 사용되지 않습니다. <i class="fa fa-arrow-right" aria-hidden="true"></i> 대법원 판례 (대법원 2020다300299)</li>
    </ul>
  </li>`
  : wageMonthType1 && !otv ? `
<!--1타입/OT 없는 경우-->  
  <li>최저임금 계산에 사용되는 임금(월) : <b>${Math.round(B28).toLocaleString()}원</b></li>`
  : wageMonthType2 && otv ? `
<!--2타입/OT 있는 경우-->
  <li>최저임금 계산에 사용되는 임금(월) : <b>${Math.round(B29).toLocaleString()}원</b>
    <ul style="margin:0">
      <li>${G11_txt}${KMO11_txt}</li>
      <li>${workNameText}에 대한 고정OT수당(총${overPremiumRatedHour}시간, ${mPay_ot.toLocaleString()}원)은 최저임금 계산에 사용되지 않습니다.</li>
    </ul>
  </li>`
  : `
<!--2타입/OT 없는 경우(else)-->
  <li>최저임금 계산에 사용되는 임금(월) : <b>${Math.round(B29).toLocaleString()}원</b>
    <ul  style="margin:0">
      <li>${G11_txt}${KMO11_txt}</li>
    </ul>
  </li>
`;


//최저임금 계산식 설명문(최종)
let minimunWageCalMethod_txt =
    wageMonthType1 ? `
    최저임금 비교대상 임금(시급) : <b>${Math.round(H29).toLocaleString()}원</b>
    <ul>
      <li>${Math.round(H29).toLocaleString()}원 = ${Math.round(B28).toLocaleString()}원 ÷ ${minTimeM}시간</li>
    </ul>`
    : `
    최저임금 비교대상 임금(시급) : <b>${Math.round(H29).toLocaleString()}원</b>
    <ul>
      <li>${Math.round(H29).toLocaleString()}원 = ${Math.round(B29).toLocaleString()}원 ÷ ${minTimeM}시간</li>
    </ul>`; 

// 최저임금 미달시 설명문
let minimumWageMakeUp_txt = (gaptotalA>0) ? `<p><i class="fa fa-thumb-tack fa-lg" style="color:#FF0000; margin-right:3px;" aria-hidden="true"></i> <span class="makeup">보전금품 지급</span> 최저임금법 위반(최저임금 미달)을 해소하기 위해서는 월 최저임금 <b>${(F29*minTimeM).toLocaleString()}</b>원(${F29.toLocaleString()}원×월 ${minTimeM}시간)과 '최저임금 계산에 사용되는 임금'(현재 <b>${minWageMUsed_txt}</b>)의 차액인 월 <span class="money-dn">${Math.round(gaptotalA).toLocaleString()}</span>원을 <b>보전금품</b>으로 지급해야 합니다. <span data-tooltip-text="[최저임금법 제6조] ③ 최저임금의 적용을 받는 근로자와 사용자 사이의 근로계약 중 최저임금액에 미치지 못하는 금액을 임금으로 정한 부분은 무효로 하며, 이 경우 무효로 된 부분은 이 법으로 정한 최저임금액과 동일한 임금을 지급하기로 한 것으로 본다."></span></p>` : `` ;


//계속지급해야할 월초과 상여금 지급해야할
let overBonusc_txt = S11 > 0 ? `<p class="rst_p22"><i class="fa fa-tags" aria-hidden="true"></i> 월을 초과하는 주기로 지급하는 <b>상여금 연 ${S11.toLocaleString()}원</b>은 위 계산결과와 별도로 현재와 같이 <b>계속해서 지급</b>되어야 합니다.</p>` : ``;



console.log('mPay_ot:'+mPay_ot);
console.log('Q11:'+Q11);

let tongWageExcept_txt = wageMonthType1 && S11 > 0 && otv ? `
          <ul class="wer">
            <li>통상임금 산정 기준시간 이외의 임금 ${Math.round(((mPaya-R29)/totalHour)*overPremiumRatedHour).toLocaleString()}원{(${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간)×${overPremiumRatedHour}시간}은 통상임금 계산에 사용되지 않습니다.</li>
          </ul>`
          : wageMonthType1 && S11 <= 0 && otv ? `
          <ul class="wer">
            <li>월고정 정액 임금(${mPaya.toLocaleString()}원) 중 ${workNameText}에 대한 임금 <b>${Math.round(mPaya-B28).toLocaleString()}원</b> (${mPaya.toLocaleString()}원÷${totalHour}시간)×${overPremiumRatedHour}시간)은 제외합니다.</li>
          </ul>`
          : wageMonthType1 && !otv ? ``
          : wageMonthType2 && otv ? `
          <ul class="wer">
            <li>${workNameText}에 대한 고정OT수당(총${overPremiumRatedHour}시간, ${mPay_ot.toLocaleString()}원)은 포함하지 않습니다.</li>
          </ul>`
          : wageMonthType2 && !otv && mPay_ot > 0 ? `
          <ul class="wer">
            <li>${workNameText_final}가 전혀 없는 상태(${overPremiumRatedHour}시간)에서 <b>고정OT수당 ${mPay_ot.toLocaleString()}원</b>이 지급된 경우, 통상임금에 포함되는지 여부에 대해 논란(<i class="fa fa-arrow-right" aria-hidden="true"></i> 고정OT수당이 통상임금에 포함되는지 여부)이 있습니다. 법원 판결 논란이 어떻게 종결되느냐에 따라 통상임금에 포함될 수도 있습니다.</li>
          </ul>
          `
          : `` ;
          
//1타입/상여금이 있고/OT 있는 경우 '통상임금 게산 대상 임금'
let tong_type1BonusCase = wageMonthType1 && S11 > 0 && otv ? `
  <li>통상임금 계산의 대상이 되는 월 임금 : <b>${Math.round(mPaya-R29).toLocaleString()}원</b>
    <ul style="margin:0">
      <li>${Math.round(mPaya-R29).toLocaleString()}원 = ${Math.round(mPaya).toLocaleString()}원 - ${Math.round(R29).toLocaleString()}원
        <ul>
          <li>연간 ${S11.toLocaleString()}원 상여금이 통상임금에 반영(<i class="fa fa-arrow-right" aria-hidden="true"></i> 대법원 판례 (대법원 2020다247190))됨에 따라 ${workNameText}에 대한 유급처리 임금 ${Math.round(R29).toLocaleString()}원이 통상임금 계산의 대상이 되는 임금에서 제외됩니다.</li>
          <li>${Math.round(R29).toLocaleString()}원 = (연간 단위로 지급되는 상여금 월평균액 ${Math.round(S11m).toLocaleString()}원÷${tongTimeM}시간)×${workNameText} 유급처리 ${overPremiumRatedHour}시간</li>
        </ul>
      </li>
    </ul>
  </li>`
  : ``;




//통상임금 계산에 사용되는 임금 tongWage
//1.최저임금(월) 계산에 사용되는 임금과 동일한 금액
let tongWage1 = wageMonthType1 ? B28 :  B29;
//2.최저임금 차액
let tongWage2 = gaptotalA > 0 ? gaptotalA : 0;
//3.상여금 
let tongWage3 = S11 > 0 ? S11m : 0;
//전체합계(1+2+3)
let tongWage = tongWage1 + tongWage2 + tongWage3;
console.log('통상임금 tongWage:'+tongWage);

let tongWage1_txt = wageMonthType1 ? `
  <b>${Math.round(B28).toLocaleString()}원</b> = (${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간)×${minTimeM}시간`
  : `
  <b>${Math.round(B29).toLocaleString()}원</b> = ${G11_txt}${KMO11_txt}`;

let tongWage2_txt = gaptotalA > 0 ? `<li>월 최저임금과의 차액(보전금품) <b>${Math.round(gaptotalA).toLocaleString()}원</b></li>` : ``;

let tongWage3_txt = S11 > 0 ? `<li>연간 단위로 지급되는 상여금의 월평균액 <b>${Math.round(S11m).toLocaleString()}원</b> = (연 ${(S11).toLocaleString()}원÷12월)
  <ul>
    <li>연간 단위로 지급되는 상여금도 통상임금에 반영됩니다.<i class="fa fa-arrow-right" aria-hidden="true"></i> 대법원 전원헙의체 2020다247190</li>
  </ul>
</li>` : ``;



//시급통상임금(P29) 설명
//let P29comment  = S11 > 0 ? `${N29.toLocaleString()}원 + (${S11.toLocaleString()}원÷월소정근로시간 ${R23}시간)` : `${N29.toLocaleString()}원`;
//let P29_txt  = S11 > 0 ? `<ul></li>{${N29_txt}} + {(월 초과 지급 상여금(연) ${(S11).toLocaleString()}원÷12월)÷월 통상임금 기준시간 ${tongTimeM}시간}</li></ul>` : `<ul><li>${N29_txt}</li></ul>`;
let P29_txt  = `<ul></li>${Math.round(tongWage).toLocaleString()}원 ÷ ${tongTimeM}시간</li></ul>`




//연장,야간,휴일근로시간 설명문
//let ot8_txt = ot8hour > 0 ? `<li>1주간 1일 8시간을 초과한 연장근로 : ${ot8hour}시간</li>` :``;
//let ot40_txt = ot40hour > 0 ? `<li>1주간 40시간을 초과한 연장근로 : ${ot40hour}시간</li>` : ``;

/*

let ot_txt = otM > 0 ? `
    <li>월 연장근로 유급시간 : <b>${otM}</b> 시간 <span>= ${otMd>0 ? `(1월 ${otMd}시간×${otPremiumRate})` : `(1주 ${otW}시간×${otPremiumRate})×(365일÷7일÷12월)`}</span></li>`:
    ``;
let nt_txt = nightM > 0 ? `
    <li>월 야간근로 유급시간 : <b>${nightM}</b> 시간 <span>= ${ntMd>0 ? `(1월 ${ntMd}시간×${ntPremiumRate})` : `(1주 ${nightW}시간×${ntPremiumRate})×(365일÷7일÷12월)`}</span></li>`:
    `` ;
let holy_txt = holyworkFull > 0 ? `
  <li>1주 휴일근로 : <span data-tooltip-text="1일 8시간 이내의 휴일근로 ${holy1W}시간 + 1일 8시간을 초과한 휴일근로 ${holy2W}시간">${holyworkFull}시간 </span>
    <ul>
      <li>월 휴일근로<span>(1일 8시간 이내)</span> 유급시간 : <b>${holy1M}</b> 시간 <span>= (1주 <b>${holy1W}</b>시간×${hw1PremiumRate})×(365일÷7일÷12월)</span></li>
      <li>월 휴일연장<span>(1일 8시간 초과)</span> 유급시간 : <b>${holy2M}</b> 시간 <span>= (1주 <b>${holy2W}</b>시간×${hw2PremiumRate})×(365일÷7일÷12월)</span></li>
    </ul>
  </li>
  ` : `` ;


*/
//console.log('연장근로가 직접 입력되었다: '+otMd > 0);
//console.log('연장근로가 직접 입력되지 않았다 : '+!otMd);




  let ot_txt = timeType1 && otM > 0 ? `
    <li>월 연장근로 유급처리 시간(가산율 포함) : <b>${otM}</b> 시간 <span>= 월 ${otMd}시간×${otPremiumRate}</span></li>`:
    timeType2 && otM > 0 ? `
    <li>월 연장근로 유급처리 시간(가산율 포함) : <b>${otM}</b> 시간 <span>= (주 ${otW}시간×${otPremiumRate})×(365일÷7일÷12월)</span></li>`:
    ``;

  let ntOption1 = timeType1 && ntMd > 0;   //월단위로 입력한 월야간근로시간수
  let ntOption2 = timeType2 && nightW > 0; //주단위로 입력한 주야간근로시간수
  let nt_txt = ntOption1 ? `
    <li>월 야간근로 유급처리 시간(가산율 포함) : <b>${nightM}</b> 시간 <span>= 월 ${ntMd}시간×${ntPremiumRate}</span></li>`:
    ntOption2 ? `
    <li>월 야간근로 유급처리 시간(가산율 포함) : <b>${nightM}</b> 시간 <span>= (주 ${nightW}시간×${ntPremiumRate})×(365일÷7일÷12월)</span></li>`:
    ``;

console.log('holyworkFull : '+holyworkFull);

  let hwOption1 = timeType1 && holyworkFull > 0; //월단위로 입력한 전체휴일근로시간수
  let hwOption2 = timeType2 && holyworkFull > 0; //주단위로 입력한 전체휴일근로시간수

console.log('월단위로 입력한 전체휴일근로시간 : '+hwOption1);
console.log('주단위로 입력한 전체휴일근로시간 : '+hwOption2);

    let holy_txt = hwOption1 ? `
    <li>월 휴일근로 : <span data-tooltip-text="1일 8시간 이내의 휴일근로 ${hwMd1}시간 + 1일 8시간을 초과한 휴일근로 ${hwMd2}시간">${hwMd1+hwMd2}시간 </span>
      <ul>
        <li>월 휴일근로<span>(1일 8시간 이내)</span> 유급처리 시간(가산율 포함) : <b>${holy1M}</b> 시간 <span>= (월 <b>${hwMd1}</b>시간×${hw1PremiumRate})</span></li>
        <li>월 휴일연장<span>(1일 8시간 초과)</span> 유급처리 시간(가산율 포함) : <b>${holy2M}</b> 시간 <span>= (월 <b>${hwMd2}</b>시간×${hw2PremiumRate})</span></li>
      </ul>
    </li>` :
    hwOption2 ? `
    <li>1주 휴일근로 : <span data-tooltip-text="1일 8시간 이내의 휴일근로 ${holy1W}시간 + 1일 8시간을 초과한 휴일근로 ${holy2W}시간">${holyworkFull}시간 </span>
      <ul>
        <li>월 휴일근로<span>(1일 8시간 이내)</span> 유급처리 시간(가산율 포함) : <b>${holy1M}</b> 시간 <span>= (1주 <b>${holy1W}</b>시간×${hw1PremiumRate})×(365일÷7일÷12월)</span></li>
        <li>월 휴일연장<span>(1일 8시간 초과)</span> 유급처리 시간(가산율 포함) : <b>${holy2M}</b> 시간 <span>= (1주 <b>${holy2W}</b>시간×${hw2PremiumRate})×(365일÷7일÷12월)</span></li>
      </ul>
    </li>`:
    `` ;












//let otM_txt = ot8hour > 0 ? `<li>월 연장근로 유급시간 : ${otM} 시간 <span>= (1주 연장근로 ${otW}시간×${otPremiumRate})×(365일÷7일÷12월)</span></li>` : `` ;
//let nightM_txt = nightW > 0 ? `<li>월 야간근로 유급시간 : ${nightM} 시간 <span>= (1주 야간근로 ${nightW}시간×${ntPremiumRate})×(365일÷7일÷12월)</span></li>` : `` ;
//let holy1M_txt = holy1M > 0 ? `<li>월 휴일근로<span>(1일 8시간 <b>이내</b>)</span> 유급시간 : ${holy1M} 시간 <span>= (1주 휴일근로 ${holy1W}시간×${hw1PremiumRate})×(365일÷7일÷12월)</span></li>` : `` ;
//let holy2M_txt = holy2M > 0 ? `<li>월 휴일연장<span>(1일 8시간 <b>초과</b>)</span> 유급시간 : ${holy2M} 시간 <span>=(1주 휴일근로 ${holy2W}시간×${hw2PremiumRate})×(365일÷7일÷12월)</span></li>` : `` ;


let totM = otM > 0 ? ` + ${otM}시간` : `` ;
let tnightM = nightM > 0 ? ` + ${nightM}시간` : `` ;
let tholyM = (holy1M+holy2M) > 0 ? ` + ${holy1M}시간+${holy2M}시간` : `` ;
let totalHour_txt_sub = `${R23}시간${totM}${tnightM}${tholyM}`;

let totalHour_txt = otv ? `
    <li>전체 유급처리 시간(월) : <b>${totalHour}</b> 시간 <span>= ${totalHour_txt_sub}</span></li>
    ` : `
    <li>전체 유급처리 시간(월) : <b>${totalHour}</b> 시간</li>`;



////////// 포괄임금 적법 여부
//gaptotalB < 0인 경우,처리해야할 사항 

console.log('gaptotalA:'+gaptotalA);
console.log('gaptotalB:'+gaptotalB);  

//포괄임금액이 적절한지, 부적절한지 여부
let otsudangRevised = gaptotalB > 0 ? `${workNameText} 시간에 비해 ` : `` ;

let isTitleLegal = (gaptotalA == 0) && (gaptotalB <= 0);
let title_txt = isTitleLegal ? `<i class="fa fa-info-circle fa-lg legal-text" style="margin-right:10px" aria-hidden="true"></i><span class="legal-text font-weight-bold">포괄임금액 수준이 적절합니다</span>` : `<i class="fa fa-info-circle fa-lg illegal-text" style="margin-right:10px" aria-hidden="true"></i><span class="illegal-text font-weight-bold">${otsudangRevised}포괄임금액 수준이 부적절합니다</span>` ;

//let title_sub_txt = (gaptotalA == 0) && (gaptotalB < 0 || gaptotalB == 0) ? `현재 포괄임금계약은 최저임금법을 준수하고 있으며, 초과근무수당도 적절히 지급되고 있습니다.` : `현재 포괄임금계약은 최저임금법을 위반하고 있거나, 초과근무수당이 부족하게 지급되고 있습니다.` ;

let title_sub1_txt = gaptotalA > 0 ? `<li>최저임금 미달액(<span class="rst_pr">${Math.round(gaptotalA).toLocaleString()}원</span>)이 기본급에 보전되어야 합니다</li>` : `` ;
let title_sub2_txt = gaptotalB > 0 ? `<li>${suNameText}이 법정 최소 수준(${Math.round(totalB).toLocaleString()}원) 이상이 되도록 <span class="rst_pr">${Math.round(gaptotalB).toLocaleString()}원</span>이 보전되어야 합니다.</li>` : `` ;
let title_sub3_txt = gaptotalA == 0 && (gaptotalB < 0 || gaptotalB == 0) ? `<li>시간당 임금과 ${suNameText}이 법정 최소 수준에 미달하지 않습니다</li>` : `` ;
let title_sub4_txt = gaptotalB < 0 ? `<li>현재 지급하는 ${suNameText}(${Math.round(nowOtSudang).toLocaleString()}원)이 법정 최소 수준보다 <b>${(Math.round(-gaptotalB)).toLocaleString()}원</b> 많지만, 근로자의 동의없이 하향조정할 수 없으므로 현행대로 유지해야 합니다</li>` : `` ;


/*thisCal 설명문*/
let workday_txt = workday > 0 ? `근무일 ${workday}일` : `` ;
let yuhuil_txt = yuhuil > 0 ? `, 유급휴일 ${yuhuil}일` : `` ;
let muhuil_txt = muhuil > 0 ? `, 무급휴일 ${muhuil}일` : `` ;
let yuhumu_txt = yuhumu > 0 ? `, 유급휴무일 ${yuhumu}일` : `` ;
let muhumu_txt = muhumu > 0 ? `, 무급휴무일 ${muhumu}일` : `` ;
let info_day = `(${workday_txt}${yuhuil_txt}${muhuil_txt}${yuhumu_txt}${muhumu_txt})` ;
let info1 = person5Up ?  `5인이상 사업장` : `5인미만 사업장` ;
let info2 = specialJobN ?  `특수 업종·직종<span data-tooltip-text="① 농림·축산·수산업 종사자 ② 감시·단속직 종사자 ③ 관리ㆍ감독ㆍ기밀 업무 종사자">에 해당하지 않는` : `특수 업종·직종<span data-tooltip-text="① 농림·축산·수산업 종사자 ② 감시·단속직 종사자 ③ 관리ㆍ감독ㆍ기밀 업무 종사자">에 해당하는` ;
let info3 = y2027 ?  `2027년도` : y2026 ?  `2026년도` : `2025년도` ;

let info4_txt = fpType2 ? `<li>파트타이머(1주 40시간 미만 근무자)인 경우, 동종 풀타임 근로자의 1주 근무일 수는 <b>5일</b>로 간주한 계산입니다.</li>` : `` ;

//let  info2_2 = (otW + nightW + holy1W > 0) ? `기본근로시간(1일 8시간, 1주 40시간)외에 연장·야간·휴일근로를 하고 그에 상응하는 수당(OT수당)을 월고정급여액에 포함하거나 기본급여액외 별도의 수당을 받기로 정한 기로 정한하는` : `연장·야간·휴일근로를 하지 않는` ;

let thisCal_1_txt =`
    <li>이 계산은
      <ul>
        <li><b>${info1}</b> ${info_day}에서</li>
        <li><b>${info2}</b> 월급제 근로자의 <span class="rst_pb" data-tooltip-text="기본근로시간(1일 8시간, 1주 40시간)외에 연장·야간·휴일근로를 하고 그에 상응하는 수당(OT수당)을 월고정급여액에 포함하거나 기본급여액외 별도의 수당을 받기로 정한 기로 정한 계약">포괄임금 계약 </span>이</li>
        <li><b>${info3} 최저임금</b>을 기준으로 <span class="rst_pb">적법</span>한지를 확인하는 계산입니다.</li>
        ${info4_txt}
      </ul>
    </li>
    ` ;

let thisCal_2_txt =
  (H29 < F29) ? `
    <li>이 계산은 임금이 최저임금에 미달하는 경우 ①최저임금과의 차액을 <b>보전금품으로 추가</b>하여 최저임금 미달을 해소하고 <i class="fa fa-arrow-right" aria-hidden="true"></i> ②최저임금 미달이 해소된 임금을 기준으로 통상임금을 계산한 다음 <i class="fa fa-arrow-right" aria-hidden="true"></i> ③ 그 통상임금을 기준으로 포괄임금계약의 적법 여부를 따지는데, 이 방식은 아래에 따른 것입니다.
      <ul>
        <li>대법원 판례 (2014다49074, 2017.12.28.) </li>
        <li>노동부 행정해석 (근로기준정책과-6075, 2019.12.4.) </li>
      </ul>
    </li>
  `
  : ``;

//연장,야간,휴일근로수당이 하나만 있는지 여부
let onlyOne = (otM > 0 && nightM == 0 && holy1M + holy2M ==0) || (otM==0 && nightM > 0 && holy1M + holy2M ==0) || (otM==0 && nightM == 0 && holy1M + holy2M > 0);
console.log('onlyOne:'+onlyOne);

//초과근로를 감안한 현재 임금 분석
let divTargetSudang = wageMonthType1 ? (mPaya * (overPremiumRatedHour / totalHour)) : mPay_ot ;
let divot_txt = otM > 0 ? `<li>연장근로수당 ${Math.round(divTargetSudang / overPremiumRatedHour * otM).toLocaleString()}원 (${Math.round(divTargetSudang).toLocaleString()}원÷${overPremiumRatedHour}시간×${otM}시간)</li> ` : ``;
let divnight_txt = nightM > 0 ? `<li>야간근로수당 ${Math.round(divTargetSudang / overPremiumRatedHour * nightM).toLocaleString()}원 (${Math.round(divTargetSudang).toLocaleString()}원÷${overPremiumRatedHour}시간×${nightM}시간)</li>` :``;
let divholy_txt = (holy1M + holy2M) > 0 ? `<li>휴일근로수당 ${Math.round(divTargetSudang / overPremiumRatedHour * (holy1M+holy2M)).toLocaleString()}원 (${Math.round(divTargetSudang).toLocaleString()}원÷${overPremiumRatedHour}시간×${holy1M+holy2M}시간)</li>` : ``;
let divSudang_txt = wageMonthType1 && onlyOne ? `` : `<ul>${divot_txt} ${divnight_txt} ${divholy_txt}</ul>`;






let payBefore = (wageMonthType1 && S11 > 0 && otv) ? `
      <ul>
        <li>${workNameText} 시간과 연간단위로 지급되는 상여금(연간 ${S11.toLocaleString()}원)을 감안하면 월고정급 ${mPaya.toLocaleString()}원은 아래와 같이 해석합니다.
          <ul>
            <li>소정근로시간에 대한 임금  : ${Math.round((mPaya-R29) * (tongTimeM / totalHour)).toLocaleString()}원
              <ul>
                <li>{${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간×${tongTimeM}시간}</li>
              </ul>
            </li>
            <li>${workNameText}에 대한 임금 : ${Math.round((mPaya-R29) * (overPremiumRatedHour / totalHour) + R29).toLocaleString()}원
              <ul>
                <li>{${Math.round(mPaya-R29).toLocaleString()}원÷${totalHour}시간×${overPremiumRatedHour}시간} + ${Math.round(R29).toLocaleString()}원
              ${divSudang_txt}</li>
                <li>연간 ${S11.toLocaleString()}원 상여금을 통상임금에 반영해야 하므로 ${workNameText}에 대한 임금에 ${Math.round(R29).toLocaleString()}원이 추가되었습니다. <i class="fa fa-arrow-right" aria-hidden="true"></i> 대법원 판례 (대법원 2020다247190)
                ${R29_txt}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>`
      : (wageMonthType1 && S11 <= 0 && otv) ? `
      <ul>
        <li>${workNameText} 시간을 감안하면 월고정급 ${mPaya.toLocaleString()}원은 아래와 같이 해석합니다.
          <ul>
            <li>소정근로시간에 대한 임금  : ${Math.round(mPaya * (tongTimeM / totalHour)).toLocaleString()}원 <span data-tooltip-text="${mPaya.toLocaleString()}원÷${totalHour}시간×${tongTimeM}시간"> </span></li>
            <li>${workNameText}에 대한 임금 : ${Math.round(mPaya * (overPremiumRatedHour / totalHour)).toLocaleString()}원 <span data-tooltip-text="${mPaya.toLocaleString()}원÷${totalHour}시간×${overPremiumRatedHour}시간"> </span>
              ${divSudang_txt}
            </li>
          </ul>
        </li>
      </ul>`
      : wageMonthType2 && otv ?`
      <ul>
        <li>${G11_txt}${KMO11_txt}${Q11_txt}
          <ul>
            <li>${workNameText}시간을 감안하면 고정OT수당 ${mPay_ot.toLocaleString()}원은 아래와 같이 해석됩니다.
              ${divSudang_txt}
            </li>
          </ul>
        </li>
      </ul>`
      : wageMonthType2 && !otv && mPay_ot > 0 ?`
      <ul>
        <li>${G11_txt}${KMO11_txt}${Q11_txt}</li>
      </ul>`
      :`` ;



console.log('S35:'+S35);
console.log('gaptotalB:'+gaptotalB);
console.log('gaptotalB가 음수인 경우, S35 - gaptotalB:'+Math.round(S35 - gaptotalB).toLocaleString());



/*결과테이블*/

let rst_mPay_after = gaptotalB < 0 ? `
<div class="rst_mPay_after">
<b>월급여액  ${Math.round(S35 - gaptotalB).toLocaleString()}원</b>
  <ul>
    ${G35_txt_f}
    ${I35_txt}
    ${!otv?`<li>${suNameText_after} : ${nowOtSudang.toLocaleString()}원</li>`:''}
    ${divot_txt}
    ${divnight_txt}
    ${divholy_txt}
  </ul>
  </div>`
    :`
<div class="rst_mPay_after">
<b>월급여액  ${Math.round(S35).toLocaleString()}원</b>
  <ul>
    ${G35_txt_f}
    ${I35_txt}
    ${!otv?`<li>${suNameText_after} : 0원</li>`:''}
    ${M35_txt_f}
    ${O35_txt_f}
    ${Q35_txt_f}
  </ul>
  </div>` ;


//let SS = gaptotalA > 0 ? `최저임금 미달 해소를 위한 금품 보전 : ${Math.round(gaptotalA).toLocaleString()}원` : `` ;

let limitedOtW = 12 ; //법정 연장근로시간 한도 (1주 12시간)

let revised_Basic = gaptotalA > 0 ? gaptotalA : 0 ;
let revised_Basic_txt = gaptotalA > 0 ? `${Math.round(gaptotalA).toLocaleString()}원 <span class="wer2">(기본급에 반영)</span>` : `0원` ;

let revised_Sudang = gaptotalB;
let revised_Sudang_txt = gaptotalB > 0 ? `${Math.round(gaptotalB).toLocaleString()}원 <span class="wer2">(${suNameText}에 반영)</span>` : `${Math.round(Math.max(gaptotalB,0)).toLocaleString()}원` ; //gaptotalB가 음수인 경우 0원으로 표기

let notouchSudang_txt = gaptotalB < 0 ? `<li><span class="wer2">현재의 <b>${suNameText}(${Math.round(nowOtSudang).toLocaleString()}원)</b>이 법정 최소 수준(${Math.round(totalB).toLocaleString()}원)보다 <b>${(Math.round(-gaptotalB)).toLocaleString()}원</b> 많지만, 근로자의 동의없이 하향조정할 수 없으므로 현행대로 유지해야 합니다</span></li>` : `` ;

let revised_total = revised_Basic + revised_Sudang ;
console.log('revised_total:'+revised_total);

let revised_total_zeroUp = Math.round(gapTotal) ; //gapTotal = gaptotalA + Math.max(gaptotalB,0)
console.log('revised_total_zeroUp=gapTotal :'+revised_total_zeroUp);


let revisedMinimumWagecomment = gaptotalA > 0 ? `<span style="margin-left:10px;"><i class="fa fa-arrow-left" aria-hidden="true"></i></span><span style="margin-left:5px; font-size:0.85em; font-weight:normal">최저임금 미달 해소를 위한 보전금품(<span class="rst_pr">${Math.round(gaptotalA).toLocaleString()}</span>)원이 <span class="rst_pr">포함</span></span>` : `` ;


//결과 설명

let isLegal = (gaptotalA == 0) && (gaptotalB <= 0);
let resultClass = isLegal ? "legal-bg" : "illegal-bg";
let textClass = isLegal ? "legal-text" : "illegal-text";

// 총괄 판단
let rTop_txt = isLegal ? `
  <h4 class="h4em ${textClass}" style="margin:0;">적법한 포괄임금제입니다</h4>`
  : `<h4 class="h4em ${textClass}" style="margin:0;">잘못된 포괄임금제입니다. 개선이 필요합니다.</h4>
  <b>조치(개선)가 필요한 사항</b>은 아래와 같습니다.
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> <span class="cr">체불임금 해소</span> (보전금품 추가 지급)</h4>` ;

// 보전금품 지급 여부(적법한 경우)
let rYes_txt = (gaptotalA == 0) && (gaptotalB < 0 || gaptotalB == 0) ? `<p class="rst_p22">현재 임금에서 추가로 지급할 금액은 없습니다. 다만, <b>개선(주의)할 사항</b>은 아래와 같습니다.</p>` : ``  ;

// 보전금품 지급 여부(부적법한 경우)
let rNo_txt = (gaptotalA > 0 && gaptotalB > 0) ? `
  <p class="rst_p22">① 최저임금 미달 해소를 위해 <span class="rst_pr">${Math.round(gaptotalA).toLocaleString()}</span>원을 기본급에 포함(또는 보전금품으로 지급)하고, ② 포괄임금계약에 포함된 ${suNameText}이 법정 최소 수준 이상이 되도록 <span class="rst_pr">${Math.round(gaptotalB).toLocaleString()}</span>원을 보전금품으로 지급해야 합니다. (<b>체불임금 총액 <span class="rst_pr">${Math.round(gaptotalA+gaptotalB).toLocaleString()}</span>원</b>)</p>`
  : (gaptotalA > 0 && (gaptotalB < 0 || gaptotalB == 0)) ? `
  <p class="rst_p22"><b>최저임금 미달 해소</b>를 위해 <span class="rst_pr">${Math.round(gaptotalA).toLocaleString()}</span>원을 기본급에 추가(또는 보전금품을 지급)해야 합니다.</p>`
  : (gaptotalA == 0 && gaptotalB > 0) ? `
  <p class="rst_p22">법정 최소 수준 이상의 ${suNameText}이 되도록 <span class="rst_pr">${Math.round(gaptotalB).toLocaleString()}</span>원을 보전금품으로 지급해야 합니다</p>`
  : `` ;

// 현재 OT수당이 법정 최소 수준보다 많은 경우  
let rOtover_txt = gaptotalB < 0 ? `<p class="rst_p22">현재 지급되는 ${suNameText}(${Math.round(nowOtSudang).toLocaleString()}원)이 법정 최소 수준(<b>${Math.round(totalB).toLocaleString()}원</b>)보다 <b>${(Math.round(-gaptotalB)).toLocaleString()}원</b> 많지만, 근로자의 동의없이 하향조정할 수 없으므로 현행대로 유지해야 합니다</p>` : `` ;

// 포괄임금 계약 형식 개선
let wType = wageMonthType1 ? `${suNameText}을 기본급에 포함하는 현재와 같은 <span class="rst_pb">정액급여제</span> 포괄임금 방식 대신` : `기본급과 법정수당은 구분되나 ${workNameText}에 따른 개별 수당간 금액이 구분되지 않고 '고정OT수당'으로 ${mPay_ot.toLocaleString()}원을 지급하는 현재의 <span class="rst_pb">정액수당제</span> 포괄임금 방식 대신`; 

let rMathod_txt = `
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> 임금계약 형태의 변경 <span class="rst_h_n">(임금 항목의 구체적 구분)</span></h4>
  <p class="rst_p22">${wType} <u>아래와 같이</u> 기본급과 <b>${suNameText_final}</b>을 <b>각각 구분</b>하고 그 계산방법을 명시하기 바랍니다.</p>
  ${rst_mPay_after}
  <ul>      
    <li>근로기준법 제17조에 따라 임금 구성 항목, 그 계산방법, 소정근로시간 등을 반드시 서면으로 명시하고 이를 근로자에 교부해야 합니다. 따라서 기본급과 <b>${suNameText_final}</b>이 <b>각각 구분되어야</b> 적법한 포괄임금계약으로 인정됩니다. <i class="fa fa-arrow-right" aria-hidden="true"></i> 포괄임금제 적용기준과 적법성 판단 기준 </li>
  </ul>` 

console.log('otMd 월단위로 입력한 월연장근로시간 : ' + otMd);
console.log('otW  주단위로 입력한 주연장근로시간 : ' + otW);
//법정 근로시간 준수
let rlimitedOtWhour = otMd > 52 ? `월 ${otMd}시간=1주 ${(otMd/4.345).toFixed(1)}시간`
  : `1주 ${otW}시간`;
let rlimitedOtW_txt = otMd > 52 || otW > limitedOtW  ? `
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> 법정 근로시간 준수</h4>
  <p class="rst_p22">연장근로시간(${rlimitedOtWhour})이 <b>법정 한도</b>(1주 ${limitedOtW}시간)를 초과하며, 그에 상응하는 연장근로수당 지급하더라도 잘못된 포괄임금계약입니다. 연장근로가 1주 12시간 이내가 되도록 근로계약을 재설계해야 합니다.</p>`
  : `` ;

//월초과 상여금의 준수
let rBonus_txt = S11 > 0 ? `
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> 연간 단위 지급 상여금의 준수</h4>
  <p class="rst_p22">연간 단위로 지급하는 <b>상여금 연 ${S11.toLocaleString()}원</b>은 위 계산결과와 별도로 현재와 같이 <b>계속해서 지급</b>되어야 합니다.</p>`
  : ``;

//모바일 계산결과 출력
let rTop_txt_mo = isLegal ? `
  <h4 class="h4em ${textClass}" style="margin:0;">적법한 포괄임금제입니다</h4>`
  : `<h4 class="h4em ${textClass}" style="margin:0;">잘못된 포괄임금제입니다.</h4>
  <b>조치가 필요한 사항</b>은 아래와 같습니다.
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> <span class="cr">체불임금 해소</span> (보전금품 추가 지급)</h4>` ;

let rYes_txt_mo = (gaptotalA == 0) && (gaptotalB < 0 || gaptotalB == 0) ? `<p class="rst_p22">추가로 지급할 금액은 없습니다. 다만, <b>개선할 사항</b>은 아래와 같습니다.</p>`
  : ``  ;

let rNo_txt_mo = (gaptotalA > 0 && gaptotalB > 0) ? `
  <p class="rst_p22">① 최저임금 미달 해소를 위해 <span class="rst_pr">${Math.round(gaptotalA).toLocaleString()}</span>원을, ② ${suNameText}이 법정 최소 수준 이상이 되도록 <span class="rst_pr">${Math.round(gaptotalB).toLocaleString()}</span>원을 각각 보전금품으로 지급해야 합니다. (<b>체불임금 총액 <span class="rst_pr">${Math.round(gaptotalA+gaptotalB).toLocaleString()}</span>원</b>)</p>`
  : (gaptotalA > 0 && (gaptotalB < 0 || gaptotalB == 0)) ? `
  <p class="rst_p22"><b>최저임금 미달 해소</b>를 위해 <span class="rst_pr">${Math.round(gaptotalA).toLocaleString()}</span>원을 지급해야 합니다.</p>`
  : (gaptotalA == 0 && gaptotalB > 0) ? `
  <p class="rst_p22">법정 최소 수준 이상의 ${suNameText}이 되도록 <span class="rst_pr">${Math.round(gaptotalB).toLocaleString()}</span>원을 보전금품으로 지급해야 합니다</p>`
  : `` ;

let rOtover_txt_mo = gaptotalB < 0 ? `<p class="rst_p22">현재의 ${suNameText}(${Math.round(nowOtSudang).toLocaleString()}원)이 법정 최소 수준(<b>${Math.round(totalB).toLocaleString()}원</b>)보다 <b>${(Math.round(-gaptotalB)).toLocaleString()}원</b> 많지만, 근로자 동의없이 하향조정할 수 없으므로 현행대로 유지해야 합니다</p>` : `` ;

let wType_mo = wageMonthType1 ? `${suNameText}을 기본급에 포함하는 현재의 <span class="rst_pb">정액급여제</span> 포괄임금 방식 대신` : `기본급과 법정수당은 구분되나 ${workNameText}에 따른 개별 수당간 금액이 구분되지 않고 '고정OT수당'으로 ${mPay_ot.toLocaleString()}원을 지급하는 현재의 <span class="rst_pb">정액수당제</span> 포괄임금 방식 대신`; 

let rMathod_txt_mo = `
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> 임금계약 형태의 변경</h4>
  <p class="rst_p22">${wType_mo} <u>아래와 같이</u> 기본급과 <b>${suNameText_final}</b>을 <b>각각 구분</b>하고 그 계산방법을 명시하기 바랍니다.</p>
  ${rst_mPay_after}` ;

let rlimitedOtW_txt_mo = otMd > 52 || otW > limitedOtW  ? `
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> 법정 근로시간 준수</h4>
  <p class="rst_p22">연장근로시간(${rlimitedOtWhour})이 <b>법정 한도</b>(1주 ${limitedOtW}시간)를 초과하므로 연장근로가 1주 12시간 이내가 되도록 근로계약을 재설계해야 합니다.</p>`
  : `` ;

let rBonus_txt_mo = S11 > 0 ? `
  <h4 class="rst_h_b"><i class="fa fa-tags" aria-hidden="true"></i> 연간 단위 지급 상여금의 준수</h4>
  <p class="rst_p22">연간 단위로 지급하는 <b>상여금 연 ${S11.toLocaleString()}원</b>은 위 계산결과와 별도로 현재와 같이 <b>계속해서 지급</b>되어야 합니다.</p>` : ``;




//오버타임 >0일 때 실행
//let resultText = otv ? `

//언제나 실행
let resultText = totalHour > 0 ? `


<table class="result-table ${resultClass}">
  <tr>
    <th class="result-th">결과(요약)</th>
    <td class="result-td">
      ${rTop_txt}
      ${rYes_txt}
      ${rNo_txt}
      ${rOtover_txt}
      ${rMathod_txt}  
      ${rlimitedOtW_txt}
      ${rBonus_txt}
    </td>
  </tr>
</table>

<table class="result-table" style="margin-top:20px;">
  <tr>
    <th class="result-th">결과(상세)</th>
    <td class="result-td">
      <ul style="padding-left:0px; list-style-type:none;">
        ${thisCal_1_txt}
        ${thisCal_2_txt}
      </ul>
      <h4 class="rst_h_b" style="margin-top:15px;">이 계산에 사용된 시간 수</h4>
      <div class="timeAnal">
        <ul>
          <li>1주 기본근로시간 : ${p1H23}시간 <span>(1일 8시간 이내, 1주 40시간 이내의 실근로시간)</span></li>
          <li>1주 실근로시간 : ${full_workhourWeek}시간 <span>(1주 기준근로시간 + 이를 초과한 실제근로시간)</span></li>
          <li>1일 소정근로시간 : ${p1H22} 시간 <span>${p1H22_txt}</span></li>
          ${ot_txt}
          ${nt_txt}
          ${holy_txt}
          <!-- 중복으로 사용 제한
          ${timeMonth_txt}
          -->
          ${totalHour_txt}
        </ul>
      </div>
    </td>
  </tr>
</table>

${gaptotalA > 0 ? `
<table class="result-table illegal-bg" style="margin-top:20px;">
  <tr>
    <th class="result-th">최저임금<br>적합 여부</th>
    <td class="result-td">
      <div class="result-container-in">
        <div class="rst_inbox">
          ${J29_txt}
          ${yourMinWage_txt}
        </div>
        <p>시간급(<b>${Math.round(H29).toLocaleString()}원</b>)은 아래와 같이 계산되었습니다.</p>
        <ul style="margin-bottom:15px;">
          <li>최저임금 적용 기준시간(월) <span data-tooltip-text="1주 동안의 소정근로시간 수(${p1H23}시간)와 유급 주휴일 시간 수(${p2H18}시간)를 합산한 시간 수에 1년 동안의 평균의 주의 수(365일÷7일)를 곱한 시간을 12로 나눈 시간 수(최저임금법 시행령 제5조제1항)"></span> : <b>${minTimeM} 시간</b>
            <ul class="wer">
              <li><span>(1주 기본근로 ${p1H23}시간+1주 유급주휴일 ${p2H18}시간)×(365일÷7일÷12월)</span></li>
              ${nonYujuhuil_txt}
            </ul>
          </li>
          ${minimunWage_txt}
          <li>${minimunWageCalMethod_txt}</li>
        </ul>
          ${minimumWageMakeUp_txt}
      </div>  
    </td>
  </tr>
</table>
` : ``}

<table class="result-table ${resultClass}" style="margin-top:20px;">
  <tr>
    <th class="result-th">포괄임금액<br>적절 여부</th>
    <td class="result-td">
      <div class="result-container-in">
        <div class="rst_inbox">${title_txt}
          <ul style="margin-top:10px; text-align:left; font-size:0.85em; font-weight:normal;">
            ${title_sub1_txt}
            ${title_sub2_txt}
            ${title_sub3_txt}
            ${title_sub4_txt}
          </ul>
        </div>

        <h4 class="rst_h_b"><i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i> 통상임금</h4>
          <ul>
            <li>통상임금 산정 기준시간(월) <span data-tooltip-text="1주의 소정근로시간(${p1H23}시간)과 그 외에 유급으로 처리되는 시간(${(yuhuil+yuhumu)*p1H22}시간)를 합산한 시간에 1년 동안의 평균 주의 수(365일÷7일)를 곱한 시간을 12로 나눈 시간(근로기준법 시행령 제6조제2항)"></span> : <b>${tongTimeM} 시간</b>
              <ul class="wer">
                <li>${tongTimeM_txt}</li>
              </ul>
            </li>
            ${tong_type1BonusCase}
            <li>통상임금 계산에 사용되는 임금 : <b>${Math.round(tongWage).toLocaleString()}원</b>
              <ul class="wer">
                <li>${tongWage1_txt}
                  ${tongWageExcept_txt}</li>
                ${tongWage2_txt}
                ${tongWage3_txt}
              </ul>
            </li>
            <li>시간당 통상임금 : <b>${Math.round(P29).toLocaleString()}원</b> = ${Math.round(tongWage).toLocaleString()}원 ÷ ${tongTimeM}시간</li>
          </ul>

        <h4 class="rst_h_b"><i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i> 현재 임금(월) : ${Math.round(currentWage).toLocaleString()}원</h4>
          ${payBefore}

        <h4 class="rst_h_b"><i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i> (최소한) 제대로 지급해야 할 임금 총액(월) : ${Math.round(S35).toLocaleString()}원</h4>
          <ul>
            <li>기본급(주휴수당포함) : ${Math.round(G35).toLocaleString()}원 ${revisedMinimumWagecomment}
            ${G35_txt}</li>
            ${I35_txt}
            ${overWork_ul_s}
              ${M35_txt}
              ${O35_txt}
              ${Q35_txt}
            ${overWork_ul_e}
            </ul>

        <h4 class="rst_h_b"><i class="fa fa-check-square-o fa-lg" aria-hidden="true"></i> 추가 지급해야할 임금<span class="cr">(체불임금)</span> : <span class="rst_pr">${Math.round(revised_total_zeroUp).toLocaleString()}원</span></h4>
            <ul>
              <li>최저임금 미달 해소를 위한 금품 보전 : <b>${revised_Basic_txt}</b></li>
              <li>적정 ${suNameText_final}을 위한 금품 보전 : <b>${revised_Sudang_txt}</b></li>
              ${notouchSudang_txt}
            </ul>
      </div>
    </td>
  </tr>
</table>


`
: `
<hr />

<h3 style="color:red">포괄임금계약의 적법성 여부를 판단할 수 없습니다.</h3>

<ul>
  <li>포괄임금계약은 <b>연장·야간·휴일근로</b> 할 것을 포함하는 계약입니다.</li>
  <li>귀하가 입력한 내용에는 <b>연장·야간·휴일근로 시간</b>이 없습니다.
    <ul>
      <li>입력된 연장근로: ${otW}시간, 야간근로: ${nightW}시간, 휴일근로: ${holy1W+holy2W}시간</li>
    </ul>
  </li>
  <li>따라서, 포괄임금계약의 적법성 여부를 판단하기 어렵습니다.</li>
  <li>만약, 포괄임금계약의 적법성 여부를 알아보려면 <b>연장·야간·휴일근로 시간</b>을 입력하세요.</li>
</ul>
`;

$("#result").html(resultText);


//모바일 결과 설명
let resultText_mobile = totalHour > 0 ? `

<h3 style="font-size:0.98em; margin : 0 0 0 0;">최저임금 적합 여부</h3>
  <div class="rst_inbox">
    ${J29_txt}
    ${yourMinWage_txt}
  </div>



<h3 style="font-size:0.98em; margin : 0 0 0 0;">포괄임금액 적절 여부</h3>
  <div class="rst_inbox">
    ${title_txt}
    <ul style="margin-top:10px; text-align:left; font-size:0.85em; font-weight:normal;">
      ${title_sub1_txt}
      ${title_sub2_txt}
      ${title_sub3_txt}
      ${title_sub4_txt}
    </ul>
  </div>



<h3 style="font-size:0.98em; margin : 0 0 0 0;">최종 결과</h3>
  <div class="rst_finalbox">
    ${rTop_txt_mo}
    ${rYes_txt_mo}
    ${rNo_txt_mo}
    ${rOtover_txt_mo}
    ${rMathod_txt_mo}  
    ${rlimitedOtW_txt_mo}
    ${rBonus_txt_mo}
  </div>

  <div style="border:8px solid #D9D2CA; padding:10px; margin: 10px 0px 5px 0px;">
    <img src="https://www.nodong.kr/pic/light.gif" width="15px" height="16px"> 이 포괄임금 계산기는 <span style="color:#045fb4; font-weight:bold;">PC버전</span>에서 최적화되어 있습니다.  <span style="color:#045fb4; font-weight:bold;">PC로 접속</span>하시면 <span style="color:red; font-weight:bold;">자세한 계산결과</span>를 확인할 수 있습니다.
  </div>`
  : ``;
$("#result_mobile").html(resultText_mobile);



/*

포괄임금계약 유형
1) 정액급형 포괄임금제             : 정액금 (기본임금과 수당이 구분 안됨) // 기본임금을 미리 계산하지 않고 법정수당까지 포함된 금액을 정액으로 지급하는 형태,
2) 정액수당형 포괄임금제           : 기본임금+고정OT수당1개(기본임금과 고정OT수당은 구분되나, 개별 수당은 구분 안됨) +복리후생비+매월상여+직무수당등 // 기본임금을 미리 계산해두고 일정액을 법정 제 수당으로 정하여 이를 근로시간 수에 상관없이 지급하는 형태.
3) 항목배분 고정지급제              : 기본임금+연장수당+야간수당+휴일수당(기본임금과 법정수당을 수당별로 정액 지급) +복리후생비+매월상여+직무수당등


포괄임금제가 유효하기 위한 요건
① 근로시간, 근로형태와 업무의 성질 등을 고려할 때 근로시간의 산정이 어려운 것으로 인정될 것
② 근로자의 승낙이 있을 것
③ 근로자에게 불이익이 없고 여러 사정에 비추어 정당하다고 인정될 것
*/



}
