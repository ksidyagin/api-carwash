import { ApiProperty } from "@nestjs/swagger";

export class EmployeeData {

    @ApiProperty({required: false})
    id?: number;
   
    @ApiProperty()
    worker_id?: number;

    @ApiProperty()
    salary: number;

    @ApiProperty()
    bet: string;

   
}