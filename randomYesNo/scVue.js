const app = new Vue({
    el: "#app",
    data: function(){
        return {
            question: '',
            answer: 'Question usually contains a question mark ;-)',
            image: ''
        }
    },
    watch: {
        question(newQ, oldQ) {
            if (newQ.indexOf('?') > -1) {
                this.getAnswer();
            }
            else {
                this.answer = 'Question usually contains a question mark ;-)';
            }
        }
    },
    methods: {
        async getAnswer() {
            this.answer = "Please wait, Thinking...";
            try {
                const res = await fetch('https://yesno.wtf/api').then(result => result.json());
                this.answer = res.answer;
                this.image = res.image;
                document.getElementsByTagName('iframe')[0].style.display = "block";
            }
            catch (e) {
                this.answer = 'Error! could not reach API. '+e;
            }
        }
    }
})