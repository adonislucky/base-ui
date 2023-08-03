import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface NumberInputClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Class name applied to the root element if `startAdornment` is provided. */
  // TODO:  adornedStart: string;
  /** Class name applied to the root element if `endAdornment` is provided. */
  // TODO: adornedEnd: string;
  /** Class name applied to the root element if the component is focused. */
  focused: string;
  /** Class name applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `readOnly={true}`. */
  readOnly: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Class name applied to the input element. */
  input: string;
  /** Class name applied to the increment button element. */
  incrementButton: string;
  /** Class name applied to the decrement button element. */
  decrementButton: string;
}

export type NumberInputClassKey = keyof NumberInputClasses;

export function getNumberInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiNumberInput', slot);
}

const numberInputClasses: NumberInputClasses = generateUtilityClasses('MuiNumberInput', [
  'root',
  'formControl',
  'focused',
  'disabled',
  'readOnly',
  'error',
  'input',
  'incrementButton',
  'decrementButton',
  // 'adornedStart',
  // 'adornedEnd',
]);

export default numberInputClasses;
