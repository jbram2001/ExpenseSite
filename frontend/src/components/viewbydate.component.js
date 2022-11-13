import React, { Component} from 'react'
import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class ViewByDate extends Component{

    constructor(props){
        super(props)

        this.state = {
            userId: 0,
            Expenses: [],
            startDate: new Date(),
            endDate: new Date()
        }

        this.hadleStartDate = this.hadleStartDate.bind(this);
        this.hadleEndDate = this.hadleEndDate.bind(this);
    }

    componentDidMount(){
        const currentUser = AuthService.getCurrentUser();
        let userId = {...this.state.userId};
        userId = currentUser.id;
        this.setState({userId});

        UserService.getExpense(userId).then((res) =>{
            this.setState({ Expenses:res.data.map((expense)=>{
                return { ...expense, date: new Date(expense.date) };
            })});
        });

    }
    
    hadleStartDate(startDate){
        this.setState({startDate:startDate});
    }

    hadleEndDate(endDate){
        this.setState({endDate:endDate});
    }

    render(){

        var startDate = this.state.startDate;
        var endDate = this.state.endDate;
        var selected = new Date();

        this.state.Expenses.forEach(expense =>{
            if(expense.date < selected)
                selected = expense.date;
        });

        var Expenses = this.state.Expenses.filter(expense => expense.date >= startDate && expense.date <= endDate);
        var TotalSum = Expenses.reduce(function(sum, value){return sum + value.amount},0);
        var rows = Expenses.map(
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

        return (
            <div className='container'>
                <h2 className="text-center">Expenses List</h2>
                <br/>
                <div className='row g-3'>
                    <div className = "form-group col-md-4">
                        <label for='startdate' className='form-label'> Start Date </label>
                        <DatePicker selected={selected} className='form-control' id='startdate'  onChange={this.hadleStartDate} />
                    </div>
                    <div className = "form-group col-md-4">
                        <label for='enddate' className='form-label'> End Date </label>
                        <DatePicker selected={this.state.endDate} className='form-control' id='enddate'  onChange={this.hadleEndDate} />
                    </div>
                </div>
                <br/>
                <div className='row g-3'>
                    <div className="col-12">
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