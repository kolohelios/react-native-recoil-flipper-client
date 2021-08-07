/*
    This test suite exists to make sure that the Recoil interfaces (hooks) that we rely on actually exist;
    this smoke testing should get more sophisticated with time to maintain compatibility
*/

import React, { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

const TestComponent = () => {
	const snapshot = useRecoilSnapshot();
	useEffect(() => {
		console.debug('The following atoms were modified:');
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			console.debug(node.key, snapshot.getLoadable(node));
		}
	}, [snapshot]);

	return null;
};

describe('Verifies that the Recoil useRecoilSnapshot exists and performs as expected', () => {
	test('That basic useRecoilSnapshot functionality works', () => {
		expect(<TestComponent />).toBeDefined();
	});
});
