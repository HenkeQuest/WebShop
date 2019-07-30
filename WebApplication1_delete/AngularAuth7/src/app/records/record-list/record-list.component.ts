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


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  displayedColumns: string[] = ["Title","Price","Category","ImagePath","actions"];
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
    private clothService : ClothingService) {}

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
      this.clothService.getClothing().then(res => {
        
        res.forEach(item =>{
          console.log("clothing item:", item);
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

  populateForm(rec : Record){
    console.log("rec.ImagePath: ", rec.ImagePath);
    this.recordService.formData = Object.assign({}, rec);
    //this.service.formData.ImagePath = rec.ImagePath;
    
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?')){
      this.recordService.deleteRecord(id).subscribe(res=>{
        this.toastr.warning("Deleted successfully", 'EMP. Register');
        this.recordService.refreshList();
      })
    }
  }

  details(id: number){
    var myurl = `record/${id}`;
    this.router.navigateByUrl(myurl);
  }

  onCreate(){
    this.recordService.formData.ImagePath = "default-image.png";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.router.navigateByUrl('/record')
    this.dialog.open(CategoryPanelComponent, dialogConfig).afterClosed().subscribe(result =>{
      this.refreshMatTable();
    });
  }

  onEdit(row: Record){
    console.log("row: ", row);
    this.cdr.detectChanges();
    this.populateForm(row);

    this.dialog.open(RecordComponent).afterClosed().subscribe(result =>{
      this.refreshMatTable();
    });
  }

}
