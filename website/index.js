const { createApp } = Vue;

createApp({
  data() {
    // div test has access to everything inside this data function.
    return {
      message: "Hello",
      values: [1,2,3,4,5,6,7,8,9],
      question: '',
      answer: 'Questions usually have a question mark. ;-)'
    };
  },
  watch: {
    question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
            this.getAnswer()
        }
    }
  },
  methods: {

    async getAnswer() {
        this.answer = 'Thinking.....'
        try {
            const res = await fetch('https://yesno.wtf/api')
            this.answer = (await res.json()).answer  // .answer is referring to the object in the API call
            setTimeout(() => {
                this.answer = "ask another question!"
            }, 1000)
        } catch (error) {
            this.answer = "Error! Could not reach API " + error
        }
    },
    onPress() {
       this.message = 'craig';
       this.values = [1,2,3];
    },
    onDub() {
        this.message = 'Steve';
        this.values = [1000, 122, 131431512356,11];
    }
  },
  computed: {
    numbers() {
        let sum = 0;
        this.values.forEach((number) => {
            sum += number;
        })
        return sum;
    }
  }

}).mount("#test");
