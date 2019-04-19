import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        const key = "adcb83e6e776e64d350145b2a14d68b6";
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        }catch(error){
            alert(error);
        }

    };
}







