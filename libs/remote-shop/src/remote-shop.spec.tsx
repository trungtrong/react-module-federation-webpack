import { render } from '@testing-library/react';

import RemoteShop from './remote-shop';

describe('RemoteShop', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<RemoteShop />);
        expect(baseElement).toBeTruthy();
    });
});
