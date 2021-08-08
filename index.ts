import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';
import { addPlugin } from 'react-native-flipper';

export const RecoilFlipperClient = () => {
	const snapshot = useRecoilSnapshot();

	useEffect(() => {
		addPlugin({
			getId() {
				return 'recoil-state';
			},
			onConnect(connection) {
				console.log({ connection });
				// Incoming data from desktop client
				connection.receive('getData', (data, responder) => {
					console.log('Incoming data', data);
					// Respond with some data
					responder.success({
						ack: true,
					});
				});
				// Outgoing data to be sent to the desktop client
				connection.send('newRow', { message: 'Hello' });
			},
			onDisconnect() {
				console.log('disconnected');
			},
			runInBackground() {
				return false;
			},
		});
	}, []);

	useEffect(() => {
		console.debug('The following atoms were modified:');
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			console.debug(node.key, snapshot.getLoadable(node));
		}
	}, [snapshot]);

	// Return null because we don't want to render any UI; this is a state-listening component only
	return null;
};
