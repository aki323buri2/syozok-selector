import './SyozokOptions.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class SyozokOptions extends React.Component
{
	static defaultProps = {
		buka: [], 
		onSelected: (syozok, index) => {}, 
	};
	state = {
		active: false, 
		selected: -1, 
	};
	render()
	{
		const { buka } = this.props;
		const { active, selected } = this.state;
		const display = buka.map((buka, i) => 
		{
			buka.selected = selected === i;
			return buka;
		});
		return (
			<div 
				ref={e => this.options = e}
				className={classnames('syozok-options', { active })}
			>
			{display.map(({ syozok, bukm, selected }, i) =>
				<div key={i} 
					className={classnames('syozok-option', {
						selected, 
					})}
					onClick={e => this.optionClick(i)}
				>
					<span className="syozok">{syozok}</span>
					{' '}-{' '}
					<span className="bukm">{bukm}</span>
				</div>
			)}
			</div>
		);
	}
	componentDidMount()
	{
		document.on('mousedown', this.mousedown);
	}
	componentWillUnmount()
	{
		document.off('mousedown', this.mousedown);
	}
	mousedown = e =>
	{
		const { clientX: x, clientY: y } = e.touches ? e.touches[0] : e;
		if (this.options.hittest(x, y)) return;
		setTimeout(() =>
		{
			this.hide();
		});
	}
	optionClick = index =>
	{
		this.setSelected(index, () =>
		{
			this.props.onSelected(this.getSyozok(), index);
			setTimeout(() => 
			{
				this.hide();
			}, 200);
		});
	}
	show()
	{
		this.setState({ active: true });
	}
	hide()
	{
		this.setState({ active: false });
	}
	setSelected(selected, callback)
	{
		this.setState({ selected }, callback);
	}
	setSyozok(syozok)
	{
		const { buka } = this.props;
		const index = buka.findIndex(b => b.syozok === syozok);
		this.setState({ selected: index });
	}
	getSelected()
	{
		return this.state.selected;
	}
	getSyozok()
	{
		const { buka } = this.props;
		return (buka[this.getSelected()] || {}).syozok || null;
	}
};
