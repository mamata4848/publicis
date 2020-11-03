import React, { Fragment } from 'react';
import '../App.css';
import '../styles.css';
import axios from 'axios';

export default class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
		spacexData:[],
		query:'',
		successLanding:'',
		landingSuccessMsg: 'false',
		getLaunchSuccess:''
    }
    	
   		this.launchOptionSelectedTrue = this.launchOptionSelectedTrue.bind(this); 
     	this.landOptionSelectedTrue = this.landOptionSelectedTrue.bind(this);
  }

   options = {
     2006: '2006', 2007:'2007', 2008:'2008',2009:'2009',2010:'2010',2011:'2011',2012:'2012',2013:'2013',2014:'2014',2015:'2015',2016:'2016',2017:'2017',2018:'2018',2019:'2019',2020:'2020'
   }
 
 
  landOptionSelectedTrue = (e) =>{
	  alert()
		var getLandVal= e.target.value
		alert(getLandVal)
		if(getLandVal==="True"){
			axios.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true").then( response => {
				console.log(response.data)
				this.setState({spacexData:response.data})
			
			})
		}
	}
	launchOptionSelectedTrue = () =>{
		alert()
		axios.get("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true").then( response => {
			console.log(response.data)
			this.setState({spacexData:response.data})
			
		})
	}
	onChangeHandler(e) {
		axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then( response => {
			this.setState({spacexData:response.data})
			let newArray = this.state.spacexData.filter((d)=>{
				console.log(d)
				  let searchValue = d.launch_year.toLowerCase();
				  return searchValue.indexOf(e.target.value) !== -1;
			  });
			  this.setState({
				  spacexData:newArray
			  })
		})
        
	}
	launchOptionSelectedFalse(e) {
		axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then( response => {
			console.log(response.data)
			this.setState({spacexData:response.data})
			let newArray = this.state.spacexData.filter((d)=>{
				var t=String(d.launch_success)
				  let searchValue = t.toLowerCase();
				  return searchValue.indexOf(e.target.value) !== -1;
			  });
			  this.setState({
				  spacexData:newArray
			  })
		})
        
	}
	landOptionSelectedFalse(e) {
		axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then( response => {
			console.log(response.data)
			this.setState({spacexData:response.data})
			let newArray = this.state.spacexData.filter((d)=>{
				console.log(d.rocket.first_stage.cores[0].land_success)
				var t=String(d.rocket.first_stage.cores[0].land_success)
				  let searchValue = t.toLowerCase();
				  return searchValue.indexOf(e.target.value) !== -1;
			  });
			  this.setState({
				  spacexData:newArray
			  })
		})
        
	}
	clearSelectedFilter = () =>{
		axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then( response => {
			console.log(response.data)
			this.setState({spacexData:response.data})
		})
	}

  componentDidMount(){
    axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then( response => {
      console.log(response.data)
      this.setState({spacexData:response.data})
		this.setState({asyncLoad:"true"});
		
    })
  }
  render(){ 
    return (
      <Fragment>
          {this.state.asyncLoad? <span>
        <div className="container-fluid">
		  <div className="App">
          <div className="row">
            <div className="col-sm-12 py-3">
              <h5 className="text-center">SpaceX Launch Programs</h5>
            </div>
            
          </div>
          <br />
          <div className="row contentBackground">
              <div className="col-sm-2">
              <h5 className="text-center">Filters</h5>
				  <label className="newlabelStyle">Launch Year</label>
				  <br />
					{
					Object.entries(this.options).map(([key, value]) => {
						return (
							<Fragment>
								<button onClick={this.onChangeHandler.bind(this)} className="btn btn-sm btn-success" value={key}>{value}</button>
							</Fragment>
						)
					})
					}
				  <br />
				  <br />
				  <label className="newlabelStyle">Successful Launch</label>
				  <br />
				  <button onClick={this.launchOptionSelectedTrue} className="btn btn-sm btn-success" value="True">True</button>
				  <button onClick={this.launchOptionSelectedFalse.bind(this)} className="btn btn-sm btn-success" value="false">False</button>
				<br />
				<br />
				  <label className="newlabelStyle">Successful Landing</label>
				  <br />
				  <button onClick={this.landOptionSelectedTrue} className="btn btn-sm btn-success" value="True">True</button>
				  <button onClick={this.landOptionSelectedFalse.bind(this)} className="btn btn-sm btn-success" value="false">False</button>
				<br />
              	<br />
				  <button onClick={this.clearSelectedFilter.bind(this)} className="btn btn-sm btn-clear">Clear Filter</button>
              </div>
              <div className="col-sm-10" id="myDiv">
                
						<div className="books">
							{this.state.spacexData &&
								this.state.spacexData.map((spaceX, index) => {
									const launchSuccess = String(spaceX.launch_success)
									const missionIdList = spaceX.mission_id
									const landingSuccess = String(spaceX.rocket.first_stage.cores[0].land_success)
									//const authors = book.authors.join(', ');

									return (
									<div className="book" key={index}>
										<img src={spaceX.links.mission_patch_small} alt="" className="imgStyle"></img>
										<h3>{spaceX.mission_name} # {spaceX.flight_number}</h3>

										<div className="details">
											{/* <p>👨: {authors}</p> */}
											<h4>Mission Ids: 
											{missionIdList && Object.entries(missionIdList).map(([key, value]) => {
												return (
													<Fragment>
													<ul>
														<li className="linkColor">{value}</li>
													</ul>
													</Fragment>)
												})
											}
											</h4>
											<h4>launch Year: <span className="linkColor">{spaceX.launch_year}</span></h4>
											<h4>Successful Launch: <span className="linkColor">{launchSuccess}</span></h4>
											<h4>Successful Landing: 
												<span className="linkColor">
												{landingSuccess ==="null" ? "false" : landingSuccess ==="true" ? "true" : landingSuccess ==="false" ? "false":""}
												</span>
												</h4>
											
										
											
										</div>
									</div>
									);
								})}
							</div>
                 
                <br />
                <br />
                <div className="row">
                  <div className="col-sm-12">
                    <h4 className="text-center">Developed by: Mamata Nanyapurad</h4>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
				</div>
        </div>
         </span> :
         <div className="container-fluid">
         <div className="row">
             <div className="col-sm-12 text-center">
                 <h4 className="loadMsg text-center">Loading...</h4>
             </div>
         </div>
         </div>
     }
      </Fragment>
    );
  }
}
