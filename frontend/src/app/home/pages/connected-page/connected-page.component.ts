import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connected-page',
  templateUrl: './connected-page.component.html',
  styleUrls: ['./connected-page.component.scss']
})
export class ConnectedPageComponent implements OnInit {

  public profileId;
  public profileImgSrc;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.profileId = id;
    this.profileImgSrc = "http://i.pravatar.cc/500?img=" + id;
  }

}
