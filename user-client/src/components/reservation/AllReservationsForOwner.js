import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class AllReservationsForOwner extends React.Component{

    constructor(props){
        super(props)

        // let search = {
        //     name: "",
        //     price: -1
        // }

        this.state = {
             reservations: []
        }
    }

   async componentDidMount(){

        this.getReservations()

    }

    getReservations(){

        Axios.get('/reservations/byEntity/'+ this.props.params.entityId)
            .then(res => {
                this.setState({reservations: res.data})
                console.log(this.state.reservations)
            })
            .catch(err =>{
                console.log(err)
            })
    }

   showClientProfile(id){
        this.props.navigate('/clientProfileView/' + id)
   }
   

    renderReservations(){
        return this.state.reservations.map((h) =>{
            return(
                <li class="list-group-item" key={h.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a>From {h.startDate} to {h.endDate}</a></h5>
                        <p class="font-italic text-muted mb-0 small">Number of people: {h.numberOfPeople}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">Price: ${h.price}</h6>
                            <button type="button" class="btn btn-outline-primary" onClick={() => this.showClientProfile(h.clientId)}>Show client info</button>
                         </div>
                    </div>
                </div> 
        
            </li> 
            )
        })
    }


    render(){
        return(
            <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4" style={{color: "black"}}>Reservations history</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        {/* <div className="form-inline">
                            <Form.Label style={{marginRight: "2%"}}>Name:</Form.Label>
                            <Form.Control name="name" placeholder="Search by name" style={{width: "25%", marginRight: "2%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Form.Label style={{marginRight: "2%"}}>Max price:</Form.Label>
                            <Form.Control name="price" placeholder="Search by price" style={{width: "25%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Button onClick={()=> this.goToAddHouse()} style={{marginLeft: "7%"}}>Add new</Button>
                        </div>
                        <br></br> */}
                        <ul class="list-group shadow">
                            {this.renderReservations()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNavigation(withParams(AllReservationsForOwner));