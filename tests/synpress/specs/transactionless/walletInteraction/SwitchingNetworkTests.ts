import { MenuBar } from '../../../../pages/MenuBar'
import { SwapPage } from '../../../../pages/SwapPage'
import { NetworkSwitcher } from '../../../../pages/NetworkSwitcher'

describe('Switching from mainnet tests', () => {
  before(() => {
    cy.clearLocalStorage()
  })
  beforeEach(() => {
    SwapPage.visitSwapPage()
    MenuBar.connectWallet()
  })
  afterEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps()
  })
  after(() => {
    cy.disconnectMetamaskWalletFromAllDapps()
    cy.resetMetamaskAccount()
    cy.wait(500)
  })

  it('Should display that Ropsten network isnt supported [TC-56]', () => {
    cy.changeMetamaskNetwork('ropsten')
    MenuBar.getUnsupportedNetworkWarning().should('be.visible')
    MenuBar.getUnsupportedNetworkPopover().should('be.visible')
  })
  it('Should switch from unsupported network to mainnet wallet [TC-57]', () => {
    cy.changeMetamaskNetwork('ropsten')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Ethereum')
  })
  it('Should switch from mainnet to a. rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arinkeby().click()
    cy.allowMetamaskToAddAndSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum Rinkeby')
  })
  it('Should switch from mainnet to gnosis by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToAddAndSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Gnosis')
  })
  it('Should switch from mainnet to arbitrum by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToAddAndSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum One')
  })
  it('Should switch from mainnet to Polygon by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToAddAndSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Polygon')
  })
  it('Should switch from mainnet to rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('ethereum')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.rinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Rinkeby')
  })
  it('Should switch from gnosis to mainnet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Ethereum')
  })
  it('Should switch from gnosis to arbitrum by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum One')
  })
  it('Should switch from gnosis to rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.rinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Rinkeby')
  })
  it('Should switch from gnosis to polygon by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('Gnosis')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Polygon')
  })
  it('Should switch from rinkeby to mainnet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Ethereum')
  })
  it('Should switch from rinkeby to arbitrum by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum One')
  })
  it('Should switch from rinkeby to gnosis by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Gnosis Chain')
  })
  it('Should switch from rinkeby to a. rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum Rinkeby')
  })
  it('Should switch from rinkeby to polygon by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Polygon')
  })
  it('Should switch from a. rinkeby to mainnet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Ethereum')
  })
  it('Should switch from a. rinkeby to arbitrum by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum One')
  })
  it('Should switch from a. rinkeby to gnosis by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Gnosis Chain')
  })
  it('Should switch from a. rinkeby to rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.rinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Rinkeby')
  })
  it('Should switch from a. rinkeby to Polygon by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum rinkeby')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Polygon')
  })
  it('Should switch from arbitrum one to gnosis by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Gnosis Chain')
  })

  it('Should switch from arbitrum one to mainnet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Ethereum')
  })
  it('Should switch from arbitrum one to a. rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum Rinkeby')
  })
  it('Should switch from arbitrum one to polygon by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.polygon().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Polygon')
  })
  it('Should switch from arbitrum one to rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('arbitrum one')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.rinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Rinkeby')
  })
  it('Should switch from polygon to mainet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.ethereum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Ethereum')
  })
  it('Should switch from polygon to mainet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arbitrum().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum One')
  })
  it('Should switch from polygon to mainet by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.gnosis().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Gnosis Chain')
  })
  it('Should switch from polygon to a. rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.arinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Arbitrum Rinkeby')
  })
  it('Should switch from polygon to rinkeby by dapp [TC-55]', () => {
    cy.changeMetamaskNetwork('polygon mainnet')
    MenuBar.getNetworkSwitcher().click()
    NetworkSwitcher.rinkeby().click()
    cy.allowMetamaskToSwitchNetwork()
    MenuBar.getNetworkSwitcher().should('contain.text', 'Rinkeby')
  })
})
