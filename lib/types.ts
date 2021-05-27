export type ObjectLd<T> = {
  [Property in keyof T]: T extends object ? ObjectLd<T> : T;
} & {
  _type: string;
}
