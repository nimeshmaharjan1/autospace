import {
  Field,
  InputType,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { AuthProviderType } from '@prisma/client';
import { User } from '../entity/user.entity';

registerEnumType(AuthProviderType, {
  name: 'AuthProviderType',
});

@InputType()
export class RegisterWithProviderInput extends PickType(
  User,
  ['uid', 'name', 'image'],
  InputType,
) {
  @Field(() => AuthProviderType)
  type: AuthProviderType;
}

@InputType()
export class RegisterWithCredentialsInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  image?: string;
}

@InputType()
export class LoginInput extends PickType(RegisterWithCredentialsInput, [
  'email',
  'password',
]) {}

@ObjectType()
export class LoginOutput {
  @Field()
  token: string;
  @Field(() => User)
  user: User;
}
