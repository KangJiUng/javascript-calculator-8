import { Console } from "@woowacourse/mission-utils";

function validateInput(input) {
  // 빈 문자열 → 0 출력 후 종료
  if (input === "") {
    return { stop: true, result: 0 };
  }

  // 숫자만 입력 -> 숫자로 변환한 값 그대로 출력 후 종료
  if (/^\d+$/.test(input)) {
    return { stop: true, result: Number(input) };
  }

  // "//"가 포함되어 있지만, 문자열 처음이 아닐 경우 에러
  if (input.includes("//") && !input.startsWith("//")) {
    throw new Error(
      "[ERROR] 커스텀 구분자는 입력의 시작 부분에만 올 수 있습니다."
    );
  }

  // "//"가 두 번 이상 등장할 경우(커스텀 구분자 지정 두 번 이상) 에러
  if ((input.match(/\/\//g) || []).length > 1) {
    throw new Error("[ERROR] 커스텀 구분자는 한 번만 지정할 수 있습니다.");
  }

  return { stop: false };
}

function parseInput(input) {
  let numbers;

  // 시작이 "//"이면 커스텀 구분자 지정
  if (input.startsWith("//")) {
    const customDelimiter = input[2];

    // 커스텀 구분자로 공백 또는 숫자를 사용할 경우 에러
    if (customDelimiter === " " || /\d/.test(customDelimiter)) {
      throw new Error(
        "[ERROR] 커스텀 구분자로 공백 또는 숫자는 사용할 수 없습니다."
      );
    }

    // "//\\n"처럼 구분자가 지정되지 않았거나 리터럴 역슬래시가 아닌 경우
    if (input.slice(2, 4) === "\\n" || input.slice(2, 3) === "\n") {
      throw new Error("[ERROR] 커스텀 구분자가 지정되지 않았습니다.");
    }

    const numbersPart = input.slice(5); // "//;\\n" 다음 부분(구분자를 1개로 가정)

    // 먼저 커스텀 구분자로 파싱
    const firstSplits = numbersPart.split(customDelimiter);

    // 혼합 구분자 처리를 위해 다시 쉼표(,)와 콜론(:)으로 파싱 및 숫자로 변환
    numbers = firstSplits
      .flatMap((part) => part.split(/[, :]/))
      .map((num) => (num === "" ? 0 : Number(num))); // 빈 문자열은 0으로 변환
  } else {
    // 기본 구분자 쉼표(,)와 콜론(:)으로 파싱 및 숫자로 변환
    numbers = input.split(/[, :]/).map((num) => (num === "" ? 0 : Number(num)));
  }

  // 음수 입력 시 에러 처리
  for (const n of numbers) {
    if (n < 0) {
      throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
    }
  }

  return numbers;
}

// 숫자 덧셈 계산
function calculateSum(numbers) {
  const result = numbers.reduce((acc, cur) => acc + cur, 0);

  return result;
}

class App {
  async run() {
    const input = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n"
    );

    const validation = validateInput(input);

    if (validation.stop) {
      Console.print(`결과 : ${validation.result}`);
      return;
    }

    const numbers = parseInput(input);
    const sum = calculateSum(numbers);

    Console.print(`결과 : ${sum}`);
  }
}

export default App;
