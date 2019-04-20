import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
        const key = "adcb83e6e776e64d350145b2a14d68b6";
        const proxy ="https://cors-anywhere.herokuapp.com/";
        try{
            const res = await axios(`${proxy}https://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        }catch(error){
            alert(error);
        }

    };
}







