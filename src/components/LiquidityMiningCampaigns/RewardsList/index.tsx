import { Pair } from '@swapr/sdk'

import React, { useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

import { useAllLiquidityMiningCampaigns } from '../../../hooks/useAllLiquidityMiningCampaigns'
import { AutoColumn } from '../../Column'
import { PairsFilterType } from '../../Pool/ListFilter'
import { Switch } from '../../Switch'
import TabBar from '../../TabBar'
import List from '../List'
import TabTitle from '../TabTitle'

const View = styled(AutoColumn)`
  margin-top: 20px;
`

interface RewardsInterface {
  dataFilter: PairsFilterType
  setDataFiler: any
  pair?: Pair | null
  loading: boolean
}

export function RewardsList({ dataFilter, pair, setDataFiler, loading }: RewardsInterface) {
  const { loading: loadingPairs, miningCampaigns } = useAllLiquidityMiningCampaigns(pair ?? undefined, dataFilter)

  const [activeTab, setActiveTab] = useState(0)

  return (
    <View gap="16px">
      <Flex style={{ alignItems: 'center' }}>
        <TabBar
          titles={[
            <TabTitle
              key="active"
              loadingAmount={loadingPairs || loading}
              itemsAmount={miningCampaigns.active.length}
              badgeTheme="orange"
            >
              <div data-testid="active-campaigns">Campaigns</div>
            </TabTitle>,
            <TabTitle
              key="active"
              loadingAmount={loadingPairs || loading}
              itemsAmount={miningCampaigns.expired.length}
              badgeTheme="red"
            >
              <div data-testid="expired-campaigns">Expired (150 days)</div>
            </TabTitle>,
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
        <Switch
          style={{ marginLeft: 'auto' }}
          isOn={dataFilter === PairsFilterType.MY}
          label="MY PAIRS"
          handleToggle={() =>
            setDataFiler(dataFilter === PairsFilterType.MY ? PairsFilterType.ALL : PairsFilterType.MY)
          }
        />
      </Flex>

      {!loadingPairs && !loading ? (
        <>
          {activeTab === 0 && <List items={miningCampaigns.active} />}
          {activeTab === 1 && <List items={miningCampaigns.expired} />}
        </>
      ) : (
        <List loading />
      )}
    </View>
  )
}
