import { PipeTransform, Pipe } from '@angular/core';
import { User } from './user.model';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, searchContent: string, currentUser: string) {
        if (value.length === 0) {
            return '';
        }
        const usernames = [];
        for (const user of value) {
            if (user['username'].toLowerCase() === searchContent.toLowerCase()
                && currentUser.toLowerCase() !== searchContent.toLowerCase()) {
                usernames.push(user['username']);
            }
        }
        return usernames;
    }
}
