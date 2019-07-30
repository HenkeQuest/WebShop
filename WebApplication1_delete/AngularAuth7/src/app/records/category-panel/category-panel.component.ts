import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.css']
})
export class CategoryPanelComponent implements OnInit {

  categories :  Category[];

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().then(res =>{
      this.categories =  res as Category[];
    });
  }

}
