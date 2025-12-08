export function calculateExpression(expr) {
  if (!expr) return "0";

  expr = expr.replace(/÷/g, "/").replace(/×/g, "*");
  expr = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  const rawTokens = expr.match(/[+\-*/()]|\d+(\.\d+)?/g);
  if (!rawTokens) return "Error";

  const tokens = [];
  for (let i = 0; i < rawTokens.length; i++) {
    const t = rawTokens[i];

    if (t === "-" && (i === 0 || ["+", "-", "*", "/", "("].includes(rawTokens[i - 1]))) {
      tokens.push(rawTokens[i] + rawTokens[i + 1]);
      i++;
    } else {
      tokens.push(t);
    }
  }

  const values = [];
  const ops = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

  function applyOp() {
    const op = ops.pop();
    const b = parseFloat(values.pop());
    const a = parseFloat(values.pop());

    if (isNaN(a) || isNaN(b)) {
      values.push("Error");
      return;
    }

    switch (op) {
      case "+": values.push(a + b); break;
      case "-": values.push(a - b); break;
      case "*": values.push(a * b); break;
      case "/": values.push(b === 0 ? "Error" : a / b); break;
    }
  }

  for (const t of tokens) {
    if (!isNaN(t)) values.push(t);
    else if (t === "(") ops.push(t);
    else if (t === ")") {
      while (ops.length && ops.at(-1) !== "(") applyOp();
      ops.pop();
    } else if (precedence[t]) {
      while (ops.length && precedence[ops.at(-1)] >= precedence[t]) applyOp();
      ops.push(t);
    }
  }

  while (ops.length) applyOp();
  return values[0];
}
