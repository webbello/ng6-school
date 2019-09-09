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
  embedUrl = 'https://www.youtube.com/embed/'
  videoUrl: string;

  player;

  constructor(private route: ActivatedRoute, private api: OfflineSessionService, private router: Router) { }

  ngAfterViewInit() {
    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(playerApiScript, firstScriptTag);
  }

  ngOnInit() {
    this.getOfflineSessionDetail(this.route.snapshot.params['id']);
    //console.log('session', this.session);
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '100%',
        width: '100%',
        // videoId: this.getVideo(),
        // events: {
        //   'onReady': this.onPlayerReady,
        //   'onStateChange': this.onPlayerStateChange
        // },
        events: {
            'onReady': (event) => { this.onPlayerReady(event); },
            'onStateChange': (event) => { this.onPlayerStateChange(event); }
        },
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          // playlist: 'UG3sfZKtCQI,ALZHF5UqnU4,x9ZkC3OgI78',
          rel: 0,
          showInfo: 0
        }
      });
    };
  }

  getOfflineSessionDetail(id) {
    this.api.getOfflineSession(id)
      .subscribe(data => {
        //console.log('getOfflineSession', data);
        this.session = data.offlineSessions;
        this.youtubeId = data.offlineSessions.off_lecture_url;
        this.videoUrl =  this.embedUrl + this.youtubeId + '?enablejsapi=1&rel=0';
        //console.log(this.session);
        //this.url = "https://www.youtube.com/embed/" + data.offlineSessions.off_lecture_url;
      });
  }


  // The API calls this function when the player's state changes.
  onPlayerStateChange(event) {
    console.log('onPlayerStateChange');
    console.log(event.data);
  }

  // The API will call this function when the video player is ready
  onPlayerReady(event) {
    console.log(event);

    //const videoId = this.getVideo();
    const videoId = this.youtubeId;
    event.target.cueVideoById({
      'videoId': videoId
    });
    event.target.playVideo();
  }

  getVideo() {
    return 'EJidxofuPc4';
  }

}
