import { data } from "../data.js";
import { pubsub } from "../pubsub.js";

export const Mutation = {
  createQuestion: (parent, args) => {
    // Find the highest question ID to avoid conflicts
    const maxQuestionId = Math.max(...data.questions.map((q) => q.id), -1);

    const newQuestion = {
      id: maxQuestionId + 1,
      question: args.question,
      voteCount: 0,
      options: [],
    };
    data.questions.push(newQuestion);

    // Don't publish subscription event here - we'll do it after options are added
    return newQuestion;
  },

  createOption: (parent, args) => {
    const question = data.questions.find(
      (question) => question.id == args.questionId
    );
    const index = data.questions.indexOf(question);

    // Find the highest option ID across all questions to avoid conflicts
    let maxOptionId = 0;
    data.questions.forEach((q) => {
      q.options.forEach((opt) => {
        if (opt.id > maxOptionId) maxOptionId = opt.id;
      });
    });

    const newOption = {
      id: maxOptionId + 1,
      text: args.text,
      votes: 0,
      questionId: args.questionId,
    };

    data.questions[index].options.push(newOption);

    return newOption;
  },

  voteOption: (parent, args) => {
    const question = data.questions.find(
      (question) => question.id == args.questionId
    );
    const option = question.options.find(
      (option) => option.id == args.optionId
    );

    option.votes += 1;
    question.voteCount += 1;

    // Publish subscription event
    pubsub.publish("OPTION_VOTED", { optionVoted: option });

    return option;
  },

  deleteQuestion: (parent, args) => {
    const questionIndex = data.questions.findIndex(
      (question) => question.id == args.questionId
    );

    if (questionIndex === -1) {
      throw new Error("Question not found");
    }

    data.questions.splice(questionIndex, 1);
    return true;
  },
};

export default Mutation;
