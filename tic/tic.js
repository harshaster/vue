Vue.component('tictac',{
    template: `
    <div>
        <h3>{{ this.message }}</h3>
            <button v-bind:disabled="this.started" v-on:click="changeUser">Change Player</button>
            <table class="main-box">
                <tr>
                    <td class="fill" v-on:click="setVal(0)">{{ this.players[this.board[0]] }}</td>
                    <td class="fill" v-on:click="setVal(1)">{{ this.players[this.board[1]] }}</td>
                    <td class="fill" v-on:click="setVal(2)">{{ this.players[this.board[2]] }}</td>
                </tr>
                <tr>
                    <td class="fill" v-on:click="setVal(3)">{{ this.players[this.board[3]] }}</td>
                    <td class="fill" v-on:click="setVal(4)">{{ this.players[this.board[4]] }}</td>
                    <td class="fill" v-on:click="setVal(5)">{{ this.players[this.board[5]] }}</td>
                </tr>
                <tr>
                    <td class="fill" v-on:click="setVal(6)">{{ this.players[this.board[6]] }}</td>
                    <td class="fill" v-on:click="setVal(7)">{{ this.players[this.board[7]] }}</td>
                    <td class="fill" v-on:click="setVal(8)">{{ this.players[this.board[8]] }}</td>
                </tr>
            </table>
            <button v-if="end" v-on:click="again">Play Again ?</button>
    </div>`,
    data : function(){
        return {
            board: [0,0,0,0,0,0,0,0,0],
            nextChance: 1,
            players: {'1': "X", '-1': "O", '0':""}
        }  
    },
    computed: {
        message: function(){
            switch(this.state){
                case 0: return (`This is chance of ${this.players[this.nextChance]}`);
                case 1: return "Congratulations, X won the game !!";
                case -1: return  "Congratulations, O won the game !!";
                case 2: return " Oops, That's a draw";
            }
        },
        state: function(){
            let patterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            for (i in patterns){
                let res = 0;
                for (p of patterns[i]){ res += this.board[p]};
                if (res === 3 || res === -3){ return res/3}
            }
            for (i in this.board){
                if(this.board[i]==0) return 0;
            }
            return 2;
        },
        end: function(){return this.state!=0},
        started: function(){
            let valid=true;
            for (p in this.board){
                if(this.board[p] != 0) valid=false;
            }
            return !valid;
        }
    },
    methods: {
        setVal: function(kiska){
            if ((this.state == 0) && (this.board[kiska] == 0)){
                // this.board[kiska]=this.nextChance;
                Vue.set(this.board, kiska, this.nextChance);
                this.nextChance*= -1;
            }
        },
        changeUser: function(){
            if (!this.started){this.nextChance*=-1;};
        },
        again: function(){
            this.board = [0,0,0,0,0,0,0,0,0]
        }
    }
})


const app = new Vue({
    el: "#app"
    // data : {
    //     board: [0,0,0,0,0,0,0,0,0],
    //     nextChance: 1,
    //     players: {'1': "X", '-1': "O", '0':""}
    // },
    // computed: {
    //     message: function(){
    //         switch(this.state){
    //             case 0: return (`This is chance of ${this.players[this.nextChance]}`);
    //             case 1: return "Congratulations, X won the game !!";
    //             case -1: return  "Congratulations, O won the game !!";
    //             case 2: return " Oops, That's a draw";
    //         }
    //     },
    //     state: function(){
    //         let patterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    //         for (i in patterns){
    //             let res = 0;
    //             for (p of patterns[i]){ res += this.board[p]};
    //             if (res === 3 || res === -3){ return res/3}
    //         }
    //         for (i in this.board){
    //             if(this.board[i]==0) return 0;
    //         }
    //         return 2;
    //     },
    //     end: function(){return this.state!=0},
    //     started: function(){
    //         let valid=true;
    //         for (p in this.board){
    //             if(this.board[p] != 0) valid=false;
    //         }
    //         return !valid;
    //     }
    // },
    // methods: {
    //     setVal: function(kiska){
    //         if ((this.state == 0) && (this.board[kiska] == 0)){
    //             // this.board[kiska]=this.nextChance;
    //             Vue.set(this.board, kiska, this.nextChance);
    //             this.nextChance*= -1;
    //         }
    //     },
    //     changeUser: function(){
    //         if (!this.started){this.nextChance*=-1;};
    //     }
    // }
})