import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';
import { ProgressBar } from 'primeng/progressbar';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(public http:HttpClient,public router:Router,
     private spinner: NgxSpinnerService,public toastr:ToastrService) { }
  categories:any
  progressBarVisible: boolean = true;
  GetAllCategories(): Promise<void> {
    this.progressBarVisible = true;
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Category/GetAllCategories`).subscribe(
        (res: any) => {
          this.categories = res;
          this.progressBarVisible = false; // Set progressBarVisible to false when response is received
          resolve();
        },
        (err: any) => {
          // Handle error
          reject();
        }
      );
    });
  }

  Category:any
  GetCategoryById(id:number){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/Category/GetCategoryById/`+id).subscribe(
      {
        next:(res)=>{
                      this.Category=res
                      this.spinner.hide()
                      resolve()

                    },
        error:(err)=>{
                        this.spinner.hide()
                        ;
                     }
        }
      )
    }
  )
  }
  DeleteCategory(id:number){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.delete(`${environment.apiUrl}/Category/DeleteCategory/`+id).subscribe(
      {
        next:(res)=>{
                      this.spinner.hide()
                      resolve()

                    },
        error:(err)=>{
                        this.spinner.hide()
                     }
        }
      )
    }
  )
  }
  CreateCategory(Cat:any){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Category/CreateCategory/`,Cat).subscribe(
      {
        next:(res)=>{
                      this.spinner.hide()
                      resolve()


                    },
        error:(err)=>{
                        this.spinner.hide()
                     }
        }
      )
    }
  )
  }
  async updateCategory(cat:any){
    await this.GetCategoryById(cat.categoryid)
  if(this.ImgaeName!=null)
  cat.categoryimage=this.ImgaeName
else
cat.userimage=this.Category.categoryimage

    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.put(`${environment.apiUrl}/Category/UpdateCategory/`,cat).subscribe(
      {
        next:(res)=>{
                      this.spinner.hide()
                      resolve()

                    },
        error:(err)=>{
                        this.spinner.hide()
                     }
        }
      )
    }
  )
  }
  ImgaeName :any;
  UploadImage(imageFile: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Category/UploadImage`, imageFile).subscribe(
      {
        next: (res: any) => {
          this.spinner.hide()
          this.ImgaeName = res.userimage;
          resolve()
        },
        error: () => { }
      }
    )})
  }
}
