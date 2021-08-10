import { useEffect, useState } from 'react';
import { useRecoilSnapshot } from 'recoil';
import { addPlugin, Flipper } from 'react-native-flipper';

const API_VERSION = 1;

export const RecoilFlipperClient = () => {
	const snapshot = useRecoilSnapshot();
	const [connectionReference, setConnectionReference] =
		useState<Flipper.FlipperConnection | null>(null);

	useEffect(() => {
		addPlugin({
			getId() {
				return 'recoil-state';
			},
			onConnect(connection) {
				console.debug('Flipper: connected');
				setConnectionReference(connection);

				connection.send('apiVersion', { apiVersion: API_VERSION });
			},
			onDisconnect() {
				console.debug('Flipper: disconnected');
			},
			runInBackground() {
				return false;
			},
		});
	}, []);

	useEffect(() => {
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			// TODO: review typing for Flipper.FlipperConnection because it does have a connected property
			(connectionReference as any)?.connected &&
				connectionReference?.send('newRow', {
					key: node.key,
					payload: snapshot.getLoadable(node),
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snapshot]);

	// Return null because we don't want to render any UI; this is a state-listening component only
	return null;
};
