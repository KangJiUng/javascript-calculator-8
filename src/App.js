import { Console } from "@woowacourse/mission-utils";

function parseInput(input) {
  let numbers;

  // 시작이 "//"이면 커스텀 구분자 지정
  if (input.startsWith("//")) {
    const customDelimiter = input[2];
    const numbersPart = input.slice(6); // "//;\\n" 이후 부분(구분자를 1개로 가정)

    // 먼저 커스텀 구분자로 파싱
    const firstSplits = numbersPart.split(customDelimiter);

    // 혼합 구분자 처리를 위해 다시 쉼표(,)와 콜론(:)으로 파싱 및 숫자로 변환
    numbers = firstSplits.flatMap((part) => part.split(/[, :]/)).map(Number);
  } else {
    // 기본 구분자 쉼표(,)와 콜론(:)으로 파싱 및 숫자로 변환
    numbers = input.split(/[, :]/).map(Number);
  }
  return numbers;
}

class App {
  async run() {
    const input = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n"
    );

    const numbers = parseInput(input);
  }
}

export default App;
