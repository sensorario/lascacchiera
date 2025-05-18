const mover = () => {
  const turns = [];

  const sequence = () => {
    if (turns.length === 0) return "";

    let turnNumber = 1;
    let sequence = "";

    const callbackfn = (turn, index) => {
      if (index % 2 === 0) sequence += " " + turnNumber + ".";
      else turnNumber++;
      sequence += " " + turn;
    };

    turns.forEach(callbackfn);

    return sequence.trim();
  };

  const push = (move) => {
    turns.push(move);
  };

  const currentPlayer = () => {
    return turns.length % 2 === 0 ? "w" : "b";
  };

  return {
    sequence,
    push,
    currentPlayer,
  };
};

describe("Foo", () => {
  it("bar", () => {
    const m = mover();
    m.push("e4");
    expect(m.sequence()).toStrictEqual("1. e4");
    m.push("e5");
    expect(m.sequence()).toStrictEqual("1. e4 e5");
    m.push("Cf3");
    expect(m.sequence()).toStrictEqual("1. e4 e5 2. Cf3");
  });

  it("bar", () => {
    const m = mover();
    expect(m.currentPlayer()).toStrictEqual("w");
  });

  it("bar", () => {
    const m = mover();
    m.push();
    expect(m.currentPlayer()).toStrictEqual("b");
  });
});
