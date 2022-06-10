import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import Axios from "../../utils/Axios"

Chart.register(CategoryScale);


const WeeklyReportGraph = (props) => {

	let currState = {
		labels: ['Sunday', 'Monday', 'Tuesday',
				 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		datasets: [
		  {
			label: 'Number of reservations',
			backgroundColor: 'rgba(0,128,128, 0.6)',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data: [0,0,0,0,0,0,0]
		  }
		]
	}

	const getState = () =>{

		let newData = [0,0,0,0,0,0,0]
		let reservations = props.reservations
		console.log(reservations)

		for (let i = 0; i < reservations.length; i++) {

			var parts =reservations[i].startDate.split('-');
			var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
			
			newData[mydate.getDay()] = newData[mydate.getDay()] + 1
		
		  }
		 
		let myState = currState
		myState.datasets[0].data = newData
		console.log(myState)
		return myState
	}
	
	return(
		<div>
			<h3 style={{textAlign: "center"}}>Weekly Reservations Report</h3>
			<br></br>
        <Bar
          data={getState()}
          options={{
            title:{
              display:true,
              text:'Weekly Reservations Report',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
	)
}
export default (WeeklyReportGraph);
