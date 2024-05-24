import { PartialType } from '@nestjs/swagger';
import { CreateActivityReservationDto } from './create-activity-reservation.dto';

export class UpdateActivityReservationDto extends PartialType(CreateActivityReservationDto) {}
