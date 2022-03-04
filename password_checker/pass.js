const app = new Vue({
    el: "#app",
    data: {
        pwd : "",
        track :{
            upper: 'rgb(255, 0, 0)',
            lower: 'rgb(255, 0, 0)',
            number: 'rgb(255, 0, 0)',
            special: 'rgb(255, 0, 0)'
        },
        strength: "Please enter a valid password"
    },
    methods: {
        meter: function(){
            let c=0;
            for (i in this.track){
                if (this.track[i] == 'rgb(0, 255, 0)'){
                    c++
                }
            }
            if (this.pwd.length > 7){
                c++;
            }

            if (c==5){
                this.strength = "Password strength is excellent !";
            }
            else if (c==4){
                this.strength = "Password strength is very good !";
            }
            else if (c==3){
                this.strength = "Password strength is good !";
            }
            else if (c==2){
                this.strength = "Password strength is moderate !";
            }
            else if (c==1){
                this.strength = "Password strength is poor !";
            }
            else{
                this.strength = "Please enter a valid password";
            }
        }
    },
    computed :{},
    watch: {
        pwd(val) {
            this.track.upper = 'rgb(255, 0, 0)';
            this.track.lower = 'rgb(255, 0, 0)';
            this.track.number = 'rgb(255, 0, 0)';
            this.track.special = 'rgb(255, 0, 0)';

            for (let i = 0; i<val.length; i++){
                let ch = val.charCodeAt(i);

                if (ch >=65 && ch<=90){
                    this.track.upper = 'rgb(0, 255, 0)';
                }
                else if (ch >=97 && ch<=122){
                    this.track.lower = 'rgb(0, 255, 0)';
                }
                else if (ch >=48 && ch<=57){
                    this.track.number = 'rgb(0, 255, 0)';
                }
                else if ((ch >=33 && ch<=47) || (ch >=58 && ch<=64)){
                    this.track.special = 'rgb(0, 255, 0)';
                }
            }
            this.meter();
        }
    }
})