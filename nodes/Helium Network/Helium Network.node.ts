/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-heliumnetwork/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class HeliumNetwork implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Helium Network',
    name: 'heliumnetwork',
    icon: 'file:heliumnetwork.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Helium Network API',
    defaults: {
      name: 'Helium Network',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'heliumnetworkApi',
        required: true,
      },
    ],
    properties: [
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Hotspots',
            value: 'hotspots',
          },
          {
            name: 'Accounts',
            value: 'accounts',
          },
          {
            name: 'Validators',
            value: 'validators',
          },
          {
            name: 'Rewards',
            value: 'rewards',
          },
          {
            name: 'Blockchain',
            value: 'blockchain',
          },
          {
            name: 'Elections',
            value: 'elections',
          }
        ],
        default: 'hotspots',
      },
      // Operation dropdowns per resource
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
    },
  },
  options: [
    {
      name: 'List Hotspots',
      value: 'listHotspots',
      description: 'Get all hotspots with pagination',
      action: 'List hotspots',
    },
    {
      name: 'Get Hotspot',
      value: 'getHotspot',
      description: 'Get specific hotspot by address',
      action: 'Get hotspot',
    },
    {
      name: 'Get Hotspot Activity',
      value: 'getHotspotActivity',
      description: 'Get hotspot activity history',
      action: 'Get hotspot activity',
    },
    {
      name: 'Get Hotspot Rewards',
      value: 'getHotspotRewards',
      description: 'Get rewards earned by hotspot',
      action: 'Get hotspot rewards',
    },
    {
      name: 'Get Hotspot Witnesses',
      value: 'getHotspotWitnesses',
      description: 'Get hotspots witnessed by this hotspot',
      action: 'Get hotspot witnesses',
    },
    {
      name: 'Get Hotspot Challenged',
      value: 'getHotspotChallenged',
      description: 'Get challenge activity for hotspot',
      action: 'Get hotspot challenged',
    },
    {
      name: 'Update Hotspot',
      value: 'updateHotspot',
      description: 'Update hotspot settings like name or location',
      action: 'Update hotspot',
    },
  ],
  default: 'listHotspots',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['accounts'],
    },
  },
  options: [
    {
      name: 'Get Account',
      value: 'getAccount',
      description: 'Get account information by address',
      action: 'Get account information',
    },
    {
      name: 'Get Account Hotspots',
      value: 'getAccountHotspots',
      description: 'Get hotspots owned by account',
      action: 'Get account hotspots',
    },
    {
      name: 'Get Account Validators',
      value: 'getAccountValidators',
      description: 'Get validators owned by account',
      action: 'Get account validators',
    },
    {
      name: 'Get Account Activity',
      value: 'getAccountActivity',
      description: 'Get account transaction activity',
      action: 'Get account activity',
    },
    {
      name: 'Get Account Rewards',
      value: 'getAccountRewards',
      description: 'Get rewards earned by account',
      action: 'Get account rewards',
    },
    {
      name: 'Get Pending Transactions',
      value: 'getPendingTransactions',
      description: 'Get pending transactions for account',
      action: 'Get pending transactions',
    },
    {
      name: 'Submit Transaction',
      value: 'submitTransaction',
      description: 'Submit a signed transaction',
      action: 'Submit transaction',
    },
  ],
  default: 'getAccount',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['validators'],
    },
  },
  options: [
    {
      name: 'List Validators',
      value: 'listValidators',
      description: 'Get all validators with pagination',
      action: 'List validators',
    },
    {
      name: 'Get Validator',
      value: 'getValidator',
      description: 'Get specific validator by address',
      action: 'Get validator',
    },
    {
      name: 'Get Validator Activity',
      value: 'getValidatorActivity',
      description: 'Get validator activity and consensus participation',
      action: 'Get validator activity',
    },
    {
      name: 'Get Validator Rewards',
      value: 'getValidatorRewards',
      description: 'Get rewards earned by validator',
      action: 'Get validator rewards',
    },
    {
      name: 'Create Validator',
      value: 'createValidator',
      description: 'Stake HNT to create a new validator',
      action: 'Create validator',
    },
    {
      name: 'Update Validator',
      value: 'updateValidator',
      description: 'Update validator settings',
      action: 'Update validator',
    },
    {
      name: 'Unstake Validator',
      value: 'unstakeValidator',
      description: 'Initiate validator unstaking process',
      action: 'Unstake validator',
    },
  ],
  default: 'listValidators',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
    },
  },
  options: [
    {
      name: 'Get Rewards Sum',
      value: 'getRewardsSum',
      description: 'Get total rewards for time period',
      action: 'Get rewards sum',
    },
    {
      name: 'Get Block Rewards By Account',
      value: 'getBlockRewardsByAccount',
      description: 'Get reward distribution for specific block by account',
      action: 'Get block rewards by account',
    },
    {
      name: 'Get Block Rewards By Hotspot',
      value: 'getBlockRewardsByHotspot',
      description: 'Get hotspot rewards for specific block',
      action: 'Get block rewards by hotspot',
    },
    {
      name: 'Claim Rewards',
      value: 'claimRewards',
      description: 'Claim pending rewards to wallet',
      action: 'Claim rewards',
    },
    {
      name: 'Get Oracle Price',
      value: 'getOraclePrice',
      description: 'Get current HNT oracle price',
      action: 'Get oracle price',
    },
    {
      name: 'Get Reward Predictions',
      value: 'getRewardPredictions',
      description: 'Get predicted rewards for next epoch',
      action: 'Get reward predictions',
    },
  ],
  default: 'getRewardsSum',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['blockchain'],
    },
  },
  options: [
    {
      name: 'List Blocks',
      value: 'listBlocks',
      description: 'Get recent blocks with pagination',
      action: 'List blocks',
    },
    {
      name: 'Get Block',
      value: 'getBlock',
      description: 'Get specific block by height',
      action: 'Get block',
    },
    {
      name: 'Get Block Transactions',
      value: 'getBlockTransactions',
      description: 'Get transactions in a block',
      action: 'Get block transactions',
    },
    {
      name: 'Get Transaction',
      value: 'getTransaction',
      description: 'Get transaction details by hash',
      action: 'Get transaction',
    },
    {
      name: 'Get Pending Transactions',
      value: 'getPendingTransactions',
      description: 'Get pending transaction pool',
      action: 'Get pending transactions',
    },
    {
      name: 'Broadcast Transaction',
      value: 'broadcastTransaction',
      description: 'Broadcast signed transaction to network',
      action: 'Broadcast transaction',
    },
    {
      name: 'Get Network Stats',
      value: 'getNetworkStats',
      description: 'Get current network statistics',
      action: 'Get network stats',
    },
  ],
  default: 'listBlocks',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['elections'],
    },
  },
  options: [
    {
      name: 'List Elections',
      value: 'listElections',
      description: 'Get consensus group elections',
      action: 'List elections',
    },
    {
      name: 'Get Election',
      value: 'getElection',
      description: 'Get specific election by block height',
      action: 'Get election',
    },
    {
      name: 'Get Current Election',
      value: 'getCurrentElection',
      description: 'Get current consensus group',
      action: 'Get current election',
    },
    {
      name: 'Submit Vote',
      value: 'submitVote',
      description: 'Submit governance vote',
      action: 'Submit vote',
    },
    {
      name: 'Get Proposal Votes',
      value: 'getProposalVotes',
      description: 'Get votes for governance proposal',
      action: 'Get proposal votes',
    },
    {
      name: 'List Proposals',
      value: 'listProposals',
      description: 'Get active governance proposals',
      action: 'List proposals',
    },
    {
      name: 'Get Proposal',
      value: 'getProposal',
      description: 'Get specific governance proposal',
      action: 'Get proposal',
    },
  ],
  default: 'listElections',
},
      // Parameter definitions
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['listHotspots'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['listHotspots'],
    },
  },
  default: 100,
  description: 'Number of results to return',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspot'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotActivity'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotActivity'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotActivity'],
    },
  },
  default: 100,
  description: 'Number of results to return',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotRewards'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Min Time',
  name: 'min_time',
  type: 'dateTime',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotRewards'],
    },
  },
  default: '',
  description: 'Minimum time for rewards query',
},
{
  displayName: 'Max Time',
  name: 'max_time',
  type: 'dateTime',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotRewards'],
    },
  },
  default: '',
  description: 'Maximum time for rewards query',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotWitnesses'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotWitnesses'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotChallenged'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['getHotspotChallenged'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Hotspot Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: '',
  description: 'The hotspot address',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: '',
  description: 'New name for the hotspot',
},
{
  displayName: 'Latitude',
  name: 'lat',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: 0,
  description: 'Latitude coordinate',
},
{
  displayName: 'Longitude',
  name: 'lng',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['hotspots'],
      operation: ['updateHotspot'],
    },
  },
  default: 0,
  description: 'Longitude coordinate',
},
{
  displayName: 'Account Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccount', 'getAccountHotspots', 'getAccountValidators', 'getAccountActivity', 'getAccountRewards', 'getPendingTransactions', 'submitTransaction'],
    },
  },
  default: '',
  description: 'The Helium account address',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountHotspots', 'getAccountValidators', 'getAccountActivity', 'getAccountRewards'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountHotspots', 'getAccountValidators', 'getAccountActivity'],
    },
  },
  default: 100,
  description: 'Maximum number of results to return',
  typeOptions: {
    minValue: 1,
    maxValue: 1000,
  },
},
{
  displayName: 'Filter Types',
  name: 'filterTypes',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountActivity'],
    },
  },
  default: '',
  description: 'Comma-separated list of transaction types to filter by',
  placeholder: 'payment_v1,rewards_v1',
},
{
  displayName: 'Min Time',
  name: 'minTime',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountRewards'],
    },
  },
  default: '',
  description: 'Minimum time for rewards query (ISO 8601 format)',
  placeholder: '2023-01-01T00:00:00Z',
},
{
  displayName: 'Max Time',
  name: 'maxTime',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['getAccountRewards'],
    },
  },
  default: '',
  description: 'Maximum time for rewards query (ISO 8601 format)',
  placeholder: '2023-12-31T23:59:59Z',
},
{
  displayName: 'Transaction Data',
  name: 'txn',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['accounts'],
      operation: ['submitTransaction'],
    },
  },
  default: '',
  description: 'The signed transaction data to submit',
  typeOptions: {
    rows: 4,
  },
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['listValidators'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['listValidators', 'getValidatorActivity'],
    },
  },
  default: 20,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Validator Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidator', 'getValidatorActivity', 'getValidatorRewards', 'updateValidator', 'unstakeValidator'],
    },
  },
  default: '',
  description: 'The validator address',
},
{
  displayName: 'Validator Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['createValidator'],
    },
  },
  default: '',
  description: 'The validator address to create',
},
{
  displayName: 'Activity Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidatorActivity'],
    },
  },
  default: '',
  description: 'Cursor for paginating activity results',
},
{
  displayName: 'Min Time',
  name: 'min_time',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidatorRewards'],
    },
  },
  default: '',
  description: 'Minimum time for reward period',
},
{
  displayName: 'Max Time',
  name: 'max_time',
  type: 'dateTime',
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['getValidatorRewards'],
    },
  },
  default: '',
  description: 'Maximum time for reward period',
},
{
  displayName: 'Stake Amount',
  name: 'stake',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['createValidator'],
    },
  },
  default: 10000,
  description: 'Amount of HNT to stake (minimum 10,000 HNT)',
},
{
  displayName: 'Validator Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['validators'],
      operation: ['updateValidator'],
    },
  },
  default: '',
  description: 'New name for the validator',
},
{
  displayName: 'Min Time',
  name: 'minTime',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardsSum'],
    },
  },
  default: '',
  description: 'Minimum time for the reward period (ISO 8601 format)',
},
{
  displayName: 'Max Time',
  name: 'maxTime',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardsSum'],
    },
  },
  default: '',
  description: 'Maximum time for the reward period (ISO 8601 format)',
},
{
  displayName: 'Bucket',
  name: 'bucket',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardsSum'],
    },
  },
  options: [
    { name: 'Hour', value: 'hour' },
    { name: 'Day', value: 'day' },
    { name: 'Week', value: 'week' },
    { name: 'Month', value: 'month' },
  ],
  default: 'day',
  description: 'Time bucket for grouping rewards',
},
{
  displayName: 'Block Number',
  name: 'block',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getBlockRewardsByAccount', 'getBlockRewardsByHotspot'],
    },
  },
  default: 0,
  description: 'The block number to get rewards for',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getBlockRewardsByAccount', 'getBlockRewardsByHotspot'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getBlockRewardsByAccount', 'getBlockRewardsByHotspot'],
    },
  },
  default: 100,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Account Address',
  name: 'account',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['claimRewards'],
    },
  },
  default: '',
  description: 'The account address to claim rewards for',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['claimRewards'],
    },
  },
  default: '',
  description: 'Blockchain wallet signature for reward claim authorization',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardPredictions'],
    },
  },
  default: '',
  description: 'The address to get reward predictions for',
},
{
  displayName: 'Type',
  name: 'type',
  type: 'options',
  required: false,
  displayOptions: {
    show: {
      resource: ['rewards'],
      operation: ['getRewardPredictions'],
    },
  },
  options: [
    { name: 'Account', value: 'account' },
    { name: 'Hotspot', value: 'hotspot' },
    { name: 'Validator', value: 'validator' },
  ],
  default: 'account',
  description: 'Type of entity to get predictions for',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['listBlocks'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['listBlocks'],
    },
  },
  default: 20,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Block Height',
  name: 'height',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getBlock'],
    },
  },
  default: '',
  description: 'The block height to retrieve',
},
{
  displayName: 'Block Height',
  name: 'height',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getBlockTransactions'],
    },
  },
  default: '',
  description: 'The block height to get transactions for',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getBlockTransactions'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getBlockTransactions'],
    },
  },
  default: 20,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Transaction Hash',
  name: 'hash',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getTransaction'],
    },
  },
  default: '',
  description: 'The transaction hash to retrieve',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getPendingTransactions'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['getPendingTransactions'],
    },
  },
  default: 20,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Transaction Data',
  name: 'txn',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['blockchain'],
      operation: ['broadcastTransaction'],
    },
  },
  default: '',
  description: 'The signed transaction data to broadcast',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['listElections'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['listElections'],
    },
  },
  default: 100,
  description: 'Maximum number of results to return',
},
{
  displayName: 'Block Height',
  name: 'height',
  type: 'number',
  required: true,
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['getElection'],
    },
  },
  default: 0,
  description: 'The block height of the election',
},
{
  displayName: 'Proposal ID',
  name: 'proposalId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['submitVote', 'getProposalVotes'],
    },
  },
  default: '',
  description: 'The ID of the governance proposal',
},
{
  displayName: 'Vote',
  name: 'vote',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['submitVote'],
    },
  },
  options: [
    {
      name: 'Yes',
      value: 'yes',
    },
    {
      name: 'No',
      value: 'no',
    },
    {
      name: 'Abstain',
      value: 'abstain',
    },
  ],
  default: 'yes',
  description: 'The vote choice',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['submitVote'],
    },
  },
  default: '',
  description: 'Blockchain wallet signature for the vote',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['getProposalVotes', 'listProposals'],
    },
  },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['listProposals'],
    },
  },
  options: [
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Pending',
      value: 'pending',
    },
    {
      name: 'Closed',
      value: 'closed',
    },
    {
      name: 'All',
      value: 'all',
    },
  ],
  default: 'active',
  description: 'Filter proposals by status',
},
{
  displayName: 'Proposal ID',
  name: 'proposalId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['elections'],
      operation: ['getProposal'],
    },
  },
  default: '',
  description: 'The ID of the governance proposal',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'hotspots':
        return [await executeHotspotsOperations.call(this, items)];
      case 'accounts':
        return [await executeAccountsOperations.call(this, items)];
      case 'validators':
        return [await executeValidatorsOperations.call(this, items)];
      case 'rewards':
        return [await executeRewardsOperations.call(this, items)];
      case 'blockchain':
        return [await executeBlockchainOperations.call(this, items)];
      case 'elections':
        return [await executeElectionsOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeHotspotsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('heliumnetworkApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      switch (operation) {
        case 'listHotspots': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          
          const qs: any = {};
          if (cursor) qs.cursor = cursor;
          if (limit) qs.limit = limit;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/hotspots`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getHotspot': {
          const address = this.getNodeParameter('address', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/hotspots/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getHotspotActivity': {
          const address = this.getNodeParameter('address', i) as string;
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          
          const qs: any = {};
          if (cursor) qs.cursor = cursor;
          if (limit) qs.limit = limit;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/hotspots/${address}/activity`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getHotspotRewards': {
          const address = this.getNodeParameter('address', i) as string;
          const min_time = this.getNodeParameter('min_time', i, '') as string;
          const max_time = this.getNodeParameter('max_time', i, '') as string;
          
          const qs: any = {};
          if (min_time) qs.min_time = min_time;
          if (max_time) qs.max_time = max_time;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/hotspots/${address}/rewards`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getHotspotWitnesses': {
          const address = this.getNodeParameter('address', i) as string;
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          
          const qs: any = {};
          if (cursor) qs.cursor = cursor;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/hotspots/${address}/witnesses`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getHotspotChallenged': {
          const address = this.getNodeParameter('address', i) as string;
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          
          const qs: any = {};
          if (cursor) qs.cursor = cursor;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/hotspots/${address}/challenged`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateHotspot': {
          const address = this.getNodeParameter('address', i) as string;
          const name = this.getNodeParameter('name', i, '') as string;
          const lat = this.getNodeParameter('lat', i, 0) as number;
          const lng = this.getNodeParameter('lng', i, 0) as number;
          
          const body: any = {};
          if (name) body.name = name;
          if (lat !== 0) body.lat = lat;
          if (lng !== 0) body.lng = lng;

          const options: any = {
            method: 'PATCH',
            url: `${credentials.baseUrl}/hotspots/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        if (error.response?.body) {
          throw new NodeApiError(this.getNode(), error.response.body);
        }
        throw error;
      }
    }
  }

  return returnData;
}

async function executeAccountsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('heliumnetworkApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const address = this.getNodeParameter('address', i) as string;

      switch (operation) {
        case 'getAccount': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/accounts/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAccountHotspots': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          
          const queryParams = new URLSearchParams();
          if (cursor) queryParams.append('cursor', cursor);
          if (limit) queryParams.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/accounts/${address}/hotspots${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAccountValidators': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          
          const queryParams = new URLSearchParams();
          if (cursor) queryParams.append('cursor', cursor);
          if (limit) queryParams.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/accounts/${address}/validators${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAccountActivity': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;
          const filterTypes = this.getNodeParameter('filterTypes', i, '') as string;
          
          const queryParams = new URLSearchParams();
          if (cursor) queryParams.append('cursor', cursor);
          if (limit) queryParams.append('limit', limit.toString());
          if (filterTypes) queryParams.append('filter_types', filterTypes);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/accounts/${address}/activity${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAccountRewards': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const minTime = this.getNodeParameter('minTime', i, '') as string;
          const maxTime = this.getNodeParameter('maxTime', i, '') as string;
          
          const queryParams = new URLSearchParams();
          if (cursor) queryParams.append('cursor', cursor);
          if (minTime) queryParams.append('min_time', minTime);
          if (maxTime) queryParams.append('max_time', maxTime);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/accounts/${address}/rewards${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPendingTransactions': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/accounts/${address}/pending_transactions`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'submitTransaction': {
          const txn = this.getNodeParameter('txn', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/accounts/${address}/transactions`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: {
              txn: txn,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
            itemIndex: i,
          });
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { 
            error: error.message,
            operation: operation,
            itemIndex: i,
          },
          pairedItem: { item: i },
        });
      } else {
        if (error.httpCode) {
          throw new NodeApiError(this.getNode(), error, { itemIndex: i });
        }
        throw new NodeOperationError(this.getNode(), error.message, { itemIndex: i });
      }
    }
  }

  return returnData;
}

async function executeValidatorsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('heliumnetworkApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listValidators': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 20) as number;

          const params = new URLSearchParams();
          if (cursor) params.append('cursor', cursor);
          params.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators?${params.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getValidator': {
          const address = this.getNodeParameter('address', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getValidatorActivity': {
          const address = this.getNodeParameter('address', i) as string;
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 20) as number;

          const params = new URLSearchParams();
          if (cursor) params.append('cursor', cursor);
          params.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators/${address}/activity?${params.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getValidatorRewards': {
          const address = this.getNodeParameter('address', i) as string;
          const minTime = this.getNodeParameter('min_time', i, '') as string;
          const maxTime = this.getNodeParameter('max_time', i, '') as string;

          const params = new URLSearchParams();
          if (minTime) params.append('min_time', minTime);
          if (maxTime) params.append('max_time', maxTime);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators/${address}/rewards?${params.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createValidator': {
          const address = this.getNodeParameter('address', i) as string;
          const stake = this.getNodeParameter('stake', i) as number;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              address,
              stake,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateValidator': {
          const address = this.getNodeParameter('address', i) as string;
          const name = this.getNodeParameter('name', i) as string;

          const options: any = {
            method: 'PATCH',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators/${address}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              name,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'unstakeValidator': {
          const address = this.getNodeParameter('address', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl || 'https://api.helium.io/v1'}/validators/${address}/stake`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}

async function executeRewardsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('heliumnetworkApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getRewardsSum': {
          const minTime = this.getNodeParameter('minTime', i) as string;
          const maxTime = this.getNodeParameter('maxTime', i) as string;
          const bucket = this.getNodeParameter('bucket', i) as string;

          const queryParams = new URLSearchParams({
            min_time: minTime,
            max_time: maxTime,
            bucket: bucket,
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/rewards/sum?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlockRewardsByAccount': {
          const block = this.getNodeParameter('block', i) as number;
          const cursor = this.getNodeParameter('cursor', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;

          const queryParams = new URLSearchParams();
          if (cursor) queryParams.append('cursor', cursor);
          if (limit) queryParams.append('limit', limit.toString());

          const queryString = queryParams.toString();
          const url = queryString 
            ? `${credentials.baseUrl}/rewards/${block}/accounts?${queryString}`
            : `${credentials.baseUrl}/rewards/${block}/accounts`;

          const options: any = {
            method: 'GET',
            url: url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlockRewardsByHotspot': {
          const block = this.getNodeParameter('block', i) as number;
          const cursor = this.getNodeParameter('cursor', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;

          const queryParams = new URLSearchParams();
          if (cursor) queryParams.append('cursor', cursor);
          if (limit) queryParams.append('limit', limit.toString());

          const queryString = queryParams.toString();
          const url = queryString 
            ? `${credentials.baseUrl}/rewards/${block}/hotspots?${queryString}`
            : `${credentials.baseUrl}/rewards/${block}/hotspots`;

          const options: any = {
            method: 'GET',
            url: url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'claimRewards': {
          const account = this.getNodeParameter('account', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/rewards/claim`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              account: account,
              signature: signature,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getOraclePrice': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/rewards/oracle`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getRewardPredictions': {
          const address = this.getNodeParameter('address', i) as string;
          const type = this.getNodeParameter('type', i) as string;

          const queryParams = new URLSearchParams({
            address: address,
            type: type,
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/rewards/predictions?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        if (error.httpCode) {
          throw new NodeApiError(this.getNode(), error);
        }
        throw new NodeOperationError(this.getNode(), error.message);
      }
    }
  }

  return returnData;
}

async function executeBlockchainOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('heliumnetworkApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listBlocks': {
          const cursor = this.getNodeParameter('cursor', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;

          const params = new URLSearchParams();
          if (cursor) params.append('cursor', cursor);
          if (limit) params.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/blocks${params.toString() ? '?' + params.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlock': {
          const height = this.getNodeParameter('height', i) as number;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/blocks/${height}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlockTransactions': {
          const height = this.getNodeParameter('height', i) as number;
          const cursor = this.getNodeParameter('cursor', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;

          const params = new URLSearchParams();
          if (cursor) params.append('cursor', cursor);
          if (limit) params.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/blocks/${height}/transactions${params.toString() ? '?' + params.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTransaction': {
          const hash = this.getNodeParameter('hash', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/transactions/${hash}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPendingTransactions': {
          const cursor = this.getNodeParameter('cursor', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;

          const params = new URLSearchParams();
          if (cursor) params.append('cursor', cursor);
          if (limit) params.append('limit', limit.toString());

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/pending_transactions${params.toString() ? '?' + params.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'broadcastTransaction': {
          const txn = this.getNodeParameter('txn', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/transactions`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              txn: txn,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getNetworkStats': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/stats`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        if (error.httpCode === 404) {
          throw new NodeApiError(this.getNode(), error, {
            message: 'Resource not found',
          });
        }
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}

async function executeElectionsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('heliumnetworkApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listElections': {
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const limit = this.getNodeParameter('limit', i, 100) as number;

          const queryParams: any = {};
          if (cursor) queryParams.cursor = cursor;
          if (limit) queryParams.limit = limit.toString();

          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${credentials.baseUrl}/elections${queryString ? '?' + queryString : ''}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getElection': {
          const height = this.getNodeParameter('height', i) as number;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/elections/${height}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getCurrentElection': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/elections/current`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'submitVote': {
          const proposalId = this.getNodeParameter('proposalId', i) as string;
          const vote = this.getNodeParameter('vote', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;

          const body: any = {
            proposal_id: proposalId,
            vote,
            signature,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/votes`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getProposalVotes': {
          const proposalId = this.getNodeParameter('proposalId', i) as string;
          const cursor = this.getNodeParameter('cursor', i, '') as string;

          const queryParams: any = {};
          if (cursor) queryParams.cursor = cursor;

          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${credentials.baseUrl}/votes/${proposalId}${queryString ? '?' + queryString : ''}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listProposals': {
          const status = this.getNodeParameter('status', i, 'active') as string;
          const cursor = this.getNodeParameter('cursor', i, '') as string;

          const queryParams: any = {};
          if (status && status !== 'all') queryParams.status = status;
          if (cursor) queryParams.cursor = cursor;

          const queryString = new URLSearchParams(queryParams).toString();
          const url = `${credentials.baseUrl}/proposals${queryString ? '?' + queryString : ''}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getProposal': {
          const proposalId = this.getNodeParameter('proposalId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/proposals/${proposalId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        if (error.httpCode) {
          throw new NodeApiError(this.getNode(), error);
        }
        throw new NodeOperationError(this.getNode(), error.message);
      }
    }
  }

  return returnData;
}
