import { Pair, Token, TokenAmount } from '@swapr/sdk'
import React, { useCallback, useEffect, useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { CampaignType } from '../../../../../pages/LiquidityMining/Create'
import { tryParseAmount } from '../../../../../state/swap/hooks'
import { TYPE } from '../../../../../theme'
import { unwrappedToken } from '../../../../../utils/wrappedCurrency'
import NumericalInput from '../../../../Input/NumericalInput'
import CurrencySearchModal from '../../../../SearchModal/CurrencySearchModal'
import PairSearchModal from '../../../../SearchModal/PairSearchModal'
import { SmoothGradientCard } from '../../../styleds'
import AssetSelector from './AssetSelector'

const FlexContainer = styled(Flex)`
  ${props => props.theme.mediaWidth.upToExtraSmall`
    flex-direction: column;
  `}
`
const StyledNumericalInput = styled(NumericalInput)`
  border-radius: 8px;

  width: 36px;
  max-height: 38px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;

  background-color: ${props => props.theme.dark1};
`

interface PairAndRewardProps {
  liquidityPair: Pair | Token | undefined | null
  unlimitedPool: boolean
  campaingType: CampaignType
  onLiquidityPairChange: (liquidityPair: Pair | Token | null) => void
  onStakingCapChange: (newValue: TokenAmount | null) => void
  onUnlimitedPoolChange: (newValue: boolean) => void
}

export default function PairAndReward({
  liquidityPair,
  unlimitedPool,
  onLiquidityPairChange,
  campaingType,
  onStakingCapChange,
  onUnlimitedPoolChange
}: PairAndRewardProps) {
  const [pairSearchOpen, setPairSearchOpen] = useState<boolean>(false)
  const [currencySearchOpen, setCurrencySearchOpen] = useState<boolean>(false)
  const [stakingCapString, setStakingCapString] = useState('')

  useEffect(() => {
    if (unlimitedPool) {
      setStakingCapString('')
      onStakingCapChange(null)
    }
  }, [onStakingCapChange, liquidityPair, unlimitedPool])
  const handelOpenPairOrTokenSearch = useCallback(value => {
    if (value === CampaignType.PAIR) {
      setPairSearchOpen(true)
    } else {
      setCurrencySearchOpen(true)
    }
  }, [])

  const handleDismissPairSearch = useCallback(() => {
    setPairSearchOpen(false)
  }, [])

  const handlePairSelection = useCallback(
    selectedPair => {
      if (campaingType === CampaignType.PAIR) onLiquidityPairChange(selectedPair)
      else onLiquidityPairChange(selectedPair)
    },
    [onLiquidityPairChange, campaingType]
  )

  const handleDismissCurrencySearch = useCallback(() => {
    setCurrencySearchOpen(false)
  }, [])
  useEffect(() => {
    onLiquidityPairChange(null)
  }, [campaingType, onLiquidityPairChange])
  const handleLocalStakingCapChange = useCallback(
    rawValue => {
      console.log(!liquidityPair || (liquidityPair instanceof Pair && !liquidityPair.liquidityToken))
      if (!liquidityPair || (liquidityPair instanceof Pair && !liquidityPair.liquidityToken)) return
      setStakingCapString(rawValue)
      const tokenOrPair = liquidityPair instanceof Token ? liquidityPair : liquidityPair.liquidityToken
      const parsedAmount = tryParseAmount(rawValue, tokenOrPair) as TokenAmount | undefined
      onStakingCapChange(parsedAmount || new TokenAmount(tokenOrPair, '0'))
    },
    [onStakingCapChange, liquidityPair]
  )

  return (
    <>
      <FlexContainer justifyContent="stretch" width="100%" height={'150px'}>
        <AssetSelector
          campaingType={campaingType}
          currency0={liquidityPair && liquidityPair instanceof Token ? liquidityPair : liquidityPair?.token0}
          currency1={liquidityPair && liquidityPair instanceof Token ? null : liquidityPair?.token1}
          onClick={() => handelOpenPairOrTokenSearch(campaingType)}
        />

        <SmoothGradientCard
          justifyContent={'space-between !important'}
          flexDirection={'column'}
          padding={'41px'}
          marginLeft={'28px'}
          width="301px"
        >
          <TYPE.mediumHeader alignSelf={'start'} color="text1" fontSize={13}>
            MAX STAKED
          </TYPE.mediumHeader>
          <FlexContainer width={'100%'} justifyContent={'space-between '}>
            <Flex
              onClick={() => {
                onUnlimitedPoolChange(!unlimitedPool)
              }}
              alignItems={'center'}
              width={'127px'}
              height={'38px'}
            >
              {unlimitedPool ? 'UNLIMITED' : 'LIMITED'}
            </Flex>
            <Flex>
              <StyledNumericalInput
                disabled={unlimitedPool}
                value={stakingCapString}
                onUserInput={handleLocalStakingCapChange}
              />
              <Flex alignItems={'center'}>
                {liquidityPair && liquidityPair instanceof Pair
                  ? `${unwrappedToken(liquidityPair.token0)?.symbol}/${unwrappedToken(liquidityPair.token1)?.symbol}`
                  : liquidityPair instanceof Token
                  ? unwrappedToken(liquidityPair)?.symbol
                  : ''}
              </Flex>
            </Flex>
          </FlexContainer>
        </SmoothGradientCard>
      </FlexContainer>

      <PairSearchModal
        isOpen={pairSearchOpen}
        onDismiss={handleDismissPairSearch}
        onPairSelect={handlePairSelection}
        selectedPair={liquidityPair instanceof Token ? null : liquidityPair}
      />
      <CurrencySearchModal
        isOpen={currencySearchOpen}
        onDismiss={handleDismissCurrencySearch}
        onCurrencySelect={handlePairSelection}
        selectedCurrency={liquidityPair instanceof Token ? liquidityPair : null}
        showNativeCurrency={false}
      />
    </>
  )
}
