import { Player } from './player';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player(1, 'user', 'name', 'coach', 1, Buffer.alloc(0))).toBeTruthy();
  });
});
