import { UserExistsExceptionFilter } from './user-exists.filter';

describe('UserExistsExceptionFilter', () => {
  it('should be defined', () => {
    expect(new UserExistsExceptionFilter()).toBeDefined();
  });
});
