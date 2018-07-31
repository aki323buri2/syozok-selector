import './SyozokSelector.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class SyozokSelector extends React.Component
{
	static defaultProps = {
		syozok: null, 
		onChange: syozok => {}, 
	};
	state = {
		optionsActive: false, 
	};
	render()
	{
		const { syozok, buka } = this.props;
		const { optionsActive } = this.state;
		const bukm = (buka.find(buka => buka.syozok === syozok*1)||{}).bukm||'';
		const value = !syozok ? '' : `${syozok} - ${bukm}`;
		const options = buka.map(({ syozok, bukm }) =>
		{
			return ({ value: syozok, label: bukm });
		});

		return (
			<div className="syozok-selector">
				<Input
					ref={ref => this.input = ref}
					value={value}
					onChange={this.inputChange}
				/>

				<div className={classnames('overlay', { active: optionsActive })}
					onClick={this.overlayClick}
				></div>

				<Options
					ref={ref => this.options = ref}
					options={options}
					onSelected={this.optionsSelected}
					active={optionsActive}
				/>

			</div>
		);
	}
	inputChange = value =>
	{
		const check = /^\d{1,3}/;
		const match = value.match(check);
		const syozok = match ? match[0] * 1 : null;
		if (syozok !== this.props.syozok)
		{
			this.props.onChange(syozok);
		}
		const input = this.input.input;
		const { selectionStart: a, selectionEnd: b } = input;
		setTimeout(() =>
		{
			input.setSelectionRange(a, b);
		});
	}
	componentDidMount()
	{
		this.input.input.on('keydown', this.keydown);
		this.input.input.on('mousewheel', this.mousewheel);
		this.input.barsIcon.on('click', this.barsIconClick);
	}
	componentWillUnmount()
	{
		this.input.input.off('keydown', this.keydown);
		this.input.input.off('mousewheel', this.mousewheel);
		this.input.barsIcon.off('click', this.barsIconClick);
	}
	keydown = e =>
	{
		this.options.keydown(e);
	}
	optionsSelected = (option, method) =>
	{
		if (!option) return;
		const { value, label } = option;
		const text = `${value} - ${label}`
		this.inputChange(text);

		// 文字列選択カーソル位置の復帰
		setTimeout(() =>
		{
			const input = this.input.input;
			input.setSelectionRange(0, 3);
			input.focus();
		});

		if (method === 'click')
		{
			this.hideOptions();
		}
	}
	mousewheel = e =>
	{
		this.options.mousewheel(e);
	}
	barsIconClick = e =>
	{
		this.showOptions();
	}
	overlayClick = e =>
	{
		this.hideOptions();
	}
	showOptions()
	{
		this.setState({ optionsActive: true });
	}
	hideOptions()
	{
		this.setState({ optionsActive: false });
	}
};
class Input extends React.Component
{
	render()
	{
		const { value } = this.props;
		return (
			<p className="control has-icons-left has-icons-right"
			>
				<input type="text" 
					ref={ref => this.input = ref}
					className={classnames('input is-small')}
					value={value}
					onChange={this.onChange}
				/>
				<span className="icon is-left linked">
					<i className="fas fa-home"></i>
				</span>
				<span 
					ref={ref => this.barsIcon = ref}
					className="icon is-right linked"
					onClick={this.barsIconClick}
				>
					<i className="fas fa-bars"></i>
				</span>
			</p>
		);
	}
	onChange = e =>
	{
		this.props.onChange(e.target.value);
	}
};
class Options extends React.Component
{
	static defaultProps = {
		options: [], 
		active: false, 
		onActivate: option => {}, 
		onSelected: (option, method) => {}, 
	};
	state = {
		selected: -1, 
	};
	render()
	{
		const { options, active } = this.props;
		const { selected } = this.state;
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
		this.select(selected);
	}
	select(selected, method)
	{
		this.setState({ selected }, () =>
		{
			this.props.onSelected(this.getSelectedOption(), method);
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