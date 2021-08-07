import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

export const RecoilFlipperClient = () => {
	const snapshot = useRecoilSnapshot();

	useEffect(() => {
		console.debug('The following atoms were modified:');
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			console.debug(node.key, snapshot.getLoadable(node));
		}
	}, [snapshot]);

	// Return null because we don't want to render any UI; this is a state-listening component only
	return null;
};
