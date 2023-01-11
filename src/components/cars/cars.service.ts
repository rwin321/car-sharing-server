import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Car } from './entities/car';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCarInput } from './dto/new-car.input';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  public async getCars(): Promise<Car[]> {
    return await this.carRepository.find({}).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async addCar(newCarData: NewCarInput): Promise<Car> {
    const newCar = this.carRepository.create(newCarData);
    await this.carRepository.save(newCar).catch((err) => {
      new InternalServerErrorException(err);
    });

    return newCar;
  }
}
