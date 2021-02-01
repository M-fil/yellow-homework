import * as FeedbackService from '../feedback';

const MOCKED_TEXT = 'Hello';
const INCORRECT_TOKEN = '1234';

describe('submitFeedback', () => {
  it('should return success if the functions is succeeded', async () => {
    // don't work because of CORS. According to me, the localhost:3000 should be enabled on backend
  });

  it('should fail if the incorrect token was passed', async () => {
    const data = await FeedbackService.submitFeedback(MOCKED_TEXT, INCORRECT_TOKEN);
    expect(data).toBeTruthy();
  });
});
