import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Calculator from "../components/Calculator.vue";

describe('Calculator', () => {
  it('appends numbers and performs arithmetic operations correctly', async () => {
    const wrapper = mount(Calculator);

    // Append numbers and operators, then calculate
    wrapper.vm.append(7);
    wrapper.vm.add();
    wrapper.vm.append(3);
    wrapper.vm.equals();

    expect(wrapper.vm.input).toBe('10');
    expect(wrapper.vm.log).toContainEqual("⚫ 7+3 = 10");

    // Clear and perform another operation
    wrapper.vm.clear();
    expect(wrapper.vm.input).toBe('');
    expect(wrapper.vm.log).toHaveLength(0);

    // Perform subtraction
    wrapper.vm.append(9);
    wrapper.vm.subtract();
    wrapper.vm.append(4);
    wrapper.vm.equals();

    expect(wrapper.vm.input).toBe('5');
    expect(wrapper.vm.log).toContainEqual("⚫ 9-4 = 5");

    // Test multiply and divide
    wrapper.vm.clear();
    wrapper.vm.append(2);
    wrapper.vm.multiply();
    wrapper.vm.append(3);
    wrapper.vm.equals();
    expect(wrapper.vm.input).toBe('6');

    wrapper.vm.clear();
    wrapper.vm.append(8);
    wrapper.vm.divide();
    wrapper.vm.append(2);
    wrapper.vm.equals();
    expect(wrapper.vm.input).toBe('4');
  });

  it('handles invalid calculations and backspace correctly', async () => {
    const wrapper = mount(Calculator);

    // Attempt division by zero
    wrapper.vm.append(1);
    wrapper.vm.divide();
    wrapper.vm.append(0);
    wrapper.vm.equals();
    expect(wrapper.vm.input).toBe('Error');

    wrapper.vm.clear();

    // Use backspace
    wrapper.vm.append(1);
    wrapper.vm.append(2);
    wrapper.vm.append(3);
    wrapper.vm.backspace();
    expect(wrapper.vm.input).toBe('12');
  });
});