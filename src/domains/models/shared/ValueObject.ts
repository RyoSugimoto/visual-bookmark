import { isEqual } from 'lodash';

/**
 * 値オブジェクトの抽象クラス
 * @param {T} 「値」の型
 * @param {U} string この値オブジェクトの識別名
 */
export default abstract class ValueObject<Type, Name extends string> {
  /**
   * この値オブジェクトの識別名
   * * このプロパティは、TSの「構造的型付け」によって同じ構造を持つ別のクラスが同等とみなされるのを防ぐためのもの（Branded type）。
   * * どこからも参照されないので本来エラーが出るが、 `@ts-expect-error` でエラーを回避する。
   * @ts-expect-error
   */
  private _name: Name;

  /**
   * この値オブジェクトの「値」
   */
  protected readonly _value: Type;

  /**
   * @param value 値オブジェクトの「値」
   */
  constructor(value: Type) {
    this.validate(value);
    this._value = value;
  }

  /**
   * 「値」を検証する。
   * * コンストラクタで引数に「値」が渡されて呼び出される。
   * * 不正な値が渡されたときに例外を投げるように実装する。
   * @param value 「値」
   */
  protected abstract validate(value: Type): void;

  /**
   * 「値」を返す。
   */
  get value() {
    return this._value;
  }

  /**
   * 他の値オブジェクトと「値」が同じか調べる。
   * @param another 対象の値オブジェクト
   * @returns
   */
  public equals(another: ValueObject<Type, Name>): boolean {
    return isEqual(this._value, another._value);
  }
}
