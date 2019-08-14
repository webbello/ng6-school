import { Component, OnInit } from '@angular/core';
import { OfflineSessionService } from '../../../services/offline-session/offline-session.service';

@Component({
  selector: 'app-offline-session',
  templateUrl: './offline-session.component.html',
  styleUrls: ['./offline-session.component.scss']
})
export class OfflineSessionComponent implements OnInit {
  sessions: any;

  constructor(private api: OfflineSessionService) { }

  ngOnInit() {
    this.api.getOfflineSessions()
      .subscribe(res => {
        console.log(res);
        this.sessions = res.offlineSessions;
      }, err => {
        console.log(err);
      });
  }

}
