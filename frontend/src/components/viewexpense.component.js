import React, { Component} from 'react'
import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import Moment from 'react-moment';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export default class ViewExpense extends Component{

   

    constructor(props){
        super(props)

        this.state = {
            userId: 0,
            Expenses: [],
            Categories:[],
            category: null
        }
        this.deleteExpense = this.deleteExpense.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }

    componentDidMount(){
        const currentUser = AuthService.getCurrentUser();
        let userId = {...this.state.userId};
        userId = currentUser.id;
        this.setState({userId});

        UserService.getCategories().then((res) =>{
            this.setState({Categories: res.data});
        });

        UserService.getExpense(userId).then((res) =>{
            this.setState({ Expenses:res.data.map((expense)=>{
                return { ...expense, date: new Date(expense.date) };
            })});
        });
    }

    deleteExpense(id){
        UserService.deleteExpense(id).then(res => {
            this.setState({Expenses: this.state.Expenses.filter(expense => expense.id !== id)});
        },
        error => {
            this.setState({
              content:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
          }
        );
    }

    handleOnClick(value){
        this.setState({category:value});
    }
    handleDateChange(value){
        let date = this.state.date;
        date.setMonth(date.getMonth()-value);
        this.setState({date:date});
    }


    render() {
        var TotalSum ;
        var {Expenses} = this.state;
        const {Categories} =this.state;

        let optionList  =
                Categories.map( (value) =>
                    <Dropdown.Item key={value.id} onClick={() => this.handleOnClick(value.name)}>{value.name}</Dropdown.Item>
                );
        
        var category = this.state.category;
        var rows;
       if(category === null){
            Expenses = this.state.Expenses;
            TotalSum = Expenses.reduce(function(sum, value){return sum + value.amount},0);
            rows = Expenses.map(
                (expense, key) => {
                    return (
                        <tr key = {key}>
                            <td> {expense.title} </td>   
                            <td> <Moment date={expense.date} format="YYYY/MM/DD"/> </td>
                            <td> {expense.category}</td>
                            <td> {expense.amount} ₹</td>
                            <td>
                                <button onClick={ () => this.deleteExpense(expense.id)} className="btn btn-danger">Delete </button>
                            </td>
                        </tr>
                    )
                }
            )
        }
        else{
            Expenses = this.state.Expenses.filter(expense => expense.category === category);
            TotalSum = Expenses.reduce(function(sum, value){return sum + value.amount},0);
            rows = Expenses.map(
                (expense, key) => {
                    return (
                        <tr key = {key}>
                            <td> {expense.title} </td>   
                            <td> <Moment date={expense.date} format="YYYY/MM/DD"/></td>
                            <td> {expense.category}</td>
                            <td> {expense.amount} ₹</td>
                            <td>
                                <button onClick={ () => this.deleteExpense(expense.id)} className="btn btn-danger">Delete </button>
                            </td>
                        </tr>
                    )
                }
            )
        }
        return (
            <div className='container'>
                <h2 className="text-center">Expenses List</h2>
                    <br/>
                <div className='row g-3'>
                    
                    <div className='col-md-4'>
                        <DropdownButton id="dropdown-basic-button" title="Select Category">
                            <DropdownItem onClick={() => this.handleOnClick(null)}>All Categories</DropdownItem>
                            {optionList}
                        </DropdownButton>
                    </div>
                </div>
                <br/>
                <div className='row g-3'>
                    <div className = "col-12">
                        <table className = "table table-striped table-bordered text-center">

                            <thead>
                                <tr>
                                    <th> Title</th>
                                    <th> Date</th>
                                    <th> Category</th>
                                    <th> Amount</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3">Total Amount</td>
                                    <td colSpan="2">{TotalSum} ₹</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}