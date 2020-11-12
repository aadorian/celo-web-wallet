export enum Currency {
  cUSD = 'cusd',
  CELO = 'celo',
}

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ETHEREUM_DERIVATION_PATH = "m/44'/60'/0'/0"
export const CELO_DERIVATION_PATH = "m/44'/52752'/0'/0"

export const MAX_SEND_TOKEN_SIZE = '100000000000000000000' // 100 Tokens
export const MAX_EXCHANGE_TOKEN_SIZE = '100000000000000000000' // 100 Tokens
export const MAX_COMMENT_CHAR_LENGTH = 70 // Chosen to match max length in Valora

export const MAX_FEE_SIZE = '1000000000000000000' // 1 Token
export const MAX_GAS_PRICE = '5000000000' // 5 Gwei
export const MAX_GAS_LIMIT = '10000000' // 10 million
