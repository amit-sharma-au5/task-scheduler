import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { fetchData } from '../ActionCreators/action'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import $ from "jquery";

import './Home.css'


class Home extends React.Component {
    componentDidMount() {
        this.props.fetchData(this.state.date)
    }
    count =0;
    state = {
        timeSlot: [
            '9AM - 10AM',
            '10AM - 11AM',
            '11AM - 12AM',
            '12AM - 1PM',
            '1PM - 2PM',
            '2PM - 3PM',
            '3PM - 4PM',
            '4PM - 5PM'
        ],
        data: [
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        date: new Date(),

        taskTime: "0",
        task: "",
        link: "",
        member: "",
        rTask:"",
        rLink:"",
        rMember:""
    }

    onChange = date => {
        console.log("new date", date)
        
        this.setState({ date },
            () => {
                this.props.fetchData(date)
            })

    }

    taskTime = (timeValue) => {
        this.setState({
            taskTime: timeValue
        })
    }

    userTask = (val) => {
        this.setState({
            task: val
        })
    }

    userLink = (val) => {
        this.setState({
            link: val
        })
    }

    userMember = (val) => {
        this.setState({
            member: val
        })
    }

    submitUser = (e) => {
        e.preventDefault()
        let data = {
            date: this.state.date,
            taskTime: this.state.taskTime,
            task: this.state.task,
            link: this.state.link,
            member: this.state.member
        }
        console.log("date at home", data.date)
        axios.post("http://localhost:3010/event", data).then(res => {
            console.log(res.data)
        })
    }

    render() {
        return (
            <div className="mt-2">
                <p className="text-center"><h4>My Task</h4></p>
                <div className="row">
                    <div className="col-3">
                        <Calendar onChange={this.onChange} value={this.state.date} locale />
                    </div>
                    <div className="col-9">
                        <table className="table table-bordered">
                            <thead>
                                <th>Task-Slot</th>
                                <th>Task</th>
                                <th>Link</th>
                                <th>Member</th>
                            </thead>
                            {
                                (()=>{
                                    $('b').empty()
                                    $('td').css("background-color","white")
                                })()
                                
                            }

                            <tbody>
                                {
                                    this.state.timeSlot.map((ele, index) => {
                                        return (
                                            <tr>
                                                <td><button type="button" style={{ width: "150px" }} value={index} onClick={() => { this.taskTime(index) }} className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModalCenter"><h6>{ele}</h6></button></td>
                                                <td><b id={index+"0"}></b></td>
                                                <td><b id={index+"1"}></b></td>
                                                <td><b id={index+"2"}></b></td>
                                                
                                                {
                                                    this.props.data.map((ele) => {
                                                     if (ele.taskTime === index) {
                                                            
                                                            $('#'+index+'0').append(ele.task).parent().css({"background-color": "#F0DF87","color":"#AE1438"})
                                                            $('#'+index+'1').append(ele.link).parent().css({"background-color": "#FBD28B","color":"#AE1438"})
                                                            $('#'+index+'2').append(ele.member).parent().css({"background-color": "#F0DF87","color":"#AE1438"})
 
                                                           return false
                                                        }
                                                        else{ return(
                                                                false
                                                        )}
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">My Task</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="myTask"><b>Task</b></label>
                                    <input type="text" onChange={(e) => { this.userTask(e.target.value) }} class="form-control" id="myTask" placeholder="Task" ></input>
                                </div>
                                <div class="form-group">
                                    <label for="myLink"><b>MeetingLink</b></label>
                                    <input type="text" onChange={(e) => { this.userLink(e.target.value) }} class="form-control" id="myLink" placeholder="Meeting Link" ></input>
                                </div>
                                <div class="form-group">
                                    <label for="myMember"><b>Members</b></label>
                                    <input type="text" onChange={(e) => { this.userMember(e.target.value) }} class="form-control" id="myMemeber" placeholder="Members" ></input>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onClick={(e) => { this.submitUser(e) }} class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("data at Home", state.data)
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => { return bindActionCreators({ fetchData }, dispatch) }


export default connect(mapStateToProps, mapDispatchToProps)(Home)

