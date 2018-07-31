import './SyozokSelector.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';
import SyozokInput from './SyozokInput';
import Options from './Options';
export default class SyozokSelector extends React.Component
{
	static defaultProps = {
		buka: [], 
		syozok: null, 
		onChange: syozok => {}, 
	};
	state = {
		optionsActive: false, 
	};
	render()
	{
		const { buka, syozok } = this.props;
		const { optionsActive } = this.state;
		const bukm = (buka.find(buka => buka.syozok === syozok*1)||{}).bukm||'';
		const value = !syozok ? '' : `${syozok} - ${bukm}`;
		const options = buka.map(({ syozok, bukm }) =>
		{
			return ({ value: syozok, label: bukm });
		});

		return (
			<div className="syozok-selector">
				<SyozokInput
					ref={ref => this.syozokInput = ref}
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
		const input = this.syozokInput.input;
		let { selectionStart: a, selectionEnd: b } = input;
		setTimeout(() =>
		{
			input.setSelectionRange(a, b);
		});
	}
	componentDidMount()
	{
		this.syozokInput.input.on('keydown', this.keydown);
		this.syozokInput.input.on('mousewheel', this.mousewheel);
		this.syozokInput.homeIcon.on('click', this.homeIconClick);
	}
	componentWillUnmount()
	{
		this.syozokInput.input.off('keydown', this.keydown);
		this.syozokInput.input.off('mousewheel', this.mousewheel);
		this.syozokInput.homeIcon.off('click', this.homeIconClick);
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
			const input = this.syozokInput.input;
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
	homeIconClick = e =>
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

