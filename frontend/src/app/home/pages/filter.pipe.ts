import { PipeTransform, Pipe } from '@angular/core';
import { User } from './user.model';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: string[], searchContent: string, currentUser: string) {
        const usernames = [];
        if (value.length === 0 || searchContent === '') {
            return usernames;
        }
        for (const user of value) {
            if (user && user.toLowerCase() === searchContent.toLowerCase()
                && currentUser.toLowerCase() !== searchContent.toLowerCase()) {
                usernames.push(user);
            }
        }
        return usernames;
    }
}
