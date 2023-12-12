type URLPatternInput = Parameters<URLPattern["test"]>[0];
export function composePatterns(...patterns: URLPattern[]) {
  return {
    test(url: URLPatternInput) {
      return patterns.some((pattern) => pattern.test(url));
    },

    exec(url: URLPatternInput) {
      return patterns.find((pattern) => pattern.test(url))?.exec(url);
    },

    match(url: URLPatternInput) {
      return patterns.find((pattern) => pattern.test(url));
    },
  };
}

export type PatternMatcher = ReturnType<typeof composePatterns>;
