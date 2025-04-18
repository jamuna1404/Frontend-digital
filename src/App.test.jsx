import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routing', () => {
  test('renders StaffLogin component on initial load ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Change this to match text from your actual StaffLogin component
    const loginText = screen.getByText(/staff login/i); 
    expect(loginText).toBeInTheDocument();
  });

  test('renders VisionMission component when navigated to "components/dashboard/VisionMission"', () => {
    render(
      <MemoryRouter initialEntries={['components/dashboard/VisionMission']}>
        <App />
      </MemoryRouter>
    );

    // Replace this with actual visible text in your VisionMission component
    const visionText = screen.getByText(/vision/i); 
    expect(visionText).toBeInTheDocument();
  });
});
