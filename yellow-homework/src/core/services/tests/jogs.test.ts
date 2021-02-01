import * as JogService from '../jogs';

const CORRECT_TOKEN = 'a7943196e3bf913e4a50a3d82b2a82d4715eef50785ae6309632f1a902c1d71f';
const INCORRECT_TOKEN = '123';
const MOCK_JOG = {
  date: '12/01/2020',
  distance: 5,
  time: 5,
};
const NUMBER_OF_MILLISECONDS_IN_SECOND = 1000;

describe('createNewJog', () => {
  it('should create a jog and return it', async () => {
    const data = await JogService.createNewJog(CORRECT_TOKEN, MOCK_JOG);
    expect(data).toBeTruthy();
    expect(data).toHaveProperty('jog');
    expect(data.jog).toHaveProperty('date');
    expect(data.jog).toHaveProperty('distance', MOCK_JOG.distance);
    expect(data.jog).toHaveProperty('time', MOCK_JOG.time);
    expect(data.jog).toHaveProperty('id');
    expect(data.jog).toHaveProperty('user_id');
  });

  it('should through an error if the incorrect token was passed', async () => {
    const data = await JogService.createNewJog(INCORRECT_TOKEN, MOCK_JOG);
    expect(data).toBeTruthy();
    expect(data).toHaveProperty('error');
  });
});
