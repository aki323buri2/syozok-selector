import './SyozokSelector.scss';
import React from 'react';
import SyozokOptions from './SyozokOptions';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
export default class SyozokSelector extends React.Component
{
	static defaultProps = {
		syozok: '', 
		buka: [], 
		onChange: syozok => {}, 
		fetchBukaPending: false, 
		fetchBukaError: false, 
	};
	render()
	{
		const { syozok, buka } = this.props;
		const { fetchBukaPending, fetchBukaError } = this.props;
		const { bukm } = buka.find(b => b.syozok === syozok)||{};

		return (
			<div className="syozok-selector">

				<div className="control has-icons-left has-icons-right">
					<div type="text" 
						ref={e => this.bukmInput = e} 
						className="input base-input is-small"
						onClick={this.bukmInputClick}
					>
						<input type="text" 
							ref={e => this.syozokInput = e}
							className="syozok-input"
							value={syozok ? syozok : ''}
							onChange={this.onChange}
						/>
						<span className="bukm">
							{' '}-{' '}{bukm}
						</span>
					</div>
					<span ref={e => this.home = e} className="icon is-left">
						<i className="fas fa-home"></i>
					</span>
					<span ref={e => this.bars = e} className="icon is-right">
						<i className="fas fa-bars"></i>
					</span>
				</div>
				
				<Pending pending={fetchBukaPending}/>

				<ErrorMessage error={fetchBukaError}/>

				<SyozokOptions ref={e => this.options = e}
					buka={buka}
					onSelected={this.syozokOptionsSelected}
				/>				

			</div>
		);
	}
	bukmInputClick = e =>
	{
		this.syozokInput.select();
		this.syozokInput.focus();
	}
	onChange = e =>
	{
		const value = e.target.value.trim();
		this.syozokInputChange(value);
	}
	syozokInputChange(value)
	{
		let syozok;
		if (value === '') 
		{
			syozok = null;
		}
		else if (value.match(/^\d{1,3}$/))
		{
			syozok = value * 1;
		}
		else 
		{
			return;
		}
		this.props.onChange(syozok);
	}
	componentDidMount()
	{
		this.bars.on('mouseover', this.barsMouseOver);
	}
	barsMouseOver = e =>
	{
		setTimeout(() =>
		{
			this.options.show();
			this.options.setSyozok(this.props.syozok);
		}, 200);
	}
	syozokOptionsSelected = (syozok, index) =>
	{
		this.syozokInputChange(syozok + '');
	}
};
const transition = propsToActive => Component => class extends React.Component
{
	render()
	{
		const props = this.props;
		const { children } = props;
		const active = propsToActive(props);
		const timeout = 500;
		const classNames = 'transition';
		return (
			<CSSTransition 
				in={active}
				timeout={timeout}
				classNames={classNames} 
				unmountOnExit
			>
			{state => (
				
				<Component {...props}/>
				
			)}
			</CSSTransition>
		); 
	};
}
@transition(props => props.pending)
class Pending extends React.Component
{
	render()
	{
		const { pending } = this.props;
		return (
			<div className="pending">
				<span className="icon">
					<i className="fas fa-circle-notch fa-spin"></i>
				</span>
					所属一覧取得中...
			</div>
		);
	}
};
@transition(props => props.error !== null)
class ErrorMessage extends React.Component
{
	render()
	{
		const { error } = this.props;
		const messages = (err =>
		{
			const ss = [];
			if (!err) return ss;
			ss.push(err.message);
			ss.push(err.sagaStack)
			return ss.join('\n').split('\n');
		})(error);
		return (
			<div className="error-message message is-small is-danger">
				<div className="message-body">
				{messages.map((message, i) =>
					<div key={i} className="message-line">{message}</div>
				)}
				</div>
			</div>
		);
	}	
};

