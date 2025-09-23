import { describe, it, expect } from 'vitest'
import Password, { ERROR_MESSAGE } from './Password'

describe('Password', () => {
  it('valueプロパティの値', () => {
    const password = new Password('aA1_aA1_aA1_')
    expect(password.value).toBe('aA1_aA1_aA1_')
  })

  it('空文字が渡された場合に例外を投げる', () => {
    expect(() => {
      const password = new Password('')
    }).toThrow(ERROR_MESSAGE.tooShort)
  })

  it('字数が少なすぎる場合に例外を投げる', () => {
    expect(() => {
      const password = new Password('aA1_aA1_aA1')
    }).toThrow(ERROR_MESSAGE.tooShort)
  })

  it('字数が多すぎる場合に例外を投げる', () => {
    expect(() => {
      const password = new Password('aA1_aA1_aA1_aA1_aA1_aA1_aA1_aA1_b')
    }).toThrow(ERROR_MESSAGE.tooLong)
  })

  it('字種が不足している場合に例外を投げる', () => {
    expect(() => {
      const password = new Password('aA1aA1aA1aA1')
    }).toThrow(ERROR_MESSAGE.tooEasy)
  })

  it('使用できない字種がある場合に例外を投げる', () => {
    expect(() => {
      const password = new Password('aA1_aA1_aA1_あ')
    }).toThrow(ERROR_MESSAGE.notAllowed)
  })
})
