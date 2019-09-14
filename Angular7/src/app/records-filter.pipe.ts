import { PipeTransform, Pipe } from '@angular/core';
import { Record } from './shared/record.model';

@Pipe({
    name: "recordsFilter"
})
export class RecordsFilterPipe implements PipeTransform{
    transform(record: Record[],  searchTerm:string): Record[]{
        if(!record || !searchTerm){
            return record;
        }

        return record.filter(item => 
            item.Band.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1);
    }
}