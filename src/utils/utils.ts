export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const cyrb53 = (key: string, seed = 0): string => {
  const A = 2654435761;
  const B = 1597334677;
  const C = 2246822507;
  const D = 3266489909;
  const E = 4294967296;
  const F = 2097151;

  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let index = 0, char; index < key.length; index++) {
    char = key.charCodeAt(index);

    h1 = Math.imul(h1 ^ char, A);
    h2 = Math.imul(h2 ^ char, B);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), C) ^ Math.imul(h2 ^ (h2 >>> 13), D);
  h2 = Math.imul(h2 ^ (h2 >>> 16), C) ^ Math.imul(h1 ^ (h1 >>> 13), D);

  return (E * (F & h2) + (h1 >>> 0)).toString();
};

export const findMaxLength = (A: Array<any>, B: Array<any>) => {
  const n = A.length;
  const m = B.length;

  let dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(m + 1);
    for (let j = 0; j <= m; j++) dp[i][j] = 0;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (A[i] === B[j]) dp[j][i] = dp[j + 1][i + 1] + 1;
    }
  }
  let maxm = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      maxm = Math.max(maxm, dp[i][j]);
    }
  }

  return maxm;
};
