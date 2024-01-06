import { render, screen, fireEvent, act } from '@testing-library/react'
import LoginForm from "../components/LoginForm";
import RegisterUserForm from "../components/RegisterUserForm";
import { AuthProvider, useAuth as mockUseAuth } from "../components/AuthProvider";
import '@testing-library/jest-dom/jest-globals';

jest.mock("next/navigation", () => ({
  useRouter() {
      return {
          prefetch: () => null
      };
  }
}));

jest.mock('../components/AuthProvider', () => ({
  ...jest.requireActual('../components/AuthProvider'),
  useAuth: jest.fn(),
}));

describe('RegisterUserForm', () => {
  it('Renders the user registration form', () => {
      mockUseAuth.mockReturnValue({
      });

      render(
          <AuthProvider>
              <RegisterUserForm />
          </AuthProvider>
      );


      expect(screen.getByTestId("register-user-form")).toBeInTheDocument();
      expect(screen.getByTestId("username-input")).toBeInTheDocument();
      expect(screen.getByTestId("email-input")).toBeInTheDocument();
      expect(screen.getByTestId("password-input")).toBeInTheDocument();
      expect(screen.getByTestId('register-user-button')).toHaveTextContent('Register');
  });

  it('Testing email, username and password input', async () => {
      render(
          <AuthProvider>
              <RegisterUserForm />
          </AuthProvider>
      );


      await act(async () => {
          fireEvent.change(screen.getByTestId("username-input"), { target: { value: 'tester' } });
          fireEvent.change(screen.getByTestId("email-input"), { target: { value: 'tester@gmail.com' } });
          fireEvent.change(screen.getByTestId("password-input"), { target: { value: 'tester123' } });
      });

      expect(screen.getByTestId("username-input")).toHaveValue('tester');
      expect(screen.getByTestId("email-input")).toHaveValue('tester@gmail.com');
      expect(screen.getByTestId("password-input")).toHaveValue('tester123');
  });

  it('Displays error border on invalid input', async () => {
      render(
          <AuthProvider>
              <RegisterUserForm />
          </AuthProvider>
      );

      await act(async () => {
          fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'invalid-email' } });
          fireEvent.change(screen.getByTestId('password-input'), { target: { value: '' } });
          fireEvent.click(screen.getByTestId('login-button'));
      });
      expect(screen.getByTestId('username-input')).toHaveClass('border border-red-500 transition-all duration-500');
      expect(screen.getByTestId('password-input')).toHaveClass('border border-red-500 transition-all duration-500');
  });

});