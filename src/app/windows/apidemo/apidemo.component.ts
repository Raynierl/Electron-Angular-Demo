import { Component, OnInit } from '@angular/core';
import { DemoapiService } from 'src/app/services/demoapi.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-apidemo',
  templateUrl: './apidemo.component.html',
  styleUrls: ['./apidemo.component.css']
})
export class ApidemoComponent implements OnInit {

  //POST Form
  postProduct = new FormGroup({
    name : new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    imageurl: new FormControl('', Validators.required),
    quantity: new FormControl('',Validators.required)
  })
  
  allProducts: any;
  productbyId: any;
  deletedProduct: any;
  allProductsGotten: any[] = [];
  constructor(private api: DemoapiService, private http: HttpClient) { }

  ngOnInit(): void {

  }

  getAllProducts(){
    this.api.getProducts().subscribe( data => {
      this.allProducts = data;
      console.log(data)
    })
  }
  getProduct(id){
    if(id <= 0 || id === null){
      console.warn("Id was blank")
      return;
    }
    this.api.getProductById(id).subscribe( data => {
      this.productbyId = data;
      this.allProductsGotten.push(data);
      console.log(this.allProductsGotten)
    })
  }

  postAProduct(product){
 
    try{
      this.api.postProduct(product).subscribe( data =>{
        console.info(data);
        console.log("POST requested")
      })
    }catch(e){ console.error(e)}


  }
  deleteProduct(id){
    this.api.deleteProductById(id).subscribe((data)=> {
      console.warn("PRODUCT_ID: " + id + " DELETED")
    })
  }

  updateAProduct(id, body){
    console.warn("UPDATING: " + id)
   this.api.updateProductById(id, body).subscribe();
  }
  patchAProduct(id, body){
    this.api.patchProductById(id, body).subscribe()
   }
}
