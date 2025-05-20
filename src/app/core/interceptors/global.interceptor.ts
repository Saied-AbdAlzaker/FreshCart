import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("userToken")
  // const baseUrl: string = 'https://ecommerce.routemisr.com/api/v1'
  // token
  if (token !== null) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken')!
      }
    })
  }

  return next(req);
};
