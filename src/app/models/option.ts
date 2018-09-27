export class Option {
    id: string;
    questionId: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data._id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.isAnswer = data.isAnswer;
    }
}
