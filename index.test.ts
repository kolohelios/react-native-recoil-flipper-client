import { stub } from './index';

test('returns expected string', () => {
	expect(stub()).toBe('Hello, world');
});
