import { ResolveFn } from '@angular/router';

export const appResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
