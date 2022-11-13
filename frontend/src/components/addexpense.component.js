import React, { Component } from 'react'
import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import { withRouter } from '../common/with-router';

class AddExpense extends Component{

    emptyItem = {
        userId: 0,
        title: '' ,
        date : new Date(),
        amount : 0,
        category : ''
    }

    constructor(props){
        super(props)

        this.state = {
            Categories:[],
            date :new Date(),
            item : this.emptyItem,
            loading: false,
            message: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount(){
        UserService.getCategories().then((res) =>{
            this.setState({Categories: res.data});
        });

        const currentUser = AuthService.getCurrentUser();
        let item = {...this.state.item};
        item.userId = currentUser.id;
        this.setState({item});
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });
        let expense = this.state.item;
        console.log('expense => ' + JSON.stringify(expense));

        UserService.createExpense(expense).then( 
            () =>{
             this.props.router.navigate("/view");
             window.location.reload();
            },
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
            }
        );

    }

    handleChange(e){
        const target= e.target;
        const value= target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
    }
  
  
    handleDateChange(date){
        let item={...this.state.item};
        item.date = date;
        this.setState({item});
      
    }

    
    
    render() {
        const {Categories} =this.state;

        let optionList  =
                Categories.map( (category) =>
                    <option value={category.name} key={category.id}>
                        {category.name} 
                    </option>
                )

        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <br/>
                                <h3 className="text-center">Add Expense</h3>
                                <div className = "card-body">
                                    <form className='row g-3'>
                                        <div className = "form-group col-12">
                                            <label for='title' className='form-label'> Title </label>
                                            <input placeholder="Title" name="title" id='title' className="form-control" 
                                                type='text' onChange={this.handleChange}/>
                                        </div>
                                        <div className = "form-group col-md-4">
                                            <label for='category' className='form-label'>Category</label>
                                            <select name='category' className='form-control form-select' id='category' onChange={this.handleChange} >
                                                <option selected>Select Category</option>
                                                {optionList}
                                            </select>
                                        </div>
                                        <div className = "form-group col-md-4">
                                            <label for='date' className='form-label'> Date </label>
                                            <DatePicker selected={this.state.item.date} className='form-control' id='date'  onChange={this.handleDateChange} />
                                        </div>
                                        <div className = "form-group ol-12">
                                            <label for='amount' className='form-label'> Amount </label>
                                            <input placeholder="₹" name="amount" id='amount' className="form-control" 
                                                type='number' onChange={this.handleChange}/>
                                        </div>

                                        <div className='col-md-4'>
                                            <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                                        </div>
                                        <div className='col-md-4'>
                                            <button className="btn btn-danger" tag={Link} to="/" >Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        );
    }
    
}
export default withRouter(AddExpense);