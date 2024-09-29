import { Route } from '@angular/router';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { MyOrdersComponent } from '../pages/my-orders/my-orders.component';
export const remoteRoutes: Route[] = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'my-orders', component: MyOrdersComponent}
];
