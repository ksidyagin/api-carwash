import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpoloyeeDataController } from './controller/empoloyee-data/empoloyee-data.controller';
import { EmployeeDataEntity } from './models/employee-data.entity';
import { EmployeeDataService } from './service/employee-data.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeDataEntity])
   
],
  controllers:[EmpoloyeeDataController],
  exports:[EmployeeDataService, TypeOrmModule],
  providers: [EmployeeDataService]
})
export class EmployeeDataModule {}
