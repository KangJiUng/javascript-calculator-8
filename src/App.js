import { Console } from "@woowacourse/mission-utils";

function parseInput(input) {
  // 기본 구분자 쉼표(,)와 콜론(:)으로 파싱 및 숫자로 변환
  const numbers = input.split(/[, :]/).map(Number);

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
