import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productDetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'categoryDetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'brandDetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout/:cartId',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
