export const environment = {
  production: true,
  apiUrl: "https://neqatcomm.azurewebsites.net/api"
}

// DeleteUser(UID:any){
//   this.spinner.show()
//   return new Promise<void>((resolve, reject) => {
//   this.http.delete(`${environment.apiUrl}/User/DeleteUser/`+UID).subscribe(
//     {
//       next:(res)=>{
//       this.spinner.hide()
//       resolve()
//                   },
//       error:(err)=>{
//       this.spinner.hide()
//       ;
//         }
//       }
//     )
//   }
// )
//https://neqatcomm.azurewebsites.net/api
// }
