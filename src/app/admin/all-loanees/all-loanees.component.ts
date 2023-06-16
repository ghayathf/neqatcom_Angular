import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { LoaneeService } from 'src/app/loanee.service';
import * as XLSX from 'xlsx';
enum CreditScoreAVG {
  Low = "Low",
  Medium = "Medium",
  High = "High"
}
@Component({
  selector: 'app-all-loanees',
  templateUrl: './all-loanees.component.html',
  styleUrls: ['./all-loanees.component.css']
})
export class AllLoaneesComponent {
constructor(public loaneeService:LoaneeService,public adminService:AdminService){}
AllLoanees:any
Loanees:any
avg:any
loans:any
async ngOnInit(){
await this.loaneeService.GetAllLoanees()
await this.adminService.GetLoaneesStatistics()
this.AllLoanees = this.loaneeService.Loanees
this.Loanees = this.adminService.LoaneeStats.loaneescount
this.avg = this.adminService.LoaneeStats.averagecreditscore
this.loans = this.adminService.LoaneeStats.totalloanscount
}
fileName = 'ExcelSheet.xlsx';
  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

 getCreditScoreAvgLabel(score: number): string {
  if (score >= 1 && score <= 3) {
    return CreditScoreAVG.Low;
  } else if (score >= 4 && score <= 7) {
    return CreditScoreAVG.Medium;
  } else if (score >= 8 && score <= 10) {
    return CreditScoreAVG.High;
  } else {
    return "Unknown";
  }
}}