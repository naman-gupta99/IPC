import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-connected-page',
  templateUrl: './connected-page.component.html',
  styleUrls: ['./connected-page.component.scss']
})
export class ConnectedPageComponent implements OnInit {

  public profileId;
  public profileImgSrc;

  constructor(private route: ActivatedRoute, private pagesService: PagesService) { }

  ngOnInit() {
    if (!this.pagesService.user) {
      this.pagesService.getUser(this.route.snapshot.paramMap.get('id'))
        .subscribe(response => {
          this.pagesService.user = response.data;
          this.profileId = this.pagesService.user.connection;
          this.profileImgSrc = 'http://i.pravatar.cc/500?img=' + 7;
        }, err => {
          console.log(err);
        });
    } else {
      this.profileId = this.pagesService.user.connection;
      this.profileImgSrc = 'http://i.pravatar.cc/500?img=' + 7;
    }
  }

  onDisconnect() {
    this.pagesService.disconnectUser();
  }
}
