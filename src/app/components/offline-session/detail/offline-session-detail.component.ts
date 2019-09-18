import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfflineSessionService } from '../../../services/offline-session/offline-session.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Action } from '../../../models/chat/action';
import { User } from '../../../models/chat/user';

@Component({
  selector: 'app-offline-session-detail',
  templateUrl: './offline-session-detail.component.html',
  styleUrls: ['./offline-session-detail.component.scss']
})
export class OfflineSessionDetailComponent implements OnInit {

  action = Action;
  loginUser: any;
  user: User;
  courseId: number;
  courseList: any = [];
  lectureId: number;
  lectureList: any = [];
  messages: any = [];

  session: any;
  youtubeId: string;
  embedUrl = 'https://www.youtube.com/embed/'
  videoUrl: string;

  player;
  sessionRating: number;

  constructor(private route: ActivatedRoute, private api: OfflineSessionService, private router: Router, private authService: AuthService) {
    this.authService.getLoginUser()
	      .subscribe(res => {
	        console.log(res);
	        this.loginUser = res;
	        this.user = {
		      userId: res.user.id,
		      name: res.user.name
		    };
	      }, err => {
	        console.log(err);
		  });
   }

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
        console.log('getOfflineSession', data);
        this.session = data.offlineSessions;
        this.youtubeId = data.offlineSessions.off_lecture_url;
        this.videoUrl =  this.embedUrl + this.youtubeId + '?enablejsapi=1&rel=0';

        this.lectureId = data.offlineSessions.lecture_id;
        this.courseId = data.offlineSessions.course_id;
        this.getChatHistory();

        let videoLodData = {
          lecture_id:  this.lectureId ? this.lectureId : '',
          course_id: this.courseId ? this.courseId : ''
        };
        console.log('videoLodData', videoLodData)
        
        this.authService.getVideoLectureLogById(videoLodData)
          .subscribe(res => {
            console.log('getVideoLectureLogById', res);
            this.sessionRating = Number(res.videoLectureLog.star);
          }, (err) => {
            console.log(err);
          });
        //console.log(this.session);
        //this.url = "https://www.youtube.com/embed/" + data.offlineSessions.off_lecture_url;
      });
  }
  getChatHistory(){
    console.log(this.lectureId);
		this.authService.getChatHistory(this.lectureId, this.courseId)
			.subscribe(res => {
				console.log('getChatHistory', res);
				if (res.message) {
					this.messages = res.message;
				}
				console.log('getChatHistory', this.messages);

			}, err => {
				console.log(err);
			});
  }
  
  rateThisSession(){
    console.log('lectureId', this.lectureId);
    let data = { 
      userId: this.user.userId,
      course_id:  this.courseId,
      lecture_id: this.lectureId, 
      sessionRating: this.sessionRating 
    };
    
    this.authService.rateThisSession(data)
      .subscribe(res => {
        console.log('rateThiSsession', res);
      }, (err) => {
        console.log(err);
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
