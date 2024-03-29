import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Record } from 'src/app/shared/record.model';
import { ToastrService } from 'ngx-toastr';
import { RecordService } from 'src/app/shared/record.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecordComponent } from '../record/record.component';
import { UserService } from 'src/app/shared/user.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable, from, merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Category } from 'src/app/shared/category.model';
import { CategoryPanelComponent } from '../category-panel/category-panel.component';
import { ClothingService } from 'src/app/shared/clothing.service';
import { ClothingComponent } from '../clothing/clothing.component';
import { FlagService } from 'src/app/shared/flag.service';
import { FlagComponent } from '../flag/flag.component';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  displayedColumns: string[] = ["ID","Title","Price","Category","ImagePath","actions"];
  listData = new MatTableDataSource<Record>();
  recordsFB : Observable<Record[]>
  searchResult;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: string;

  constructor(public sanitizer: DomSanitizer, 
    private router: Router, 
    private recordService : RecordService,
    private flagService : FlagService,
    private toastr : ToastrService, 
    private user : UserService, 
    private dialog : MatDialog, 
    private cdr: ChangeDetectorRef,
    private clothingService : ClothingService) {}

  ngOnInit() {
    //this.recordService.formData.ImagePath = "default-image.png";
    this.recordService.getRecords().subscribe(res => {
      console.log("subscribe after updateing");
    })
    this.refreshMatTable();
  }

  refreshMatTable(){
    this.recordService.refreshList().subscribe(res =>{
      this.clothingService.getClothing().then(clothings => {
        let array = Array();
        this.flagService.getFlag().then(flags => {
          
          clothings.forEach(item =>{
            array.push(item);
          })

          flags.forEach(item =>{
            array.push(item);
          })
  
          this.recordService.list.forEach(item => {
            array.push(item);
          })
  
          this.listData.data = array;
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
            });
          };
        })
      })
    });

  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  isAdmin(){
    return this.user.roleMatch(["Admin"]);
  }

  populateRecordForm(rec : Record){
    this.recordService.populateForm(rec);
    this.recordService.imageUrl = "http://localhost:62921/Images/40/"+rec.ImagePath; 
    
  }

  populateClothingForm(rec : any){
    this.clothingService.populateForm(rec);
    this.clothingService.imageUrl = "http://localhost:62921/Images/40/"+rec.ImagePath; 
  }

  populateFlagForm(rec : any){
    this.flagService.populateForm(rec);
    this.flagService.imageUrl = "http://localhost:62921/Images/40/"+rec.ImagePath; 
  }

  onDelete(row : any){
    console.log("row: ", row);
    if(confirm('Are you sure to delete this record?')){
      if(row.Category  == "Record"){
        this.recordService.deleteRecord(row.ID).subscribe(res=>{
          this.toastr.warning("Deleted successfully", 'EMP. Register');
          this.recordService.refreshList();
          this.refreshMatTable();
        })
      }
      else if(row.Category  == "Clothing"){
        this.clothingService.deleteClothing(row.ID).subscribe(res=>{
          this.toastr.warning("Deleted successfully", 'EMP. Register');
          // this.clothingService.refreshList();
          this.refreshMatTable();
        })
      }
      else if(row.Category  == "Flag"){
        this.flagService.deleteFlag(row.ID).subscribe(res=>{
          this.toastr.warning("Deleted successfully", 'EMP. Register');
          // this.clothingService.refreshList();
          this.refreshMatTable();
        })
      }
    }
  }

  details(id: number){
    var myurl = `record/${id}`;
    this.router.navigateByUrl(myurl);
  }

  onCreate(){
    this.recordService.imageUrl = "http://localhost:62921/Images/40/default-image.png";
    this.clothingService.imageUrl = "http://localhost:62921/Images/40/default-image.png";
    this.recordService.initializeFormGroup();
    this.clothingService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.router.navigateByUrl('adminpanel/record');
    this.dialog.open(CategoryPanelComponent, dialogConfig).afterClosed().subscribe(result =>{
      this.refreshMatTable();
      this.router.navigateByUrl('/adminpanel');
    });
  }

  onEdit(row: any){
    console.log("row: ", row);
    this.cdr.detectChanges();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    

    if(row.Category == "Record"){
      this.populateRecordForm(row);
      this.dialog.open(RecordComponent, dialogConfig).afterClosed().subscribe(result =>{
        this.refreshMatTable();
        this.router.navigateByUrl('/adminpanel');
      });
    }
    else if(row.Category == "Clothing"){
      this.populateClothingForm(row);
      this.dialog.open(ClothingComponent, dialogConfig).afterClosed().subscribe(result =>{
        this.refreshMatTable();
        this.router.navigateByUrl('/adminpanel');
      });
    }
    else if(row.Category == "Flag"){
      this.populateFlagForm(row);
      this.dialog.open(FlagComponent, dialogConfig).afterClosed().subscribe(result =>{
        this.refreshMatTable();
        this.router.navigateByUrl('/adminpanel');
      });
    }
  }

}
