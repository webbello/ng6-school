var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"/quiz","pathMatch":"full"},{"path":"login","component":"LoginComponent"},{"path":"profile","component":"UserProfileComponent","canActivate":["AuthGuard"],"data":{"title":"UserProfile"}},{"path":"quiz","component":"QuizComponent","canActivate":["AuthGuard"],"data":{"title":"PlayQuiz"}},{"path":"dashboard","component":"MaterialDashboardComponent"},{"path":"quizs","component":"QuizListComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"quiz-details/:id","component":"QuizDetailComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"quiz-edit/:id","component":"QuizEditComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"quiz-create","component":"QuizCreateComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"signup","component":"SignupComponent"},{"path":"online-users","component":"OnlineUsersComponent","canActivate":["AuthGuard"],"data":{"title":"OnlineUsers"}},{"path":"reports","component":"ReportsComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"offline-session","component":"OfflineSessionComponent","canActivate":["AuthGuard"],"data":{"title":"OfflineSession"}},{"path":"offline-session/:id","component":"OfflineSessionDetailComponent","canActivate":["AuthGuard"],"data":{"title":"OfflineSessionDetails"}},{"path":"questions","component":"QuestionComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"question-details/:id","component":"QuestionDetailComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"question-create","component":"QuestionCreateComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"question-edit/:id","component":"QuestionEditComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}},{"path":"chat-history","component":"ChatHistoryComponent","canActivate":["RoleGuard"],"data":{"expectedRole":"Admin"}}],"kind":"module"}]}