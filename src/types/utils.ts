/**
 * Делает все свойства типа T допускающими значение null.
 *
 * @template T Исходный тип.
 *
 * @example
 * type User = { name: string; age: number };
 * type NullableUser = Nullable<User>;
 * // Результат:
 * // {
 * //   name: string | null;
 * //   age: number | null;
 * // }
 */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
