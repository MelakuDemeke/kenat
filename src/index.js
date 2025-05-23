import { Kenat } from './Kenat.js';
import { gregorianToEthiopian, ethiopianToGregorian } from './conversions.js';

// Default export is the Kenat class directly
export default Kenat;

// Named exports for the conversion functions
export {
  gregorianToEthiopian,
  ethiopianToGregorian
};
