# 포괄임금 스마트 계산기 파라미터 및 산출 로직 설명서

본 문서는 **포괄임금 스마트 자율점검** 내 **포괄임금 스마트 계산기**에서 입력받는 각 파라미터(변수)의 의미와, 이를 바탕으로 통상시급·최저임금 위반 여부·법정수당 차액을 계산하고 판정하는 내부 로직을 설명합니다.

---

## 1. 입력 파라미터 정의

### A단계: 기초 설정 (`Basic Settings`)

| 파라미터명 (화면 표시) | 내부 변수명 (`id` / `name`) | 입력 형식 | 설정 값 및 의미 |
| :--- | :--- | :--- | :--- |
| **사업장 규모** | `empSize` | 라디오 버튼 | • `5+` (5인 이상, 기본값): 연장·휴일·야간근로 가산수당(할증률 1.5배/2.0배/0.5배) 적용<br>• `5-` (5인 미만): 근로기준법상 가산수당 규정 미적용 (연장·휴일 1.0배, 야간 0배) |
| **최저임금 연도** | `minWageYear` | 라디오 버튼 | • `2025` (2025년): 최저시급 **10,030원** 적용<br>• `2026` (2026년, 기본값): 최저시급 **10,320원** 적용<br>• `custom` (기타): 사용자가 직접 입력한 시간급(`customMinWage`)을 기준 시간급으로 적용 |
| **기타 시간급 직접 입력** | `customMinWage` | 정수 입력 (단위: 원) | • `기타` 선택 시 또는 해당 입력필드를 클릭·터치하여 값을 입력할 경우 자동으로 `기타` 항목이 선택된 것으로 처리되며, 입력된 정수(원) 값을 기준 시간급(`MIN_WAGE`)으로 적용 |
| **특수 업종 여부** | `specialIndustry` | 라디오 버튼 | • `Y` (예) / `N` (아니오, 기본값)<br>• 근로기준법 제59조에 따른 근로시간 특례 업종(운수업, 보건업 등) 해당 여부 확인용 파라미터 |

---

### B단계: 계약서 기준 (`Contractual Criteria`)

| 파라미터명 (화면 표시) | 내부 변수명 (`id`) | 입력 형식 | 의미 및 산입 기준 |
| :--- | :--- | :--- | :--- |
| **기본급 (원)** | `basicPay` | 정수 (원) | 소정근로시간에 대해 매월 지급하기로 정한 기본 임금 (**통상임금 산입**) |
| **고정 연장근로수당 (원)** | `fixedOvertimePay` | 정수 (원) | 포괄임금 약정에 따라 매월 고정 지급하는 연장·야간·휴일근로수당 총액 (**통상임금 제외**, 실제 발생 법정수당 합계액과 비교하는 대상) |
| **기타 고정수당 (원)** | `otherFixedPay` | 정수 (원) | 식대, 직책수당 등 매월 정기적·일률적으로 지급되는 고정수당 (**통상임금 산입**) |
| **연간 고정 상여금 (원)** | `annualBonus` | 정수 (원) | 연간 단위로 지급이 확정된 고정 상여금. `annualBonus ÷ 12`로 월 환산하여 **통상임금에 산입** |
| **계약상 월 소정근로시간** | `contractRegularHours` | 숫자 (시간) | 기본값 **209시간** (주 40시간 + 주휴 8시간 기준 월 환산 시간). 월 통상임금을 통상시급으로 나눌 때 사용하는 분모 |
| **계약상 월 고정 연장시간** | `contractOvertimeHours` | 숫자 (시간) | 계약서상 고정 연장근로수당에 대응하여 약정된 월 연장근로시간 |

---

### C단계: 실제 발생 근로시간 (`Actual Working Hours`)

> ※ 모든 실제 발생 근로시간은 식사 및 휴게시간을 **제외**한 실근로시간 기준입니다.

| 파라미터명 (화면 표시) | 내부 변수명 (`id`) | 입력 형식 | 의미 |
| :--- | :--- | :--- | :--- |
| **실제 발생한 월 연장근로시간 (시간)** | `actualOvertimeHours` | 숫자 (시간) | 1개월 동안 소정근로시간을 초과하여 실제 근무한 연장근로시간 |
| **실제 발생한 월 휴일근로 (8시간 이내)** | `actualHolidayHours8Under` | 숫자 (시간) | 1개월 동안 휴일에 실제 근무한 시간 중 1일 8시간 이내에 해당하는 시간 |
| **실제 발생한 월 휴일근로 (8시간 초과)** | `actualHolidayHours8Over` | 숫자 (시간) | 1개월 동안 휴일에 실제 근무한 시간 중 1일 8시간을 초과한 시간 |
| **실제 발생한 월 야간근로시간 (시간)** | `actualNightHours` | 숫자 (시간) | 1개월 동안 야간 시간대(22:00 ~ 익일 06:00)에 실제 근무한 시간 |

---

## 2. 단계별 계산 로직 (Calculation Logic)

### Step 1. 기준 시간급(`MIN_WAGE`) 결정

선택된 `minWageYear` 값에 따라 비교 기준이 되는 최저(기준) 시간급 `MIN_WAGE`를 결정합니다.

```text
IF minWageYear == "2025" THEN
    MIN_WAGE = 10,030 (원)
ELSE IF minWageYear == "2026" THEN
    MIN_WAGE = 10,320 (원)
ELSE IF minWageYear == "custom" (또는 직접 입력필드에 값 입력 시) THEN
    MIN_WAGE = customMinWage (사용자가 입력한 정수 시간급, 단위: 원)
```

---

### Step 2. 월 통상임금 및 환산 통상시급(`hourlyWage`) 산출

1. **월 환산 상여금(`monthlyBonus`) 계산**
   $$\text{monthlyBonus} = \begin{cases} \dfrac{\text{annualBonus}}{12} & (\text{annualBonus} > 0) \\ 0 & (\text{annualBonus} = 0) \end{cases}$$

2. **월 통상임금 총액(`totalOrdinaryWage`) 계산**
   $$\text{totalOrdinaryWage} = \text{basicPay} + \text{otherFixedPay} + \text{monthlyBonus}$$
   *(고정 연장근로수당 `fixedOvertimePay`는 소정근로의 대가가 아니므로 통상임금에서 제외)*

3. **환산 통상시급(`hourlyWage`) 계산**
   $$\text{hourlyWage} = \frac{\text{totalOrdinaryWage}}{\text{contractRegularHours}}$$

---

### Step 3. 최저임금(기준 시간급) 충족 여부 판정

산출된 환산 통상시급(`hourlyWage`)과 기준 시간급(`MIN_WAGE`)을 비교합니다.

$$\text{isMinWageViolated} = (\text{hourlyWage} < \text{MIN\_WAGE})$$

* `hourlyWage < MIN_WAGE` 인 경우: **최저임금 위반(`true`)**
* `hourlyWage >= MIN_WAGE` 인 경우: **최저임금 충족(`false`)**

---

### Step 4. 사업장 규모별 가산율(할증률) 설정 및 실제 법정수당 산출

1. **사업장 규모(`empSize`)에 따른 할증 배율 설정**

| 수당 항목 | 내부 변수명 | `5인 이상` (`5+`) | `5인 미만` (`5-`) | 비고 |
| :--- | :--- | :---: | :---: | :--- |
| 연장근로 배율 | `premiumOT` | **1.5배** | **1.0배** | 5인 미만은 할증(0.5배) 미적용 |
| 휴일근로 (8시간 이내) 배율 | `premiumHolUnder` | **1.5배** | **1.0배** | 5인 미만은 할증(0.5배) 미적용 |
| 휴일근로 (8시간 초과) 배율 | `premiumHolOver` | **2.0배** | **1.0배** | 5인 이상은 8시간 초과분 2.0배 적용 |
| 야간근로 가산 배율 | `premiumNight` | **0.5배** | **0.0배** | 22:00~06:00 근무에 대한 가산율 |

2. **항목별 실제 필요 수당 계산**
   * **실제 연장수당(`requiredOTPay`)** = `actualOvertimeHours × hourlyWage × premiumOT`
   * **실제 휴일수당(8h 이내)(`requiredHolUnderPay`)** = `actualHolidayHours8Under × hourlyWage × premiumHolUnder`
   * **실제 휴일수당(8h 초과)(`requiredHolOverPay`)** = `actualHolidayHours8Over × hourlyWage × premiumHolOver`
   * **실제 야간가산수당(`requiredNightPay`)** = `actualNightHours × hourlyWage × premiumNight`

3. **필요한 총 수당 합계(`totalRequiredExtraPay`) 계산**
   $$\text{totalRequiredExtraPay} = \text{requiredOTPay} + \text{requiredHolUnderPay} + \text{requiredHolOverPay} + \text{requiredNightPay}$$

---

### Step 5. 고정 연장근로수당과의 차액 비교 및 최종 판정

1. **추가 지급 필요 차액(`additionalPayNeeded`) 산출**
   $$\text{diffOTPay} = \text{totalRequiredExtraPay} - \text{fixedOvertimePay}$$
   $$\text{additionalPayNeeded} = \max(0, \text{diffOTPay})$$

2. **최종 진단 결과 판정 (`D단계`)**
   * **위험 (`임금체불 위험 (주의)`)**:
     * 조건: `isMinWageViolated == true` **또는** `additionalPayNeeded > 0`
     * 표시 내용:
       * 최저임금 위반 시: `"최저임금 위반 상태입니다"` 및 기본급·고정수당 인상 처방 안내
       * 수당 부족 시: `"추가 지급 필요 차액: {소수점 버림(additionalPayNeeded)}원"` 및 차액 추가 지급 처방 안내
   * **적정 (`적정 수준입니다`)**:
     * 조건: `isMinWageViolated == false` **그리고** `additionalPayNeeded == 0`
     * 표시 내용: 실제 근로시간 기준 법정수당이 계약된 고정 연장근로수당 범위 내에 있으며 최저임금 기준도 충족함을 안내
