import { Team } from './team';

describe('Team', () => {
  it('should create an instance', () => {
    expect(new Team(1, 'Team1', 'LCS', 'USA', Buffer.alloc(0))).toBeTruthy();
  });
});
