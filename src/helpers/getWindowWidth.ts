import { BreakPoints } from '../config/constants';

export const isLargeMobile = () => {
  return window.innerWidth < BreakPoints.MOBILE_M;
};
