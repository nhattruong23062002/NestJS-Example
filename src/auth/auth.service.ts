import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Customer } from 'src/schemas/customer.schema';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer.name)
    private userModel: Model<Customer>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateCustomerDto): Promise<Customer> {
    const { password, ...otherFields } = signUpDto;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await this.userModel.create({
      ...otherFields,
      password: hashedPassword,
    });
  
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}