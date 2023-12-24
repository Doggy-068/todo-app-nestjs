import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic' as const
/**
 * @description 无需通过 AuthGuard 校验
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
