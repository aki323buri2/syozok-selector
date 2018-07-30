import './SyozokSelector.scss';
import React from 'react';
import classnames from 'classnames';
export default class SyozokSelector extends React.Component
{
	static defaultProps = {
		syozok: null, 
		onChange: syozok => {}, 
	};
	render()
	{
		const { syozok, buka } = this.props;
		const value = syozok || '';
		const options = buka.map(({ syozok, bukm }) =>
		{
			return ({ value: syozok, label: bukm });
		});
		return (
			<div className="syozok-selector">
				<Input
					value={value}
					onChange={this.inputChange}
					ref={ref => this.input = ref}
				/>

				<Options
					options={options}
					ref={ref => this.options = ref}
				/>

			</div>
		);
	}
	inputChange = value =>
	{
		this.props.onChange(value);
	}
};
class Input extends React.Component
{
	render()
	{
		const { value } = this.props;
		return (
			<p className="control has-icons-left has-icons-right"
				ref={ref => this.dom = ref}
			>
				<input type="text" 
					className={classnames('input is-small')}
					value={value}
					onChange={this.onChange}
				/>
				<span className="icon is-left linked">
					<i className="fas fa-home"></i>
				</span>
				<span className="icon is-right linked">
					<i className="fas fa-bars"></i>
				</span>
			</p>
		);
	}
	onChange = e =>
	{
		this.props.onChange(e.target.value * 1);
	}
};
class Options extends React.Component
{
	render()
	{
		const { options } = this.props;
		return (
			<div className="options"
				ref={ref => this.dom = ref}
			>
			{options.map(({ value, label }, i) =>
				<div key={i} className="option">
					<span className="value">{value}</span>
					<span className="label">{label}</span>
				</div>
			)}
			</div>
		)
	}
	getOptions() 
	{
		return this.props.options;
	}
};