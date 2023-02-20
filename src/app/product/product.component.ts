import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestService } from 'src/app/services/rest.service';
import { Global } from 'src/app/common/global';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService],
})
export class ProductComponent {
  ProductForm!: FormGroup;
  products: any;
  value1: any;
  cities: any;
  selectedCity: any;

  NewTaskDialog: boolean = false;
  showSaveBtn: boolean = false;
  uploadedFiles: any;
  multiple: any;
  photo: any;
  selectedImage: any;
  TaskDetails: any;
  selectedProjectname: any;
  selectedDescription: any;
  selectedtaskPrice: any;
  selectProductImage: any;
  constructor(
    private messageService: MessageService,
    private rest: RestService,
    private Global: Global,
    private fb: FormBuilder
  ) {}

 
  ngOnInit(): void {
    this.showformdetails();
    this.ShowTaskDetails();
  }

  showformdetails() {
    this.ProductForm = this.fb.group({
      productName: [''],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      product_image: [''],
      stock_available: [''],
      //isactive :[false]
    });
  }

  onSelectEvent(event: any) {
    console.log('Selected files', event);
    this.selectedImage = event.currentFiles[0].name;
    //  this.onUpload();
    console.log('this.selectedImage', this.selectedImage);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Uploaded succefully', life: 3000 });
    if (this.selectedImage.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  SubmitData() {
    
    let bodyParams = {
      productName: this.ProductForm.value.productName,
      description: this.ProductForm.value.description,
      price: this.ProductForm.value.price,
      category_id: this.ProductForm.value.category_id,
      product_image: this.selectedImage,
      stock_available: this.ProductForm.value.stock_available,
    };

    this.rest
      .postParams(this.Global.getapiendpoint() + '/product/Create', bodyParams)
      .subscribe((data: any) => {
        if (data.Success) {
          this.ShowTaskDetails();
          this.NewTaskDialog=false;
          this.ProductForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });

        } else {
        }
      });
    // this.openSnackBarSuccess('Data Saved Successfully');
  }
  url: any = '';
  onUpload() {
    console.log('this.selectedImage', this.selectedImage);
    if (this.selectedImage.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  showAddLOBDialog() {}
  showCreateNewTaskDialog() {
    this.NewTaskDialog = true;
    this.showSaveBtn = true;
  }

  ShowTaskDetails() {
    this.rest
      .getAll(this.Global.getapiendpoint() + '/product/GetAllproductDetails')
      .subscribe((data: any) => {
        if (data.Success) {
          // console.log(`projectDetails`, data.Data);
          this.TaskDetails = data.Data;
        }
      });
  }


  UpdateData() {
    let model = {
      productID: this.selectedProjectId,
      productName: this.ProductForm.value.productName,
      description: this.ProductForm.value.description,
    };
    console.log('model', model);
    //  this.rest.create(this.global.getapiendpoint()
    this.rest
      .create(
        this.Global.getapiendpoint() + '/product/UpdateproductDetails',
        model
      )
      .subscribe((data: any) => {
        console.log('data', data);
        if (data.Success) {
          this.ShowTaskDetails();
          this.ProductForm.reset();
          this.NewTaskDialog=false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

        } else {
        }
      });
  }
  selectedProjectId: any;
  EditTaskDetails(row: any) {
    console.log(`row`, row);
    this.NewTaskDialog = true;
    this.showSaveBtn = false;

    this.selectedProjectId = row.productID;
    this.selectedProjectname = row.productName;
    this.selectedDescription = row.description;
    this.selectedtaskPrice = row.price;
    this.selectProductImage = row.product_image;

    this.ProductForm = this.fb.group({
      productName: [row.productName],
      description: [row.description],
      price: [row.price],
      category_id: [row.category_id],
      product_image: [row.product_image],
      stock_available: [row.stock_available],
      //isactive :[false]
    });
  }
  filterGlobal(event:any){
    console.log(`event`, event);

  }
}
