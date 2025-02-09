import { JSBI, Pair, Percent, TokenAmount } from '@swapr/sdk'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, Flex, Text } from 'rebass'

import { useTotalSupply } from '../../../../data/TotalSupply'
import { useActiveWeb3React } from '../../../../hooks'
import { useTokenBalance } from '../../../../state/wallet/hooks'
import { getAccountAnalyticsLink } from '../../../../utils'
import { currencyId } from '../../../../utils/currencyId'
import { unwrappedToken } from '../../../../utils/wrappedCurrency'
import { ButtonExternalLink, ButtonPurpleDim } from '../../../Button'
import { DimBlurBgBox } from '../../DimBlurBgBox/styleds'
import { InfoGrid } from '../InfoGrid/InfoGrid.styles'
import { ValueWithLabel } from '../ValueWithLabel'

interface UserLiquidityProps {
  pair?: Pair
}

export function UserLiquidity({ pair }: UserLiquidityProps) {
  const { account, chainId } = useActiveWeb3React()
  const currency0 = unwrappedToken(pair?.token0)
  const currency1 = unwrappedToken(pair?.token1)
  const userPoolBalance = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair?.liquidityToken)
  const { t } = useTranslation()

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens
      ? totalPoolTokens.greaterThan('0') && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
        : new Percent('0', '100')
      : undefined

  const [token0Deposited, token1Deposited] = !!pair
    ? !!totalPoolTokens &&
      totalPoolTokens.greaterThan('0') &&
      !!userPoolBalance &&
      userPoolBalance.greaterThan('0') &&
      // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
      JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [new TokenAmount(pair.token0, '0'), new TokenAmount(pair.token1, '0')]
    : [undefined, undefined]

  return (
    <DimBlurBgBox padding={'24px'}>
      <Flex flexDirection={['column', 'row']} alignItems="center" justifyContent="space-between">
        <Text fontSize="16px" mb="16px">
          {t('yourLiquidity')}
        </Text>
        <Box>
          <ButtonExternalLink link={getAccountAnalyticsLink(account || '', chainId)}>
            {t('accountAnalytics')}
          </ButtonExternalLink>
        </Box>
      </Flex>
      <Box marginY={4}>
        <InfoGrid>
          <ValueWithLabel
            title={t('poolShare')}
            value={poolTokenPercentage ? poolTokenPercentage.toFixed(2) + '%' : '0'}
          />
          <ValueWithLabel title={t('poolTokens')} value={userPoolBalance ? userPoolBalance.toSignificant(4) : '0'} />
          <ValueWithLabel
            title={t('pooledToken', { token: currency0?.symbol })}
            value={token0Deposited ? token0Deposited.toSignificant(6) : '0'}
          />
          <ValueWithLabel
            title={t('pooledToken', { token: currency1?.symbol })}
            value={token1Deposited ? token1Deposited.toSignificant(6) : '0'}
          />
        </InfoGrid>
      </Box>
      <Flex flexDirection={['column', 'row']} alignItems="center">
        <Box marginBottom={[3, 0]} width="100%">
          <ButtonPurpleDim
            as={Link}
            to={currency0 && currency1 ? `/pools/add/${currencyId(currency0)}/${currencyId(currency1)}` : ''}
          >
            {t('addLiquidity')}
          </ButtonPurpleDim>
        </Box>
        <Box marginLeft={[0, 3]} width="100%">
          <ButtonPurpleDim
            disabled={token0Deposited?.equalTo('0')}
            as={token0Deposited?.equalTo('0') ? ButtonPurpleDim : Link}
            to={currency0 && currency1 ? `/pools/remove/${currencyId(currency0)}/${currencyId(currency1)}` : ''}
          >
            {t('removeLiquidity')}
          </ButtonPurpleDim>
        </Box>
      </Flex>
    </DimBlurBgBox>
  )
}
