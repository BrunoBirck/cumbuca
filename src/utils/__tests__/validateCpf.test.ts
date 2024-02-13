import {formatCPF, isValidCpf} from '@utils/validateCpf'

describe('validateCpf', () => {
  describe('isValidCpf', () => {
    it('should return true for a valid CPF', () => {
      expect(isValidCpf('529.982.247-25')).toBe(true)
    })

    it('should return false for an invalid CPF', () => {
      expect(isValidCpf('123.456.789-10')).toBe(false)
    })
  })

  describe('formatCPF', () => {
    it('should correctly format a CPF', () => {
      expect(formatCPF('52998224725')).toBe('529.982.247-25')
    })

    it('should correctly format a CPF with extra digits', () => {
      expect(formatCPF('52998224725123')).toBe('529.982.247-25')
    })
  })
})
