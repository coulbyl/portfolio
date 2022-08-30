import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import {
  BackendAuthService,
  Public,
  LoginResult,
  LoginInput,
} from '@portfolio/backend/auth'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: BackendAuthService,
  ) {}

  @Public()
  @Mutation(() => LoginResult)
  async login(@Args('loginInput') loginInput: LoginInput) {
    let user = await this.userService.findOneBy({ email: loginInput.email })
    user = await this.authService.validateUser(user, loginInput.password)
    return this.authService.login(user)
  }

  @Public()
  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput)
    return this.authService.login(user)
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneBy({ id })
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id)
  }
}
