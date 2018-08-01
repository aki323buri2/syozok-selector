import './Options.scss';
import React from 'react';
import classnames from 'classnames';
export default class Options extends React.Component
{
	static defaultProps = {
		options: [], 
		active: false, 
		selected: -1, 
		onActivate: option => {}, 
		onSelected: (index, option, method) => {}, 
	};
	render()
	{
		const { options, active, selected } = this.props;
		console.log(selected);
		return (
			<div 
				className={classnames('options', {
					active, 
				})}
				ref={ref => this.dom = ref}
			>
			{options.map(({ value, label }, i) =>
				<div key={i}
					className={classnames('option', {
						selected: i === selected, 
					})}
					onClick={e => this.select(i, 'click')}
				>
					<span className="value">{value}</span>
					<span className="label">{label}</span>
				</div>
			)}
			</div>
		)
	}
	componentDidMount()
	{
		this.dom.on('mousewheel', this.mousewheel);
	}
	componentWillUnmount()
	{
		this.dom.off('mousewheel', this.mousewheel);
	}
	getOptions() 
	{
		return this.props.options;
	}
	keydown = e =>
	{
		const key = keycodes(e.keyCode);
		const cancel = e => 
		{
			e.preventDefault();
			e.stopPropagation();
		};
		switch (key)
		{
		case 'up': 
		case 'down': 
			cancel(e);
			this.updown(key);
			break;
		default: return;
		}
	}
	updown(key)
	{
		const { options } = this.props;
		let { selected, selected: old } = this.state;
		switch (key)
		{
		case 'down': 
			selected++;
			break;
		case 'up':
			selected--; 
			break;
		}
		if (selected === old) return;
		if (selected > options.length - 1) selected = 0;
		if (selected < 0) selected = options.length - 1;
		this.select(selected, 'updown');
	}
	select(selected, method)
	{
		this.setState({ selected }, () =>
		{
			this.props.onSelected(selected, this.getSelectedOption(), method);
		});
	}
	getSelectedIndex()
	{
		return this.state.selected;
	}
	getSelectedOption()
	{
		const { options } = this.props;
		const { selected } = this.state;
		return options[selected];
	}
	mousewheel = e =>
	{
		this.updown((e.deltaY < 0) ? 'up' : 'down');
	}
};