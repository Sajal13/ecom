import { IsEnum, IsOptional } from 'class-validator';

import { Role } from 'src/common/types/enum/Role.enum';

import { CreateUserDto } from './create-user.dto';

export class CreateAdminDto extends CreateUserDto {
  @IsOptional()
  @IsEnum(Role, {
    message: 'Role must be one of user, admin, superadmin'
  })
  role?: Role;
}
