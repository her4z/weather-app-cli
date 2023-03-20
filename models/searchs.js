import fetch from "node-fetch";
export default class Searchs {
  history = ["Madrid", "Buenos Aires", "Malaga"];
  constructor() {}

  async search(input = "") {
    console.log(input);
    try {
      fetch("https://reqres.in/api/users?page=2").then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      });
    } catch (err) {
      return [];
    }
  }
}
