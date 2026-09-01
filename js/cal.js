// 유급휴일, 무급휴일 근무시간 입력란 초기화 변수
let hw2 = 0, hw3 = 0, hw4 = 0, hw5 = 0, hw6 = 0, hw7 = 0;

// 입력근로시간 및 1주 실근로시간을 전역 변수로 선언
let w1 = 0, w2 = 0, w3 = 0, w4 = 0, w5 = 0, w6 = 0, w7 = 0;
let workhourWeek = 0;

let ot1=0; ot2=0; ot3=0; ot4=0; ot5=0; ot6=0; ot7=0 

let hot2=0; hot3=0; hot4=0; hot5=0; hot6=0; hot7=0; 
let p1F23=0;

// 임금 입력란 - 콤마 자동 입력 및 숫자 추출
  function formatNumberInput(input) {
    let raw = input.value.replace(/,/g, ''); // 콤마 제거
    raw = raw.replace(/\D/g, ''); // 숫자 이외 제거

    if (raw !== '') {
      input.value = parseInt(raw, 10).toLocaleString(); // 천단위 콤마 추가
    } else {
      input.value = '';
    }
  }

  // 모든 .money-input 요소에 적용
  document.querySelectorAll('.money-input').forEach(input => {
    input.addEventListener('input', function () {
      formatNumberInput(this);
    });
  });



// 1주 실근로시간(workhourWeek) 계산 및 표시 함수 입력값 가져오기 + 1주연장근로(otWeek) 계산 및 표시 함수 입력값 실시간 가져오기
function updateWorkhourWeek() {

//workhourWeek 싫시간 설정 /start
  let w1 = commaInt(document.getElementById("work1").value);
  let w2 = commaInt(document.getElementById("work2").value);
  let w3 = commaInt(document.getElementById("work3").value);
  let w4 = commaInt(document.getElementById("work4").value);
  let w5 = commaInt(document.getElementById("work5").value);
  let w6 = commaInt(document.getElementById("work6").value);
  let w7 = commaInt(document.getElementById("work7").value);

  work1 = w1; work2 = w2; work3 = w3; work4 = w4; work5 = w5; work6 = w6; work7 = w7;

// 1주 실근로시간(workhourWeek=p1B22) 계산결과를 전역 변수에 대입
  workhourWeek = w1 + w2 + w3 + w4 + w5 + w6 + w7;
// HTML에 실시간 표시
  document.getElementById("workhourWeek").innerText = workhourWeek;

//각 일별 1일 8시간초과 연장근로시간(p1B30~p1H30)
  ot1 = work1>8 ? work1-8 :0; ot2 = work2>8 ? work2-8 :0; ot3 = work3>8 ? work3-8 :0; ot4 = work4>8 ? work4-8 :0; ot5 = work5>8 ? work5-8 :0; ot6 = work6>8 ? work6-8 :0; ot7 = work7>8 ? work7-8 :0;
//workhourWeek 싫시간 설정 /end


//otWeek 싫시간 설정 /start
  const dayType1 = document.getElementById("dayType1").checked;
  const prefix = dayType1 ? "basic_" : "custom_";

  const d1 = parseInt(document.getElementById(prefix + "day1")?.value) || 0;
  const d2 = parseInt(document.getElementById(prefix + "day2")?.value) || 0;
  const d3 = document.getElementById(prefix + "day3") ? parseInt(document.getElementById(prefix + "day3").value) || 0 : 0;
  const d4 = document.getElementById(prefix + "day4") ? parseInt(document.getElementById(prefix + "day4").value) || 0 : 0;
  const d5 = parseInt(document.getElementById(prefix + "day5")?.value) || 0;

  // 휴일/휴무일 계산
  workday = d1;
  yuhuil = d2 === 0 ? 1 : d2; //최소 1일 보장
  muhuil = d3;
  yuhumu = d4;
  muhumu = d5;

  // 근무일 이름 세팅
  const labelIds = ["M29", "O29", "Q29", "S29", "U29", "W29", "Y29"];
  const labelNames = [];

  for (let i = 1; i <= 7; i++) {
    let label = `${i}근무일`;
    if (i > d1 && i <= d1 + muhumu) {
      label = "무급휴무일"; 
    } else if (i > d1 + muhumu && i <= d1 + muhumu + yuhumu) {
      label = "유급휴무일";
    } else if (i > d1 + muhumu + yuhumu && i <= d1 + muhumu + yuhumu + muhuil) {
      label = "무급휴일";
    } else if (i > d1 + muhumu + yuhumu + muhuil && i <= d1 + muhumu + yuhumu + muhuil + yuhuil) {
      label = "유급휴일";
    }
    labelNames.push(label);
  }

  // 근무일 이름 세팅(색상도 함께)
  labelIds.forEach((id, idx) => { 
    const labelElement = document.getElementById(id);
    if (labelElement) {
      const label = labelNames[idx];
      labelElement.textContent = label;
      labelElement.style.color = getLabelColor(label);
    }
  });

  // ✅ 휴일일 경우 hw2~7 변수에 값 저장
  const workIds = ["work2", "work3", "work4", "work5", "work6", "work7"];
  const labelTexts = labelNames.slice(1); // M29은 제외

  [hw2, hw3, hw4, hw5, hw6, hw7] = labelTexts.map((label, i) => {
    const workInput = document.getElementById(workIds[i]);
    if (!workInput) return 0;

    const value = parseFloat(workInput.value) || 0;
    if (label === "유급휴일" || label === "무급휴일") {
      return value;
    } else {
      return 0; // 근무일 또는 휴무일이면 0으로 간주
    }
  });


//근로시간 입력 유형 선택(월단위입력, 주단위입력)
const timeType1 = document.getElementById("timeType1").checked;
const timeType2 = document.getElementById("timeType2").checked;
console.log('현재 timeType1 ?:'+timeType1);

//월단위입력시(timeType1) 풀타임근로자, 파트타임근로자
const fpType1 = document.getElementById("fpType1").checked;
const fpType2 = document.getElementById("fpType2").checked;

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

//1주의 1일 8시간초과 연장근로시간(p1D22)
let ot8hour = timeType2 ? ot1+ot2+ot3+ot4+ot5+ot6+ot7-holy2W : 0 ;
console.log('1주 8시간 초과 연장근로시간(ot8hour) : ' +ot8hour);

//1주의 40시간초과 연장근로시간(ot40hour=p1F22)
let ot40hour = timeType2 && (full_workhourWeek-ot8hour-holyworkFull) > 40 ? (full_workhourWeek-ot8hour-holyworkFull)-40 : 0;
console.log('1주 40시간 초과 연장근로시간(ot40hour) : ' +ot40hour); 

//연장근로시간(주,월)
let otW = ot8hour+ot40hour;
console.log('1주 연장근로시간 : ' +otW)
document.getElementById("otWeek").innerText = otW;
document.getElementById("hwWeek").innerText = holyworkFull;

//otWeek 실시간 설정 /end












}





// 급여형태에 따라 임금 입력 영역 전환
document.querySelectorAll("input[name='paytype']").forEach(el => {
  el.addEventListener("change", () => {
    const isMonth = document.getElementById("paytypeMonth").checked;
    const isDay = document.getElementById("paytypeDay").checked;
    const isHour = document.getElementById("paytypeHour").checked;

    document.getElementById("wageboxM").style.display = isMonth ? "block" : "none";
    document.getElementById("wageboxD").style.display = isDay ? "block" : "none";
    document.getElementById("wageboxH").style.display = isHour ? "block" : "none";
  });
});

// 숫자형 문자열을 정수로 변환
function commaInt(val) {
  val = (val === '' || val === null || val === undefined) ? '0' : val;
  return parseInt(val.toString().replace(/,/g, ''), 10) || 0;
}

  // 근무일/휴일/휴무일 입력 방식 전환 및 검증
  const radioButtons = document.querySelectorAll('input[name="dayTypeMode"]');
  const basicBlock = document.getElementById('dayTypeBasic');
  const customBlock = document.getElementById('dayTypeCustom');

  //
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'basic') {
        basicBlock.style.display = 'block';
        customBlock.style.display = 'none';
      } else {
        basicBlock.style.display = 'none';
        customBlock.style.display = 'block';
      }
      validateDays();
    });
  });

  // 근무일/휴일/휴무일 검증 함수
  const dayFields = ['day1', 'day2', 'day3', 'day4', 'day5'];
  dayFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        validateDays();
      });
    }
  });


  // 수정된 검증 로직
  function setInputHighlight(el, type) {
    if (!el || !el.classList) return;

    el.classList.remove("error");
    el.classList.remove("warning");
    el.classList.remove("valid");

    if (type === "error") el.classList.add("error");
    else if (type === "warning") el.classList.add("warning");
    else if (type === "valid") el.classList.add("valid");
  }



  function validateInputs(mode) {
    const prefix = mode === "basic" ? "basic_" : "custom_";
    const noticeEl = document.getElementById("noticeB_" + mode);
    if (!noticeEl) return;

    const d1 = parseInt(document.getElementById(prefix + "day1")?.value) || 0;
    const d2 = parseInt(document.getElementById(prefix + "day2")?.value) || 0;
    const d3 = document.getElementById(prefix + "day3") ? parseInt(document.getElementById(prefix + "day3").value) || 0 : 0;
    const d4 = document.getElementById(prefix + "day4") ? parseInt(document.getElementById(prefix + "day4").value) || 0 : 0;
    const d5 = parseInt(document.getElementById(prefix + "day5")?.value) || 0;

    const totalDays = d1 + d2 + d3 + d4 + d5;
    const specialJobY = document.getElementById("specialJobY")?.checked ?? false;

    // 초기화
    noticeEl.className = "noticeB";
    noticeEl.textContent = "";    

    // 메시지 조건
    if (totalDays > 7) {
      noticeEl.textContent = "⚠️ 1주의 근무일,휴일,휴무일은 7일 이내입니다.";
      noticeEl.classList.add('notice-error');
    } else if (d1 < 1) {
      noticeEl.textContent = "⚠️ 1주의 근무일은 1일 이상이어야 합니다.";
      noticeEl.classList.add('notice-error');
    } else if (d2 < 1) {
      noticeEl.textContent = "⚠️ 1주당 최소 1일은 유급휴일(주휴일)입니다.";
      noticeEl.classList.add('notice-error');
    } else if (totalDays < 7) {
      noticeEl.textContent = `ℹ️ 1주 설정이 ${totalDays}일입니다. 7일로 수정하세요.`;
      noticeEl.classList.add('notice-info');

    } else {
      noticeEl.textContent = `😊 1주가 ${totalDays}일로 잘 설정되었습니다.`;
      noticeEl.classList.add('notice-info');
    }

    // 스타일 처리
    ['day1', 'day2', 'day3', 'day4', 'day5'].forEach(id => {
      const input = document.getElementById(prefix + id);
      if (input) {
        const val = parseInt(input.value) || 0;
        if (val < 0) {
          setInputHighlight(input, "error");
        } else {
          setInputHighlight(input, "valid");
        }
      }
    });
  }

  function attachInputListeners() {
    ['basic', 'custom'].forEach(mode => {
      ['day1', 'day2', 'day3', 'day4', 'day5'].forEach(id => {
        const el = document.getElementById(`${mode}_${id}`);
        if (el) {
          el.addEventListener('input', () => {
            if (parseInt(el.value) < 0) el.value = 0;
            validateInputs(mode);
            validateAndSetDayLabels(); // 근무일명도 연동
          });
        }
      });
    });
  }


  document.querySelectorAll('input[name="dayTypeMode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const mode = radio.value;
      document.getElementById("dayTypeBasic").style.display = mode === "basic" ? "block" : "none";
      document.getElementById("dayTypeCustom").style.display = mode === "custom" ? "block" : "none";

      highlightDayInputs(); // ✅ 변경 직후 스타일 반영
      validateAndSetDayLabels(); // ✅ 초기 검증도 수행
    });
  });


  document.addEventListener("DOMContentLoaded", function () {
    attachInputListeners();
    validateInputs("basic"); // default
  });

// 근무일/휴일/휴무일 검증 함수
  function validateDays() {
 
    const specialJobY = false; // 특수직종 여부 (실제 연동 필요)

    // 현재 선택된 모드 확인
    const mode = document.querySelector('input[name="dayTypeMode"]:checked')?.value || "basic";
    const prefix = mode === "basic" ? "basic_" : "custom_";
    const noticeEl = document.getElementById("noticeB_" + mode);
    if (!noticeEl) return;

    noticeEl.className = "noticeB";
    noticeEl.textContent = "";

    let d1 = parseInt(document.getElementById("day1")?.value || 0);
    let d2 = parseInt(document.getElementById("day2")?.value || 0);
    let d3 = parseInt(document.getElementById("day3")?.value || 0);
    let d4 = parseInt(document.getElementById("day4")?.value || 0);
    let d5 = parseInt(document.getElementById("day5")?.value || 0);

    const totalDays = d1 + d2 + d3 + d4 + d5;

    // 음수 방지
    [d1, d2, d3, d4, d5].forEach((v, i) => {
      if (v < 0) {
        const input = document.getElementById(dayFields[i]);
        input.value = 0;
        setInputHighlight(input, "error");
      }
    });

    if (totalDays > 7) {
      noticeEl.innerText = "⚠️ 1주의 근무일,휴일,휴무일은 7일 이내입니다.";
      noticeEl.classList.add("error");
      setInputHighlight(document.getElementById("day1"), "error");
      return;
    }

    if (d1 < 1) {
      noticeEl.innerText = "⚠️ 1주의 근무일은 1일 이상이어야 합니다.";
      noticeEl.classList.add("error");
      setInputHighlight(document.getElementById("day1"), "error");
      return;
    }

    if (!specialJobY && d2 < 1) {
      const d2el = document.getElementById("day2");
      d2el.value = 1;
      noticeEl.innerText = "⚠️ 1주당 최소 1일은 유급휴일(주휴일)입니다. 1일로 자동 설정되었습니다.";
      noticeEl.classList.add("warning");
      setInputHighlight(d2el, "warning");
      return;
    }

    if (specialJobY && (d2 > 0 || d3 > 0)) {
      noticeEl.innerText = "⚠️ 특수 업종·직종은 유급휴일, 무급휴일이 적용되지 않습니다.";
      noticeEl.classList.add("error");
      setInputHighlight(document.getElementById("day2"), "error");
      return;
    }

    if (totalDays < 7) {
      noticeEl.innerText = `⚠️ 1주 설정의 ${totalDays}일로 설정되었습니다. 7일로 수정하세요.`;
      noticeEl.classList.add("warning");
    } else if (totalDays === 7) {
      noticeEl.innerText = `😊 1주가 ${totalDays}일로 잘 설정되었습니다.`;
      noticeEl.classList.add("success");
    }

    // 기본 강조 스타일 적용
    dayFields.forEach(id => {
      const el = document.getElementById(id);
      if (el) setInputHighlight(el, "valid");
    });
  }

  // 초기 실행
  validateDays();

// 근무일/휴일/휴무일 입력값 음수 방지 및 실시간 검증 연결 함수
function attachDayInputSanitizer() {
  const dayIds = ['day1', 'day2', 'day3', 'day4', 'day5'];
  dayIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      // 일반 입력값 실시간 처리
      el.addEventListener('input', function () {
        if (parseInt(this.value) < 0) {
          this.value = 0;
          this.classList.add("error");
        } else {
          this.classList.remove("error");
        }

        // day2는 input 이벤트에서 validate 호출 생략 (change에서만 처리)
        if (id !== "day2") {
          highlightDayInputs();
          validateAndSetDayLabels();
        }
      });

      // ✅ day2는 change 이벤트로만 validate 호출
      if (id === "day2") {
        el.addEventListener('change', function () {
          highlightDayInputs();
          validateAndSetDayLabels();
        });
      }
    }
  });
}



  function getLabelColor(label) {
  if (label === "무급휴일" || label === "유급휴일") return "red";
  if (label === "무급휴무일" || label === "유급휴무일") return "blue";
  return "black";
}


// 근무일/휴일/휴무일 검증 및 근무일명 세팅 함수
function validateAndSetDayLabels() {


  const specialJobY = document.getElementById("specialJobY")?.checked ?? false;
  const mode = document.querySelector('input[name="dayTypeMode"]:checked')?.value || "basic";
  const prefix = mode === "basic" ? "basic_" : "custom_";
  const noticeEl = document.getElementById(`noticeB_${mode}`);

  const d1El = document.getElementById(prefix + "day1");  
  const d2El = document.getElementById(prefix + "day2");

  // DOM에서 값 읽기
  const d1 = parseInt(document.getElementById(prefix + "day1")?.value) || 0;
  const d2 = parseInt(document.getElementById(prefix + "day2")?.value) || 0;
  const d3 = document.getElementById(prefix + "day3") ? parseInt(document.getElementById(prefix + "day3").value) || 0 : 0;
  const d4 = document.getElementById(prefix + "day4") ? parseInt(document.getElementById(prefix + "day4").value) || 0 : 0;
  const d5 = parseInt(document.getElementById(prefix + "day5")?.value) || 0;

  const totalDays = d1 + d2 + d3 + d4 + d5;

  noticeEl.innerText = "";
  noticeEl.className = "noticeB";

  // day2 = 0 이고 특수업종이 아닌 경우 → 자동 보정 + 강조
  if (!specialJobY && d2 < 1) {
    if (d2El) {
      d2El.value = 1;
      d2El.focus();
      d2El.classList.add("error");
    }
    if (noticeEl) {
      noticeEl.innerText = "⚠️ 1주당 최소 1일은 유급휴일(주휴일)입니다. 1일로 자동 설정되었습니다1.";
//      noticeEl.classList.add("warning");
      setTimeout(() => {
        noticeEl.innerText = "";
      }, 5000);
    }
    return false;
  } else {
    if (d2El) d2El.classList.remove("error");
  }


  // 근무일 최소 1일 검증
  if (d1 < 1) {
    if (d1El) d1El.focus();  // null 체크 추가
    noticeEl.innerText = "⚠️ 1주의 근무일은 1일 이상입니다.";
    return false;
  }

  // 음수 정정은 여기 포함되어 있다고 가정
  if (d1 < 0 || d2 < 0 || d3 < 0 || d4 < 0 || d5 < 0) {
    noticeEl.innerText = "⚠️ 휴일/휴무일은 0 이상만 입력할 수 있습니다.";
    return false;
  }

  if (totalDays > 7) {
    const focusEl = document.getElementById(prefix + "day1");
    if (focusEl) focusEl.focus();
    noticeEl.innerText = "⚠️ 1주의 근무일,휴일,휴무일 수가 7일을 초과했습니다. 다시 설정하세요.";
    noticeEl.classList.add("notice-error");
    return false;
  } else if (totalDays < 7) {
    noticeEl.innerText = `⚠️ 1주가 ${totalDays}일로 입력되었습니다. 7일로 수정하세요.`;
    noticeEl.classList.add("notice-warning");

  } else if (specialJobY && d2 > 0) {
    noticeEl.innerText = "ℹ️ 특수 업종·직종은 1주 1일의 유급주휴일이 적용되지 않습니다.";
    noticeEl.classList.add('notice-worning');
  } else {
    noticeEl.innerText = `😊 1주가 ${totalDays}일로 잘 설정되었습니다.`;
    noticeEl.classList.add("notice-success");
  }



  // 휴일/휴무일 계산
  workday = d1;
  yuhuil = d2 === 0 ? 1 : d2; //최소 1일 보장
  muhuil = d3;
  yuhumu = d4;
  muhumu = d5;



  // 근무일 이름 세팅
  const labelIds = ["M29", "O29", "Q29", "S29", "U29", "W29", "Y29"];
  const labelNames = [];

  for (let i = 1; i <= 7; i++) {
    let label = `${i}근무일`;
    if (i > d1 && i <= d1 + muhumu) {
      label = "무급휴무일"; 
    } else if (i > d1 + muhumu && i <= d1 + muhumu + yuhumu) {
      label = "유급휴무일";
    } else if (i > d1 + muhumu + yuhumu && i <= d1 + muhumu + yuhumu + muhuil) {
      label = "무급휴일";
    } else if (i > d1 + muhumu + yuhumu + muhuil && i <= d1 + muhumu + yuhumu + muhuil + yuhuil) {
      label = "유급휴일";
    }
    labelNames.push(label);
  }

  // 근무일 이름 세팅(색상도 함께)
  labelIds.forEach((id, idx) => { 
    const labelElement = document.getElementById(id);
    if (labelElement) {
      const label = labelNames[idx];
      labelElement.textContent = label;
      labelElement.style.color = getLabelColor(label);
    }
  });


  // ✅ 휴일일 경우 hw2~7 변수에 값 저장
  const workIds = ["work2", "work3", "work4", "work5", "work6", "work7"];
  const labelTexts = labelNames.slice(1); // M29은 제외

  [hw2, hw3, hw4, hw5, hw6, hw7] = labelTexts.map((label, i) => {
    const workInput = document.getElementById(workIds[i]);
    if (!workInput) return 0;

    const value = parseFloat(workInput.value) || 0;
    if (label === "유급휴일" || label === "무급휴일") {
      return value;
    } else {
      return 0; // 근무일 또는 휴무일이면 0으로 간주
    }
  });

  let workhourWeek = document.getElementById("workhourWeek");

  return true;
}


document.addEventListener("DOMContentLoaded", function () {
  // 1. 초기 근무일명 자동 세팅
  validateAndSetDayLabels();

  // 2. day1~day5 입력 변경 시마다 동작
  ['day1', 'day2', 'day3', 'day4', 'day5'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', validateAndSetDayLabels);
    }
  });

  // 3. 음수 입력 방지 기능(음수 자동 점검 + 라벨 업데이트 연결)
  attachDayInputSanitizer();
  highlightDayInputs(); 

  // 4-1) 초기 1주 실근로시간 계산 및 표시
  updateWorkhourWeek();

  // 4-2) work1~work7 입력 감지
  for (let i = 1; i <= 7; i++) {
    const input = document.getElementById("work" + i);
    if (input) {
      input.addEventListener("input", updateWorkhourWeek);
    }
  }
});



function restrictWorkInputWithError() {
  const workIds = ['work1', 'work2', 'work3', 'work4', 'work5', 'work6', 'work7'];
  const errorEl = document.getElementById('workError');

  workIds.forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      let val = parseInt(input.value);

      if (isNaN(val)) {
        input.value = '';
        errorEl.innerText = '⚠️ 숫자를 입력하세요.';
        return;
      }

      if (val < 0 || val > 24) {
        errorEl.innerText = '⚠️ 0~24 사이의 숫자만 입력 가능합니다.';
        if (val < 0) input.value = 0;
        else if (val > 24) input.value = 24;
      } else {
        errorEl.innerText = ''; // 유효한 값이면 에러 지움
      }
    });
  });
}

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', restrictWorkInputWithError);



function highlightDayInputs() {
  const specialJobY = document.getElementById("specialJobY")?.checked ?? false;
  const mode = document.querySelector('input[name="dayTypeMode"]:checked')?.value || "basic";
  const prefix = mode === "basic" ? "basic_" : "custom_";
  const ids = ['day1', 'day2', 'day3', 'day4', 'day5'];

  ids.forEach(id => {
    const el = document.getElementById(prefix + id);
    if (!el) return;

    const val = parseInt(el.value) || 0;

    if (val < 0) {
      setInputHighlight(el, "error");
    } else if (specialJobY && (id === "day2" || id === "day3") && val > 0) {
      setInputHighlight(el, "warning");
    } else {
      setInputHighlight(el, "valid");
    }
  });
}






































function calculate() {
  validateAndSetDayLabels(); // 꼭 먼저 호출  
  // 먼저 검증 및 근무일명 세팅
  if (!validateAndSetDayLabels()) return;

  if (workhourWeek < 1) {
    alert("근무시간이 없어 계산할 수 없습니다.");
    return false;
  } 

  document.getElementById('preView').style.display = 'none';
  document.getElementById('result').style.display = 'block';

  // 급여형태에 따른 계산 분기  
  const paytypeMonth = document.getElementById("paytypeMonth").checked;
  const paytypeDay = document.getElementById("paytypeDay").checked;
  const paytypeHour = document.getElementById("paytypeHour").checked;

  if (paytypeMonth) {
    calculateM();
  } else if (paytypeDay) {
    calculateD();
  } else {
    calculateH();
  }
}


function calculate_mobile() {
  validateAndSetDayLabels(); // 꼭 먼저 호출  
  // 먼저 검증 및 근무일명 세팅
  if (!validateAndSetDayLabels()) return;

  if (workhourWeek < 1) {
    alert("근무시간이 없어 계산할 수 없습니다.");
    return false;
  } 

  document.getElementById('preView').style.display = 'none';
  document.getElementById('result_mobile').style.display = 'block';

  // 급여형태에 따른 계산 분기  
  const paytypeMonth = document.getElementById("paytypeMonth").checked;
  const paytypeDay = document.getElementById("paytypeDay").checked;
  const paytypeHour = document.getElementById("paytypeHour").checked;

  if (paytypeMonth) {
    calculateM();
  } else if (paytypeDay) {
    calculateD();
  } else {
    calculateH();
  }
}

/*
// 월급제 계산 기본 틀
function calculateM() {

console.log('유급휴일:'+yuhuil);
console.log('무급휴일:'+muhuil);
console.log('유급휴무:'+yuhumu);
console.log('무급휴무:'+muhumu);

  const totalHolidayHours = hw2 + hw3 + hw4 + hw5 + hw6 + hw7;


  const resultText = `
    <h3>월급제 계산결과</h3>
    <p>총 휴일 근로시간: ${totalHolidayHours} 시간</p>
    <p>계산 로직은 추후 구현됩니다.</p>
  `;
  $("#result").html(resultText);
}
*/




/*
// 일급제 계산 기본 틀
function calculateD(){
console.log("일급제 계산 실행");
let resultText = `
    <h3>일급제 계산결과</h3>
    <p>계산 로직은 추후 구현됩니다.</p>
`;
$("#result").html(resultText);
}
*/
/*
// 시급제 계산 기본 틀
function calculateH(){
console.log("시간급제 계산 실행");
let resultText = `
    <h3>시급제 계산결과</h3>
    <p>계산 로직은 추후 구현됩니다.</p>
`;
$("#result").html(resultText);
}
*/






function refresh(){
  basic_day1.value = "5";
  basic_day2.value = "1";
  basic_day5.value = "1";
  custom_day1.value = "5";
  custom_day2.value = "1";
  custom_day3.value = "0";
  custom_day4.value = "0";
  custom_day5.value = "1";
  soTime.value = "";
  otMdirect.value = "";
  hwMdirect1.value = "";
  hwMdirect2.value = "";
  ntMdirect.value = "";
  work1.value = "8";
  work2.value = "8";
  work3.value = "8";
  work4.value = "8";
  work5.value = "8";
  work6.value = "0";
  work7.value = "0";
  night.value = "";
  mPaya.value = "";
  overBonus_a.value = "";
  mPay_basic.value = "";
  mPay_ot.value = "";
  mPay_jik.value = "";
  mPay_sik.value = "";
  mPay_msang.value = "";
  overBonus_b.value = "";
  document.getElementById('person5Up').checked = true;
  $('#result').empty();
  $('#result_mobile').empty();
  document.getElementById('preView').style.display = 'block';
  document.getElementById('result').style.display = 'none';
  document.getElementById('result_mobile').style.display = 'none';

}


function resetCalculator() {
    location.reload(); 
}