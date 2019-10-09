# Project Title

E-Class (Electronic Collaborative Learning and Knowledge Sharing System.)

## Getting Started

Quiz application in one form or the other is becoming a general requirement for most of the applications these days. Be it Survey, mock test, preparation, self evaluation, gathering information, actual objective test or exam. This quiz application will help you to get through your need with minimal or no modification.

### Prerequisites

What things you need to install the software and how to install them

```
NodeJs (10.x)
MongoDb (4.0.12)
Angular 8.x

```

### Installing

Download this project from where it kept and run bellow command in root folder

```
npm run install
```

And serve

```
ng serve
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component components/component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Backend server
Host IP: 192.168.17.31
Local Backend server folder: `D:\Angular\ng8-school-cordova\server`
Remote Backend server folder: `/home/ubuntu/Angular/ng8-school-cordova`

Backend Php Api named quizApi located in `/var/www/html/quizApi`
databse mdlnew and edusat_lms

If nodemon is installed globally in your system then run

```
nodemon
```
or
```
node start ./server/bin/www
```

And in production server install pm2 npm package for start server in background. and run
or
```
pm2 start ./server/bin/www
```

### Client Server

If you installed this project locally then run

```
ng serve
```

And in production server just build the compiled file and copy all the generaded file on remote server. compiled file generated inside www folder

```
ng build --prod
```
## MongodB ScreenShot
<p class="center">
    <img src="./images/screenshot/mongo.png" width="600">
</p>

## Route guide with screenshots
All components are located inside  `D:\Angular\ng8-school-cordova\src\app\components`

| `\src\app\components\login`               | `\src\app\components\quiz`               | `\src\app\components\offline-session` |
| ------------- |:-------------:| -----:|
| ![](./images/screenshot/eclass_login.png) | ![](./images/screenshot/play.png) | ![](./images/screenshot/offline-session.png) |

| `\src\app\components\user-profile`          | `\src\app\components\quiz\quiz-list`   | `\src\app\components\question`        |
| ------------- |:-------------:| -----:|
| ![](./images/screenshot/study_material.png) | ![](./images/screenshot/quiz-list.png) | ![](./images/screenshot/question.png) |

| `\src\app\components\online-users`        | `\src\app\components\reports`       | `\src\app\components\chat-history`        |
| ------------- |:-------------:| -----:|
| ![](./images/screenshot/online-users.png) | ![](./images/screenshot/report.png) | ![](./images/screenshot/chat-history.png) |

## Refrence for quiz

<a href="https://www.codeproject.com/Articles/1167451/Quiz-Application-in-Angular"> Quiz App</a>


