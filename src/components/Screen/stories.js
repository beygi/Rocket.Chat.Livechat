import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, boolean, color, text, object, array } from '@storybook/addon-knobs';
import { Screen } from '.';


const screenCentered = (storyFn) => centered(() => (
	<div style={{ display: 'flex', width: '365px', background: 'white' }}>
		{storyFn()}
	</div>
));

const alerts = [
	{ id: 1, children: 'Success alert', success: true },
	{ id: 2, children: 'Warning alert', warning: true, timeout: 0 },
	{ id: 3, children: 'Error alert', error: true, timeout: 1000 },
	{ id: 4, children: 'Custom colored alert', color: '#000', timeout: 5000 },
];

storiesOf('Components|Screen', module)
	.addDecorator(withKnobs)
	.addDecorator(screenCentered)
	.add('simple', () => (
		<Screen
			color={color('color', '#175CC4')}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			{text('content', 'Content')}
		</Screen>
	))
	.add('with agent', () => (
		<Screen
			color={color('color', '#175CC4')}
			agent={object('agent', {
				name: 'Guilherme Gazzo',
				status: 'away',
				email: 'guilherme.gazzo@rocket.chat',
				avatar: {
					description: 'guilherme.gazzo',
					src: '//gravatar.com/avatar/7ba3fcdd590033117b1e6587e0d20478?s=32',
				},
			})}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
		>
			{text('content', 'Content')}
		</Screen>
	))
	.add('with multiple alerts', () => (
		<Screen
			color={color('color', '#175CC4')}
			title={text('title', 'Title')}
			notificationsEnabled={boolean('notificationsEnabled', true)}
			minimized={boolean('minimized', false)}
			windowed={boolean('windowed', false)}
			alerts={array('alerts', alerts)}
			onEnableNotifications={action('enableNotifications')}
			onDisableNotifications={action('disableNotifications')}
			onMinimize={action('minimize')}
			onRestore={action('restore')}
			onOpenWindow={action('openWindow')}
			onDismissAlert={action('dismiss alert')}
		>
			{text('content', 'Content')}
		</Screen>
	))
;
