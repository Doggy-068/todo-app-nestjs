import { Test } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Auth } from '../../entity/auth.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { NotFoundException } from '@nestjs/common'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: getRepositoryToken(Auth),
          useValue: {
            async findOneBy(where: any) {
              return where.account === 'admin' && where.password === '123456'
            }
          }
        },
        AuthService
      ]
    }).useMocker(token => {
      if (token === JwtService) {
        return {
          async signAsync(payload: any) {
            return `thisisa${payload.account}token`
          }
        }
      }
    }).compile()
    controller = moduleRef.get(AuthController)
  })

  describe('login', () => {
    it('should return an access_token', async () => {
      expect(await controller.login('admin', '123456')).toStrictEqual({ 'access_token': 'thisisaadmintoken' })
    })

    it('should throw an exceptipn', async () => {
      await expect(controller.login('admin', '123')).rejects.toThrow(NotFoundException)
    })
  })
})
