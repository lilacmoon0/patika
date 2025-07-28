export let data = {
  questions: [
    {
      id: 0,
      voteCount: 45,
      question: "What's your favorite programming language?",
      options: [
        { id: 0, text: "JavaScript", votes: 18, questionId: 0 },
        { id: 1, text: "Python", votes: 15, questionId: 0 },
        { id: 2, text: "Java", votes: 8, questionId: 0 },
        { id: 3, text: "C++", votes: 4, questionId: 0 },
      ],
    },
    {
      id: 1,
      voteCount: 32,
      question: "Which frontend framework do you prefer?",
      options: [
        { id: 4, text: "React", votes: 20, questionId: 1 },
        { id: 5, text: "Vue.js", votes: 7, questionId: 1 },
        { id: 6, text: "Angular", votes: 3, questionId: 1 },
        { id: 7, text: "Svelte", votes: 2, questionId: 1 },
      ],
    },
    {
      id: 2,
      voteCount: 28,
      question: "What's your preferred code editor?",
      options: [
        { id: 8, text: "VS Code", votes: 22, questionId: 2 },
        { id: 9, text: "IntelliJ IDEA", votes: 4, questionId: 2 },
        { id: 10, text: "Vim", votes: 2, questionId: 2 },
      ],
    },
  ],
};
