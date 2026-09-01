// 라디오버튼 설정/s
//급여형태(month/day/hour)
const labelsm = document.querySelectorAll('.radio-labelm');
const radiosm = document.querySelectorAll('input[name="paytype"]');
//근로자수(person)
const labelsp = document.querySelectorAll('.radio-labelp');
const radiosp = document.querySelectorAll('input[name="person"]');
//특수업종직종(special)
const labelss = document.querySelectorAll('.radio-labels');
const radioss = document.querySelectorAll('input[name="specialJob"]');
//최저임금(year)
const labelsy = document.querySelectorAll('.radio-labely');
const radiosy = document.querySelectorAll('input[name="minimumWage"]');
//근무일(dayType)
const labelsd = document.querySelectorAll('.radio-labeld');
const radiosd = document.querySelectorAll('input[name="dayTypeMode"]');
//초과근무(timeType)
const labelst = document.querySelectorAll('.radio-labelt');
const radiost = document.querySelectorAll('input[name="timeTypeMode"]');
//월급제형태(WageMonth)
const labelswm = document.querySelectorAll('.radio-labelwm');
const radioswm = document.querySelectorAll('input[name="WageMonthType"]');
//풀타임,파트타임(fp)
const labelsfp = document.querySelectorAll('.radio-labelfp');
const radiosfp = document.querySelectorAll('input[name="fp"]');
/*
*/



radiosm.forEach(radio => {
  radio.addEventListener('change', () => {
    // 모든 라벨에서 active 제거
    labelsm.forEach(lbl => lbl.classList.remove('active'));
    // 선택된 input의 부모 label에만 active 추가
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radiosp.forEach(radio => {
  radio.addEventListener('change', () => {
    labelsp.forEach(lbl => lbl.classList.remove('active'));
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radioss.forEach(radio => {
  radio.addEventListener('change', () => {
    labelss.forEach(lbl => lbl.classList.remove('active'));
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radiosy.forEach(radio => {
  radio.addEventListener('change', () => {
    labelsy.forEach(lbl => lbl.classList.remove('active'));
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radiosd.forEach(radio => {
  radio.addEventListener('change', () => {
    // 모든 라벨에서 active 제거
    labelsd.forEach(lbl => lbl.classList.remove('active'));
    // 선택된 input의 부모 label에만 active 추가
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radiost.forEach(radio => {
  radio.addEventListener('change', () => {
    // 모든 라벨에서 active 제거
    labelst.forEach(lbl => lbl.classList.remove('active'));
    // 선택된 input의 부모 label에만 active 추가
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radioswm.forEach(radio => {
  radio.addEventListener('change', () => {
    // 모든 라벨에서 active 제거
    labelswm.forEach(lbl => lbl.classList.remove('active'));
    // 선택된 input의 부모 label에만 active 추가
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

radiosfp.forEach(radio => {
  radio.addEventListener('change', () => {
    // 모든 라벨에서 active 제거
    labelsfp.forEach(lbl => lbl.classList.remove('active'));
    // 선택된 input의 부모 label에만 active 추가
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

/*
*/


// 페이지 로드 시 기본 선택값이 있으면 활성화 처리
window.addEventListener('DOMContentLoaded', () => {
  radiosm.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radiosp.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radioss.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radiosy.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radiosd.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radiost.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radioswm.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  radiosfp.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('active');
    }
  });
});
/*
*/


//라디오버튼 선택시 화면 전환
//급여형태 입력선택
m_radio.addEventListener("click",m_radio_click)
let mtypec1 = document.getElementById('mtypec1');
let mtypec2 = document.getElementById('mtypec2');
let mtypec3 = document.getElementById('mtypec3');

function m_radio_click(){
  if( paytypeMonth.checked ){
    m1Box.style.display="inline-block";
    m2Box.style.display="none";
    m3Box.style.display="none";
    mtypec1.style.color="white";
    mtypec2.style.color="black";
    mtypec3.style.color="black";
  }
  else if( paytypeDay.checked ){
    m1Box.style.display="none";
    m2Box.style.display="inline-block";
    m3Box.style.display="none";
    mtypec1.style.color="black";
    mtypec2.style.color="white";
    mtypec3.style.color="black";
  }
  else{
    m1Box.style.display="none";
    m2Box.style.display="none";
    m3Box.style.display="inline-block";
    mtypec1.style.color="black";
    mtypec2.style.color="black";
    mtypec3.style.color="white";
  }
}

// 근로시간 입력선택
d_radio.addEventListener("click",d_radio_click)
let dtypec1 = document.getElementById('dtypec1');
let dtypec2 = document.getElementById('dtypec2');

function d_radio_click(){
  if( dayType1.checked ){
    d1Box.style.display="inline-block";
    d2Box.style.display="none";
    dtypec1.style.color="white";
    dtypec2.style.color="black";
  }
  else{
    d1Box.style.display="none";
    d2Box.style.display="inline-block";
    dtypec1.style.color="black";
    dtypec2.style.color="white";
  }
}

// 초과근로 입력선택
t_radio.addEventListener("click",t_radio_click)
let ttypec1 = document.getElementById('ttypec1');
let ttypec2 = document.getElementById('ttypec2');

function t_radio_click(){
  if( timeType1.checked ){
    t1Box.style.display="inline-block";
    t2Box.style.display="none";
    ttypec1.style.color="white";
    ttypec2.style.color="black";
  }
  else{
    t1Box.style.display="none";
    t2Box.style.display="inline-block";
    ttypec1.style.color="black";
    ttypec2.style.color="white";
  }
}

// 풀타임,파트타임(fp) 입력선택
fp_radio.addEventListener("click",fp_radio_click)
let fptypec1 = document.getElementById('fptypec1');
let fptypec2 = document.getElementById('fptypec2');

function fp_radio_click(){
  if( fpType1.checked ){
    fptypec1.style.color="white";
    fptypec2.style.color="black";
  }
  else{
    fptypec1.style.color="black";
    fptypec2.style.color="white";
  }
}

// 월급제 타입 입력선택
wm_radio.addEventListener("click",wm_radio_click)
let wmtypec1 = document.getElementById('wmtypec1');
let wmtypec2 = document.getElementById('wmtypec2');

function wm_radio_click(){
  if( wageMonthType1.checked ){
    wm1Box.style.display="inline-block";
    wm2Box.style.display="none";
    wmtypec1.style.color="white";
    wmtypec2.style.color="black";
  }
  else{
    wm1Box.style.display="none";
    wm2Box.style.display="inline-block";
    wmtypec1.style.color="black";
    wmtypec2.style.color="white";
  }
}

// 스크립트 파일을 동적으로 로드하는 헬퍼 함수
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
}
// 라디오버튼 설정/e




//풀타임, 파트타이머 초기 시간 설정/s
let radioF = document.getElementById('fpType1');
let radioP = document.getElementById('fpType2');
let soTime  = document.getElementById('soTime');

function applyMode() {
  if (radioF.checked) {
    // 2) F 초기/선택 상태
    soTime.value = "";              // placeholder가 보이도록 비움
    soTime.placeholder = "40";
    soTime.disabled = true;         // 입력 불가
    soTime.removeAttribute("min");
    soTime.removeAttribute("max");
  } else {
    // 3) P 선택 상태
    soTime.disabled = false;
    soTime.placeholder = "39";
    soTime.min = "1";
    soTime.max = "39";

    // 혹시 기존 값이 범위를 벗어나면 보정(선택)
    if (soTime.value !== "") {
      let v = Number(soTime.value);
      if (v < 1) soTime.value = "1";
      if (v > 39) soTime.value = "39";
    }
  }
}

// 범위 외 입력/붙여넣기 방지(최종 보정)
soTime.addEventListener('input', () => {
  if (soTime.disabled) return;

  if (soTime.value === "") return; // 지우는 동작 허용
  let v = Number(soTime.value);
  if (Number.isNaN(v)) { soTime.value = ""; return; }

  if (v < 1) soTime.value = "1";
  if (v > 39) soTime.value = "39";
});

radioF.addEventListener('change', applyMode);
radioP.addEventListener('change', applyMode);

// 1) 라디오 초기상태 F 체크 + 2) soTime 초기상태 적용
applyMode();

//풀타임, 파트타이머 초기 시간 설정/e