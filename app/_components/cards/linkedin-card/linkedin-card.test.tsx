import { render, screen } from '@testing-library/react';
import { LinkedinCard } from './linkedin-card';

const props = {
  href: 'https://www.not-real.com',
  label: 'label',
  subLabel: 'subLabel',
  icon: <div></div>,
};

describe('<LinkedinCard />', () => {
  it('Should render with no errors', () => {
    render(<LinkedinCard {...props} />);
    const anchor = screen.getByRole('link');
    const heading2 = screen.getByRole('heading', { level: 2 });
    const heading3 = screen.getByRole('heading', { level: 3 });
    expect(anchor).toHaveAttribute('href', props.href);
    expect(heading2).toHaveTextContent(props.label);
    expect(heading3).toHaveTextContent(props.subLabel);
  });
});
