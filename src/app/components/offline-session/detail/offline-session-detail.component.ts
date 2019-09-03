import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfflineSessionService } from '../../../services/offline-session/offline-session.service';

@Component({
  selector: 'app-offline-session-detail',
  templateUrl: './offline-session-detail.component.html',
  styleUrls: ['./offline-session-detail.component.scss']
})
export class OfflineSessionDetailComponent implements OnInit {

  session: any;

  youtubeId: string;

  public embedUrl = 'https://www.youtube.com/embed/'

  videoUrl: string;

  constructor(private route: ActivatedRoute, private api: OfflineSessionService, private router: Router) { }

  ngOnInit() {
    this.getOfflineSessionDetail(this.route.snapshot.params['id']);
    //console.log('session', this.session);
  }

  getOfflineSessionDetail(id) {
    this.api.getOfflineSession(id)
      .subscribe(data => {
        //console.log('getOfflineSession', data);
        this.session = data.offlineSessions;
        this.youtubeId = data.offlineSessions.off_lecture_url;
        this.videoUrl =  this.embedUrl + this.youtubeId;
        //console.log(this.session);
        //this.url = "https://www.youtube.com/embed/" + data.offlineSessions.off_lecture_url;
      });
  }

  deleteSession(id) {
    this.api.deleteSession(id)
      .subscribe(res => {
          this.router.navigate(['/questions']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
