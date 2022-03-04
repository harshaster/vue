Vue.component('message-board',{
    props: ["title"],
    template: `
    <div>
    <h4>{{title}}'s Board</h4>
    Your name : <input type="text" v-model="visitor_name"><br><br>
            Your message : <input type="text" v-model="visitor_mesasge"><br><br>
            
            <button v-on:click="sayHi" >Say Hi</button>
            <i class="bi bi-cloud-check-fill" v-bind:class="saved"></i>
            <h2 v-if="messages.length>0">Visitors' list</h2>
            <ul>
                <li v-for="message in messages">{{message.visitor_name}} : {{message.visitor_message}} !</li>
            </ul>
    </div>
    `,
    data : function(){
        return {
        visitor_name : "",
        visitor_mesasge : "",
        messages: [],
        saved:"",
        }
    },
    methods : {
        sayHi : function(){
            this.messages.push({"visitor_name": this.visitor_name, "visitor_message": this.visitor_mesasge});

            this.saved="text-warning";
            fetch('https://httpbin.org/post', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"for": this.title, "visitor_name": this.visitor_name, "message": this.visitor_mesasge})
            })
            .then(response => {
                if(response.ok){
                    response.json()
                }
                else{
                    throw Error;
                }
            })
            .then(data => {
                console.log("Success");
                this.saved="text-success";
            })
            .catch((err) => {
                console.log("Error: "+err);
                this.saved="text-danger";
            })
            // Save to backend in here !!

            this.visitor_name="";
            this.visitor_mesasge="";
            this.$emit("add-to-global-total");
        }
    },
    computed : {
        count: function(){
            return this.messages.length;
        }
    },
    mounted: function(){
        fetch("http://localhost:8000/vue/msg.json")
        .then( res => res.json())
        .then( data => this.messages=data);
    }

})

var app = new Vue({
    el: "#app",
    data : {
        gCount : 0,
    },
    methods : {
        count_global : function(){
            this.gCount++;
        }
    },
})

