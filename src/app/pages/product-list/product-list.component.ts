import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  media: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf,AgGridModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.less',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        media: 'https://m.media-amazon.com/images/I/81D+bCgn8hL._AC_SX679_.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        description: 'Description 2',
        media: 'https://m.media-amazon.com/images/I/81D+bCgn8hL._AC_SX679_.jpg',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        description: 'Description 3',
        media: 'https://m.media-amazon.com/images/I/81D+bCgn8hL._AC_SX679_.jpg',
      },
    ];
  }
  advancedFilters: any = {
    team: '',
    lastModifiedBy: ''
  };
  isMobileView: boolean = window.innerWidth <= 768;
  rowSelection: 'single' | 'multiple' = 'multiple';
  context: any;
  themeClass: string = "ag-theme-quartz";
  
  constructor(private renderer: Renderer2, private ngZone: NgZone, private el: ElementRef) {
    this.context = { componentParent: this };
    this.setColumnDefs();
  }
  
  rowData: any[] = [
    { image: '../../../../assets/images/Avatar.svg', name: 'John Doe', userCount: '1', lastModifiedBy: 'Software Engineer', lastModifiedOn: 'Jane Smith', team: 'Development', privilege: 'Admin', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Alice Johnson', userCount: '2', lastModifiedBy: 'Project Manager', lastModifiedOn: 'John Doe', team: 'Management', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Bob Brown', userCount: '3', lastModifiedBy: 'QA Engineer', lastModifiedOn: 'Alice Johnson', team: 'Testing', privilege: 'User', company: 'TechCorp', status: 'Inactive' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Charlie Davis', userCount: '4', lastModifiedBy: 'UI/UX Designer', lastModifiedOn: 'Alice Johnson', team: 'Design', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Eva Green', userCount: '5', lastModifiedBy: 'DevOps Engineer', lastModifiedOn: 'John Doe', team: 'Operations', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Michael White', userCount: '6', lastModifiedBy: 'Data Analyst', lastModifiedOn: 'Charlie Davis', team: 'Analytics', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Linda Martinez', userCount: '7', lastModifiedBy: 'Business Analyst', lastModifiedOn: 'Alice Johnson', team: 'Business', privilege: 'User', company: 'TechCorp', status: 'Inactive' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Sarah Brown', userCount: '8', lastModifiedBy: 'HR Specialist', lastModifiedOn: 'John Doe', team: 'HR', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'James Wilson', userCount: '9', lastModifiedBy: 'Marketing Manager', lastModifiedOn: 'Charlie Davis', team: 'Marketing', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Natalie Harris', userCount: '10', lastModifiedBy: 'Customer Support', lastModifiedOn: 'Sarah Brown', team: 'Support', privilege: 'User', company: 'TechCorp', status: 'Active' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Robert King', userCount: '11', lastModifiedBy: 'Sales Executive', lastModifiedOn: 'James Wilson', team: 'Sales', privilege: 'User', company: 'TechCorp', status: 'Inactive' },
    { image: '../../../../assets/images/Avatar.svg', name: 'Emma Wright', userCount: '12', lastModifiedBy: 'Product Manager', lastModifiedOn: 'Alice Johnson', team: 'Product', privilege: 'Admin', company: 'TechCorp', status: 'Active' },
  ];
  
  colDefs: ColDef[] = [];
    imageCellRenderer: any;
    gridApi: any;
    updateSelectedCount: any;
  
  setColumnDefs() {
    this.colDefs = [
      { headerCheckboxSelection: true, checkboxSelection: true, width: 50, pinned: 'left' },
      { headerName: 'Name', field: 'name', width: this.isMobileView ? 180 : 200, filter: 'agTextColumnFilter', pinned: this.isMobileView ? null : 'left' },
      { headerName: 'User Count', field: 'userCount', flex: 1, minWidth: 200, resizable: true, filter: true },
      { headerName: 'Last Modified By', field: 'lastModifiedBy', flex: 1, minWidth: 200, resizable: true, filter: 'agTextColumnFilter' },
      { headerName: 'Last Modified On', field: 'lastModifiedOn', flex: 1, minWidth: 200, resizable: true, filter: 'agTextColumnFilter' },
      { headerName: '', field: '', flex: 1, minWidth: 130, resizable: true, filter: 'agTextColumnFilter' },
      //{ headerName: 'Privilege', field: 'privilege', flex: 1, minWidth: 130, resizable: true, filter: 'agTextColumnFilter' },
      //{ headerName: 'Company', field: 'company', flex: 1, minWidth: 130, resizable: true, filter: 'agTextColumnFilter' },
      //{ headerName: 'Status', field: 'status', flex: 1, minWidth: 130, resizable: true, filter: 'agTextColumnFilter' }
    ];
  }
  
  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
    this.gridApi.addEventListener('selectionChanged', this.updateSelectedCount.bind(this));
  }
}
