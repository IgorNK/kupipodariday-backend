import { UserNotFoundExceptionFilter } from './user-not-found.filter';

describe('UserNotFoundExceptionFilter', () => {
  it('should be defined', () => {
    expect(new UserNotFoundExceptionFilter()).toBeDefined();
  });
});
