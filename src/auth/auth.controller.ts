import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExistsExceptionFilter } from './filters/user-exists.filter';

@SkipThrottle()
@UseFilters(UserExistsExceptionFilter)
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Post('signin')
  async signin() {
    
  }
}
