import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule,AuthModule],
  controllers: [PersonalController],
  providers: [PersonalService],
})
export class PersonalModule {}
