import './SyozokInput.scss';
import React from 'react';
import classnames from 'classnames';
export default class SyozokInput extends React.Component
{
	render()
	{
		const { value } = this.props;
		return (
			<div className="syozok-input control has-icons-left has-icons-right"
			>
				<input type="text" 
					ref={ref => this.input = ref}
					className={classnames('input is-small')}
					value={value}
					onChange={this.onChange}
				/>
				<span
					ref={ref => this.homeIcon = ref} 
					className="icon is-left linked"
				>
					<i className="fas fa-home"></i>
				</span>
				<span 
					ref={ref => this.barsIcon = ref}
					className="icon is-right linked"
					onClick={this.barsIconClick}
				>
					<i className="fas fa-bars"></i>
				</span>
			</div>
		);
	}
	onChange = e =>
	{
		this.props.onChange(e.target.value);
	}
};