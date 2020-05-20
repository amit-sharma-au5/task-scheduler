import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { fetchData } from '../ActionCreators/action'
import Calendar from 'react-calendar';
import './Home.css'
import 'react-calendar/dist/Calendar.css'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchData(this.state.date)
    }

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
            0, 1, 2, 3, 4, 5, 6, 7
        ],
        date: new Date(),

        taskTime: "0",
        task: "",
        link: "",
        member: ""
    }

    onChange = date => {
        
        this.setState({ date },
            () => {
                console.log("myDate", this.state)
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
                        <Calendar onChange={this.onChange} value={this.state.date} />
                    </div>
                    <div className="col-9">

                        <table class="table table-bordered">
                            <thead>
                                <tr>

                                    <th className="myclass">#</th>
                                    <th>Task</th>
                                    <th>Link</th>
                                    <th>Members</th>
                                    <th id="status">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.timeSlot.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="myclass"><button type="button" value={index} onClick={() => { this.taskTime(index) }} class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">{ele}</button></td>
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
