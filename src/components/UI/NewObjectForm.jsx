import React,{ Component } from 'react'

class NewObjectForm extends Component{
constructor(props){
	super(props)
	this.state = { street:'', house:'', section:null, floor:'', apartment:'', latitude:'', longitude:''}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
}

// Form submitting logic, prevent default page refresh
handleSubmit(event){
	const { street, house, section, floor, apartment, latitude, longitude} = this.state
	event.preventDefault()
	
    //EXECUTION
}

// Method causes to store all the values of the
// input field in react state single method handle
// input changes of all the input field using ES6
// javascript feature computed property names
handleChange(event){
	this.setState({
	// Computed property names
	// keys of the objects are computed dynamically
	[event.target.name] : event.target.value
	})
}

// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
render(){
	return(
	<form class="newobjectform" onSubmit={this.handleSubmit}>
		<div>
		<label htmlFor='street'>Вулиця</label>
		<input
			name='street'
			placeholder='Вкажіть назву вулиці'
			value = {this.state.street}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='house'>Будинок</label>
		<input
			name='house'
			placeholder='Вкажіть номер будинку'
			value={this.state.house}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='section'>Під'їзд</label>
		<input
			name='section'
			placeholder="Вкажіть номер під'їзду (може бути порожнім)"
			value={this.state.section}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='floor'>Поверх</label>
		<input
			name='floor'
			placeholder='Вкажіть поверх (може бути порожнім)'
			value={this.state.floor}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='apartment'>Квартира</label>
		<input
			name='apartment'
			placeholder='Вкажіть номер квартири (може бути порожнім)'
			value={this.state.apartment}
			onChange={this.handleChange}
		/>
		</div>
        <div>
		<label htmlFor='latitude'>Широта</label>
		<input
			name='latitude'
			placeholder='Вкажіть широту'
			value={this.state.latitude}
			onChange={this.handleChange}
		/>
		</div>
        <div>
		<label htmlFor='longitude'>Довгота</label>
		<input
			name='longitude'
			placeholder='Вкажіть довготу'
			value={this.state.longitude}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<button>Create Account</button>
		</div>
	</form>
	)
}
}

export default NewObjectForm
