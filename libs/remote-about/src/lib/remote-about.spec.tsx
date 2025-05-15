import { render } from '@testing-library/react';

import RemoteAbout from './remote-about';

describe('RemoteAbout', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<RemoteAbout />);
        expect(baseElement).toBeTruthy();
    });
});
