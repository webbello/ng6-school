'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">E-CLASS documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' : 'data-target="#xs-components-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' :
                                            'id="xs-components-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BookEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatHistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatHistoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FacultyAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FacultyAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MaterialDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaterialDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MaterialNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaterialNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfflineSessionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OfflineSessionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfflineSessionDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OfflineSessionDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfflineSessionDialog.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OfflineSessionDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OnlineUsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlineUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RatingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RatingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReportsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StudentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' : 'data-target="#xs-injectables-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' :
                                        'id="xs-injectables-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' }>
                                        <li class="link">
                                            <a href="injectables/BookService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BookService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' : 'data-target="#xs-pipes-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' :
                                            'id="xs-pipes-links-module-AppModule-ad73ff93ba245ca6f242e2705aaa4a11"' }>
                                            <li class="link">
                                                <a href="pipes/SafeUrlPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeUrlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppRoutingModule-eee02d16345c0096e59628170db1be62"' : 'data-target="#xs-injectables-links-module-AppRoutingModule-eee02d16345c0096e59628170db1be62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppRoutingModule-eee02d16345c0096e59628170db1be62"' :
                                        'id="xs-injectables-links-module-AppRoutingModule-eee02d16345c0096e59628170db1be62"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BookDataSource.html" data-type="entity-link">BookDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Option.html" data-type="entity-link">Option</a>
                            </li>
                            <li class="link">
                                <a href="classes/Question.html" data-type="entity-link">Question</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionDataSource.html" data-type="entity-link">QuestionDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Quiz.html" data-type="entity-link">Quiz</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuizConfig.html" data-type="entity-link">QuizConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link">AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookService.html" data-type="entity-link">BookService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link">ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelperService.html" data-type="entity-link">HelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link">LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OfflineSessionService.html" data-type="entity-link">OfflineSessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionService.html" data-type="entity-link">QuestionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizService.html" data-type="entity-link">QuizService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizService-1.html" data-type="entity-link">QuizService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportsService.html" data-type="entity-link">ReportsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentService.html" data-type="entity-link">StudentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link">ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/FakeBackendInterceptor.html" data-type="entity-link">FakeBackendInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/JwtInterceptor.html" data-type="entity-link">JwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link">RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link">DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LiveLecture.html" data-type="entity-link">LiveLecture</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuizChatModel.html" data-type="entity-link">QuizChatModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuizData.html" data-type="entity-link">QuizData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuizResultModel.html" data-type="entity-link">QuizResultModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData.html" data-type="entity-link">UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData-1.html" data-type="entity-link">UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData-2.html" data-type="entity-link">UserData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});