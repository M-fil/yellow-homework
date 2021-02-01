import * as AuthService from '../auth'

const MOCKED_TOKEN = '123';

describe('Token functions', () => {
  it('should return value from local storage', () => {
    expect(AuthService.getSavedToken()).toBe('');
    AuthService.setTokenLocally(MOCKED_TOKEN);
    expect(AuthService.getSavedToken()).toBe(MOCKED_TOKEN);
  });

  it('should remove value', () => {
    AuthService.setTokenLocally(MOCKED_TOKEN);
    expect(AuthService.getSavedToken()).toBe(MOCKED_TOKEN);
    AuthService.removeToken();
    expect(AuthService.getSavedToken()).toBe('');
  });

  it('should set value', () => {
    AuthService.setTokenLocally(MOCKED_TOKEN);
    expect(AuthService.getSavedToken()).toBe(MOCKED_TOKEN);
  });
});

describe('loginUser', () => {
  it('should not broke if called without parameters', async () => {
    const data = await AuthService.loginUser();
    expect(data).toBeTruthy();
    expect(data).toHaveProperty('token');
  });

  it('should through error if passed incorrect uuid', async () => {
    const data = await AuthService.loginUser('123');
    expect(data).toBeTruthy();
    expect(data).toHaveProperty('error');
  })
});
