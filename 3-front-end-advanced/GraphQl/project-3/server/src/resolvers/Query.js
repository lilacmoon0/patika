import { data } from "../data.js";

export const Query = {
  questions: () => data.questions,
  question: (__, args) =>
    data.questions.find((question) => question.id == args.questionId),
  options: (__, args) =>
    data.questions.find((question) => question.id == args.questionId).options,
};

export default Query;
