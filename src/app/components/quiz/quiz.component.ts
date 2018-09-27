import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { LogService } from '../../services/log/log.service';
import { HelperService } from '../../services/helper/helper.service';
import { AuthService } from '../../services/auth/auth.service';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';
import { User } from '../../models/chat/user';
import { Event } from '../../models/chat/event';
import { QuizChatModel } from '../../models/chat/quiz';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  user: User;
  //quizId: any;
  quiz: Quiz = new Quiz(null);
  quizChat: QuizChatModel;
  mode = 'quiz';
  quizName: string;
  start: boolean = false;
  quizBy: string;
  ioConnection: any;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'duration': 30,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
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

  constructor(private quizService: QuizService, private authService: AuthService, private log: LogService, private chatService: ChatService ) { }

  ngOnInit() {
    this.authService.getLoginUser()
        .subscribe(res => {
          //console.log(res);
          //this.loginUser = res;
          this.user = {
          //id: randomId,
          userId: res._id,
          name: res.name
        };
        }, err => {
          console.log(err);
        });
    this.initIoConnection();
  }

  private initIoConnection(): void {

      this.ioConnection = this.chatService.onQuizStart()
        .subscribe((quiz: QuizChatModel) => {
          console.log(quiz);
          this.start = quiz.start;
          this.quizBy = quiz.from.userId;
          //console.log(this.start);
          //this.quizId = quiz.id;
          this.loadQuiz(quiz.id);
        });

      this.chatService.onEvent(Event.CONNECT)
        .subscribe(() => {
          console.log('connected');
        });
        
      this.chatService.onEvent(Event.DISCONNECT)
        .subscribe(() => {
          console.log('disconnected');
        });
  }

  loadQuiz(quizId: string) {

    this.quizService.getQuiz(quizId).subscribe(res => {
      //console.log(res);
      //console.log(this.startTime);

      this.quiz = new Quiz(res);
      //console.log(this.quiz);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
      //console.log(this.startTime);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      console.log('in diff');
      clearTimeout(this.timer);
      //this.onSubmit();
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
    let answers = [];
    //console.log(this.quiz)
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'questionName': x.name, 'answered': x.options.every(y => y.selected === y.isAnswer) ? 'correct' : 'wrong', 'attempt': x.options.find(y => y.selected) ? true : false, 'selected': x.options.find((y) => { return y.selected } ) }));
    
    // Post your data to the server here. answers contains the questionId and the users' answer.
    const correctAnswerCount = answers.filter(i => i['answered'] === 'correct').length;
    //console.log(answers);
    let data = {
      id: this.quiz.id,
      from: this.user,
      correctAnswerCount: correctAnswerCount,
      questions: this.quiz.questions, 
      answers: answers,
      quiz_by: this.quizBy,
      created_at: new Date(),
    };

    this.chatService.submitQuiz(data);

    // this.log.postQuizLog(data)
    //   .subscribe(res => {
    //   console.log(res);
    //   }, (err) => {
    //     console.log(err);
    //   });
    
    this.mode = 'result';
    
  }
}
