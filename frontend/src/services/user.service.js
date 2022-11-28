import axios from 'axios';

const API_URL = 'http://localhost:8080/api/test/';
const API_URL_EX = 'http://localhost:8080/api/test/expense';
const API_URL_CA = 'http://localhost:8080/api/test/category';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'home');
  }

  getExpense(userId){
    return axios.get(API_URL_EX + '/'+userId);
  }

  createExpense(expense){
    return axios.post(API_URL_EX, expense);
  }

  deleteExpense(expenseId){
    return axios.delete(API_URL_EX + '/'+ expenseId);
  }

  getCategories(){
    return axios.get(API_URL_CA)
  }
}

export default new UserService();
