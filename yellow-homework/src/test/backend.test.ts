const TEST_URL = 'https://jogtracker.herokuapp.com/api/v1/test/echo';
const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
const CORRECT_TOKEN = '8e1b08d1742e9a659a43751bcc4bfd94432430f21284b6ffffccf0298577810f';

const getData = async (method: string, token: string) => {
  try {
    const response = await fetch(TEST_URL, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error_message);
    }

    return 'success';
  } catch (error) {
    return error.message;
  }
}

describe('swagger test', () => {
  it('should succeed if token was passed', async () => {
    const data = await Promise.all(METHODS.map((method) => getData(method, CORRECT_TOKEN)));
    expect(data).toBeTruthy();
    expect(data).toStrictEqual(Array(METHODS.length).fill('success'))
  });

  it('should succeed without token', async () => {
    const data = await Promise.all(METHODS.map((method) => getData(method, '')));
    expect(data).toBeTruthy();
    expect(data).toStrictEqual(Array(METHODS.length).fill('success'))
  });
});
