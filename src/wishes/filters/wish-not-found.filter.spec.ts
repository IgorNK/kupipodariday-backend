import { WishNotFoundExceptionFilter } from './wish-not-found.filter';

describe('WishNotFoundFilter', () => {
  it('should be defined', () => {
    expect(new WishNotFoundExceptionFilter()).toBeDefined();
  });
});
