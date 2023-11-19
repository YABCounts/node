export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`;
    }[keyof T]
  : never;

export type PickByDotNotation<T, K extends string> = {
  [P in keyof T as P extends (K extends `${infer K0}.${string}` ? K0 : K)
    ? P
    : never]: P extends K
    ? T[P]
    : PickByDotNotation<
        T[P],
        K extends `${Exclude<P, symbol>}.${infer R}` ? R : never
      >;
} & {};
