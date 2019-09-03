import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RatingComponent } from '../../components/rating/rating.component';

import { QuizService } from '../../services/quiz/quiz.service';
import { LogService } from '../../services/log/log.service';
import { HelperService } from '../../services/helper/helper.service';
import { AuthService } from '../../services/auth/auth.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';
import { User } from '../../models/chat/user';
import { Event } from '../../models/chat/event';
import { QuizChatModel } from '../../models/chat/quiz';
import { ChatService } from '../../services/chat.service';

interface LiveLecture {
  lecture_id: number;
  course_id: number;
  presentation: string;
  rating_status: number;
  lecture_url: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  sessionRating: number;
  rating: number;
  user: User;
  live_lecture: any;
  live_lecture_url: string;
  embedUrl = 'https://www.youtube.com/embed/'
  videoUrl: string;
  presentation: string;
  numberOfActiveSockets: number;

  //quizId: any;
  quiz: Quiz = new Quiz(null);
  quizChat: QuizChatModel;
  mode = 'quiz';
  quizName: string;
  start: boolean = false;
  quizBy: User;
  ioConnection: any;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 60,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'autoSubmit': false,
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  disabled = false;

  constructor(private quizService: QuizService, private router: Router, private authService: AuthService, private log: LogService, private chatService: ChatService ) { 
    //this.rating = 2;
    this.authService.getLoginUser()
      .subscribe(res => {
        //console.log('getLoginUser', res);
        //this.loginUser = res;
        this.user = {
          //id: randomId,
          userId: res.user.id,
          role: res.user.role,
          name: res.user.name,
          email:res.user.email,
          courses:res.courses,
          lastActive:res.user.last_active
        }
        //console.log(this.user);
      }, err => {
        console.log(err);
      });
  
      this.authService.getLiveLectureUrl()
      .subscribe(res => {
        console.log('getLiveLacture', res.live_url);
        this.live_lecture = res.live_url;
        this.live_lecture_url = res.live_url.lecture_url;
        this.videoUrl =  this.embedUrl + this.live_lecture_url;

        this.getVideoLectureLogById();

      }, err => {
        console.log(err);
      });
      
  }

  ngOnInit() {
    
    if (this.authService.isLoggedIn()) {
    this.initIoConnection();
    this.chatService.onEvent(Event.CONNECT)
      .subscribe((numberOfActiveSockets) => {
        //this.numberOfActiveSockets = numberOfActiveSockets;
        console.log('connected', numberOfActiveSockets);
      });
      
    this.chatService.onEvent(Event.DISCONNECT)
      .subscribe((data) => {
        console.log('disconnected', data);
      });
    }
  }

  private initIoConnection(): void {

      this.ioConnection = this.chatService.onQuizStart()
        .subscribe((quiz: QuizChatModel) => {
          //console.log('quiz',quiz);
          //console.log('this.user',this.user);
          //console.log(this.user.courses.includes(quiz.courseId));
          
          this.quizBy = {
            //id: randomId,
            userId: quiz.from.userId,
            name: quiz.from.name,
            email:quiz.from.email
          }
          //console.log(this.start);
          //this.quizId = quiz.id;
          if (this.user.courses.includes(quiz.courseId)) {
            this.start = quiz.start;
            if (this.start) {
              this.loadQuiz(quiz.id);
            }
          }
          
        });

  }
  getVideoLectureLogById() {
    console.log('this.live_lecture', this.live_lecture)
    let data = {
      course_id:  this.live_lecture ? this.live_lecture.course_id : '',
      lecture_id: this.live_lecture ? this.live_lecture.lecture_id : ''
    };
    
    this.authService.getVideoLectureLogById(data)
      .subscribe(res => {
        //console.log('getVideoLectureLogById', res.videoLectureLog.star);
        this.sessionRating = Number(res.videoLectureLog.star);
      }, (err) => {
        console.log(err);
      });
  }
  rateThisSession(){
    console.log('live_lecture', this.live_lecture);
    let data = { 
      userId: this.user.userId,
      course_id:  this.live_lecture.course_id,
      lecture_id: this.live_lecture.lecture_id, 
      sessionRating: this.sessionRating 
    };
    
    this.authService.rateThisSession(data)
      .subscribe(res => {
        console.log('rateThiSsession', res);
      }, (err) => {
        console.log(err);
      });
  }

  loadQuiz(quizId: string) {
    //this.playAudio();
    this.quizService.getQuiz(quizId).subscribe(res => {
      //console.log(res);
      //console.log(this.startTime);
      this.disabled = false;
      this.quiz = new Quiz(res);
      //console.log('this.quiz',this.quiz);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
      //console.log(this.startTime);
    });
    this.mode = 'quiz';
  }
  playAudio(){
    let audio = new Audio();
    // audio.src = "../../../assets/audio/beep-01a.wav";
    audio.load();
    audio.play();
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    //console.log('diff', diff);
    if (diff >= this.config.duration) {
      //console.log('in diff');
      clearTimeout(this.timer);
      if (this.config.autoSubmit) {
        this.onSubmit();
      } else {
        this.disabled = true;
        setTimeout(()=> {
          //this.mode = 'result';
          this.start = false;
          //this.router.navigate(["/quiz"]);
        }, 30000);
      }
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    
    if (question.questionTypeId == 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    console.log(this.isCorrect(question));
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {

    console.log('isloggedin', this.user.lastActive);
    // const now = new Date();
    // const diff = (now.getTime() - this.user.lastActive.getTime()) / 1000;
    // console.log('Diff Now', now);
    // console.log('Diff in last login', diff);

    clearTimeout(this.timer);
    if (this.authService.isLoggedIn()) {
      let answers = [];
      //console.log(this.quiz)
      this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'questionName': x.name, 'answered': x.options.every(y => y.selected === y.isAnswer) ? 'correct' : 'wrong', 'attempt': x.options.find(y => y.selected) ? true : false, 'selected': x.options.find((y) => { return y.selected } ) }));
      
      // Post your data to the server here. answers contains the questionId and the users' answer.
      const correctAnswerCount = answers.filter(i => i['answered'] === 'correct').length;
      //console.log('answers', answers);
      //console.log('correctAnswerCount', correctAnswerCount);
      let data = {
        id: this.quiz.id,
        courseId: this.quiz.courseId,
        from: this.user,
        correctAnswerCount: correctAnswerCount,
        questions: this.quiz.questions, 
        answers: answers,
        quiz_by: this.quizBy.userId,
        created_at: new Date(),
      };

      this.chatService.submitQuiz(data);

      // post in log table
      this.log.postQuizLog(data)
        .subscribe(res => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });

      // post in log table in QuizAPi Php
      this.log.postQuizApiPhpLog(data)
      .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
      
      this.mode = 'result';
    }
  }
}
