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
import { ClothesComponent } from '../clothes/clothes.component';


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
    private toastr : ToastrService, 
    private user : UserService, 
    private dialog : MatDialog, 
    private cdr: ChangeDetectorRef,
    private clothingService : ClothingService) {}

  ngOnInit() {
    this.recordService.formData.ImagePath = "default-image.png";
    this.recordService.getRecords().subscribe(res => {
      console.log("subscribe after updateing");
    })
    this.refreshMatTable();
  }

  refreshMatTable(){
    this.recordService.refreshList().subscribe(res =>{

      let array = Array();
      this.clothingService.getClothing().then(res => {
        
        res.forEach(item =>{
          array.push(item);
        })

        this.recordService.list.forEach(item => {
          array.push(item);
        })

        this.listData.data = array;
      })
      
      console.log("record list updated: ", res);
      
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
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
    console.log("rec.ImagePath: ", rec.ImagePath);
    this.recordService.formData = Object.assign({}, rec);
    this.recordService.formData.ImagePath = rec.ImagePath;
    this.recordService.imageUrl = "http://localhost:62921/Images/40/"+rec.ImagePath; 
    
  }

  populateClothingForm(rec : any){
    console.log("this.clothingService.form.value: ", this.clothingService.form.value);
    console.log("rec: ", rec);
    this.clothingService.populateForm(rec);
    //this.clothingService.form.value.ImagePath = rec.ImagePath;
    this.clothingService.imageUrl = "http://localhost:62921/Images/40/"+rec.ImagePath; 
    
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
      this.recordService.deleteRecord(id).subscribe(res=>{
        this.toastr.warning("Deleted successfully", 'EMP. Register');
        this.recordService.refreshList();
        this.refreshMatTable();
      })
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
    this.router.navigateByUrl('/record');
    this.dialog.open(CategoryPanelComponent, dialogConfig).afterClosed().subscribe(result =>{
      this.refreshMatTable();
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
      });
    }
    else if(row.Category == "Clothing"){
      this.populateClothingForm(row);
      this.dialog.open(ClothesComponent, dialogConfig).afterClosed().subscribe(result =>{
        this.refreshMatTable();
      });
    }

    
  }

}
