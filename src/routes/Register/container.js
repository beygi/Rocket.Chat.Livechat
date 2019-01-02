import { Component } from 'preact';
import SDK from '../../api';
import { loadConfig } from '../../lib/main';
import { Consumer } from '../../store';
import Register from './component';


export class RegisterContainer extends Component {
	handleSubmit = async(fields) => {
		const { dispatch, token } = this.props;

		await dispatch({ loading: true });
		try {
			await SDK.grantVisitor({ visitor: { ...fields, token } });
			await loadConfig();
		} finally {
			await dispatch({ loading: false });
		}
	}

	getDepartmentDefault() {
		const { guestDepartment, departments } = this.props;
		if (departments && departments.some((dept) => dept._id === guestDepartment)) {
			return guestDepartment;
		}
	}

	render = (props) => (
		<Register {...props} onSubmit={this.handleSubmit} departmentDefault={this.getDepartmentDefault()} />
	)
}


export const RegisterConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			config: {
				departments = {},
				message: {
					registrationFormMessage: message,
				} = {},
				settings: {
					nameFieldRegistrationForm: hasNameField,
					emailFieldRegistrationForm: hasEmailField,
					allowSwitchingDepartments: hasDepartmentField,
				} = {},
				theme: {
					title,
					color,
				} = {},
			} = {},
			iframe: {
				guest: {
					department: guestDepartment
				} = {},
				theme: {
					customColor,
					customFontColor,
				} = {},
			} = {},
			loading = false,
			token,
			dispatch,
		}) => (
			<RegisterContainer
				ref={ref}
				{...props}
				title={title || I18n.t('Need help?')}
				color={customColor || color}
				fontColor={customFontColor}
				message={message || I18n.t('Please, tell us some informations to start the chat')}
				hasNameField={hasNameField}
				hasEmailField={hasEmailField}
				hasDepartmentField={hasDepartmentField}
				departments={departments}
				guestDepartment={guestDepartment}
				loading={loading}
				token={token}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default RegisterConnector;
